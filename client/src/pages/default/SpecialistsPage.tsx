import { ControlPanel } from '@components/default/Specialists/ControlPanel';
import { SpecialistMain } from '@components/default/Specialists/SpecialistMain';
import { StyledTitle } from '@components/styled/base';
import { StyledSpecialists } from '@components/styled/default/specialists';
import { Box } from '@mui/material';

export const SpecialistsPage = () => (
  <StyledSpecialists>
    <StyledTitle>
      Фахівці
    </StyledTitle>
    <Box display="flex" gap={3} sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <ControlPanel />
      <SpecialistMain />
    </Box>
  </StyledSpecialists>
);
