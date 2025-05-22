import { Graph } from "@/components/graph";
import { Header } from "@/components/header";
import { Terminal } from "@/components/terminal";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import "./index.css";

function App() {
  return (
    <main className="h-screen bg-secondary flex flex-col">
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
