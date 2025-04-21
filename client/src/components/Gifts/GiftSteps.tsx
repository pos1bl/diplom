import { Box, Typography, Grid, Stack, useMediaQuery, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const steps = [
  {
    image: '/icons/step1.svg',
    text: 'Оберіть для близької людини номінал сертифіката та оплатіть його.'
  },
  {
    image: '/icons/step2.svg',
    text: 'Сертифікат з подарунковим кодом надійде вам на емейл.'
  },
  {
    image: '/icons/step3.svg',
    text: 'Отримувач сертифіката обере фахівця на нашій платформі.'
  },
  {
    image: '/icons/step4.svg',
    text: 'Під час придбання сеансу, отримувачу потрібно буде ввести код з сертифіката.'
  }
];

export const Steps = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="section" sx={{ py: 8, px: 2, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" color="#007D9C" mb={6}>
        Як воно працює?
      </Typography>

      {isMobile ? (
        <Stack spacing={6}>
          {steps.map((step, index) => (
            <Box key={index}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: '#EAF7FA',
                  mx: 'auto',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img src={step.image} alt={`Крок ${index + 1}`} width={60} height={60} />
              </Box>
              <Typography variant="body1" sx={{ maxWidth: 300, mx: 'auto' }}>{step.text}</Typography>
            </Box>
          ))}
        </Stack>
      ) : (
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ position: 'relative' }}>
              <Box>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: '#EAF7FA',
                    mx: 'auto',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img src={step.image} alt={`Крок ${index + 1}`} width={70} height={70} />
                </Box>
                <Typography variant="body1" sx={{ maxWidth: 250, mx: 'auto' }}>{step.text}</Typography>
              </Box>
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1
                  }}
                >
                  <img src="/icons/arrow-right.svg" alt="arrow" width={40} height={40} />
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={6}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#00A0C1',
            px: 5,
            py: 1.5,
            borderRadius: '24px',
            fontWeight: 'bold',
            fontSize: '1rem',
            '&:hover': { backgroundColor: '#007D9C' }
          }}
        >
          Обрати сертифікат
        </Button>
      </Box>
    </Box>
  );
};
