import { HomePage } from '@pages/admin/HomePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/')({
  component: HomePage,
})
