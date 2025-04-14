import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/homepage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_default/homepage"!</div>
}
