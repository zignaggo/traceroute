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
    <section className="flex flex-1 p-4 h-full">
      <ReactFlow
        nodes={nodeList.value}
        nodeTypes={nodeTypes}
        edges={edges.value}
        edgeTypes={edgeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
    </section>
  );
}
