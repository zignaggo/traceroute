import { Input } from "@/components/ui/input";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { host, traceStatus } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";
import { invoke } from "@tauri-apps/api/core";

export function Header() {
  useSignals();
  const startTraceroute = async (value: string) => {
    if (!host.value.trim()) return;
    traceStatus.value = "running";
    
    try {
      await invoke("trace", { value });
    } catch (error) {
      console.error("Failed to start traceroute:", error);
      traceStatus.value = "error";
    }
  };
  
  return (
    <header className="flex w-full bg-background p-4 gap-2 items-center justify-center">
      <Input
        className="w-full"
        variant="rounded"
        placeholder="Write a host name or IP: facebook.com"
        prependIcon="tabler:search"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            startTraceroute(host.value);
          }
        }}
        value={host.value}
        onChange={(e) => host.value=e.target.value}
      />
      <TabsList className="grid w-[300px] grid-cols-2">
        <TabsTrigger value="graph">Graph</TabsTrigger>
        <TabsTrigger value="terminal">Terminal</TabsTrigger>
      </TabsList>
    </header>
  );
}
