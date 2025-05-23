import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Handle, Position } from "@xyflow/react";

export function PcNode({
  data,
  isConnectable,
}: {
  data: {
    title: string;
    subtitle: string;
    type?: "host" | "timeout" | "final-host";
  };
  isConnectable: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-background rounded-md p-4 border border-border flex gap-2 items-center",
        data.type === "timeout" && "border-red-500",
        data.type === "final-host" && "border-green-500",
        data.type === "final-host" && "bg-green-50/80"
      )}
    >
      <Icon
        icon={data.type === "timeout" ? "tabler:server-off" : "tabler:server"}
        className={cn(
          "w-9 h-9",
          data.type === "timeout" && "text-red-400",
          data.type === "final-host" && "text-green-400"
        )}
      />
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="flex flex-col">
        <h6 className={cn("text-md font-medium", data.type === "final-host" && "text-green-500")}>
          {data.title}
        </h6>
        <p className="text-xs text-muted-foreground">{data.subtitle}</p>
      </div>
      <Handle type="target" position={Position.Bottom} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} id="a" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Left} id="b" isConnectable={isConnectable} />
    </div>
  );
}
