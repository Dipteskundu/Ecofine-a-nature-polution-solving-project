import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Leaf, LogIn, LogOut, User, ShieldCheck, Sun, Moon, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const location = useLocation();

  const isWhitePage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const isHeroTransparent = !isScrolled && !isWhitePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const publicNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/all-issues' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' }
  ];

  const authenticatedNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/all-issues' },
    { name: 'Blog', href: '/blog' },
    { name: 'Report Issue', href: '/addIssues' },
    { name: 'My Activity', href: '/my-issues' },
    { name: 'Contributions', href: '/my-contribution' }
  ];

  if (user && isAdmin) {
    authenticatedNavLinks.push({ name: 'Admin Hub', href: '/admin-hub' });
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Safe travels!');
      setIsProfileDropdownOpen(false);
      navigate('/');
    } catch {
      toast.error('Logout failed');
    }
  };

  const navLinks = user ? authenticatedNavLinks : publicNavLinks;

  const desktopLinkBaseClasses = 'text-[var(--text-secondary)] hover:text-primary';
  const desktopActiveLinkClasses = 'border-b-2 border-primary pb-1 text-primary';

  const mobileLinkBaseClasses = 'block text-[var(--text-primary)] hover:text-primary text-lg font-black tracking-tight';
  const mobileActiveLinkClasses = 'border-b-2 border-primary pb-1 text-primary';

  const isLinkActive = (href) => {
    if (!href) return false;
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${(isScrolled || isWhitePage)
          ? 'bg-[var(--bg-header)] backdrop-blur-md shadow-lg border-b border-[var(--border-color)]'
          : 'bg-transparent'
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary group-hover:bg-green-600 rounded-xl flex items-center justify-center transition-all rotate-3 group-hover:rotate-12 shadow-lg shadow-green-500/20">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span
                className={`${isHeroTransparent && theme === 'light' ? 'text-white' : 'text-[var(--text-primary)]'} text-xl font-black tracking-tight`}
              >
                EcoFine
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);

                if (link.name === 'Blog') {
                  return (
                    <div key={link.name} className="relative group py-2">
                      <Link
                        to={link.href}
                        className={`${desktopLinkBaseClasses} ${isActive ? desktopActiveLinkClasses : ''} transition-all duration-200 text-sm font-bold tracking-wide flex items-center gap-1 group-hover:text-primary`}
                      >
                        {link.name}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 opacity-60" />
                      </Link>
                      {/* Hover Bridge & Dropdown Menu */}
                      <div className="absolute left-0 top-full w-56 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-40">
                        <div className="bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--border-color)] py-3 overflow-hidden">
                          <Link
                            to="/blog"
                            className="block px-4 py-2.5 text-xs font-bold text-[var(--text-secondary)] hover:text-primary hover:bg-[var(--bg-surface)] transition-colors mx-2 rounded-xl"
                          >
                            Latest Articles
                          </Link>
                          <Link
                            to="/blog/category/success-stories"
                            className="block px-4 py-2.5 text-xs font-bold text-[var(--text-secondary)] hover:text-primary hover:bg-[var(--bg-surface)] transition-colors mx-2 rounded-xl"
                          >
                            Success Stories
                          </Link>
                          <Link
                            to="/blog/category/guides-tips"
                            className="block px-4 py-2.5 text-xs font-bold text-[var(--text-secondary)] hover:text-primary hover:bg-[var(--bg-surface)] transition-colors mx-2 rounded-xl"
                          >
                            Guides & Tips
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (link.name === 'Services') {
                  return (
                    <div key={link.name} className="relative group py-2">
                      <Link
                        to={link.href}
                        className={`${desktopLinkBaseClasses} ${isActive ? desktopActiveLinkClasses : ''} transition-all duration-200 text-sm font-bold tracking-wide flex items-center gap-1 group-hover:text-primary`}
                      >
                        {link.name}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 opacity-60" />
                      </Link>
                      {/* Hover Bridge & Dropdown Menu */}
                      <div className="absolute left-0 top-full w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-40">
                        <div className="bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--border-color)] py-3 overflow-hidden">
                          <Link
                            to="/services/reporting"
                            className="block px-4 py-2.5 text-xs font-bold text-[var(--text-secondary)] hover:text-primary hover:bg-[var(--bg-surface)] transition-colors mx-2 rounded-xl"
                          >
                            Citizen Reporting
                          </Link>
                          <Link
                            to="/services/analytics"
                            className="block px-4 py-2.5 text-xs font-bold text-[var(--text-secondary)] hover:text-primary hover:bg-[var(--bg-surface)] transition-colors mx-2 rounded-xl"
                          >
                            Data & Analytics
                          </Link>
                          <Link
                            to="/services/partnerships"
                            className="block px-4 py-2.5 text-xs font-bold text-[var(--text-secondary)] hover:text-primary hover:bg-[var(--bg-surface)] transition-colors mx-2 rounded-xl"
                          >
                            Partnership Programs
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`${desktopLinkBaseClasses} ${isActive ? desktopActiveLinkClasses : ''} transition-colors duration-200 text-sm font-bold tracking-wide`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center space-x-5">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-primary hover:text-primary transition-all shadow-sm"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="p-1 rounded-full hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                    aria-label="Profile menu"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/40x40?text=User'; }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-green-600 shadow-md">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-[var(--bg-card)] rounded-[2rem] shadow-2xl border border-[var(--border-color)] py-4 z-50 overflow-hidden theme-transition animate-smooth-in">
                      <div className="px-6 py-4 border-b border-[var(--border-color)] bg-[var(--bg-surface)]/50">
                        <p className="text-sm font-black text-[var(--text-primary)] truncate">{user.displayName || 'Community Member'}</p>
                        <p className="text-xs text-[var(--text-secondary)] truncate mt-1">{user.email}</p>
                        {isAdmin && (
                          <div className="mt-3 text-[9px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full inline-block uppercase tracking-[0.1em] border border-primary/20">
                            System Admin
                          </div>
                        )}
                      </div>
                      <div className="p-2 flex flex-col gap-1">
                        <button
                          onClick={() => { navigate('/profile'); setIsProfileDropdownOpen(false); }}
                          className="w-full text-left px-4 py-3 text-sm text-[var(--text-primary)] hover:bg-primary/10 hover:text-primary rounded-xl flex items-center space-x-4 transition-all group font-bold"
                        >
                          <User className="w-4 h-4 text-[var(--text-muted)] group-hover:text-primary" />
                          <span>Update Profile</span>
                        </button>
                        {isAdmin && (
                          <Link
                            to="/admin-hub"
                            className="w-full text-left px-4 py-3 text-sm text-primary hover:bg-primary/10 rounded-xl flex items-center space-x-4 transition-all group font-black"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Admin Hub</span>
                          </Link>
                        )}
                        <div className="h-px bg-[var(--border-color)] my-2 mx-4"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 rounded-xl flex items-center space-x-4 transition-all group font-bold"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-[var(--text-primary)] hover:text-primary transition-colors duration-200 text-sm font-bold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className={`${isHeroTransparent && theme === 'light'
                      ? 'bg-white text-[var(--text-primary)] hover:bg-gray-100'
                      : 'bg-primary hover:bg-primary-hover text-white'
                      } px-7 py-3.5 rounded-2xl transition-all duration-300 font-black text-sm flex items-center space-x-2 shadow-lg shadow-green-500/20 active:scale-95`}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Join Now</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] transition-all"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[var(--text-primary)] p-2 hover:bg-[var(--bg-surface)] rounded-xl transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-[var(--bg-card)] border-t border-[var(--border-color)] shadow-2xl theme-transition">
            <div className="px-6 py-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <div key={link.name} className="space-y-4">
                    <Link
                      to={link.href}
                      className={`${mobileLinkBaseClasses} ${isActive ? mobileActiveLinkClasses : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>

                    {link.name === 'Blog' && (
                      <div className="pl-4 space-y-3 border-l-2 border-[var(--border-color)]">
                        <Link to="/blog" className="block text-sm font-bold text-[var(--text-secondary)] hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Latest Articles</Link>
                        <Link to="/blog/category/success-stories" className="block text-sm font-bold text-[var(--text-secondary)] hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Success Stories</Link>
                        <Link to="/blog/category/guides-tips" className="block text-sm font-bold text-[var(--text-secondary)] hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Guides & Tips</Link>
                      </div>
                    )}

                    {link.name === 'Services' && (
                      <div className="pl-4 space-y-3 border-l-2 border-[var(--border-color)]">
                        <Link to="/services/reporting" className="block text-sm font-bold text-[var(--text-secondary)] hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Citizen Reporting</Link>
                        <Link to="/services/analytics" className="block text-sm font-bold text-[var(--text-secondary)] hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Data & Analytics</Link>
                        <Link to="/services/partnerships" className="block text-sm font-bold text-[var(--text-secondary)] hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Partnership Programs</Link>
                      </div>
                    )}
                  </div>
                );
              })}

              {user ? (
                <div className="pt-6 border-t border-[var(--border-color)] space-y-6">
                  <div className="flex items-center space-x-4">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="w-12 h-12 rounded-full border-2 border-primary" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-2 border-green-600 shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="font-black text-[var(--text-primary)]">{user.displayName || 'Community Member'}</p>
                      <p className="text-xs text-[var(--text-secondary)] font-bold">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="w-full bg-red-500/10 text-red-500 px-6 py-4 rounded-2xl font-black flex items-center justify-center space-x-2 border border-red-500/20"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout Account</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-6 border-t border-[var(--border-color)] grid grid-cols-1 gap-4">
                  <Link
                    to="/login"
                    className="block text-center text-[var(--text-primary)] font-black py-4 rounded-2xl hover:bg-[var(--bg-surface)] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="w-full bg-primary text-white py-5 rounded-2xl font-black text-center shadow-lg shadow-green-500/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
