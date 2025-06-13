import { edges, nodeList } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { PacketEdge } from "./edges/packet";
import { PcNode } from "./nodes/pc";
const nodeTypes = {
  pcNode: PcNode,
};

const edgeTypes = {
  packet: PacketEdge,
};
export function Flow() {
  useSignals();
  return (
    <ReactFlow
      nodes={nodeList.value}
      nodeTypes={nodeTypes}
      edges={edges.value}
      edgeTypes={edgeTypes}
      snapGrid={[20, 20]}
      snapToGrid={true}
      fitView
      nodesDraggable={false}
      edgesFocusable={false}
      nodesFocusable={false}
      proOptions={{ hideAttribution: true }}
    >
      <MiniMap
        maskColor="var(--background)"
        bgColor="var(--secondary)"
        className="rounded-lg overflow-hidden"
        nodeColor="var(--foreground)"
        nodeStrokeColor="var(--border)"
        maskStrokeColor="var(--border)"
      />
      <Background />
      <Controls
        className="rounded-lg overflow-hidden [&>button]:!bg-background [&>button]:!text-foreground [&>button]:hover:!bg-background/50 [&>button]:!border-border [&>button]:!border "
        showInteractive={false}
      />
    </ReactFlow>
  );
}
