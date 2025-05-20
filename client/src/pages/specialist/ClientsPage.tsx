import { ClientsActionBar } from "@components/specialist/Clients/ClientsActionBar";
import { ClienstList } from "@components/specialist/Clients/ClientsList";
import { PromoSections } from "@components/specialist/Clients/PromoSections";
import { Box } from "@mui/material";

export const ClientsPage = () => {
  return (
    <Box pb={1}>
      <PromoSections />
      <ClientsActionBar />
      <ClienstList />
    </Box>
  )
};