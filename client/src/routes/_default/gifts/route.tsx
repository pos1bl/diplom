import { createFileRoute } from '@tanstack/react-router'
import { GiftsPage } from '@pages/GiftsPage'

export const Route = createFileRoute('/_default/gifts')({
  component: GiftsPage,
})
