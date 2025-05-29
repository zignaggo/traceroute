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
      "traceroute-hop",
      "traceroute-destination-reached",
      "traceroute-error",
      "traceroute-timeout",
    ];
    eventsList.forEach((event) => {
      listen<PayloadType>(event, (event) => {
        console.log(event.payload);
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
