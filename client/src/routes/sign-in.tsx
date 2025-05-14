import { createFileRoute, redirect } from '@tanstack/react-router';
import { DEFAULT_PAGES } from '@utils/NavigationList';
import { Role } from '@models/IUser';

import { z } from 'zod';
import { AuthPage } from '@pages/default/AuthPage';

export const Route = createFileRoute('/sign-in')({
  beforeLoad: async ({ context, search }) => {
    const { isAuth, user } = context.stores.authStore;
    if (isAuth) {
      const redirectPath = search.redirect ||
        (user.role === Role.SPECIALIST
          ? DEFAULT_PAGES.SPECIALIST
          : user.role === Role.ADMIN
            ? DEFAULT_PAGES.ADMIN
            : DEFAULT_PAGES.USER)

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
