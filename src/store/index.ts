import { EventType, TracerouteEvent } from "@/@types/event";
import { computed, signal } from "@preact/signals-react";
import { Edge, Node } from "@xyflow/react";

export const host = signal<string>("");
export const isGettingEvents = signal<boolean>(false);
export const events = signal<TracerouteEvent[]>([]);
export const time = signal<number>(0);

export const nodeEvents = computed(() => {
  const nodeTypes: EventType[] = [
    "traceroute-timeout",
    "traceroute-destination-reached",
    "traceroute-hop",
  ];
  return events.value.filter((event) => nodeTypes.includes(event.payload.type));
});

export const nodeList = computed<Node[]>(() => {
  return nodeEvents.value.flatMap((event, index) => {
    const position = { x: index * 320, y: index * 80 };
    if (event.payload.type === "traceroute-timeout") {
      return {
        id: event.payload.hop.toString(),
        data: { title: "Timeout", subtitle: "Timeout", type: "timeout" },
        position,
        type: "pcNode",
      };
    }
    if (event.payload.type === "traceroute-destination-reached") {
      return {
        id: event.payload.hop.toString(),
        data: {
          title: event.payload.ip,
          subtitle: `${(event.payload.duration / 1000 / 1000).toFixed(2)}ms`,
          type: "final-host",
        },
        position,
        type: "pcNode",
      };
    }
    if (event.payload.type === "traceroute-hop") {
      return {
        id: event.payload.hop.toString(),
        data: {
          title: event.payload.ip,
          subtitle: `${(event.payload.duration / 1000 / 1000).toFixed(2)}ms`,
          type: index === 0 ? "initial-host" : "host",
        },
        position,
        type: "pcNode",
      };
    }
    return [];
  });
});
export const edges = computed<Edge[]>(() => {
  const list: Edge[] = [];
  for (let i = 0; i < nodeList.value.length; i++) {
    const node = nodeList.value[i];
    const nextNode = nodeList.value[i + 1];
    if (!nextNode) continue;
    list.push({
      id: `${node.id}-${nextNode.id}`,
      source: node.id,
      target: nextNode.id,
      animated: true,
      type: "packet",
    });
  }
  return list;
});
