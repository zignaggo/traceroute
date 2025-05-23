import { events, time } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";
import { useRef } from "react";
import { XTerminal, XTerminalRef } from "./x-terminal";

import { formatEventLine } from "@/utils";
export const Terminal = () => {
  useSignals();
  const ref = useRef<XTerminalRef>(null);
  const lines = events.value.map((e) => formatEventLine(e.payload));
  return <XTerminal key={time.value} ref={ref} lines={lines} />;
};
