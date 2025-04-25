import { Box, styled } from "@mui/material";
import { StyledSection } from "./base";

export const StyledHero = styled(StyledSection)({
  gap: '40px',
  flexDirection: 'row',
});

export const StyledBackgroundSection = styled(StyledSection)({
  backgroundColor: '#F5F1FA',
  borderRadius: '15px',
  gap: '40px',
  padding: '40px',
});

export const StyledWhoWeNeed = styled(StyledSection)({
  gap: '40px',
  padding: '40px',
});

export const StyledHeroInfoBlock = styled(Box)({
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});

export const StyledImageBox = styled(Box)({
  width: '700px',
  overflow: 'hidden'
});
