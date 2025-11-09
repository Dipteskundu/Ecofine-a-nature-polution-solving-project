import React from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Outlet />
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
  );
};

export default MainLayout;
