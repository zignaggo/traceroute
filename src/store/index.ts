import { TracerouteEvent } from "@/@types/event";
import { signal } from "@preact/signals-react";

export const host = signal<string>("");
export const tab = signal<string>("graph");
export const isGettingEvents = signal<boolean>(false);
export const events = signal<TracerouteEvent[]>([]);
export const time = signal<number>(0);
