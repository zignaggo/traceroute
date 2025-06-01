import { isMaximized } from "@/store";
import { Icon } from "@iconify/react";
import { useSignals } from "@preact/signals-react/runtime";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Maximize, Minimize, Minus, X } from "lucide-react";
import { Button } from "./ui/button";

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
    if (e.target instanceof HTMLButtonElement) {
      return;
    }
    if (e.buttons === 1) {
      e.detail === 2 ? window.toggleMaximize() : window.startDragging();
    }
  };

  return (
    <div
      id="titlebar"
      className="titlebar bg-background flex items-center gap-2 border-b border-border"
      onMouseDown={handleMouseDown}
    >
      <div className="flex flex-1 items-center justify-start gap-2 px-3">
        <Icon icon="tabler:server" className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="flex h-full items-center justify-end gap-2">
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
