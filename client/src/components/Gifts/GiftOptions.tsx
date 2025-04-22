import { ContainedButton } from '@components/shared/ContainedButton';
import { StyledSubtitle } from '@components/styled/base';
import { StyledOptions } from '@components/styled/gifts';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { getPrice, GIFT_OPTIONS } from '@utils/Giftspage';
import { FC, Ref } from 'react';

type Props = {
  ref: Ref<HTMLDivElement>
}

export const Options: FC<Props> = ({ ref }) => (
  <StyledOptions ref={ref}>
    <StyledSubtitle color="#AC98D1">
      Оберіть формат подарунка
    </StyledSubtitle>

    <Grid container spacing={4} justifyContent="center">
      {GIFT_OPTIONS.map((option) => (
        <Grid key={option.id}>
          <Card
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center',
              borderRadius: '16px',
              px: 2,
              pt: 3,
              maxWidth: '330px'
            }}
          >
            <CardContent>
            <Typography variant="h1" fontWeight="bold" color="#AC98D1">
                {option.amount}
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="#AC98D1" gutterBottom>
                {option.title}
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                {getPrice(option.amount, option.discount)} грн
              </Typography>
              <Typography variant="body1" color="text.primary" gutterBottom>
                {option.subtitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.description}
              </Typography>
            </CardContent>
            <Box px={2} pb={3}>
              <ContainedButton
                fullWidth
                sx={{ fontWeight: 'bold' }}
              >
                Подарувати
              </ContainedButton>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </StyledOptions>
)
