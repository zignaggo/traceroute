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
  | "traceroute-hop"
  | "traceroute-destination-reached"
  | "traceroute-error"
  | "traceroute-timeout";

type BasePayload = {
  id: number;
};

type ErrorPayload = BasePayload & {
  type: "traceroute-error";
  error: string;
};

type PacketPayload = BasePayload & {
  type: "traceroute-hop" | "traceroute-destination-reached";
  hop: number;
  ip: string;
  duration: number;
};

type TimeoutPayload = BasePayload & {
  type: "traceroute-timeout";
  hop: number;
};

export type PayloadType = ErrorPayload | TimeoutPayload | PacketPayload;

export type TracerouteEvent = {
  type: EventType;
  payload: PayloadType;
};
