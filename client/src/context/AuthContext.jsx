import { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/api';
import { setToken, getToken, removeToken, isTokenValid } from '../utils/tokenUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isTokenValid()) {
          const userData = JSON.parse(localStorage.getItem('user'));
          
          if (userData) {
            setUser(userData);
          } else {
            // If we have a valid token but no user data, fetch it
            const response = await getCurrentUser();
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        removeToken();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};