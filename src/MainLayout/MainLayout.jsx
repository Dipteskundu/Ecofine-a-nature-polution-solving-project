import React from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../contexts/AuthProvider';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <Outlet />
          <Footer></Footer>
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
      </AuthProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
