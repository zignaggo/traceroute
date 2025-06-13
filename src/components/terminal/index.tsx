import { events, time } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";
import { XTerminal } from "./x-terminal";

import { formatEventLine } from "@/utils";
export const Terminal = () => {
  useSignals();
  const lines = events.value.map((e) => formatEventLine(e.payload));
  return (
      <XTerminal key={time.value} lines={lines} />
  );
};
