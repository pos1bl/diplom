import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    throw redirect({ to: '/_default' })
  }
});

function Test() {
  return (
    <h1>Hello</h1>
  )
}
