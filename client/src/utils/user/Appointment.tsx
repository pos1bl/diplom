import FreeCancellationIcon from '@mui/icons-material/FreeCancellation';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { SESSION_STATUSES } from "@models/ISession";

const SESSION_STATUS_OPTIONS = [
  {
    status: SESSION_STATUSES.COMPLETED,
    icon: <EventAvailableIcon sx={{ color: "#AC98D1" }} fontSize="small" />,
    label: "Завершено"
  },
  {
    status: SESSION_STATUSES.CANCELLED,
    icon: <FreeCancellationIcon sx={{ color: "#AC98D1" }} fontSize="small" />,
    label: "Скасовано"
  },
  {
    status: SESSION_STATUSES.SCHEDULED,
    icon: <EventIcon sx={{ color: "#AC98D1" }} fontSize="small" />,
    label: "Заплановано"
  },
  {
    status: SESSION_STATUSES.NO_SHOW,
    icon: <NoAccountsIcon sx={{ color: "#AC98D1" }} fontSize="small" />,
    label: "Не з'явились на сесію"
  },
]

export const getStatusIcon = (status: SESSION_STATUSES) => SESSION_STATUS_OPTIONS.find(row => row.status === status)?.icon;
export const getLabel = (status: SESSION_STATUSES) => SESSION_STATUS_OPTIONS.find(row => row.status === status)?.label;
