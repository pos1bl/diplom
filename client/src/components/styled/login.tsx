import { styled } from '@mui/material';

export const LoginPage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100dvh',
  width: '100vw',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  gap: '20px',
  backdropFilter: 'blur(10px)',
  boxSizing: 'border-box'
});

export const SigninForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
});
