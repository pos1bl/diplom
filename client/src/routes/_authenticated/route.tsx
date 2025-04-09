import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, search }) => {
    const { isAuth } = context.authContext.store;
    if (!isAuth) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.pathname,
          ...search
        }
      });
    }
  },
  component: AuthLayout
});

function AuthLayout() {
  return (
    <h1>Prikol</h1>
  );
}
