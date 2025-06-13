import { useEffect, useRef } from "react";
// @ts-ignore
import Terminal from "xterminal";
type XTerminalProps = {
  lines: string[];
};
export const XTerminal = ({ lines }: XTerminalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const instance = new Terminal();
  const promptStyle =
    '<span class="font-bold text-blue-500 bg-blue-200 rounded-sm px-1">traceroute:</span> ';

  const renderLines = (lines: string[]) => {
    if (!instance) return;
    instance.clear();
    for (const line of lines) {
      instance.write(promptStyle);
      instance.writeln(line);
    }
  };
  useEffect(() => {
    if (ref.current) instance.mount(ref.current);
    instance.pause();

    return () => {
      instance.dispose();
    };
  }, [instance, ref]);

  useEffect(() => {
    renderLines(lines);
  }, [instance, lines]);

  return (
    <div
      id="terminal"
      className="text-foreground"
      ref={ref as any}
      style={{ height: "100%", width: "100%" }}
    />
  );
};
