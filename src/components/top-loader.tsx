import { isGettingEvents } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";
import { Progress } from "./ui/progress";

export function TopLoader() {
  useSignals();
  return <Progress indeterminate={isGettingEvents.value} className="w-full h-0.5 rounded-none" />;
}
