import { Flow } from "@/components/flow";
import { Header } from "@/components/header";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Events } from "./components/events";
import { Listener } from "./components/listener";
import { Terminal } from "./components/terminal";
import "./index.css";
import { Titlebar } from "./components/titlebar";
import { cn } from "./lib/utils";
import { theme } from "./store";

function App() {
  return (
    <main className={cn("h-screen bg-secondary flex flex-col", theme.value === "dark" && "dark")}>
      <Titlebar />
      <Listener />
      <Tabs defaultValue="flow" className="flex w-full flex-1 gap-0 overflow-auto">
        <Header />
        <TabsContent value="flow" className="flex-1 overflow-auto">
          <Flow />
        </TabsContent>
        <TabsContent value="terminal" className="flex-1 overflow-auto bg-background">
          <Terminal />
        </TabsContent>
        <TabsContent value="events" className="flex-1 overflow-auto">
          <Events />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default App;
