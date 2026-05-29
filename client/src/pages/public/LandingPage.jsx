import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex-1 w-full animate-fade-in bg-surface text-on-surface font-body-md min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-label-md mb-8 ring-1 ring-inset ring-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              LocalMart is now live in your area
            </div>
            
            <h1 className="font-display-lg text-display-lg text-on-surface mb-8 leading-[1.1]">
              The modern way to shop <span className="text-primary">locally.</span>
            </h1>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
              Skip the shipping times. Support your community by finding the best local stores, fresh produce, and unique items right in your neighborhood.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <Link to="/search" className="bg-primary text-on-primary font-label-md px-8 py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto h-14 flex items-center justify-center">
                Find shops near me
              </Link>
              <Link to="/register?role=vendor" className="bg-primary-container text-on-primary-container font-label-md px-8 py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto h-14 flex items-center justify-center">
                Register as a vendor
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle background pattern/glow */}
        <div className="absolute top-0 right-0 -z-10 translate-x-1/2 -translate-y-1/3 transform">
          <div className="w-[60rem] h-[60rem] bg-gradient-to-tr from-primary/5 to-primary-container/20 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface-container-lowest border-t border-outline-variant">
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-16 text-center md:text-left">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Everything you need, locally.</h2>
            <p className="text-on-surface-variant font-body-lg max-w-2xl">A seamless shopping experience designed to bridge the gap between local businesses and the community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Feature 1 */}
            <div className="bg-surface border border-outline-variant rounded-2xl p-8 group hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <h3 className="font-headline-md text-[20px] text-on-surface mb-3">Hyper-Local Discovery</h3>
              <p className="text-on-surface-variant font-body-md">
                Find exactly what you need from stores within walking distance. Discover hidden gems in your own neighborhood.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface border border-outline-variant rounded-2xl p-8 group hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h3 className="font-headline-md text-[20px] text-on-surface mb-3">Real-time Availability</h3>
              <p className="text-on-surface-variant font-body-md">
                Know exactly what's in stock before you leave the house with live inventory updates straight from the vendors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface border border-outline-variant rounded-2xl p-8 group hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <h3 className="font-headline-md text-[20px] text-on-surface mb-3">Verified Sellers</h3>
              <p className="text-on-surface-variant font-body-md">
                Shop with confidence. All our vendors are verified community members with transparent ratings and reviews.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 bg-surface-container-lowest">
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-inverse-surface rounded-[2rem] p-12 md:p-20 text-center text-inverse-on-surface relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-display-lg text-[40px] md:text-[48px] mb-6">Ready to explore?</h2>
              <p className="text-on-secondary-fixed-variant font-body-lg mb-10 max-w-2xl mx-auto">
                Join thousands of users who are already supporting their local community and finding amazing products nearby.
              </p>
              <Link to="/register" className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 font-label-md text-on-primary hover:brightness-110 active:scale-95 transition-all">
                Get started for free
              </Link>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/30 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
