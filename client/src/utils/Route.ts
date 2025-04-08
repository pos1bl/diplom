// import Loader from '@components/shared/Loader';
// import { NotFoundPage } from '@components/shared/NotFoundPage';
import { createRouter } from '@tanstack/react-router';

import { routeTree } from '../routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const router = createRouter({
  routeTree,
  context: { authContext: undefined!, queryClient: undefined! },
  // defaultNotFoundComponent: NotFoundPage,
  // defaultPendingComponent: Loader
});

export default router;
