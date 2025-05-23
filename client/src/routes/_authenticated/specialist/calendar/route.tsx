import { SESSION_STATUSES } from '@models/ISession';
import { CalendarPage } from '@pages/specialist/CalendarPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/specialist/calendar')({
  component: CalendarPage,
  loader: async ({ context, location }) => {
    const { sessionStore, authStore } = context.stores;
    const { search } = location;

    await sessionStore.fetchSessions(authStore.user.role, {...search, status: [SESSION_STATUSES.COMPLETED, SESSION_STATUSES.SCHEDULED] });
  },
})
