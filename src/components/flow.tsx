import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export function Flow() {
  return (
    <section className="flex flex-1 p-4 h-full">
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </section>
  );
}
