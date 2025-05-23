import { TracerouteEvent } from "@/@types/event";

function getCssVariable(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function getThemeColors() {
  return {
    background: getCssVariable("--background"),
    foreground: getCssVariable("--foreground"),
    primary: getCssVariable("--primary"),
    secondary: getCssVariable("--secondary"),
    muted: getCssVariable("--muted"),
    accent: getCssVariable("--accent"),
    destructive: getCssVariable("--destructive"),
    border: getCssVariable("--border"),
    chart1: getCssVariable("--chart-1"),
    chart2: getCssVariable("--chart-2"),
    chart3: getCssVariable("--chart-3"),
    chart4: getCssVariable("--chart-4"),
    chart5: getCssVariable("--chart-5"),
  };
}

export const formatEventLine = (payload: TracerouteEvent["payload"]): string => {
  if ("message" in payload) {
    return payload.message;
  }

  if (!payload.source_ip) {
    return `${payload.ttl}   * * *  * * *`;
  }

  const durationMs = payload.duration / 1000 / 1000;
  return `${payload.ttl}   ${payload.source_ip}  ${durationMs}ms`;
};
