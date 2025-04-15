import { HomePage } from '@components/Default/Homepage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/homepage')({
  component: HomePage,
})
