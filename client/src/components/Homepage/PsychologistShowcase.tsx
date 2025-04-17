import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import { StyledButton } from '@components/styled/base';
import { StyledSection, StyledSubtitle } from '@components/styled/homepage';
import { Link } from '@tanstack/react-router';

const psychologists = [
  {
    name: 'Олена Іваненко',
    specialization: 'Когнітивно-поведінкова терапія',
    experience: '7 років досвіду',
    avatar: '/images/psychologists/ivanenko.png',
  },
  {
    name: 'Максим Руденко',
    specialization: 'Травматерапія, EMDR',
    experience: '10 років досвіду',
    avatar: '/images/psychologists/rudenko.png',
  },
  {
    name: 'Наталія Шевченко',
    specialization: 'Психоаналітичний підхід',
    experience: '5 років досвіду',
    avatar: '/images/psychologists/shevchenko.png',
  },
];

export const PsychologistShowcase = () => {
  return (
    <StyledSection>
      <StyledSubtitle sx={{ mb: '20px' }}>Наші психологи</StyledSubtitle>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Ми ретельно перевіряємо кожного фахівця. Всі психологи мають освіту, досвід та дотримуються етичного кодексу.
      </Typography>

      <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
        }}
      >
        {psychologists.map((psych, idx) => (
            <Card
              key={idx}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                minWidth: '260px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 3,
                textAlign: 'center',
                flexGrow: 1,
                boxShadow: 3,
                '&:hover': {
                  transform: 'scale(1.01)',
                  boxShadow: 6
                },
              }}
            >
              <Avatar
                src={psych.avatar}
                alt={psych.name}
                sx={{ width: 100, height: 100, mb: 2,  }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{psych.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {psych.specialization}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {psych.experience}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </Box>

      <Box mt={5} display="flex" justifyContent="center">
        <Link>
          <StyledButton
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, borderRadius: 8, textTransform: 'none' }}
          >
            Переглянути всіх
          </StyledButton>
        </Link>
      </Box>
    </StyledSection>
  );
};
