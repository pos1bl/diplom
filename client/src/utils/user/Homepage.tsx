import PaidIcon from '@mui/icons-material/Paid'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import { SESSION_STATUSES, ISession } from '@models/ISession'

export const getVictimOptions = (isVictim: boolean) => {
   const statusText = isVictim ? 'Безкоштовний акаунт' : 'Звичайний акаунт';
   const StatusIcon = isVictim ? VolunteerActivismIcon : PaidIcon
  
  return {
    StatusIcon,
    statusText,
  }
};

interface SessionsOverview {
  nextSession: ISession | null
  lastPastSession: ISession | null
}

const getNextSession = (sessions: ISession[]): ISession | null => {
  const now = new Date().getTime()
  let next: ISession | null = null

  for (const s of sessions) {
    const t = new Date(s.scheduledAt).getTime()
    if (s.status === SESSION_STATUSES.SCHEDULED && t >= now) {
      if (next === null || t < new Date(next.scheduledAt).getTime()) {
        next = s
      }
    }
  }

  return next
}

const getLastPastSession = (sessions: ISession[]): ISession | null => {
  const now = new Date().getTime()
  let last: ISession | null = null

  for (const s of sessions) {
    const t = new Date(s.scheduledAt).getTime()
    if (
      [SESSION_STATUSES.COMPLETED, SESSION_STATUSES.CANCELLED, SESSION_STATUSES.NO_SHOW].includes(s.status) &&
      t < now
    ) {
      if (last === null || t > new Date(last.scheduledAt).getTime()) {
        last = s
      }
    }
  }

  return last
}

export const getSessionsOverview = (sessions: ISession[]): SessionsOverview => ({
  nextSession: getNextSession(sessions),
  lastPastSession: getLastPastSession(sessions),
})
