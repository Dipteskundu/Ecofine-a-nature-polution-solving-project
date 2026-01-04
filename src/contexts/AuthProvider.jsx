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

const API_BASE = 'https://ecofine-server.vercel.app';

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

  const value = {
    user,
    isAdmin,
    loading,
    login,
    register,
    googleLogin,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
