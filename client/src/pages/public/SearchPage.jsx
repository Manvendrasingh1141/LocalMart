import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const CATEGORIES = ['All', 'Grocery', 'Bakery', 'Pharmacy', 'Hardware', 'Clothing'];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append('q', searchTerm);
        if (activeCategory && activeCategory !== 'All') queryParams.append('category', activeCategory);
        
        const response = await api.get(`/shops/search?${queryParams.toString()}`);
        setShops(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch shops:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Add a small debounce for typing
    const delayDebounceFn = setTimeout(() => {
      fetchShops();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeCategory]);

  const filteredShops = shops;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-surface text-on-surface font-body-md animate-fade-in">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-72 bg-surface-container-lowest border-r border-outline-variant hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-outline-variant">
          <h2 className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-4">Categories</h2>
          <div className="space-y-1">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-3 py-2 font-label-md rounded-lg transition-colors flex items-center justify-between group ${
                  activeCategory === category 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                {category}
                {activeCategory === category && <span className="material-symbols-outlined text-[18px]">chevron_right</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-b border-outline-variant">
          <h2 className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-4">Distance</h2>
          <input type="range" className="w-full accent-primary" min="1" max="20" defaultValue="5" />
          <div className="flex justify-between font-label-sm text-on-surface-variant mt-3">
            <span>1 km</span>
            <span>20 km</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-background">
        {/* Top Search Bar */}
        <div className="bg-surface-container-lowest border-b border-outline-variant p-6 z-10 sticky top-0">
          <div className="max-w-4xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-on-surface-variant">search</span>
              </div>
              <input
                type="text"
                className="block w-full rounded-2xl border-0 py-3.5 pl-12 pr-4 text-on-surface shadow-sm ring-1 ring-inset ring-outline-variant placeholder:text-on-surface-variant focus:ring-2 focus:ring-inset focus:ring-primary font-body-md transition-shadow bg-surface-container-lowest outline-none"
                placeholder="Search shops, products, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Mobile Categories */}
          <div className="flex gap-2 overflow-x-auto mt-6 pb-2 md:hidden hide-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl font-label-md transition-colors border ${
                  activeCategory === category 
                    ? 'bg-primary text-on-primary border-primary' 
                    : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:bg-surface-container'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex justify-between items-baseline">
            <h1 className="font-headline-lg text-[28px] text-on-surface">Nearby Shops</h1>
            <p className="font-label-md text-on-surface-variant">{filteredShops.length} results</p>
          </div>

          {filteredShops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter animate-slide-up">
              {filteredShops.map(shop => (
                <Link to={`/shop/${shop._id}`} key={shop._id} className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col shadow-[0_4px_12px_rgba(255,107,53,0.05)]">
                  <div className="relative h-48 overflow-hidden bg-surface-container">
                    <img src={shop.banner || shop.logo || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'} alt={shop.shopName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {shop.businessHours && shop.businessHours.isOpen && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-md">Open</div>
                    )}
                  </div>
                  
                  <div className="p-gutter flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h3 className="font-headline-md text-[18px] text-on-surface line-clamp-1">{shop.shopName}</h3>
                      <div className="flex items-center gap-1 font-label-sm text-on-surface bg-primary/10 text-primary px-1.5 py-0.5 rounded-md shrink-0">
                        <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        {shop.rating?.avg?.toFixed(1) || '0.0'}
                      </div>
                    </div>
                    
                    <p className="font-body-md text-on-surface-variant text-[14px] mb-4 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">category</span>
                      {shop.category}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/30">
                      <div className="flex items-center gap-1 font-label-md text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {shop.address?.city || 'Local'}
                      </div>
                      <div className="text-[12px] text-on-surface-variant flex items-center gap-1">
                         ({shop.rating?.count || 0} reviews)
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <div className="w-16 h-16 bg-surface-container-low border border-outline-variant rounded-2xl flex items-center justify-center mb-4 text-on-surface-variant">
                <span className="material-symbols-outlined text-[32px]">storefront</span>
              </div>
              <h3 className="font-headline-md text-on-surface mb-2">No shops found</h3>
              <p className="font-body-md text-on-surface-variant max-w-sm">We couldn't find anything matching your criteria. Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
