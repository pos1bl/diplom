import { useContext, useEffect } from 'react'
import './App.css'
import { Context } from './main'
import { observer } from 'mobx-react-lite'
import { useQueryClient } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import router from '@utils/Route'
import { ToastContainer } from 'react-toastify';

import './assets/styles/index.scss';
import { ThemeProvider } from '@mui/material'
import { theme } from '@utils/Theme'
function App() {
  const queryClient = useQueryClient();
  const authContext = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authContext.store.checkAuth();
    }
  }, []);

  if (authContext.store.isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <RouterProvider
        router={router}
        context={{ authContext, queryClient }}
      />
    </ThemeProvider>
    
  );
}

export default observer(App);
