import { create } from 'zustand';

export const useLocationStore = create((set) => ({
  lat: null,
  lng: null,
  city: '',
  radius: 5, // default 5km
  setLocation: (lat, lng, city) => set({ lat, lng, city }),
  setRadius: (radius) => set({ radius }),
}));
