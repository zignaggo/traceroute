import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { useEffect } from "react";
import { useXTerm } from "react-xtermjs";
export type XTerminalRef = {
  term: Terminal;
  clear: () => void;
  write: (line: string) => void;
};

type XTerminalProps = {
  lines: string[];
};
export const XTerminal = ({ lines }: XTerminalProps) => {
  const { instance, ref } = useXTerm();

  const renderLines = (lines: string[]) => {
    instance?.clear();
    for (const line of lines) {
      instance?.writeln(line);
    }
  };
  useEffect(() => {
    renderLines(lines);
  }, [ref, instance, lines]);

  return <div ref={ref as any} style={{ height: "100%", width: "100%" }} />;
};
