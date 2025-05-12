import { BottomBar } from '@components/shared/BottomBar';
import { Sidebar } from '@components/shared/Sidebar';
import { StyledMobileAuthenticatedPageWrapper } from '@components/styled/base';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, search }) => {
    const { isAuth } = context.stores.authStore;

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
  component: AuthLayout,
});

const MobileLayout = () => (
  <StyledMobileAuthenticatedPageWrapper >
    <Box component="main" sx={{ p: 3 }}>
      <Outlet />
    </Box>
    <BottomBar />
  </StyledMobileAuthenticatedPageWrapper>
);

const DesktopLayout = () => (
  <Box sx={{ display: 'flex', height: '100%' }}>
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Outlet />
    </Box>
  </Box>
)

function AuthLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return isDesktop ? <DesktopLayout /> : <MobileLayout />
}
