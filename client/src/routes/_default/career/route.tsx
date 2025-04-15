import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/career')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_default/career"!</div>
}
