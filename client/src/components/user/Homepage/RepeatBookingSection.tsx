import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Avatar, Button } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { ISession } from '@models/ISession'

interface Props {
  pastSession: ISession
}

export const RepeatBookingSection: React.FC<Props> = ({ pastSession }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" gutterBottom>
      Записатися повторно
    </Typography>
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={pastSession.specialist?.avatarUrl}
          sx={{ width: 56, height: 56, mr: 2 }}
        >
          {pastSession.user?.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">
            {pastSession.user?.name}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          variant="contained"
          component={Link}
          to={`/specialists/${pastSession.specialistId}`}
        >
          Придбати сеанс знову
        </Button>
      </Box>
    </Card>
  </Box>
)

