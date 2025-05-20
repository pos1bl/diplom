import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/specialist/clients/$clientId/appointments/$appointmentId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/_authenticated/specialist/appointments/$appointmentId"!</div>
  )
}
