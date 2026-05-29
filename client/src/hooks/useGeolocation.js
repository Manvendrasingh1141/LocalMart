import { useState, useEffect } from 'react';
import { useLocationStore } from '../store/locationStore';

export const useGeolocation = () => {
  const [error, setError] = useState(null);
  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords.latitude, position.coords.longitude, 'Current Location');
      },
      (err) => {
        setError(err.message);
      }
    );
  }, [setLocation]);

  return { error };
};
