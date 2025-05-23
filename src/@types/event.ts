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

type BasePayload = {
  id: number;
};

type SocketPayload = BasePayload & {
  type: "traceroute:socket:error" | "traceroute:socket:created" | "traceroute:socket:started";
  message: string;
};

type TimeoutPayload = BasePayload & {
  type: "traceroute:packet:timeout";
  ttl: number;
};

type PacketPayload = BasePayload & {
  type: "traceroute:packet:received" | "traceroute:host:reached";
  ttl: number;
  source_ip: string;
  duration: number;
};

export type PayloadType = SocketPayload | TimeoutPayload | PacketPayload;

export type TracerouteEvent = {
  type: EventType;
  payload: PayloadType;
};
