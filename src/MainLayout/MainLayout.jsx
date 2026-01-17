import React, { useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Loader from '../components/ui/Loader';

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen theme-transition bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navbar />
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Motion.div
            key={pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Suspense fallback={<Loader fullPage={false} />}>
              <Outlet />
            </Suspense>
          </Motion.div>
        </AnimatePresence>
      </div>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;
