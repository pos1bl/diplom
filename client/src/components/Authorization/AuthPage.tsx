import { Box } from "@mui/material";
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from "react";
import { StyledAuthPage, StyledTab, StyledTabs } from "@components/styled/login";
import Logo from "@components/shared/Logo";
import AuthForm from "./AuthForm";
import { FormType } from "@utils/Auth";

export const AuthPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledAuthPage>
      <Logo width="300" />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs value={value} onChange={handleChange}>
            <StyledTab label="Увійти" value={0}/>
            <StyledTab label="Зареєструватись" value={1}/>
          </StyledTabs>
        </Box>
        <TabPanel value={0}>
          <AuthForm type={FormType.LOGIN} />
        </TabPanel>
        <TabPanel value={1}>
          <AuthForm type={FormType.REIGSTER} />
        </TabPanel>
      </TabContext>
    </StyledAuthPage>
  )
};
