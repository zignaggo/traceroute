use socket2::{Domain, Protocol, SockAddr, Socket, Type};
use std::io;
use std::net::{IpAddr, Ipv4Addr, SocketAddr, ToSocketAddrs};
use std::time::Instant;
use std::{mem::MaybeUninit, time::Duration};

pub trait TracerouteEmitter {
    fn on_hop(&self, hop: u32, ip: String, duration: Duration);
    fn on_timeout(&self, hop: u32);
    fn on_destination_reached(&self, hop: u32, ip: String, duration: Duration);
    fn on_error(&self, error: String);
}

pub struct DefaultEmitter;

impl TracerouteEmitter for DefaultEmitter {
    fn on_hop(&self, hop: u32, ip: String, duration: Duration) {
        println!("{:2}  {:15}  {:?}", hop, ip, duration);
    }

    fn on_destination_reached(&self, hop: u32, ip: String, duration: Duration) {
        println!("{:2}  {:15}  {:?} (Destination reached)", hop, ip, duration);
    }

    fn on_error(&self, error: String) {
        println!("❌ Error: {}", error);
    }

    fn on_timeout(&self, _hop: u32) {
        println!("* * * (Timeout)");
    }
}

pub fn traceroute_with_emitter<E: TracerouteEmitter>(
    hostname: &str,
    sec_timeout: Option<u64>,
    max_hops: Option<u32>,
    emitter: E,
) {
    let timeout: Duration = Duration::from_secs(sec_timeout.unwrap_or(1));
    let max_hops: u32 = max_hops.unwrap_or(15);

    let formatted_hostname = format_hostname(hostname);

    let ip_addr: Ipv4Addr = match resolve_host(formatted_hostname) {
        Err(e) => {
            emitter.on_error(format!("❌ Resolution failed: {}", e));
            return;
        }
        Ok(v) => v,
    };

    let socket = match create_and_configure_socket() {
        Ok(s) => s,
        Err(e) => {
            emitter.on_error(format!("Failed to create socket: {}", e));
            std::process::exit(1);
        }
    };

    for ttl in 1..=max_hops {
        if let Err(e) = socket.set_ttl(ttl) {
            println!("{:2} * (error setting TTL: {})", ttl, e);
            continue;
        }

        if let Err(e) = socket.set_read_timeout(Some(timeout)) {
            println!("Warning: Failed to set socket timeout: {}", e);
            continue;
        }

        let packet = create_icmp_packet(ttl, b"traceroute");

        let start: Instant = Instant::now();

        let dest_addr = SockAddr::from(SocketAddr::new(IpAddr::V4(ip_addr), 0));
        if let Err(e) = socket.send_to(&packet, &dest_addr) {
            println!("{:2} * (error sending packet: {})", ttl, e);
            continue;
        }

        let mut reply_buf = vec![MaybeUninit::<u8>::uninit(); 1500];
        match socket.recv_from(&mut reply_buf) {
            Ok((n, source_addr)) => {
                let duration: Duration = start.elapsed();
                let source_ip = if let Some(sock_addr) = source_addr.as_socket() {
                    sock_addr.ip().to_string()
                } else {
                    "unknown".to_string()
                };
                if n >= 20 {
                    let initialized_buf: &[u8] =
                        unsafe { std::slice::from_raw_parts(reply_buf.as_ptr() as *const u8, n) };
                    let icmp_type = initialized_buf[20];
                    match icmp_type {
                        11 => {
                            emitter.on_hop(ttl, source_ip, duration);
                        }
                        0 => {
                            emitter.on_destination_reached(ttl, source_ip, duration);
                            return;
                        }
                        _ => {
                            emitter.on_error(format!("ICMP type: {}", icmp_type));
                        }
                    }
                } else {
                    emitter.on_error(format!("Invalid packet size: {}", n));
                }
            }
            Err(e) => match e.kind() {
                io::ErrorKind::WouldBlock | io::ErrorKind::TimedOut => {
                    emitter.on_timeout(ttl);
                }
                _ => {
                    emitter.on_error(format!("Error receiving: {}", e));
                }
            },
        }
    }
}

fn create_and_configure_socket() -> io::Result<Socket> {
    let socket = Socket::new_raw(Domain::IPV4, Type::RAW, Some(Protocol::ICMPV4))?;
    socket.set_nonblocking(false)?;
    socket.set_read_timeout(Some(Duration::from_secs(2)))?;
    Ok(socket)
}

fn resolve_host(host_with_port: String) -> Result<Ipv4Addr, String> {
    match host_with_port.to_socket_addrs() {
        Ok(addrs) => {
            let ipv4 = addrs
                .filter_map(|addr| match addr.ip() {
                    IpAddr::V4(ip) => Some(ip),
                    IpAddr::V6(_) => None,
                })
                .next()
                .ok_or_else(|| "No IPv4 address found".to_string())?;
            println!("IP address resolved: {}", ipv4);
            Ok(ipv4)
        }
        Err(e) => Err(format!("Error resolving hostname: {}", e)),
    }
}

fn format_hostname(prm_str: &str) -> String {
    let host_with_port = if prm_str.contains(':') {
        prm_str.to_string()
    } else {
        format!("{}:0", prm_str)
    };
    host_with_port
}

fn calculate_checksum(data: &[u8]) -> u16 {
    let mut sum: u32 = 0;

    let len = data.len();
    let mut i = 0;
    while i < len - 1 {
        let word = ((data[i] as u32) << 8) | data[i + 1] as u32;
        sum += word;
        i += 2;
    }

    if len % 2 == 1 {
        sum += (data[len - 1] as u32) << 8;
    }

    sum = (sum >> 16) + (sum & 0xFFFF);
    sum += sum >> 16;

    !sum as u16
}

fn create_icmp_packet(ttl: u32, payload: &'static [u8]) -> Vec<u8> {
    const ICMP_ECHO_REQUEST: u8 = 8;
    const PACKET_SIZE: usize = 64;

    let mut packet = vec![0u8; PACKET_SIZE];

    packet[0] = ICMP_ECHO_REQUEST;
    packet[1] = 0;

    let id = std::process::id() as u16;
    packet[4..6].copy_from_slice(&id.to_be_bytes());
    packet[6..8].copy_from_slice(&(ttl as u16).to_be_bytes());
    packet[8..8 + payload.len()].copy_from_slice(payload);

    let checksum = calculate_checksum(&packet);
    packet[2..4].copy_from_slice(&checksum.to_be_bytes());

    packet
}
