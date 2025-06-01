import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
export type XTerminalRef = {
  term: Terminal;
  clear: () => void;
  write: (line: string) => void;
};

export const XTerminal = forwardRef<
  XTerminalRef,
  {
    lines: string[];
  }
>(({ lines }, ref) => {
  const terminalRef = useRef(null);
  const term = useMemo(() => {
    return new Terminal({
      cursorBlink: true,
      fontFamily: '"Courier New", Courier, monospace',
      cols: 80,
    });
  }, []);
  const addonFit = useMemo(() => new FitAddon(), []);

  useImperativeHandle(
    ref,
    () => ({
      term,
      clear: () => term.clear(),
      write: (line: string) => term.writeln(line),
    }),
    [term]
  );

  useEffect(() => {
    if (!terminalRef.current) return;
    term.open(terminalRef.current);
    term.loadAddon(addonFit);
    window.addEventListener("resize", addonFit.fit);
    return () => {
      window.removeEventListener("resize", addonFit.fit);
    };
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;
    term.clear();
    lines.forEach((line) => {
      term.writeln(line);
    });
  }, [lines]);

  return <div ref={terminalRef}  />;
});
