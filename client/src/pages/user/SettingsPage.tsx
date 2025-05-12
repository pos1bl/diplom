import { Box } from '@mui/material'
import { SettingsAccordions } from '@components/user/Settings/SettingsAccordions'
import { StyledTitle } from '@components/styled/base'

export const SettingsPage = () => (
  <Box sx={{ maxWidth: 600, mx: 'auto', py: 4 }}>
    <StyledTitle  sx={{ mb: 4, color: 'text.primary', whiteSpace: 'normal', wordBreak: 'break-word' }}>
      Налаштування
    </StyledTitle>
    <SettingsAccordions />
  </Box>
)
