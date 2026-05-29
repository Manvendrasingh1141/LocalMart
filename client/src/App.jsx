import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useGeolocation } from './hooks/useGeolocation';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import SearchPage from './pages/public/SearchPage';
import ShopDetail from './pages/public/ShopDetail';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import ConsumerHome from './pages/consumer/ConsumerHome';
import VendorDashboard from './pages/vendor/VendorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// Layout
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  useGeolocation(); // Init geolocation on app load

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <Toaster position="top-right" />
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Consumer Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['consumer']} />}>
              <Route path="/consumer/dashboard" element={<ConsumerHome />} />
              <Route path="/consumer/home" element={<ConsumerHome />} />
              <Route path="/consumer/bookmarks" element={<ConsumerHome />} />
              <Route path="/consumer/profile" element={<ConsumerHome />} />
            </Route>

            {/* Vendor Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['vendor']} />}>
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
              <Route path="/vendor/shop" element={<VendorDashboard />} />
              <Route path="/vendor/products" element={<VendorDashboard />} />
              <Route path="/vendor/analytics" element={<VendorDashboard />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/vendors" element={<AdminDashboard />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
