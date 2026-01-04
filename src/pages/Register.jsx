import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, User, Image as ImageIcon, UserPlus, CheckCircle2, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { motion as Motion } from 'framer-motion';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasMinLength: false
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Join EcoFine | Secure Registration';
  }, []);

  const validatePassword = (password) => {
    const errors = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasMinLength: password.length >= 6
    };
    setPasswordErrors(errors);
    return errors.hasUpperCase && errors.hasLowerCase && errors.hasMinLength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error('Password does not meet requirements');
      return;
    }

    if (!acceptTerms) {
      toast.error('You must accept the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.photoURL || null);
      toast.success('Welcome to EcoFine!');
      navigate('/');
    } catch (error) {
      let errorMessage = 'Registration failed';
      if (error.code === 'auth/email-already-in-use') errorMessage = 'Email already in use';
      else if (error.code === 'auth/invalid-email') errorMessage = 'Invalid email format';
      else if (error.code === 'auth/weak-password') errorMessage = 'Password is too weak';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success('Registration complete with Google');
      navigate('/');
    } catch {
      toast.error('Google registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 md:px-8 theme-transition overflow-hidden">
      {/* Full-screen Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/auth_bg_register.png"
          alt=" Forest Sunrise background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
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
            Join the <br /> Movement
          </h1>
          <p className="text-lg text-white/80 max-w-md mb-8 leading-relaxed">
            Be the change you want to see. EcoFine is a community-driven platform where every report brings us closer to a cleaner, greener world.
          </p>

          <div className="mt-12 space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-[#5eba61] group-hover:bg-white/20 transition-all">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Report Issues</h3>
                <p className="text-white/60 text-sm">Quickly flag environmental concerns.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-[#5eba61] group-hover:bg-white/20 transition-all">
                <UserPlus size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Track Impact</h3>
                <p className="text-white/60 text-sm">See how your contribution helps.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-[#5eba61] group-hover:bg-white/20 transition-all">
                <ImageIcon size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Verified Success</h3>
                <p className="text-white/60 text-sm">Join a community of eco-warriors.</p>
              </div>
            </div>
          </div>
        </Motion.div>

        {/* Right Side: Sign-up Form */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-8">Register</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/90 ml-1">Full Name</label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#5eba61]/50 focus:border-[#5eba61]/50 transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/90 ml-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="hero@eco.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#5eba61]/50 focus:border-[#5eba61]/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/90 ml-1">Photo URL (Optional)</label>
                <input
                  name="photoURL"
                  type="url"
                  placeholder="https://images.com/profile.jpg"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#5eba61]/50 focus:border-[#5eba61]/50 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/90 ml-1">Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#5eba61]/50 focus:border-[#5eba61]/50 transition-all text-sm"
                  />
                  {formData.password && (
                    <div className="flex gap-1 mt-1">
                      <div className={`h-1 flex-1 rounded-full ${passwordErrors.hasMinLength ? 'bg-green-500' : 'bg-white/10'}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${passwordErrors.hasUpperCase ? 'bg-green-500' : 'bg-white/10'}`}></div>
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/90 ml-1">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#5eba61]/50 focus:border-[#5eba61]/50 transition-all text-sm"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all border border-white/10 mt-4">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 accent-[#5eba61]"
                />
                <span className="text-[10px] text-white/60 leading-relaxed font-medium">
                  I agree to the <span className="text-white font-bold hover:underline">Terms of Service</span> and <span className="text-white font-bold hover:underline">Privacy Policy</span>. Accountability matters.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5eba61] hover:bg-[#4ea854] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-[#5eba61]/20 transition-all disabled:opacity-50 mt-6"
              >
                {loading ? 'Creating account...' : 'Create My Account'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">or sign up with</span>
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

            <div className="mt-8 text-center pt-6 border-t border-white/10">
              <p className="text-sm text-white/60">
                Already part of us? <Link to="/login" className="text-white font-bold hover:underline">Sign In Instead</Link>
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
}
