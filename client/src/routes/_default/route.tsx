import { Header } from '@components/shared/Header';
import { StyledPageWrapper } from '@components/styled/base';
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_default')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <>
      <Header />
      <StyledPageWrapper>
        <Outlet />
      </StyledPageWrapper>
    </>
  );
}
