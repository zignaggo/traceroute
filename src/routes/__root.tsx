import { Header } from "@/components/header";
import { Listener } from "@/components/listener";
import { Sidebar } from "@/components/sidebar";
import { Titlebar } from "@/components/titlebar";
import "@/index.css";
import { cn } from "@/lib/utils";
import { theme } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";
import { createRootRoute, Outlet } from "@tanstack/react-router";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useSignals();
  return (
    <main className={cn("h-screen bg-secondary flex flex-col transition-colors duration-400", theme.value === "dark" && "dark")}>
      <Titlebar />
      <div className="flex flex-1 ">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-auto">
          <Header />
          <Outlet />
        </div>
      </div>
      <Listener />
    </main>
  );
}
