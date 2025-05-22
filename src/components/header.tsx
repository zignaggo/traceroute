import { Input } from "@/components/ui/input";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { host } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";

export function Header() {
  useSignals();
  return (
    <header className="flex w-full bg-background p-4 gap-2 items-center justify-center">
      <Input
        className="w-full"
        variant="rounded"
        value={host.value}
        onChange={(e) => (host.value = e.target.value)}
        placeholder="Write a host name or IP: facebook.com"
        prependIcon="tabler:search"
      />
      <TabsList className="grid w-[300px] grid-cols-2">
        <TabsTrigger value="graph">Graph</TabsTrigger>
        <TabsTrigger value="terminal">Terminal</TabsTrigger>
      </TabsList>
    </header>
  );
}
