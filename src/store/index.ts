import { signal } from "@preact/signals-react";

export const host = signal<string>("");
export const tab = signal<string>("graph");

export type TraceHopResult = {
  ttl: number;
  addr: string;
  duration_ms: number;
  reached_destination: boolean;
  error: string | null;
};

export type TraceConfig = {
  target: string;
  ip: string;
  max_hops: number;
  timeout_secs: number;
};

export const traceStatus = signal<"idle" | "running" | "complete" | "error">("idle");
export const traceError = signal<string | null>(null);
export const traceConfig = signal<TraceConfig | null>(null);
export const traceHops = signal<TraceHopResult[]>([]);
export const traceComplete = signal<boolean>(false);
