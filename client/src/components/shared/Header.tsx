import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { DEFAULT_PAGE, DRAWER_NAVIGATION_LIST } from "@utils/DrawerNavigationList";
import { Link } from "@tanstack/react-router";
import useStore from "@hooks/useStore";
import { checkPermission } from "../../helper/checkPermission";
import Logo from "./Logo";
import { StyledBigHeaderLink, StyledSmallHeaderLink } from "@components/styled/base";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Header = () => {
  const { isAuth, user } = useStore();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(user.name)
  console.log(isAuth)
  console.log(useStore())

  return (
    <AppBar position="static" sx={{backgroundColor: '#A891D2'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledSmallHeaderLink to={DEFAULT_PAGE.HOME_PAGE}>
            <Logo width="70" color="#fff" />
          </StyledSmallHeaderLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {DRAWER_NAVIGATION_LIST.map(({ name, navigateTo, availableRoles }) => {
                if (!availableRoles.length || isAuth && checkPermission(user.role, availableRoles)) {
                  return (
                    <MenuItem key={name} onClick={handleCloseNavMenu}>
                      <Typography sx={{ textAlign: 'center', mr: 2, padding: 0 }}>
                        <Link
                          to={navigateTo as '/'}
                          preload={false}
                        >
                          {name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  )
                }
              })}
            </Menu>
          </Box>
          <StyledBigHeaderLink to={DEFAULT_PAGE.HOME_PAGE}>
            <Logo width="70" color="#fff" />
          </StyledBigHeaderLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '20px' } }}>
            {DRAWER_NAVIGATION_LIST.map(({ name, navigateTo, availableRoles }) => {
              if (!availableRoles.length || isAuth && checkPermission(user.role, availableRoles)) {
                return (
                  <Link
                    key={name}
                    to={navigateTo as '/'}
                    preload={false}
                  >
                    <Button
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {name}
                    </Button>
                  </Link>
                )
              }
            })}
          </Box>
          {isAuth && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ border: '2px solid #fff', borderRadius: '8px', padding: '6px 16px', display: 'flex', gap: '8px' }}>
                <PersonIcon sx={{ color: 'white' }} />
                <Typography color="#fff">{user.name}</Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
          {!isAuth && <Link to={DEFAULT_PAGE.LOGIN as '/'}>
            <Button color="inherit">Login</Button>
          </Link>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}