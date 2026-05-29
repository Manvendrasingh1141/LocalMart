import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'https://server-virid-nine.vercel.app/api',
  withCredentials: true, // Send cookies for refresh token
});

// Request Interceptor: Attach access token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401 and auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL || 'https://server-virid-nine.vercel.app/api'}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        
        useAuthStore.getState().setAuth(data.user, data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
