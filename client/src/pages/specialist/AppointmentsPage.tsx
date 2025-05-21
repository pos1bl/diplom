import { AppointmentsActionBar } from "@components/specialist/Appointments/AppointmentsActionBar";
import { AppointmentsList } from "@components/specialist/Appointments/AppointmentsList";
import { PromoSections } from "@components/specialist/Clients/PromoSections";
import { Box, Breadcrumbs } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { userInfoQueryOptions } from "@utils/QueryOptioms";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const AppointmentsPage = () => {
  const { clientId } = useParams({ from: "/_authenticated/specialist/clients/$clientId/appointments" });
  const { data, isLoading } = useQuery(userInfoQueryOptions(clientId))

  if (isLoading) {
    return <div>Завантаження...</div>
  }

  return (
    <Box pb={1}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          color="inherit"
          to="/specialist/clients"
        >
          <Box display="flex" alignItems="center" sx={{ fontSize: 18 }} >
            <ChevronLeftIcon />
            Сесії з "{data?.name}"
          </Box>
        </Link>
      </Breadcrumbs>
      <PromoSections />
      <AppointmentsActionBar />
      <AppointmentsList />
    </Box>
  )
};