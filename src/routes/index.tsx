import { Flow } from "@/components/flow";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex flex-1 flex-col bg-secondary relative">
      <Flow />
    </section>
  );
}
