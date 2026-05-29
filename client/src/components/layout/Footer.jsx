import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant pt-16 pb-8 mt-auto">
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-headline-md text-headline-md text-primary">LocalMart</span>
            </Link>
            <p className="text-on-surface-variant font-body-md text-sm mb-6 leading-relaxed">
              Empowering local businesses and connecting communities through hyper-local discovery.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-label-md">
                Twitter
              </a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-label-md">
                Instagram
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-label-md text-on-surface mb-4 uppercase tracking-wider">For Customers</h3>
            <ul className="space-y-3">
              <li><Link to="/search" className="text-on-surface-variant hover:text-primary font-label-sm transition-colors">Find Shops</Link></li>
              <li><Link to="/categories" className="text-on-surface-variant hover:text-primary font-label-sm transition-colors">Browse Categories</Link></li>
              <li><Link to="/login" className="text-on-surface-variant hover:text-primary font-label-sm transition-colors">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-label-md text-on-surface mb-4 uppercase tracking-wider">For Vendors</h3>
            <ul className="space-y-3">
              <li><Link to="/register?role=vendor" className="text-on-surface-variant hover:text-primary font-label-sm transition-colors">Register Shop</Link></li>
              <li><Link to="/pricing" className="text-on-surface-variant hover:text-primary font-label-sm transition-colors">Pricing</Link></li>
              <li><Link to="/vendor-resources" className="text-on-surface-variant hover:text-primary font-label-sm transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-label-md text-on-surface mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-on-surface-variant hover:text-primary font-label-sm transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="text-on-surface-variant hover:text-primary font-label-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-on-surface-variant hover:text-primary font-label-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-outline-variant pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant font-label-sm">
            © {new Date().getFullYear()} LocalMart. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-label-sm text-on-surface-variant">
            <span>Made with</span>
            <span className="text-primary material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
            <span>for local businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
