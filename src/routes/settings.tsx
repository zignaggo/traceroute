import { ThemeType } from "@/@types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { hops, theme, timeout } from "@/store/settings";
import { useSignals } from "@preact/signals-react/runtime";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  useSignals();
  const handleThemeChange = (value: ThemeType) => {
    theme.value = value;
  };
  return (
    <section className="flex flex-1 flex-col gap-2 p-4 bg-background">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground">
        Here you can configure the settings for the app.
      </p>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-foreground">Theme</h2>
        <p className="text-sm text-muted-foreground">Choose the theme for the app.</p>
        <Select value={theme.value} onValueChange={handleThemeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-foreground">Hops</h2>
        <p className="text-sm text-muted-foreground">Choose the number of hops to display.</p>
        <Input
          className="max-w-20"
          type="number"
          placeholder="ex: 15"
          value={hops.value}
          onChange={(e) => {
            hops.value = Number(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-foreground">Timeout</h2>
        <p className="text-sm text-muted-foreground">Choose the timeout for the traceroute.</p>
        <Input
          className="max-w-20"
          type="number"
          placeholder="ex: 1000"
          value={timeout.value}
          onChange={(e) => {
            timeout.value = Number(e.target.value);
          }}
        />
      </div>
    </section>
  );
}
