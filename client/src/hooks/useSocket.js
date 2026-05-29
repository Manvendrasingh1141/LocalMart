import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (shopId, onStockUpdate) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!shopId) return;

    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

    socketRef.current.emit('join_shop', shopId);

    socketRef.current.on('stock:updated', (data) => {
      if (onStockUpdate) {
        onStockUpdate(data);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('leave_shop', shopId);
        socketRef.current.disconnect();
      }
    };
  }, [shopId, onStockUpdate]);
};
