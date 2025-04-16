import { Box, Button, styled } from '@mui/material';

export const StyledMain = styled('main')({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "80px"
});

export const StyledSection = styled('section')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const StyledHero = styled(StyledSection)({
  gap: '40px',
});

export const StyledAbout = styled(StyledSection)({
  flexDirection: 'column',
  gap: '20px',
});

export const StyledHowItWorks = styled(StyledSection)({
  flexDirection: 'column',
  gap: '40px',
});

export const StyledHeroInfoBlock = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});

export const StyledTitle = styled('h1')({
  fontSize: '48px',
  color: '#AC98D1'
});

export const StyledSubtitle = styled('h2')({
  fontSize: '40px',
  color: '#AC98D1'
});

export const StyledHeroButton = styled(Button)({
  backgroundColor: '#AC98D1',
});

export const StyledImageBox = styled(Box)({
  width: '450px',
  height: '550px',
  borderRadius: '5%',
  overflow: 'hidden'
});
