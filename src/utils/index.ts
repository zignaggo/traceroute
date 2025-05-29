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
  if (payload.type === "traceroute-timeout") {
    return `${payload.hop}   * * *  * * *`;
  }

  if (payload.type === "traceroute-hop") {
    const durationMs = payload.duration / 1000 / 1000;
    return `${payload.hop}   ${payload.ip}  ${durationMs}ms`;
  }

  if (payload.type === "traceroute-destination-reached") {
    const durationMs = payload.duration / 1000 / 1000;
    return `${payload.hop}   ${payload.ip}  ${durationMs}ms`;
  }

  return "";
};
