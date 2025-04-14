import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/')({
  beforeLoad: async () => {
    throw redirect({ to: '/homepage' });
  }
})


