import { EventType, PayloadType, TracerouteEvent } from "@/@types/event";
import { events } from "@/store";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";

export function Listener() {
  const addToList = (event?: TracerouteEvent) => {
    if (!event) return;
    const exists = events.value.find((e) => e.payload.id === event.payload.id);
    if (!exists) {
      events.value = [...events.value, event];
    }
  };
  useEffect(() => {
    const eventsList: EventType[] = [
      "traceroute:socket:created",
      "traceroute:socket:error",
      "traceroute:socket:started",
      "traceroute:packet:timeout",
      "traceroute:packet:received",
      "traceroute:host:reached",
    ];
    eventsList.forEach((event) => {
      listen<PayloadType>(event, (event) => {
        addToList({
          type: event.event as EventType,
          payload: {
            ...event.payload,
            type: event.event,
          } as PayloadType,
        });
      });
    });
  }, []);
  return null;
}
