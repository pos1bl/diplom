import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@api/queryClient.ts'
import AuthStore from '@store/AuthStore.ts'
import SessionStore from '@store/SessionsStore.ts'
import App from './App.tsx'
import './index.css';

export const authStore = new AuthStore()
export const sessionStore = new SessionStore()

export interface Stores {
  authStore: AuthStore,
  sessionStore: SessionStore,
}

export const stores: Stores = { authStore, sessionStore }

export const StoresContext = createContext<Stores>(stores)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoresContext.Provider value={stores}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StoresContext.Provider>
  </StrictMode>,
)
