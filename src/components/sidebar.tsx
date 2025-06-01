import { Icon } from "@iconify/react";
import { Link } from "./link";

export function Sidebar() {
  return (
    <aside className="flex flex-col p-2 bg-background border-r border-border">
      <div className="flex flex-1 flex-col gap-2">
        <Link to="/">
          <Icon icon="lucide:network" className="size-4 text-muted-foreground" />
        </Link>
        <Link to="/terminal">
          <Icon icon="lucide:terminal-square" className="size-4 text-muted-foreground" />
        </Link>
      </div>
      <Link to="/settings">
        <Icon icon="lucide:settings" className="size-4 text-muted-foreground" />
      </Link>
    </aside>
  );
}
