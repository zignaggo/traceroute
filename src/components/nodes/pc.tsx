import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Handle, Position } from "@xyflow/react";

export function PcNode({
  data,
}: {
  data: {
    title: string;
    subtitle: string;
    type?: "host" | "timeout" | "final-host" | "initial-host";
  };
  isConnectable: boolean;
}) {
  return (
      <div
        className={cn(
          "bg-background rounded-md p-4 border border-border flex gap-2 items-center z-50",
          data.type === "timeout" && "border-red-500",
          data.type === "final-host" && "border-green-500",
          data.type === "initial-host" && " border-blue-500"
        )}
      >
        <Icon
          icon={data.type === "timeout" ? "tabler:server-off" : "tabler:server"}
          className={cn(
            "w-9 h-9 text-muted-foreground",
            data.type === "timeout" && "text-red-500",
            data.type === "final-host" && "text-green-500",
            data.type === "initial-host" && "text-blue-500"
          )}
        />
        <Handle type="target" position={Position.Top} isConnectable={false} />
        <div className="flex flex-col">
          <h6
            className={cn(
              "text-md font-medium text-foreground",
              data.type === "final-host" && "text-green-500",
              data.type === "initial-host" && "text-blue-500",
              data.type === "timeout" && "text-red-400"
            )}
          >
            {data.title}
          </h6>
          <p className="text-xs text-muted-foreground">{data.subtitle}</p>
        </div>
        {/* <Handle type="target" position={Position.Bottom} isConnectable={false} /> */}
        <Handle type="source" position={Position.Right} id="a" isConnectable={false} />
        {/* <Handle type="source" position={Position.Left} id="b" isConnectable={false} /> */}
      </div>
  );
}
