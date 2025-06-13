import { theme, toggleTheme } from "@/store/settings";
import { Icon } from "@iconify/react";
import { useSignals } from "@preact/signals-react/runtime";
import { Link } from "./link";
import { Button } from "./ui/button";
export function Sidebar() {
  useSignals();
  return (
    <aside className="flex flex-col p-2 bg-background border-r border-border gap-1">
      <div className="flex flex-1 flex-col gap-2">
        <Link to="/">
          <Icon icon="lucide:network" className="size-4 " />
        </Link>
        <Link to="/terminal">
          <Icon icon="lucide:terminal-square" className="size-4 " />
        </Link>
      </div>
      <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
        <Icon icon={theme.value === "dark" ? "lucide:sun" : "lucide:moon"} className="size-4 " />
      </Button>
      <Link to="/settings">
        <Icon icon="lucide:settings" className="size-4 " />
      </Link>
    </aside>
  );
}
