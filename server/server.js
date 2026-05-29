const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io initialization
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

require('./socket/socketHandler')(io);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Route files
const authRoutes = require('./routes/auth.routes');
const shopRoutes = require('./routes/shop.routes');
const productRoutes = require('./routes/product.routes');
const consumerRoutes = require('./routes/consumer.routes');
const vendorRoutes = require('./routes/vendor.routes');
const adminRoutes = require('./routes/admin.routes');
const errorMiddleware = require('./middleware/error.middleware');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/consumer', consumerRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/admin', adminRoutes);

// Error handler middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
