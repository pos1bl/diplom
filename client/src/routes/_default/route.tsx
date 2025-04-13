import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_default"!</div>
}
