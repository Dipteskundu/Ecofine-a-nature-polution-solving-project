import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { AuthContext } from './AuthContext';
import Loader from '../components/ui/Loader';

const API_BASE = import.meta.env.VITE_API_BASE;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Save user to DB
        try {
          await axios.post(`${API_BASE}/users`, {
            name: currentUser.displayName,
            email: currentUser.email,
            photo: currentUser.photoURL
          });

          // Fetch Admin status
          const token = await currentUser.getIdToken();
          const { data } = await axios.get(`${API_BASE}/users/admin/${currentUser.email}`, {
            headers: { authorization: `Bearer ${token}` }
          });
          setIsAdmin(data.admin);
        } catch (err) {
          console.error("Error sync user role:", err);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email/Password Login
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Email/Password Register
  const register = async (name, email, password, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoURL
    });
    return userCredential;
  };

  // Google Login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logout = async () => {
    return signOut(auth);
  };

  // Reset Password
  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update Profile with Backend Sync
  const updateUserProfile = async (name, photo) => {
    if (!auth.currentUser) return;

    // 1. Update Firebase Profile
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });

    // 2. Sync with Backend
    try {
      await axios.post(`${API_BASE}/users`, {
        name: name,
        email: auth.currentUser.email,
        photo: photo
      });
    } catch (err) {
      console.error("Backend sync failed during profile update:", err);
    }

    // 3. Force UI Refresh by reloading user data to ensure we have the latest source of truth
    try {
      await auth.currentUser.reload();
      // Create a shallow copy to trigger React re-render
      const refreshedUser = { ...auth.currentUser };
      setUser(refreshedUser);
      return refreshedUser;
    } catch (reloadErr) {
      console.error("Failed to reload user data:", reloadErr);
      // Fallback to manual update if reload fails
      const manualUpdate = { ...auth.currentUser, displayName: name, photoURL: photo };
      setUser(manualUpdate);
      return manualUpdate;
    }
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    register,
    googleLogin,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
