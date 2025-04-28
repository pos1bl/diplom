import { StyledSection } from "./base";
import { Box, styled } from '@mui/material';

export const StyledHero = styled(StyledSection)({
  backgroundColor: '#C0B0E9',
  borderRadius: '20px',
  gap: '40px',
  flexDirection: 'row',
  padding: '40px'
});

export const StyledHeroInfoBlock = styled(Box)({
  maxWidth: '900px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  padding: '80px 40px',
  borderRadius: '20px',
  backgroundColor: '#fff'
});

export const StyledHeroImageBox = styled(Box)({
  width: '600px',
  overflow: 'hidden'
});
