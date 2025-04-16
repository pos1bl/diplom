import { HomePage } from '@components/Homepage/Homepage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/homepage')({
  component: HomePage,
})
