import { events } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";

export function Events() {
  useSignals();
  return (
    <section className="flex flex-1 flex-col gap-2 p-4">
      {events.value.map((event) => {
        return (
          <div
            key={event.type}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            {event.type}
          </div>
        );
      })}
    </section>
  );
}
