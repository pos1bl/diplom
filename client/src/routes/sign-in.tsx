import { createFileRoute, redirect } from '@tanstack/react-router';
import { DEFAULT_PAGE } from '@utils/DrawerNavigationList';
import { Role } from '../models/IUser';

import { z } from 'zod';
import LoginForm from '@components/shared/LoginForm';
import { LoginPage } from '@components/styled/login';

export const Route = createFileRoute('/sign-in')({
  beforeLoad: async ({ context: { authContext }, search }) => {
    const { isAuth, user } = authContext.store;
    if (isAuth) {
      const redirectPath = search.redirect ||
          (user?.role === Role.SPECIALIST
            ? DEFAULT_PAGE.SPECIALIST
            : DEFAULT_PAGE.USER)

      throw redirect({
        to: redirectPath,
        search: { ...search, redirect: undefined },
      });
    }
  },
  component: SignIn,
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  })
});

function SignIn() {
  return (
    <LoginPage>
      <LoginForm />
    </LoginPage>
  );
}

// function SignIn() {
//   return (
//     <LoginPage>
//       <Logo width="200" />
//       <SignInForm />
//     </LoginPage>
//   );
// }
