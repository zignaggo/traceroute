import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react";
import { memo } from "react";

export function _PacketEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  animated = true,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {animated && (
        <circle r="8" className="fill-emerald-500">
          <animateMotion dur="2.5s" repeatCount="indefinite" path={edgePath} begin="1s" />
        </circle>
      )}
    </>
  );
}

export const PacketEdge = memo(_PacketEdge);
