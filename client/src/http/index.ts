import useNotifyToast from '@hooks/useNotifyToats';
import axios from 'axios';
import { AuthResponse } from '@models/response/AuthResponse';

const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});

const { showError, showInfo, showSuccess } = useNotifyToast();

const successMessageUrls = ['access', 'login'];

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  async (response) => {
    if (response.status === 200 && response.config.url && successMessageUrls.includes(response.config.url)) {
      showSuccess();
    }

    if (response.config.url === 'logout') {
      showInfo();
    }

    return response;
  },
  async (error) => {
    if (error.response && !error.response.config._retry) {
      showError(error.response?.data.message);
    }

    return Promise.reject(error);
  }
);

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_BASE_URL}/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch (e) {
      console.error('НЕ АВТОРИЗОВАНИЙ');
    }
  }

  throw error;
});

export default $api;
