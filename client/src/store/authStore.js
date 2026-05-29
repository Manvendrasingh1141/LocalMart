import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, role: user?.role, isAuthenticated: !!user }),
      login: (user, token = 'mock-token') => set({ user, token, role: user?.role, isAuthenticated: !!user }),
      logout: () => set({ user: null, token: null, role: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
