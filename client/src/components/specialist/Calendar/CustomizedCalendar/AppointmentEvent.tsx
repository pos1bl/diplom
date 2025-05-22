import { ISession } from "@models/ISession";
import { Box, Typography } from "@mui/material";
import { EVENT_STATUS_COLOR } from "@utils/specialist/Calendar";

export const AppointmentEvent = ({ appointment }: { appointment: ISession }) => {
  const { user, isMoved, status, type, notes } = appointment;
  const background = EVENT_STATUS_COLOR[status];
  const userName = typeof user === 'string' ? 'Користувач' : user.name;

  return (
    <Box
      bgcolor={background}
      p={1}
      height="100%"
      color="#000"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h5">{userName}</Typography>
        </Box>
        <Box>
          <Typography fontSize="body1">{type}</Typography>
          {isMoved && <Typography fontSize="body1">Перенесений</Typography> }
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="body2">{notes}</Typography>
      </Box>
    </Box>
  );
}