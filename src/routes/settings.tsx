import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="flex flex-1 flex-col gap-2 p-4 bg-background">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground">
        Here you can configure the settings for the app.
      </p>
    </section>
  );
}
