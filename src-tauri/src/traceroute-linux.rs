pub mod traceroute {
    use icmp;
    use std::net::ToSocketAddrs;
    use std::{
        io,
        net::IpAddr,
        time::{Duration, Instant},
    };
    #[derive(Debug)]
    struct Cfg {
        ipv4_adr: IpAddr,
    }
    const MAX_HOPS: u32 = 15;
    const TIMEOUT: Duration = Duration::from_secs(3);

    pub fn trace(value: String) {
        let ip_addr: IpAddr = match parse_cfg(value) {
            Err(e) => {
                println!("{}", e);
                std::process::exit(1);
            }
            Ok(v) => v.ipv4_adr,
        };

        let mut socket: icmp::IcmpSocket = match icmp::IcmpSocket::connect(ip_addr) {
            Ok(s) => {
                println!("ICMP Socket created!");
                s
            }
            Err(e) => {
                println!("Error creating ICMP socket: {}", e);
                println!("Note: You might need to run this program with sudo privileges.");
                return;
            }
        };

        socket.set_read_timeout(Some(TIMEOUT)).unwrap_or_else(|e| {
            println!("Warning: Failed to set read timeout: {}", e);
        });

        socket.set_ttl(1).unwrap_or_else(|e| {
            println!("Warning: Failed to set initial TTL: {}", e);
        });

        println!("Starting traceroute to {} ({})", hostname, ip_addr);
        println!(
            "Using max {} hops and {} timeout",
            MAX_HOPS,
            TIMEOUT.as_secs()
        );

        for ttl in 1..=MAX_HOPS {
            if let Err(e) = socket.set_ttl(ttl) {
                println!("{:2} * (error setting TTL: {})", ttl, e);
                continue;
            }

            const ICMP_ECHO_REQUEST: u8 = 8;
            const PACKET_SIZE: usize = 64;

            let mut packet = vec![0u8; PACKET_SIZE];

            packet[0] = ICMP_ECHO_REQUEST; // Type field: 8 for Echo Request
            packet[1] = 0; // Code field: 0 for Echo Request

            let id = std::process::id() as u16;
            packet[4..6].copy_from_slice(&id.to_be_bytes());
            packet[6..8].copy_from_slice(&(ttl as u16).to_be_bytes());

            let payload: &'static [u8; 10] = b"traceroute";
            packet[8..8 + payload.len()].copy_from_slice(payload);

            let checksum = calculate_checksum(&packet);
            packet[2..4].copy_from_slice(&checksum.to_be_bytes());

            let start: Instant = Instant::now();

            if let Err(e) = socket.send(&packet) {
                println!("{:2} * (error sending packet: {})", ttl, e);
                continue;
            }

            if let Err(e) = socket.set_read_timeout(Some(TIMEOUT)) {
                println!("{:2} * (error setting timeout: {})", ttl, e);
            }

            let mut reply_buf = vec![0u8; 1500];
            match socket.recv_from(&mut reply_buf) {
                Ok((n, source_addr)) => {
                    let duration: Duration = start.elapsed();

                    if n >= 20 {
                        let source_ip = source_addr.to_string();
                        let icmp_type = reply_buf[20];
                        match icmp_type {
                            11 => {
                                println!("{:2}  {:15}  {:?}", ttl, source_ip, duration);
                            }
                            0 => {
                                println!(
                                    "{:2}  {:15}  {:?} (Destination reached)",
                                    ttl, source_ip, duration
                                );
                                return;
                            }
                            _ => {
                                println!(
                                    "{:2}  {:15}  {:?} (type {})",
                                    ttl, source_ip, duration, icmp_type
                                );
                            }
                        }
                    } else {
                        println!(
                            "{:2}  {:15}  {:?} (Invalid packet size: {})",
                            ttl, source_addr, duration, n
                        );
                    }
                }
                Err(e) => match e.kind() {
                    io::ErrorKind::WouldBlock | io::ErrorKind::TimedOut => {
                        println!("{:2}  *  *  * ", ttl);
                    }
                    _ => {
                        println!("{:2}  *  Error receiving: {}", ttl, e);
                    }
                },
            }
        }
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

    fn parse_cfg(prm_str: String) -> Result<Cfg, String> {
        let prms: Vec<&str> = prm_str.split(',').collect();
        if prms.is_empty() {
            return Err("No parameters provided".to_string());
        }

        let hostname = prms[0];

        let host_with_port = if hostname.contains(':') {
            hostname.to_string()
        } else {
            format!("{}:0", hostname)
        };

        match host_with_port.to_socket_addrs() {
            Ok(mut addrs) => {
                if let Some(addr) = addrs.next() {
                    let ipv4_adr = addr.ip();
                    println!("IP address resolved: {}", ipv4_adr);
                    Ok(Cfg { ipv4_adr })
                } else {
                    Err("Could not resolve hostname to an IP address".to_string())
                }
            }
            Err(e) => Err(format!("Error resolving hostname: {}", e)),
        }
    }
}
