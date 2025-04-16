// components/FreeHelpSection.tsx
import { Box, Container, Typography, Button, Paper } from '@mui/material';

export const FreeHelpSection = () => {
  return (
    <Box sx={{ backgroundColor: '#eef1f6', py: 8 }}>
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            textAlign: 'center',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Безкоштовна допомога для військових та постраждалих від війни
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Ми дбаємо про тих, хто постраждав внаслідок війни. Платформа надає безкоштовну психологічну допомогу для військових, ветеранів, переселенців та всіх, хто пережив травматичні події.
            Звернення конфіденційне, підбір фахівця — швидкий і турботливий.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 8, px: 4, textTransform: 'none' }}
          >
            Отримати безкоштовну підтримку
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
