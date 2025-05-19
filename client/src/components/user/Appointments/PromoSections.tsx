import { OutlinedButton } from '@components/shared/OutlinedButton'
import { Box, Typography } from '@mui/material'
import { Link } from '@tanstack/react-router'
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StyledCard } from '@components/styled/user/appointemts';
import { useSessionStore } from '@hooks/useStore';
import { SESSION_STATUSES } from '@models/ISession';
import { observer } from 'mobx-react-lite';

export const PromoSections = observer(() => {
  const { sessions } = useSessionStore();

  const { scheduled, finished } = sessions.reduce((total, session) => {
    if (session.status === SESSION_STATUSES.SCHEDULED) {
      total.scheduled++;
    } else {
      total.finished++
    }

    return total;
  }, { scheduled: 0, finished: 0 })

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mb: 4,
      }}
    >
      <Box
        sx={{
          flex: '1 1 300px',
          p: 3,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: '#AC98D1'
        }}
      >
        <Typography color='#fff' variant="h6" gutterBottom>
          Потрібна нова сесія?
        </Typography>
        <Typography color='#fff' variant="body2" sx={{ mb: 2 }}>
          Оберіть зручний час та дату для сесії з нашим фахівцем.
        </Typography>
        <OutlinedButton sx={{ backgroundColor: "#fff" }} component={Link} to="/specialists">
          Запланувати нову сесію
        </OutlinedButton>
      </Box>

      <Box
        sx={{
          flex: '1 1 300px',
          p: 3,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          backgroundColor: '#AC98D1',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <StyledCard>
          <Box sx={{ mr: 2 }}>{<ScheduleIcon sx={{ fontSize: "36px", color: '#AC98D1' }} />}</Box>
          <Box textAlign="center">
            <Typography variant="h6">Заплановано</Typography>
            <Typography variant="h5" color="primary">{scheduled}</Typography>
          </Box>
        </StyledCard>
        <StyledCard>
          <Box sx={{ mr: 2 }}><CheckCircleIcon  sx={{ fontSize: "36px", color: '#AC98D1' }} /></Box>
          <Box textAlign="center">
            <Typography variant="h6">Пройдено</Typography>
            <Typography variant="h5" color="success">{finished}</Typography>
          </Box>
        </StyledCard>
      </Box>
    </Box>
)})
