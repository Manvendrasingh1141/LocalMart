import { useAuthStore } from '../../store/authStore';

const VendorDashboard = () => {
  const { user } = useAuthStore();
  
  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-surface-container-lowest">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-outline-variant bg-surface shrink-0">
        <div className="p-6 flex flex-col gap-1">
          <h1 className="font-headline-md text-headline-md font-bold text-primary-container">LocalMart</h1>
          <p className="text-on-secondary-fixed-variant font-label-md">Green Valley Market</p>
          <div className="mt-2 flex items-center gap-2 px-2 py-1 bg-primary/10 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Verified Vendor</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-container font-bold bg-primary-container/10 transition-all" href="#">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
            <span className="font-label-md">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary-container hover:bg-primary-container/5 transition-all" href="#">
            <span className="material-symbols-outlined">storefront</span>
            <span className="font-label-md">My Shop</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary-container hover:bg-primary-container/5 transition-all" href="#">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-label-md">Products</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary-container hover:bg-primary-container/5 transition-all" href="#">
            <span className="material-symbols-outlined">upload_file</span>
            <span className="font-label-md">Bulk Upload</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary-container hover:bg-primary-container/5 transition-all" href="#">
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="font-label-md">Analytics</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-x-hidden">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Vendor Dashboard</h2>
            <p className="font-body-md text-on-surface-variant">Manage your store and monitor your performance.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface-container-lowest"></span>
              </button>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-outline-variant">
              <div className="text-right hidden sm:block">
                <p className="font-label-md text-on-surface">{user?.name || 'Ramesh Kumar'}</p>
                <p className="text-[12px] text-on-surface-variant">Store Owner</p>
              </div>
              <img 
                alt="Vendor Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-container/20" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_dwik9qj6CPvuKulc1WpaCKT83cHGwkWUu7ebuCKrjDDem7mA1Mmvn-XSbLnQKBaZBCp-ak-fggUQPVkKo4EUIyihmadVu3bOqPLWzeWOrAGzRDgQ12W1jvUygQXxAwZVCnzmqeXbAF9PfskMJHOx4khoVDROy3eCFXU-rVuG890iErsSzozGlTHzqplNVE9L-6mZBS6ncSeag5GHcv8Y0Yn0ugvRRgN15VKh5kYNQ4uRgacOgKaVwF27z5lVSr027tdwabCK2zU"
              />
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="mb-8 rounded-2xl bg-gradient-to-r from-primary to-primary-container p-8 text-white shadow-lg relative overflow-hidden animate-slide-up">
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md mb-2">Welcome back, {user?.name || 'Ramesh'} 👋</h3>
            <p className="font-body-lg text-body-lg opacity-90 max-w-2xl">Your shop is <span className="font-bold underline">Live</span> and attracting customers today. You have 3 new enquiries since your last login.</p>
          </div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-10 bottom-0 opacity-20 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]" style={{fontVariationSettings: "'FILL' 1"}}>storefront</span>
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-10 animate-slide-up" style={{animationDelay: '100ms'}}>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 rounded-lg bg-primary/5 text-primary material-symbols-outlined">inventory_2</span>
              <span className="text-green-600 font-label-sm flex items-center gap-1">+2 <span className="material-symbols-outlined text-[14px]">trending_up</span></span>
            </div>
            <h4 className="text-on-surface-variant font-label-md mb-1">Total Products</h4>
            <p className="font-headline-md text-headline-md text-primary-container">124</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 rounded-lg bg-tertiary/5 text-tertiary material-symbols-outlined">visibility</span>
              <span className="text-green-600 font-label-sm flex items-center gap-1">+15% <span className="material-symbols-outlined text-[14px]">trending_up</span></span>
            </div>
            <h4 className="text-on-surface-variant font-label-md mb-1">Profile Views</h4>
            <p className="font-headline-md text-headline-md text-primary-container">1,482</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 rounded-lg bg-secondary/5 text-secondary material-symbols-outlined">bookmark</span>
              <span className="text-on-surface-variant font-label-sm flex items-center gap-1">Stable</span>
            </div>
            <h4 className="text-on-surface-variant font-label-md mb-1">Bookmarked</h4>
            <p className="font-headline-md text-headline-md text-primary-container">342</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="p-2 rounded-lg bg-error/5 text-error material-symbols-outlined">forum</span>
              <span className="px-2 py-0.5 rounded-full bg-error text-white text-[10px] font-bold">NEW</span>
            </div>
            <h4 className="text-on-surface-variant font-label-md mb-1">Enquiries</h4>
            <p className="font-headline-md text-headline-md text-primary-container">28</p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-10 animate-slide-up" style={{animationDelay: '200ms'}}>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-primary-container text-white rounded-lg font-label-md hover:brightness-110 active:scale-95 transition-all shadow-sm">
              <span className="material-symbols-outlined">add</span>
              Add Product
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-primary-container text-primary-container bg-transparent rounded-lg font-label-md hover:bg-primary-container/5 active:scale-95 transition-all">
              <span className="material-symbols-outlined">edit</span>
              Edit Shop
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-primary-container text-primary-container bg-transparent rounded-lg font-label-md hover:bg-primary-container/5 active:scale-95 transition-all">
              <span className="material-symbols-outlined">upload</span>
              Upload CSV
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-primary-container text-primary-container bg-transparent rounded-lg font-label-md hover:bg-primary-container/5 active:scale-95 transition-all sm:ml-auto">
              <span className="material-symbols-outlined">open_in_new</span>
              View Profile
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter animate-slide-up" style={{animationDelay: '300ms'}}>
          {/* Products Needing Attention */}
          <section className="lg:col-span-2">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm h-full flex flex-col">
              <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-headline-md text-headline-md text-on-surface">Needs Attention</h3>
                <a className="text-primary font-label-md hover:underline" href="#">View all</a>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low/50">
                    <tr>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant">Product</th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant">Quantity</th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant">Last Updated</th>
                      <th className="px-6 py-4 font-label-md text-on-surface-variant text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {[
                      { name: 'Artisan Sourdough Loaf', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbUfpzIaXsVByZq7HpFXoys--_aqOkOrJbcbDO6FkgBVFZncV9bf_YF-72T3zQiEgqrNYh42gKye9RkThyeaN7tsoCfpIw4doo0stbuVknUtEjThDjZNa-F3PbCetObzP3-p1UZjr27_ykfsgQzc6i9xRwCUqC9MatnaNsFCFJaEHdH_jUbjyhKKtBHOGMj6RpllSOKcv66qXDvpgvxoLjDYBJTqfK4Y1eALV9DYOzdjGj4PeZh9kMmZYgqzkdPdd1-i7Bfzh3J5A', status: '2 Left', color: 'bg-error-container text-on-error-container', date: 'Oct 24, 2023' },
                      { name: 'Organic Farm Carrots', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy67ILSYSfKfAJ0WYxGPCTXQJI_qvq0k7RPpuFiTAskHjktnFYS59OzhT3UYPcPl-YHnfknz9D6gFUbgKN-vRXdFHup1mIPe27PCFmR7j5YHFbEk3T4qwnwwqwvKVu3G16TLbCeY7Wh-a3-BdFW14bjg9TwWYSkN4o9GvFYPonmxNEsQot2TQXQqaLOD9_migqVetQtNSC_GhQqAgmtqFJdzPcsYslFDEUXMbvwitfzNhrAAJGDgbg8wbcvVv1otjvsayOXB1YacE', status: '15 Left', color: 'bg-surface-container text-on-surface-variant', date: 'Oct 23, 2023' },
                      { name: 'Lavender Soap', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEUiJGbV1mleB8-13r4dasbGEAIUN7i74-urg4Hd9XVWD-DCvAdCk0MWAY3RSpIUUsTMzZjReHxFGpR6Rv0G1xeYId39lmMhhNzwkT7OsCRPbaTbsqnFfOTFb12yw6EgGGD56jgfbSF6uq256MeNZJYJbehOnKMAdkeOk7KZ7M1b3I_-f589uV8TX-UesmupV4xsrYRJNOoBpeba2AWU0pxCAaloVJZtanmTJNJtarDxPymr5jLviFBVzzcKaFxsr_IK_B555K1qI', status: '0 Left', color: 'bg-error-container text-on-error-container', date: 'Oct 20, 2023' }
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-surface-container/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-label-md text-on-surface truncate">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${item.color}`}>{item.status}</span>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant text-sm whitespace-nowrap">{item.date}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="lg:col-span-1">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm h-full flex flex-col">
              <div className="p-6 border-b border-outline-variant bg-surface-container-low">
                <h3 className="font-headline-md text-headline-md text-on-surface">Recent Activity</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30 flex-1">
                  <li className="relative flex gap-4 pl-10 group">
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-primary/10 border-4 border-surface-container-lowest flex items-center justify-center text-primary z-10 transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-[18px]">inventory</span>
                    </div>
                    <div>
                      <p className="font-label-md text-on-surface">Sourdough Loaf stock updated</p>
                      <p className="text-[12px] text-on-surface-variant">2 minutes ago</p>
                    </div>
                  </li>
                  <li className="relative flex gap-4 pl-10 group">
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-tertiary/10 border-4 border-surface-container-lowest flex items-center justify-center text-tertiary z-10 transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-[18px]">star</span>
                    </div>
                    <div>
                      <p className="font-label-md text-on-surface">New review received from Sarah</p>
                      <p className="text-[12px] text-on-surface-variant">1 hour ago</p>
                    </div>
                  </li>
                  <li className="relative flex gap-4 pl-10 group">
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-error/10 border-4 border-surface-container-lowest flex items-center justify-center text-error z-10 transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-[18px]">report</span>
                    </div>
                    <div>
                      <p className="font-label-md text-on-surface">Honey stock reaching zero</p>
                      <p className="text-[12px] text-on-surface-variant">Yesterday</p>
                    </div>
                  </li>
                </ul>
                <button className="w-full mt-8 py-3 rounded-lg border border-outline-variant font-label-md text-on-surface-variant hover:bg-surface-container transition-colors">
                  View All Activity
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
