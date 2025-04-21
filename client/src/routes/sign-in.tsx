import { createFileRoute, redirect } from '@tanstack/react-router';
import { DEFAULT_PAGE } from '@utils/NavigationList';
import { Role } from '@models/IUser';

import { z } from 'zod';
import { AuthPage } from '@pages/AuthPage';

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
  component: AuthPage,
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  })
});
