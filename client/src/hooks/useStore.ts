import { useContext } from "react";
import { StoresContext } from "../../src/main";

export const useAuthStore = () => { return useContext(StoresContext).authStore };
export const useSessionStore = () => { return useContext(StoresContext).sessionStore };
