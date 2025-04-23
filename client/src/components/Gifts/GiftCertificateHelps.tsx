import { Box, Typography, Grid, Paper, Button } from '@mui/material';

const items = [
  { emoji: '🧘‍♀️', text: 'Знайти внутрішній спокій та знизити тривожність' },
  { emoji: '🚀', text: 'Повернути мотивацію та почати діяти' },
  { emoji: '💖', text: 'Навчитись приймати себе без осуду' },
  { emoji: '🤝', text: 'Покращити відносини та встановити здорові межі' },
  { emoji: '💪', text: 'Бути стійким у змінах та протистояти стресу' },
  { emoji: '🎯', text: 'Усвідомити свої бажання і не жити «чужим життям»' }
];

export const CertificateHelps = () => {
  return (
    <Box component="section" sx={{ py: 10, px: 2, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" color="#AC98D1" mb={6}>
        Чим може допомогти подарунковий сертифікат?
      </Typography>

      <Grid container spacing={3} columns={2} justifyContent="center">
        {items.map((item, index) => (
          <Grid key={index}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: '#F5F1FA',
                borderRadius: 2,
                px: 3,
                py: 2.5,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                height: '100%',
              }}
            >
              <Typography fontSize={26}>{item.emoji}</Typography>
              <Typography textAlign="left" variant="body1" fontWeight={500}>
                {item.text}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={6}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#AC98D1',
            px: 5,
            py: 1.5,
            borderRadius: '24px',
            fontWeight: 'bold',
            fontSize: '1rem',
            '&:hover': { backgroundColor: '#9678C1' },
          }}
        >
          Обрати сертифікат
        </Button>
      </Box>
    </Box>
  );
};
