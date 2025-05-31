import { Maximize, Minimize, Minus, X } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Button } from "./ui/button";
import { isMaximized } from "@/store";
import { useSignals } from "@preact/signals-react/runtime";

export function Titlebar() {
  useSignals();
  const window = getCurrentWindow();
  const handleMinimize = () => {
    window.minimize();
  };
  const handleMaximize = () => {
    window.toggleMaximize().then(() => {
      isMaximized.value = !isMaximized.value;
    });
  };
  const handleClose = () => {
    window.close();
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      e.detail === 2 ? window.toggleMaximize() : window.startDragging();
    }
  };

  return (
    <div
      id="titlebar"
      onMouseDown={handleMouseDown}
      className="titlebar bg-background flex items-center  gap-2 h-8"
    >
      <div className="flex flex-1 items-center justify-start gap-2 px-6">
        <span className="text-lg font-medium text-foreground">Traceroute</span>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 h-8">
        <div className="titlebar-button" id="titlebar-minimize" onClick={handleMinimize}>
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-none">
            <Minus size={20} />
          </Button>
        </div>
        <div className="titlebar-button" id="titlebar-maximize" onClick={handleMaximize}>
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-none">
            {!isMaximized.value ? <Maximize size={20} /> : <Minimize size={20} />}
          </Button>
        </div>
        <div className="titlebar-button" id="titlebar-close" onClick={handleClose}>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:!bg-red-400 hover:text-white rounded-none"
          >
            <X size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
