import { host, traceStatus, traceHops, traceError, traceConfig } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";

export function Terminal() {
  useSignals();

  return (
    <section className="flex flex-col flex-1 p-4 font-mono overflow-auto bg-black text-white">
      <div className="mb-4">
        {traceStatus.value === "idle" && (
          <div className="text-gray-400">
            Enter a hostname or IP and press Enter to start a traceroute.
          </div>
        )}
        
        {traceStatus.value === "running" && (
          <div className="text-green-400">
            Traceroute to {host.value} in progress...
          </div>
        )}
        
        {traceStatus.value === "error" && (
          <div className="text-red-400">
            Error: {traceError.value}
          </div>
        )}
        
        {traceConfig.value && (
          <div className="text-blue-400 mb-2">
            Traceroute to {traceConfig.value.target} ({traceConfig.value.ip})
            <br />
            Max hops: {traceConfig.value.max_hops}, Timeout: {traceConfig.value.timeout_secs}s
          </div>
        )}
      </div>
      
      {traceHops.value.length > 0 && (
        <div className="flex flex-col">
          <div className="grid grid-cols-12 mb-1 text-gray-400">
            <div className="col-span-1">TTL</div>
            <div className="col-span-7">Address</div>
            <div className="col-span-4">RTT</div>
          </div>
          {traceHops.value.map((hop) => (
            <div key={hop.ttl} className="grid grid-cols-12 hover:bg-gray-900">
              <div className="col-span-1">{hop.ttl}</div>
              <div className="col-span-7">
                {hop.addr === "*" ? "*" : hop.addr}
                {hop.reached_destination && " (destination reached)"}
              </div>
              <div className="col-span-4">
                {hop.duration_ms === 0 ? "*" : `${hop.duration_ms.toFixed(2)} ms`}
                {hop.error && <span className="text-red-400"> ({hop.error})</span>}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {traceStatus.value === "complete" && (
        <div className="mt-4 text-green-400">
          Traceroute complete.
        </div>
      )}
    </section>
  );
}
