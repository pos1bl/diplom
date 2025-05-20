import { VideoPage } from '@pages/user/VideoPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/user/video-call/$appointmentId',
)({
  component: VideoPage,
})
