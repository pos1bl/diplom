import React from 'react'
import { Box, Typography, Card, CardContent, Avatar, Button } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { ISession } from '@models/ISession'

interface Props {
  session: ISession
}

export const NextSessionSection: React.FC<Props> = ({ session }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" gutterBottom>
      Найближчий сеанс:
    </Typography>
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={session.specialist?.avatarUrl}
          sx={{ width: 56, height: 56, mr: 2 }}
        >
          {session.user?.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">
            {session.user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(session.scheduledAt).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          variant="contained"
          component={Link}
          to={`/profile/sessions/${session._id}`}
        >
          Деталі сеансу
        </Button>
      </Box>
    </Card>
  </Box>
)
