import { Accordion, AccordionSummary, styled } from '@mui/material';

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  '&:before': { display: 'none' },
  '&.Mui-expanded': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: "#AC98D1",
  color: "#fff",
  mb: 1,
  borderRadius: 2,
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
});
