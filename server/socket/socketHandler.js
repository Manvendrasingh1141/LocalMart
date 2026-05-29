module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join shop room to receive stock updates for that specific shop
    socket.on('join_shop', (shopId) => {
      socket.join(shopId);
      console.log(`Socket ${socket.id} joined shop: ${shopId}`);
    });

    socket.on('leave_shop', (shopId) => {
      socket.leave(shopId);
      console.log(`Socket ${socket.id} left shop: ${shopId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
