import { Box, styled } from "@mui/material";
import { StyledSection } from "./base";

export const StyledHero = styled(StyledSection)({
  backgroundColor: '#f9f9f9',
  borderRadius: '5%',
  gap: '40px',
  flexDirection: 'row',
  padding: '40px'
});

export const StyledHeroInfoBlock = styled(Box)({
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});

export const StyledImageBox = styled(Box)({
  width: '500px',
  height: '500px',
  borderRadius: '5%',
  overflow: 'hidden'
});
