import { NextSessionSection } from '@components/user/Homepage/NextSessionSection';
import { PromoSections } from '@components/user/Homepage/PromoSections';
import { RepeatBookingSection } from '@components/user/Homepage/RepeatBookingSection';
import { WelcomeBanner } from '@components/shared/WelcomeBanner';
import { useSessionStore } from '@hooks/useStore';
import { Box } from '@mui/material';
import { getSessionsOverview } from '@utils/user/Homepage';

export const HomePage = () => {
  const { sessions } = useSessionStore();

  const { nextSession, lastPastSession } = getSessionsOverview(sessions);

  return (
    <Box>
      <Box mb={4}>
        <WelcomeBanner />
      </Box>

      {nextSession && (
        <Box mb={4}>
          <NextSessionSection session={nextSession} />
        </Box>
      )}

      {lastPastSession && (
        <Box mb={4}>
          <RepeatBookingSection pastSession={lastPastSession} />
        </Box>
      )}

      <PromoSections />
    </Box>
  );
};
