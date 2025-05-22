import { host } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";

export function Graph() {
  useSignals();
  return <section className="flex flex-1 p-4">Graph: {host.value}</section>;
}
