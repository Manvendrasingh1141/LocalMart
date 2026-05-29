import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ConsumerHome = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-[calc(100vh-64px)] pb-24 lg:pb-8">
      {/* Header / Top Bar (Page specific header, Navbar is global) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto pt-8 pb-4">
        <div className="flex flex-col mb-4 md:mb-0">
          <h2 className="font-headline-md text-headline-md font-bold text-on-background">Good morning, {user?.name || 'Priya'} 👋</h2>
          <div className="flex items-center gap-1 cursor-pointer group">
            <span className="text-label-sm font-label-sm text-secondary">Downtown, San Francisco</span>
            <span className="material-symbols-outlined text-[16px] text-primary group-hover:scale-110 transition-transform">edit</span>
          </div>
        </div>
        <div className="flex items-center gap-4 hidden md:flex">
          <div className="relative p-2 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container p-0.5">
            <img 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq2n8_7LpJKbuacz8oDkWlt8RwkajVphOJNgsccF1jSkfHi2zxoqEDvJEFt2za_Bw18pdj21A3W_t5ia3a48edVWZ9xJi435SlTpOXFBlBkNcZ4rTbMzeIK5LlM3Y9VT8fWThqTGcp2qIR6xNF6nKZFOTOR6oSIKSx9qkAWcG3IPCqmbhsE2zI8vY_MD7EYfJEOUtjUcM87-WXKZO6HM7vZghhSWRC5a_5VziHvTptT0xMXs7YmBT27UrGwkXStQpw_uW3EDFbVNo"
            />
          </div>
        </div>
      </header>

      <div className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
        {/* Search Bar */}
        <section className="mt-2 mb-10 animate-slide-up">
          <div className="relative flex items-center w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant p-2">
            <div className="hidden md:flex items-center px-4 border-r border-outline-variant cursor-pointer">
              <span className="font-label-md text-label-md text-on-surface-variant">All Categories</span>
              <span className="material-symbols-outlined text-on-surface-variant ml-1">keyboard_arrow_down</span>
            </div>
            <div className="flex-grow flex items-center px-4">
              <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
              <input 
                className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md placeholder:text-outline-variant outline-none" 
                placeholder="Search for mangoes, hardware, or bakeries..." 
                type="text"
              />
            </div>
            <Link to="/search" className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-label-md text-label-md hover:bg-primary/90 transition-all active:scale-95 text-center">
              Search
            </Link>
          </div>
        </section>

        {/* Shops Near You */}
        <section className="mb-12 animate-slide-up" style={{animationDelay: '100ms'}}>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-background">Shops Near You</h3>
              <p className="text-secondary font-body-md">Handpicked favorites in your neighborhood</p>
            </div>
            <Link to="/search" className="text-primary font-label-md flex items-center gap-1 group whitespace-nowrap">
              See all on map
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">map</span>
            </Link>
          </div>
          <div className="flex gap-gutter overflow-x-auto pb-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {/* Shop Card 1 */}
            <Link to="/shop/1" className="min-w-[280px] md:min-w-[320px] bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-lg transition-all snap-start group cursor-pointer overflow-hidden block">
              <div className="relative h-40 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8_cP_xVBbMp-usdl5wW2ylBIlmkb6ofXOqFcB8cfba51-ZBt_bDTG8N4u5Rn8fQ2tDRKlThnX9jDquOsBYkC5ReU65R_Iea4Xyb0cszLAbJkamWEAxH4xv_H2x-PtqKGq1Feiv1I2xN_X3BRKa8tMe_LJOxtmHqCUVxuG5FrpmwKBQ5RKidJngZkiZaJIBBIpVI8r9M0-EcwAtqFQOnDq6GY26MbXOkKCHLmGRTZFdYsLdo_j5ysb4yDGz5u_-8E9n6sgC6g2SeI"
                  alt="Kaveri Organics"
                />
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md p-2 rounded-full shadow-sm hover:text-primary transition-colors z-10">
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm font-bold shadow-sm">
                  4.8 ★
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-headline-md text-[18px] leading-tight text-on-background">Kaveri Organics</h4>
                  <span className="text-label-sm text-secondary font-medium">0.8 km</span>
                </div>
                <p className="text-on-surface-variant font-label-md mb-4">Groceries & Spices</p>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-primary">eco</span>
                  </span>
                  <span className="text-label-sm text-secondary">Organic Certified</span>
                </div>
              </div>
            </Link>

            {/* Shop Card 2 */}
            <Link to="/shop/2" className="min-w-[280px] md:min-w-[320px] bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-lg transition-all snap-start group cursor-pointer overflow-hidden block">
              <div className="relative h-40 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQwTOFyfJNFHeV5nQbr3IZ1KByY7fhNURC2OGm76B2RthGcP5FIJtqc9003__pfCZ-Aoco2M5e0vfF0f2SNi6D5xp6QSDd1Qe-YaoQUl61tsRBkHx8ZCetI0yF_uPmDr64Eu8QfarpiEpyrrBQl9TbhkH9DHz0-ye9IYLahDpcubxq0EOiXulQRZPZZWii3BkWM3N9N1Pkaha46R35LLLiVuisZzFvkK6rZIn1MOnC_erRKRtfF1E4J-DVKERFeU7BrozpfWLjgmM"
                  alt="The Crusty Loaf"
                />
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md p-2 rounded-full shadow-sm z-10">
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm font-bold">
                  4.5 ★
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-headline-md text-[18px] leading-tight text-on-background">The Crusty Loaf</h4>
                  <span className="text-label-sm text-secondary font-medium">1.2 km</span>
                </div>
                <p className="text-on-surface-variant font-label-md mb-4">Bakery & Desserts</p>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-primary">bakery_dining</span>
                  </span>
                  <span className="text-label-sm text-secondary">Fresh Daily</span>
                </div>
              </div>
            </Link>

            {/* Shop Card 3 */}
            <Link to="/shop/3" className="min-w-[280px] md:min-w-[320px] bg-surface-container-lowest rounded-2xl border border-outline-variant hover:shadow-lg transition-all snap-start group cursor-pointer overflow-hidden block">
              <div className="relative h-40 overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCLNzMfH1W2_YmVKKFwIXirvXWH5NUOYg5K_0YLGdoGIkRhSaA1icQoddLoHzhSk4xCRr9A6QGT2gyEnt7NYvTAncicnMRdyeHfhRmfm7VSfyZQjpXKSnKv4ZrG9FAalAqQ1qcfAs9wNBnEdelvAan_EfSp2qclzbCwyiMIu89k92W-oo-Ch_IO4Vr-rXHbUrienuJ9Uu5OlsXBfRHY35g5WG0BlHGp7zWOslfLTKhZMaJAqIF6Y_uMZPoJHWrB1QTPE-USa2KGi0"
                  alt="TechHub Gadgets"
                />
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md p-2 rounded-full shadow-sm z-10">
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-sm font-bold">
                  4.9 ★
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-headline-md text-[18px] leading-tight text-on-background">TechHub Gadgets</h4>
                  <span className="text-label-sm text-secondary font-medium">2.5 km</span>
                </div>
                <p className="text-on-surface-variant font-label-md mb-4">Electronics & Tech</p>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-primary">devices</span>
                  </span>
                  <span className="text-label-sm text-secondary">Trusted Warranty</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Browse by Category */}
        <section className="mb-12 animate-slide-up" style={{animationDelay: '200ms'}}>
          <h3 className="font-headline-md text-headline-md text-on-background mb-6">Browse by Category</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[
              { icon: 'shopping_basket', label: 'Grocery' },
              { icon: 'smartphone', label: 'Electronics' },
              { icon: 'apparel', label: 'Clothing' },
              { icon: 'handyman', label: 'Hardware' },
              { icon: 'medication', label: 'Pharmacy' },
              { icon: 'cake', label: 'Bakery' },
              { icon: 'edit_note', label: 'Stationery' },
              { icon: 'more_horiz', label: 'More' }
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                  <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Updated Shops */}
        <section className="mb-12 animate-slide-up" style={{animationDelay: '300ms'}}>
          <div className="flex items-center gap-3 mb-6">
            <h3 className="font-headline-md text-headline-md text-on-background">Recently Updated</h3>
            <span className="bg-tertiary-container/10 text-tertiary font-label-sm px-2 py-0.5 rounded-full border border-tertiary-container/20">Live Stocks</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Updated Shop Card 1 */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 flex gap-4 items-center group cursor-pointer hover:border-primary transition-all shadow-sm hover:shadow-md">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5GRGrNlcu6-m-cKvNvkuziBfMa6As-1z1ZNTkG-fi27RXcWBK5uO2aHSsIkNm6OsSKywzSu_KHA3l0Qkjrr4HG_gPtH8BJn2OUcpSTpvV3Zy_26ZMnOAXTrt4rYir7m4UPBTTnnEhODSyNJ_CPxi6z1xiZ5yHp4NIJv89fPSaqDZyFWvOHPtP9CURhf77WIN3FtWkKahSjOnQFLzHYcmalIGLQmks-c1WC3wHanX3gyU13vgdafvJqAse8thiToszZ8vw4YPwnvc"
                  alt="Hardware"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Hardware</span>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-high px-1.5 py-0.5 rounded">Updated 2h ago</span>
                </div>
                <h4 className="font-bold text-on-background mb-1">Modern Build Co.</h4>
                <p className="text-label-sm text-secondary">New drill sets in stock</p>
              </div>
            </div>

            {/* Updated Shop Card 2 */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 flex gap-4 items-center group cursor-pointer hover:border-primary transition-all shadow-sm hover:shadow-md">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnEkdqeWD18_U-MLkuu9rLAQ9mZPvBIAX2ilAOQ-PlbaIGK-3K5Okfh5eKOecGsrYmd1K8FEGnLfcriLQLakYQBAzcTaIXI66JO2UgMT4HyM77A5Ub-ddoG0HbgaKX_xtr_2tbz7NslTVJj8ds8qsoSd6tLXuZkyWk9Rw0YERu69OEW25tx2DN_qRZ4K1U55K-DCc_nGEzJHuoriVZytOkli3ci7so4gDRWH8BYu1Ywcx2opD25FxAF2I4r8_pzNlT5m99bUMY3b8"
                  alt="Fruit Mart"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Fruit Mart</span>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-high px-1.5 py-0.5 rounded">Updated 45m ago</span>
                </div>
                <h4 className="font-bold text-on-background mb-1">Fresh Pick Fruits</h4>
                <p className="text-label-sm text-secondary">Alphonso Mangoes arrived</p>
              </div>
            </div>

            {/* Updated Shop Card 3 */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 flex gap-4 items-center group cursor-pointer hover:border-primary transition-all shadow-sm hover:shadow-md">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGwj5EzLaY3fsZU_mSg-Nfu3jsUSSPbDMM2AgxoMgI4xdlBlyYtZqR8AEAMWoDwQ1qcEt57RQPbOLyJAA3e490oRWu0_a20KuhlGWYJSbY2PAUoQn1Q9eMwNoMJo6CS7YAp6myiZJT2_nHrbFEhz81f2j9rjSsjv5m_VsEUp-xq3kLGbsHLjRZ_hwlHuTYnXKlT8D6p6rD5sms8YeSIbqsDG-4sh4zsy7Fh8ESRwbZ1TwmLHt3fHBWtLCSZYZJV8mVqSSh8vmdAsI"
                  alt="Pharmacy"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Pharmacy</span>
                  <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-high px-1.5 py-0.5 rounded">Updated 5h ago</span>
                </div>
                <h4 className="font-bold text-on-background mb-1">City Care Pharma</h4>
                <p className="text-label-sm text-secondary">Wellness kits restocked</p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Bookmarks */}
        <section className="mb-20 animate-slide-up" style={{animationDelay: '400ms'}}>
          <h3 className="font-headline-md text-headline-md text-on-background mb-6">Your Bookmarks</h3>
          <div className="flex gap-gutter overflow-x-auto pb-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Bookmarked Item */}
            <div className="min-w-[200px] flex flex-col gap-3 snap-start group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5VQd7-iZHaaJr66BesB6OV13IOiNWyuQgPsSPSGnjKT0iJPRaXthu32N3IzzMccKLzLCDXje7h4u75yGo01xKywhfh-OJv4ZfXw6Me4YV3F9FoobpaBap5Qsca14LNSlSR7olrpe1WeDN5J1ub-tPRJkbEs31RdTTJWbNvlcgRbUJDb3Cj0ugCetK9iGhRvA9oJ30OwdrxTP4kpFAIT8bpjrfobcFHHUTXaDRVibQY0rviwO983vBvCnQxhzCxnBK2DwPeMYC_0U"
                  alt="Page Turners Cafe"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-2 right-2 p-1.5 bg-primary rounded-full text-on-primary shadow-lg">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                </div>
              </div>
              <div>
                <h5 className="font-bold text-on-background text-label-md">Page Turners Cafe</h5>
                <p className="text-label-sm text-secondary">Books & Coffee</p>
              </div>
            </div>

            {/* Placeholder for Empty State */}
            <div className="min-w-[300px] flex items-center justify-center border-2 border-dashed border-outline-variant rounded-2xl p-6 bg-surface-container-low/50">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-surface-container-high mx-auto flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-secondary">add</span>
                </div>
                <p className="text-label-md font-label-md text-secondary">Bookmark shops to find them faster</p>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
};

export default ConsumerHome;
