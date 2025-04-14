import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { State } from 'src/main';

type RouterContext = {
  authContext: State;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()();

declare module '@tanstack/react-router' {
  interface Register {
    routerContext: RouterContext;
  }
}
