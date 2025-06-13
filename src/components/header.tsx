import { Input } from "@/components/ui/input";
import { useTraceroute } from "@/hooks/useTraceroute";
import { cn } from "@/lib/utils";
import { host, isGettingEvents } from "@/store";
import { hops, timeout } from "@/store/settings";
import { useSignals } from "@preact/signals-react/runtime";
import { Iconify } from "./iconify";
export function Header() {
  useSignals();
  const { startTraceroute } = useTraceroute();
  const disabled = isGettingEvents.value;
  return (
    <header className="flex w-full bg-background p-2 gap-2 items-center justify-center relative">
      <Input
        className="w-full"
        variant="rounded"
        placeholder="Write a host name or IP: facebook.com"
        prependIcon={
          <Iconify
            name={disabled ? "tabler:loader-2" : "tabler:search"}
            className={cn("h-4 w-4 text-muted-foreground", disabled && "animate-spin ")}
          />
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            e.preventDefault();
            startTraceroute({
              host: host.value,
              timeout: timeout.value,
              hops: hops.value,
            });
          }
        }}
        disabled={disabled}
        value={host.value}
        onChange={(e) => (host.value = e.target.value)}
      />
      {disabled && (
        <div
          className={cn(
            "absolute right-4 top-4 w-6 h-6 border-[3px] border-secondary border-t-primary rounded-full animate-spin"
          )}
        />
      )}
    </header>
  );
}
