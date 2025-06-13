import { Terminal } from '@/components/terminal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terminal')({
  component: RouteComponent,
})

function RouteComponent() {
  return <section className="flex flex-1 flex-col gap-2 px-4 bg-background">
    <Terminal />
  </section>
}
