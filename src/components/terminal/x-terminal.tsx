import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";

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
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const isInitialized = useRef(false);
  const term = useMemo(() => {
    return new Terminal({
      cursorBlink: true,
      fontFamily: '"Courier New", Courier, monospace',
      cols: 80,
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      term,
      clear: () => term.clear(),
      write: (line: string) => term.writeln(line),
    }),
    [term]
  );

  const renderLines = useCallback(() => {
    term.clear();
    for (const line of lines) {
      term.writeln(line);
    }
  }, [lines, term]);

  useEffect(() => {
    if (!terminalRef.current) return;
    
    term.open(terminalRef.current);
    isInitialized.current = true;
    
    renderLines();
    
    return () => {
      term.dispose();
    };
  }, [term, renderLines]);

  useEffect(() => {
    if (isInitialized.current && term && terminalRef.current) {
      renderLines();
    }
  }, [renderLines]);

  return <div ref={terminalRef} />;
});
