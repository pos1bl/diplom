// components/FreeHelpSection.tsx
import { StyledButton } from '@components/styled/base';
import { StyledSection, StyledSubtitle } from '@components/styled/homepage';
import { Container, Typography, Paper } from '@mui/material';

export const FreeHelp = () => {
  return (
    <StyledSection>
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            borderRadius: 4,
            textAlign: 'center',
          }}
        >
          <StyledSubtitle>
            Безкоштовна допомога для військових та постраждалих від війни
          </StyledSubtitle>

          <Typography variant="body1" color="text.secondary">
            Ми дбаємо про тих, хто постраждав внаслідок війни. Платформа надає безкоштовну психологічну допомогу для військових, ветеранів, переселенців та всіх, хто пережив травматичні події.
            Звернення конфіденційне, підбір фахівця — швидкий і турботливий.
          </Typography>

          <StyledButton
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 8, px: 4, textTransform: 'none', width: 'fit-content', mx: 'auto' }}
          >
            Отримати безкоштовну підтримку
          </StyledButton>
        </Paper>
      </Container>
    </StyledSection>
  );
};
