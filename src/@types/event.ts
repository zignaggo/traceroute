/**
 * Events emitted:
 * - traceroute:socket:created - When ICMP socket is successfully created
 * - traceroute:socket:error - When there's an error creating the ICMP socket
 * - traceroute:socket:started - When traceroute process starts
 * - traceroute:packet:timeout - When a packet times out (includes ttl)
 * - traceroute:packet:received - When packet is received (includes ttl, source_ip, duration)
 * - traceroute:host:reached - When destination is reached (includes ttl, source_ip, duration)
 */
export type EventType =
  | "traceroute:socket:created"
  | "traceroute:socket:error"
  | "traceroute:socket:started"
  | "traceroute:packet:timeout"
  | "traceroute:packet:received"
  | "traceroute:host:reached";

export type PayloadType = {
  ttl: number;
  source_ip: string;
  duration: number;
  id: number;
};

export type TracerouteEvent = {
  type: EventType;
  payload: PayloadType | { id: number; message: string };
};
