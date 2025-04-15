import { styled } from '@mui/material';
import { Link } from '@tanstack/react-router';

export const StyledActionBar = styled('div')({
  gap: '10px',
  width: '100%',
  display: 'flex',
  padding: '5px 10px',
  alignItems: 'center',
  borderRadius: '20px',
  backgroundColor: '#fff',
  justifyContent: 'center'
});

export const StyledHeaderLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(2),
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
}));

export const StyledSmallHeaderLink = styled(StyledHeaderLink)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const StyledBigHeaderLink = styled(StyledHeaderLink)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const StyledPageWrapper = styled('div')({
  maxWidth: '1600px',
  margin: '0 auto',
  padding: '24px 0 80px',
});
