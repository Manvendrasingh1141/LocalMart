import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const MOCK_SHOP = {
  id: 1,
  name: 'Golden Grain Bakery',
  category: 'Bakery',
  rating: 4.5,
  reviews: 128,
  distance: '1.2 km away',
  address: '42 Artisan Lane, Westside District',
  phone: '+1 (555) 012-3456',
  hours: '8 AM - 8 PM (Tue - Sun)',
  website: 'www.goldengrain.com',
  open: true,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK4lzNVC2DQmiPKru_SfuueaOq-QzImokn0ttWflfyvIojtRPLMkVQvqpM939XdQE3qOyGo3Ab5xlAZ5ecEMrN_zG0jQnyIdlHpAXSWVRIXdXFhiofU2-QHWl6PUIU4mqAfQNXGY1r-mvrJwzcYUd3iYi5MdCE63pJqVfj7Laf_C6tnnmKL9Nm-a-zeyKSuhWEkTWm4sXjLpYjk6lnj1gxlGDF6QK34qdT7jsjjggYr8SVDZJ8PNkNHZedMdwiniR1ZSD_dRzCJFk',
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0pKX7f5lfSgWo88MJaxsoOQLZJyrv-H66Ifox-X_Ae_CfOie82fxC3IzbwU9CnvyO6zh86t-a-pGUYs7I_i50zQ7HJtEwh0VIM0s_BFqGFzMOZA97JuppL3r-qKDnUHSSBtrTrLSjUTvYQ-sChyCB9jMifn1Rx4U3OJqxz_tg6dP9Pj4f-cnfSG_4cFWmBfEmT8Pp8Ibk9uJCPasUXAgcK3kwb160B6Fqh_-i_xD7XBMTJR7Gd1Z_82Q6NAAoRPH48pPHeNR1eB4',
  products: [
    { id: 1, name: 'Sourdough Loaf', price: 5.50, originalPrice: 6.50, unit: 'piece', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8JZNTE8pdZzk16x7-CftzKYSsbn5aqgnrHoT9M1c_-7MQ7EBX6bUvao5vGsuwxf_glFdX5hNiSwbVxybun6X_ZDB4Fw-N_NmCxMtPFntXjpRL9r0OLdKAlX5BXoPzu9MSkl2seK36ALPEqVW-LzEcZJ7s6doRtQQ9BKXpULLvamhra4hVxDTPbQ81rLuewYLpVh_rKwXJG7zffSubGr5EjDQzh8B3jNSC-opIlBULvNBVRTR_CFmWi8llVZZm0ON2kW1B5pOE-3Y', inStock: true, updated: '5m ago' },
    { id: 2, name: 'Butter Croissant', price: 3.25, unit: 'piece', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnmTxrQSNs61qq3ypRc1o_zGjjim4UfvNIvJJIj_C9SjLPdStt0VqKuSPcGN_NGpqYvM10y82DVjChfd-qEUmKJc_ynOcMcrKNqiP4eMT4E0OCTc0KPCffucWJVrCgxQME9mHVBsLOIdt6AJWPD8KgM-GxStJrTnWC8yC9ogEe-1YcsIk04lEGjG9T9PcYZE9aUgCevtlquoF5hzuh8pDjn7eY_IuCpCaPKY5tte5zcbSgw6kQFJ1nyYT6y_VgOjEKUW0iRZLw4GU', inStock: true, updated: '12m ago' },
    { id: 3, name: 'Chocolate Truffle Slice', price: 7.00, unit: 'slice', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF69vU_2dZFQHepsy3T-E2J8WIpq-kx3PaHSJfLokGjegftClfWz92sSHDvWs5qcoOh8bM0KzXF8ow8AbrWe12NOSAV7ohKUNqHHqK1vOho-v87ip14cMwklZQ_zWj0-2Akb1sDlb1dKkHwheRI2bWrh-GCJ9jXR6gzbQsKRWtP0qzO4CA7cciMbbQhRG-olEdEeWmwriWrfPTb2-hihxuGzfu7vsPqiYCzRyVD9jTOnwCzPriqtdd3Ds7tuAHkXpYbYmARrwHPPE', inStock: true, updated: '1h ago' },
    { id: 4, name: 'Signature Latte', price: 4.50, unit: '12 oz Cup', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkxsGArDd_Fvv4g_IJBcXIkyBcR2sx8KfZ4F5TKbtVqdt5dGD2OaXCxgc38hlNZEK055fLkOGP3Josmv4hh_Q95nsJ7WCw8CwkniDZz805pl5QgOAIKxD_jMeZVyMdf1KYLxXy9ZfOdR2c3HsdQkeua5iMTrVY4XYsJiWEfa5bn8teTKV8K2CLywsvzA7AHBxPHyMDFxtjLG1YPWUCOvMP_7xsAr8GHcrcWIWNdGcnqfuF0TaQYXO-sxWocQQD9azx0m9V_FYiZ44', inStock: true, updated: '2m ago' },
  ]
};

const ShopDetail = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('Products');
  const shop = MOCK_SHOP;

  const filteredProducts = shop.products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <main className="flex-grow pb-24">
        {/* Hero Section */}
        <section className="relative w-full h-[320px] overflow-hidden">
          <img className="w-full h-full object-cover" src={shop.image} alt={shop.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full px-margin-mobile md:px-margin-desktop pb-gutter flex items-end gap-gutter">
            <div className="hidden sm:block w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg -mb-8">
              <img className="w-full h-full object-cover" src={shop.logo} alt={`${shop.name} Logo`} />
            </div>
            
            <div className="flex-grow mb-base">
              <div className="flex items-center gap-base">
                <h1 className="font-headline-lg text-headline-lg text-white">{shop.name}</h1>
                <span className={`${shop.open ? 'bg-green-500' : 'bg-red-500'} text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full`}>
                  {shop.open ? 'Open Now' : 'Closed'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-1 text-white/90">
                <span className="font-label-md text-label-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">bakery_dining</span> {shop.category}
                </span>
                <span className="font-label-md text-label-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-400 text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span> {shop.rating} ({shop.reviews} reviews)
                </span>
                <span className="font-label-md text-label-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">distance</span> {shop.distance}
                </span>
              </div>
            </div>
            
            <div className="mb-base">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all ${isLiked ? 'bg-primary-container text-white' : ''}`}
              >
                <span className="material-symbols-outlined" style={{fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0"}}>bookmark</span>
              </button>
            </div>
          </div>
        </section>

        {/* Info Bar */}
        <section className="mt-12 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
          <div className="bg-white border border-outline-variant rounded-2xl p-gutter flex flex-col md:flex-row justify-between items-center gap-gutter shadow-sm">
            <div className="flex flex-wrap gap-gutter flex-grow">
              <div className="flex items-center gap-base">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Address</p>
                  <p className="font-label-md text-label-md text-on-surface">{shop.address}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-base">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Business Hours</p>
                  <p className="font-label-md text-label-md text-on-surface">{shop.hours}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-base">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Phone</p>
                  <p className="font-label-md text-label-md text-on-surface">{shop.phone}</p>
                </div>
              </div>
            </div>
            
            <button className="bg-primary-container text-on-primary text-label-md font-bold px-8 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">directions</span>
              Get Directions
            </button>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="mt-gutter px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto border-b border-outline-variant">
          <div className="flex gap-gutter">
            {['Products', 'About', 'Reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 transition-all ${activeTab === tab ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        {activeTab === 'Products' && (
          <section className="px-margin-mobile md:px-margin-desktop py-gutter max-w-max-width mx-auto animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-gutter mb-gutter">
              <div className="relative w-full md:w-96">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">search</span>
                <input 
                  className="w-full bg-white border border-outline-variant rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="Search products in this shop" 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-base overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <button className="bg-primary-container text-white px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap">All</button>
                <button className="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-4 py-2 rounded-full font-label-md text-label-md transition-all border border-outline-variant/30 whitespace-nowrap">Bread</button>
                <button className="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-4 py-2 rounded-full font-label-md text-label-md transition-all border border-outline-variant/30 whitespace-nowrap">Pastries</button>
                <button className="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-4 py-2 rounded-full font-label-md text-label-md transition-all border border-outline-variant/30 whitespace-nowrap">Cakes</button>
                <button className="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-4 py-2 rounded-full font-label-md text-label-md transition-all border border-outline-variant/30 whitespace-nowrap">Coffee</button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white border border-outline-variant rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col shadow-[0_4px_12px_rgba(255,107,53,0.05)]">
                  <div className="relative h-48 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.image} alt={product.name} />
                    {product.inStock ? (
                      <div className="absolute top-3 left-3 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">In Stock</div>
                    ) : (
                      <div className="absolute top-3 left-3 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Out of Stock</div>
                    )}
                  </div>
                  
                  <div className="p-gutter flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-headline-md text-on-surface text-[18px]">{product.name}</h3>
                      <button disabled={!product.inStock} className="text-primary hover:scale-110 transition-all disabled:opacity-50">
                        <span className="material-symbols-outlined">add_circle</span>
                      </button>
                    </div>
                    <p className="text-on-surface-variant text-label-sm mb-4">Per {product.unit}</p>
                    
                    <div className="mt-auto flex items-end gap-2">
                      <span className="text-primary font-bold text-headline-md">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-on-surface-variant line-through text-label-sm mb-1">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <p className="text-[10px] text-on-secondary-container mt-4 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">update</span> Last updated {product.updated}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FAB for Cart */}
      <div className="fixed bottom-gutter right-gutter bg-primary-container text-on-primary shadow-2xl rounded-full px-6 py-4 flex items-center gap-base cursor-pointer hover:scale-105 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>shopping_cart</span>
        <span className="font-bold text-label-md">View Cart (2)</span>
      </div>
    </div>
  );
};

export default ShopDetail;
