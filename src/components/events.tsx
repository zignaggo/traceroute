import { events } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";

export function Events() {
  useSignals();
  return (
    <section className="flex flex-1 flex-col gap-2">
      {events.value.map((event) => {
        return <div key={event.type}>{event.type}</div>;
      })}
    </section>
  );
}
