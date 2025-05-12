import { Box } from '@mui/material'
import { SettingsAccordions } from '@components/user/Settings/SettingsAccordions'
import { StyledTitle } from '@components/styled/base'

export const SettingsPage = () => (
  <Box sx={{ maxWidth: 600, mx: 'auto', py: 4 }}>
    <StyledTitle sx={{ mb: 4, color: '#AC98D1', whiteSpace: 'normal', wordBreak: 'break-word', textAlign: "center" }}>
      Налаштування
    </StyledTitle>
    <SettingsAccordions />
  </Box>
)
