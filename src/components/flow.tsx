import { edges, nodeList } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { PcNode } from "./nodes/pc";

const nodeTypes = {
  pcNode: PcNode,
};

export function Flow() {
  useSignals();
  return (
    <section className="flex flex-1 p-4 h-full">
      <ReactFlow
        nodes={nodeList.value}
        nodeTypes={nodeTypes}
        edges={edges.value}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </section>
  );
}
