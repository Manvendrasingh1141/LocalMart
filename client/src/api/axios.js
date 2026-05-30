import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Determine API URL based on environment
const getApiUrl = () => {
  // If explicitly set in env, use it (for development)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For production (Vercel), use the production server
  if (import.meta.env.PROD) {
    return 'https://server-virid-nine.vercel.app/api';
  }
  
  // For local development
  return 'http://localhost:5001/api';
};

const api = axios.create({
  baseURL: getApiUrl(),
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
        const apiUrl = getApiUrl();
        const { data } = await axios.post(
          `${apiUrl}/auth/refresh`,
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
