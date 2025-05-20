import { WelcomeBanner } from '@components/shared/WelcomeBanner';
import { Box } from '@mui/material';

export const HomePage = () => {
  return (
    <Box>
      <Box mb={4}>
        <WelcomeBanner />
      </Box>
    </Box>
  )
};
