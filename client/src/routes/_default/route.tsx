import { Header } from '@components/shared/Header';
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_default')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
