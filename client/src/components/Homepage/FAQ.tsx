import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StyledSubtitle } from '@components/styled/homepage';
import { StyledSection } from '@components/styled/base';
import { FAQ_ITEMS } from '@utils/Homepage';

export const FAQ = () => {
  return (
    <StyledSection>
      <Container maxWidth="md">
        <StyledSubtitle sx={{ mb: '20px' }}>Поширені запитання</StyledSubtitle>

        <Box>
          {FAQ_ITEMS.map(({ id, question, answer }) => (
            <Accordion key={id} sx={{ mb: 2, borderRadius: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </StyledSection>
  );
};
