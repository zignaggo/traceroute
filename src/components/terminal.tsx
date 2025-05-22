import { host } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";
export function Terminal() {
  useSignals();
  return <section className="flex flex-1 p-4">Terminal: {host.value}</section>;
}
