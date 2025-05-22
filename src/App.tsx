import { Graph } from "@/components/graph";
import { Header } from "@/components/header";
import { Terminal } from "@/components/terminal";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useSignals } from "@preact/signals-react/runtime";
import { Listener } from "./components/listener";
import "./index.css";

function App() {
  useSignals();
  return (
    <main className="h-screen bg-secondary flex flex-col">
      <Listener />
      <Tabs defaultValue="graph" className="flex w-full">
        <Header />
        <TabsContent value="graph">
          <Graph />
        </TabsContent>
        <TabsContent value="terminal">
          <Terminal />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default App;
