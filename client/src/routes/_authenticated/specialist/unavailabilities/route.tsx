import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/specialist/unavailabilities',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/specialist/unavailabilities"!</div>
}
