import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'vendor' ? 'vendor' : 'consumer';
  const [role, setRole] = useState(initialRole);
  const [step, setStep] = useState(1);
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Add the selected role to the payload
      const payload = {
        ...data,
        role: role
      };
      
      await api.post('/auth/register', payload);
      toast.success('Account created successfully. Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col">
      {/* Background Decoration */}
      <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary-fixed/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-tertiary-fixed/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>

      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 bg-surface/80 backdrop-blur-md shadow-sm">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">LocalMart</Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-on-surface-variant hover:text-primary transition-colors font-label-md">Sign In instead</Link>
        </div>
      </header>
      
      <main className="flex-grow pt-24 pb-12 px-margin-mobile">
        <div className="max-w-[800px] mx-auto">
          {/* Step Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-variant -z-10 -translate-y-1/2"></div>
              <div 
                className="absolute top-1/2 left-0 h-[2px] bg-primary -z-10 -translate-y-1/2 transition-all duration-500" 
                style={{ width: step === 1 ? '0%' : '50%' }}
              ></div>
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 shadow-lg transition-colors ${step >= 1 ? 'bg-primary-container text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>1</div>
                <span className={`font-label-md ${step >= 1 ? 'text-primary' : 'text-on-surface-variant'}`}>Role Selection</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 shadow-lg transition-colors ${step >= 2 ? 'bg-primary-container text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>2</div>
                <span className={`font-label-md ${step >= 2 ? 'text-primary' : 'text-on-surface-variant'}`}>Account Details</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold mb-2">3</div>
                <span className="font-label-md text-on-surface-variant">Verification</span>
              </div>
            </div>
          </div>

          {/* Registration Container */}
          <div className="bg-surface/90 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant">
            
            {step === 1 && (
              <div>
                <h1 className="font-headline-lg text-headline-lg mb-2 text-center">Join the Community</h1>
                <p className="text-on-surface-variant text-center mb-10 font-body-md">Tell us how you want to use LocalMart to get started.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role: Shopper */}
                  <div 
                    className="group cursor-pointer p-8 rounded-2xl border-2 border-surface-variant hover:border-primary-container transition-all duration-300 flex flex-col items-center text-center bg-surface hover:bg-surface-bright"
                    onClick={() => handleRoleSelect('consumer')}
                  >
                    <div className="w-16 h-16 rounded-full bg-surface-container-high group-hover:bg-primary-fixed flex items-center justify-center mb-4 transition-colors">
                      <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md mb-2">I'm a Shopper</h3>
                    <p className="text-on-surface-variant font-body-md">I want to find and buy fresh, local goods from my neighborhood.</p>
                  </div>
                  
                  {/* Role: Vendor */}
                  <div 
                    className="group cursor-pointer p-8 rounded-2xl border-2 border-surface-variant hover:border-primary-container transition-all duration-300 flex flex-col items-center text-center bg-surface hover:bg-surface-bright"
                    onClick={() => handleRoleSelect('vendor')}
                  >
                    <div className="w-16 h-16 rounded-full bg-surface-container-high group-hover:bg-primary-fixed flex items-center justify-center mb-4 transition-colors">
                      <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md mb-2">I'm a Vendor</h3>
                    <p className="text-on-surface-variant font-body-md">I want to sell my local products and grow my business community.</p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <button 
                    className="w-10 h-10 rounded-full hover:bg-surface-variant flex items-center justify-center transition-colors" 
                    onClick={() => setStep(1)}
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  <div>
                    <h1 className="font-headline-md text-headline-md">{role === 'vendor' ? 'Business Profile' : 'Consumer Profile'}</h1>
                    <p className="text-on-surface-variant font-body-md">Setting up your account on LocalMart</p>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant ml-1">Full Name</label>
                      <input 
                        className="w-full bg-[#F1F5F9] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-container transition-all" 
                        placeholder="John Doe" 
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && <p className="mt-1 ml-1 text-sm text-error">{errors.name.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant ml-1">Email Address</label>
                      <input 
                        className="w-full bg-[#F1F5F9] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-container transition-all" 
                        placeholder="john@example.com" 
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                      />
                      {errors.email && <p className="mt-1 ml-1 text-sm text-error">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant ml-1">Password</label>
                      <input 
                        className="w-full bg-[#F1F5F9] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-container transition-all" 
                        placeholder="••••••••" 
                        type="password"
                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                      />
                      {errors.password && <p className="mt-1 ml-1 text-sm text-error">{errors.password.message}</p>}
                    </div>
                    
                    {role === 'vendor' && (
                      <div className="space-y-2">
                        <label className="font-label-md text-on-surface-variant ml-1">Shop Name</label>
                        <input 
                          className="w-full bg-[#F1F5F9] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-container transition-all" 
                          placeholder="The Local Pantry" 
                          type="text"
                          {...register('shopName', { required: 'Shop name is required for vendors' })}
                        />
                        {errors.shopName && <p className="mt-1 ml-1 text-sm text-error">{errors.shopName.message}</p>}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container" id="terms" type="checkbox" required />
                    <label className="text-body-md text-on-surface-variant" htmlFor="terms">
                      I agree to the <Link className="text-primary hover:underline" to="#">Terms of Service</Link> and <Link className="text-primary hover:underline" to="#">Privacy Policy</Link>.
                    </label>
                  </div>

                  <button 
                    className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white font-label-md text-label-md py-4 rounded-2xl shadow-lg transition-transform active:scale-[0.98] mt-8" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      role === 'vendor' ? 'Create Vendor Account' : 'Create Consumer Account'
                    )}
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* Footer Copyright */}
          <div className="mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant font-body-md opacity-70">
            <span>© 2024 LocalMart. Efficiently warm local commerce.</span>
            <div className="flex gap-6">
              <Link className="hover:text-primary transition-colors" to="#">Privacy Policy</Link>
              <Link className="hover:text-primary transition-colors" to="#">Terms of Service</Link>
              <Link className="hover:text-primary transition-colors" to="#">Support</Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Register;
