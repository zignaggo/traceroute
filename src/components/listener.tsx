import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";

type EventType =
  | "traceroute:socket:created"
  | "traceroute:socket:error"
  | "traceroute:socket:started"
  | "traceroute:packet:timeout"
  | "traceroute:packet:received"
  | "traceroute:host:reached";

type PayloadType = {
  ttl: number;
  source_ip: string;
  duration: number;
};

export function Listener() {
  // Events emitted:
  // - traceroute:socket:created - When ICMP socket is successfully created
  // - traceroute:socket:error - When there's an error creating the ICMP socket
  // - traceroute:socket:started - When traceroute process starts
  // - traceroute:packet:timeout - When a packet times out (includes ttl)
  // - traceroute:packet:received (commented out) - When packet is received (includes ttl, source_ip, duration)
  // - traceroute:host:reached (commented out) - When destination is reached (includes ttl, source_ip, duration)
  useEffect(() => {
    listen("traceroute:socket:created", (event) => {
      console.log(
        `socket created (id:${event.id}, event:${event.event}, payload:${event.payload})`
      );
    });
    listen("traceroute:socket:error", (event) => {
      console.log(`socket error (id:${event.id}, event:${event.event}, payload:${event.payload})`);
    });
    listen("traceroute:socket:started", (event) => {
      console.log(
        `socket started (id:${event.id}, event:${event.event}, payload:${event.payload})`
      );
    });
    listen("traceroute:packet:timeout", (event) => {
      console.log(
        `packet timeout (id:${event.id}, event:${event.event}, payload:${event.payload})`
      );
    });
    listen<PayloadType>("traceroute:packet:received", (event) => {
      console.log(
        `packet received (id:${event.id}, event:${event.event}, payload:${event.payload?.ttl}, ${event.payload?.source_ip}, ${event.payload?.duration})`
      );
    });
    listen<PayloadType>("traceroute:host:reached", (event) => {
      console.log(
        `host reached (id:${event.id}, event:${event.event}, payload:${event.payload?.ttl}, ${event.payload?.source_ip}, ${event.payload?.duration})`
      );
    });
  }, []);
  return null;
}
