import { SupportPage } from '@pages/SupportPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/support')({
  component: SupportPage,
})
