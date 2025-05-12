import { Box, Typography, Avatar, Theme, useTheme, Tooltip } from '@mui/material';
import { useAuthStore } from '@hooks/useStore';
import { getVictimOptions } from '@utils/user/Homepage';

export const WelcomeBanner = () => {
  const theme = useTheme();
  const { user } = useAuthStore();
  const { isVictim, name } = user;

  const { StatusIcon, statusText } = getVictimOptions(isVictim);

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[2], 
        borderRadius: 2,
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h4" component="h1">
          Привіт, {name}!
          <Tooltip title={statusText} arrow>
            <StatusIcon
              sx={{ 
                color: "#AC98D1",
                ml: 2,
                fontSize: '2rem',
              }}
            />
          </Tooltip>
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Раді бачити тебе на платформі!
        </Typography>
      </Box>

      <Avatar sx={{ bgcolor: "#AC98D1", width: 56, height: 56, fontSize: '1.25rem' }}>
        {name.charAt(0).toUpperCase()}
      </Avatar>
    </Box>
  );
};
