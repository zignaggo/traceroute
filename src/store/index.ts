import { EventType, TracerouteEvent } from "@/@types/event";
import { computed, signal } from "@preact/signals-react";
import { Edge, Node } from "@xyflow/react";

export const host = signal<string>("");
export const tab = signal<string>("graph");
export const isGettingEvents = signal<boolean>(false);
export const events = signal<TracerouteEvent[]>([]);
export const time = signal<number>(0);

export const nodes = computed(() => {
  const nodeTypes: EventType[] = [
    "traceroute:packet:timeout",
    "traceroute:host:reached",
    "traceroute:packet:received",
  ];
  return events.value.filter((event) => nodeTypes.includes(event.payload.type));
});

export const nodeList = computed<Node[]>(() => {
  return nodes.value.flatMap((event, index) => {
    const position = { x: index * 320, y: index * 80 };
    if (event.payload.type === "traceroute:packet:timeout") {
      return {
        id: event.payload.ttl.toString(),
        data: { title: "Timeout", subtitle: "Timeout", type: "timeout" },
        position,
        type: "pcNode",
      };
    }
    if (event.payload.type === "traceroute:host:reached") {
      return {
        id: event.payload.ttl.toString(),
        data: {
          title: event.payload.source_ip,
          subtitle: `${(event.payload.duration / 1000 / 1000).toFixed(2)}ms`,
          type: "final-host",
        },
        position,
        type: "pcNode",
      };
    }
    if (event.payload.type === "traceroute:packet:received") {
      return {
        id: event.payload.ttl.toString(),
        data: {
          title: event.payload.source_ip,
          subtitle: `${(event.payload.duration / 1000 / 1000).toFixed(2)}ms`,
          type: "host",
        },
        position,
        type: "pcNode",
      };
    }
    return [];
  });
});

export const edges = computed<Edge[]>(() => {
  const list = [];
  for (let i = 0; i < nodeList.value.length; i++) {
    const node = nodeList.value[i];
    const nextNode = nodeList.value[i + 1];
    if (!nextNode) continue;
    list.push({
      id: `${node.id}-${nextNode.id}`,
      source: node.id,
      target: nextNode.id,
      animated: true,
    });
  }
  return list;
});
