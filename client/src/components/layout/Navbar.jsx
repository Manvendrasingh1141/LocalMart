import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-surface/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50">
      <div className="max-w-[85rem] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left section: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-headline-md text-headline-md font-bold text-primary">
                LocalMart
              </span>
            </Link>
          </div>

          {/* Middle section: Search & Links */}
          <div className="hidden md:flex flex-1 max-w-lg mx-12">
            <div className="relative flex items-center w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant p-1">
              <div className="flex-grow flex items-center px-4">
                <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
                <input
                  type="text"
                  className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md placeholder:text-outline-variant outline-none"
                  placeholder="Search for local shops, groceries, and more..."
                />
              </div>
            </div>
          </div>

          {/* Right section: Auth & Actions */}
          <div className="flex items-center space-x-6">
            <Link to="/search" className="hidden md:flex items-center gap-1 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[20px]">explore</span>
              Discover
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4 border-l border-outline-variant pl-6">
                <Link
                  to={`/${user?.role || 'consumer'}/dashboard`}
                  className="flex items-center gap-2 font-label-md text-label-md text-on-surface hover:text-primary transition-colors"
                >
                  <div className="bg-surface-container-high p-1.5 rounded-full">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  </div>
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-on-surface-variant hover:text-error transition-colors p-2 flex items-center"
                  title="Log out"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-primary hover:bg-primary/90 text-white font-label-md text-label-md px-5 py-2.5 rounded-xl shadow-md transition-colors"
                >
                  Sign up free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
