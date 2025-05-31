import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { getThemeColors } from "../../utils";

export type XTerminalRef = {
  term: Terminal;
  clear: () => void;
};

export const XTerminal = forwardRef<
  XTerminalRef,
  {
    lines: string[];
  }
>(({ lines }, ref) => {
  const terminalRef = useRef(null);
  const [{ term, addonFit }] = useState(() => {
    const { foreground, background, border } = getThemeColors();
    const term = new Terminal({
      cursorBlink: true,
      fontFamily: '"Courier New", Courier, monospace',
      cols: 80,
      theme: {
        background,
        foreground,
        cursor: foreground,
        selectionBackground: border,
        cursorAccent: foreground,
      },
    });
    const addonFit = new FitAddon();
    term.loadAddon(addonFit);
    return { term, addonFit };
  });

  useImperativeHandle(
    ref,
    () => ({
      term,
      clear: () => term.clear(),
    }),
    [term]
  );

  useEffect(() => {
    if (!terminalRef.current) return;
    term.open(terminalRef.current);
    window.addEventListener("resize", addonFit.fit);
    return () => {
      window.removeEventListener("resize", addonFit.fit);
    };
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;
    term.open(terminalRef.current);
    term.clear();
    lines.forEach((line) => {
      term.writeln(line);
    });
  }, [lines]);

  return <div ref={terminalRef} className="flex-1 p-4 h-[calc(100vh-100px)]" />;
});
