import { IUnavaibility } from "@models/IUnavaibility";
import { Box, Typography } from "@mui/material";

export default function BlockoutEvent({ blockout }: { blockout: IUnavaibility }) {
  const { note, type } = blockout;
  return (
    <Box
      display="flex"
      bgcolor="lightgray"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography color="gray" variant="h4" textAlign="center">
        {type}
      </Typography>
      <Typography color="gray" variant="body1">
        {note}
      </Typography>
    </Box>
  );
}