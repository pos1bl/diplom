import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/appointments/$appointmentId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/user/appointments/$appointmentId"!</div>
}
