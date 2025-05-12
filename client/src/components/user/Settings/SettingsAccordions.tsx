import {
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SETTINGS_ACCORDIONS } from '@utils/user/Settingspage'
import { useState } from 'react';
import { StyledAccordion, StyledAccordionSummary } from '@components/styled/user/settings';

export const SettingsAccordions = () => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {SETTINGS_ACCORDIONS.map(({ id, title, component: Component }) => (
        <StyledAccordion key={id} onChange={handleChange(id)} expanded={expanded === id}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
          </StyledAccordionSummary>
          <AccordionDetails>
            <Component />
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </>
  )
}
