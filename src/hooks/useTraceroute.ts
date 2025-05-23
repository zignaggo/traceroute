import { EventType, TracerouteEvent } from "@/@types/event";
import { events, isGettingEvents, time } from "@/store";
import { invoke } from "@tauri-apps/api/core";
// import { useEffect } from "react";

type UseTracerouteProps = {
  callbacks?: Record<EventType | "start:traceroute", (event?: TracerouteEvent) => void>;
};

export function useTraceroute(_?: UseTracerouteProps) {
  const startTraceroute = async (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    try {
      events.value = [];
      time.value = Date.now();
      isGettingEvents.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      await invoke("trace", { value: trimmedValue });
    } catch (error) {
      console.error("Failed to start traceroute:", error);
    } finally {
      isGettingEvents.value = false;
    }
  };

  return { startTraceroute };
}
