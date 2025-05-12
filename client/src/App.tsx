import { useContext, useEffect } from 'react'
import './App.css'
import { StoresContext } from './main'
import { observer } from 'mobx-react-lite'
import { useQueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import router from '@utils/Route'
import { ToastContainer } from 'react-toastify';

import './assets/styles/index.scss';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@utils/Theme'
function App() {
  const queryClient = useQueryClient();
  const stores = useContext(StoresContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      stores.authStore.checkAuth();
    }
  }, []);

  if (stores.authStore.isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <RouterProvider
        router={router}
        context={{ stores, queryClient }}
      />
    </ThemeProvider>
    
  );
}

export default observer(App);
