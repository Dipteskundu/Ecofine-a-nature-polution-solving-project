import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, LogIn, ShieldCheck, User as UserIcon, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { motion as Motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const fromState = location.state?.from?.state || null;

  useEffect(() => {
    document.title = 'Login | EcoFine';
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate(from, { state: fromState, replace: true });
    } catch (error) {
      let errorMessage = 'Failed to login';
      if (error.code === 'auth/invalid-email') errorMessage = 'Invalid email address';
      else if (error.code === 'auth/user-not-found') errorMessage = 'Account not found';
      else if (error.code === 'auth/wrong-password') errorMessage = 'Incorrect password';
      else if (error.code === 'auth/invalid-credential') errorMessage = 'Invalid credentials';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('diptes@gmail.com');
    setPassword('passWord');
    toast.success('User credentials loaded!');
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success('Securely logged in with Google');
      navigate(from, { state: fromState, replace: true });
    } catch {
      toast.error('Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 md:px-8 theme-transition overflow-hidden">
      {/* Full-screen Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/auth_bg_login.png"
          alt="Mountain Sunset background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Hero Content */}
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block text-white"
        >
          <h1 className="text-7xl font-bold mb-6 leading-tight">
            Welcome <br /> Back
          </h1>
          <p className="text-lg text-white/80 max-w-md mb-8 leading-relaxed">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using.
          </p>

          <div className="flex gap-6 mt-12">
            {[
              { icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', label: 'Facebook' },
              { icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png', label: 'Twitter' },
              { icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', label: 'Instagram' },
              { icon: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', label: 'Youtube' }
            ].map((social, i) => (
              <Motion.a
                key={i}
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                <img src={social.icon} alt={social.label} className="w-5 h-5 invert" />
              </Motion.a>
            ))}
          </div>
        </Motion.div>

        {/* Right Side: Sign-in Form */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-8">Sign in</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="eco.warrior@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#5eba61]/50 focus:border-[#5eba61]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 ml-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#5eba61]/50 focus:border-[#5eba61]/50 transition-all"
                />
              </div>

              <div className="flex items-center justify-start gap-2 ml-1">
                <input type="checkbox" id="remember" className="accent-[#5eba61]" />
                <label htmlFor="remember" className="text-xs text-white/80 cursor-pointer">Remember Me</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5eba61] hover:bg-[#4ea854] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-[#5eba61]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Signing in...' : 'Sign in now'}
              </button>

              <div className="text-center">
                <Link to="/forgot-password" size="sm" className="text-sm text-white/60 hover:text-white transition-colors">
                  Lost your password?
                </Link>
              </div>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">or continue with</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Google</span>
            </button>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm">
                By clicking on "Sign in now" you agree to <br />
                <Link to="/terms" className="text-white hover:underline">Terms of Service</Link> | <Link to="/privacy" className="text-white hover:underline">Privacy Policy</Link>
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button onClick={handleDemoLogin} className="text-xs font-bold text-[#5eba61] hover:underline uppercase tracking-widest">Demo User</button>
              </div>
              <p className="mt-6 text-sm text-white/60">
                New to EcoFine? <Link to="/register" className="text-white font-bold hover:underline">Register now</Link>
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
}
