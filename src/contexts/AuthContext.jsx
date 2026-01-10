'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { misybotAPI } from '@/lib/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la aplicación
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        // Verificar si el token es válido obteniendo datos del usuario
        const userData = localStorage.getItem('user_data');
        if (userData) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await misybotAPI.login(credentials);
      setUser(userData.user);
      setIsAuthenticated(true);
      return { success: true, data: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await misybotAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
      // Redirigir al usuario a la página de login si es necesario
      // window.location.href = '/login'; // Descomentar si se necesita redirección
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Aun si falla el logout en el backend, limpiar localmente
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_data');
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};