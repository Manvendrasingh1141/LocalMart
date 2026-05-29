import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      const { user, token } = response.data;
      login(user, token);
      toast.success('Successfully logged in');
      
      // Redirect based on role
      if (user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/consumer/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center p-margin-mobile saffron-gradient relative overflow-hidden w-full">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl -z-0"></div>
      
      <main className="w-full max-w-[440px] z-10">
        {/* Auth Card */}
        <div className="glass-card rounded-[2rem] p-8 md:p-10 shadow-2xl border border-white/50">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container rounded-2xl mb-4 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome Back</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Your local community is just a click away.</p>
          </div>
          
          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-2 text-left">
              <label className="font-label-md text-label-md text-on-surface-variant block ml-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
                <input 
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border ${errors.email ? 'border-error' : 'border-outline-variant'} rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md`}
                  id="email" 
                  placeholder="alex@example.com" 
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                />
              </div>
              {errors.email && <p className="mt-1 ml-1 text-sm text-error">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center px-1">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                <Link to="#" className="font-label-sm text-label-sm text-primary hover:underline transition-all">Forgot Password?</Link>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
                <input 
                  className={`w-full pl-12 pr-12 py-3.5 bg-slate-50 border ${errors.password ? 'border-error' : 'border-outline-variant'} rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md`}
                  id="password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  {...register('password', { required: 'Password is required' })}
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" 
                  onClick={() => setShowPassword(!showPassword)} 
                  type="button"
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              {errors.password && <p className="mt-1 ml-1 text-sm text-error">{errors.password.message}</p>}
            </div>

            {/* Primary Login Button */}
            <button 
              className="w-full flex justify-center items-center gap-2 py-4 bg-primary hover:bg-primary/90 text-white font-label-md text-label-md rounded-2xl shadow-lg shadow-primary/30 transition-all duration-300 transform active:scale-[0.98] mt-2" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : 'Login'}
            </button>

            {/* Divider */}
            <div className="relative py-4 flex items-center">
              <div className="flex-grow border-t border-outline-variant"></div>
              <span className="flex-shrink mx-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-outline-variant"></div>
            </div>

            {/* Google Social Login */}
            <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-outline-variant hover:bg-slate-50 text-on-surface font-label-md text-label-md rounded-2xl transition-all duration-200" type="button">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Continue with Google
            </button>
          </form>
          
          {/* Bottom Link */}
          <div className="mt-10 text-center">
            <Link to="/register" className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors group">
              New user? <span className="text-primary font-bold group-hover:underline">Create an account →</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
