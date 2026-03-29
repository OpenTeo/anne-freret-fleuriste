'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  address_complement?: string;
  postal_code?: string;
  city?: string;
  loyalty_points?: number;
  total_spent?: string;
  is_admin?: boolean;
  created_at?: string;
  updated_at?: string;
  // Alias pour compatibilité
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  postalCode?: string;
  city?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur depuis la session au montage
  useEffect(() => {
    const loadUser = async () => {
      const stored = localStorage.getItem('af-current-user');
      if (stored) {
        try {
          const userData = JSON.parse(stored);
          // Ajouter les alias pour compatibilité
          setUser({
            ...userData,
            firstName: userData.first_name,
            lastName: userData.last_name,
            isAdmin: userData.is_admin,
          });
        } catch (err) {
          console.error('Erreur chargement utilisateur:', err);
          localStorage.removeItem('af-current-user');
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return { success: false, error: data.error || 'Erreur de connexion' };
      }

      // Ajouter les alias pour compatibilité
      const userData = {
        ...data.user,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        isAdmin: data.user.is_admin,
      };

      setUser(userData);
      localStorage.setItem('af-current-user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Erreur login:', error);
      return { success: false, error: 'Erreur de connexion au serveur' };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          address: data.address,
          postal_code: data.postalCode,
          city: data.city,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        return { success: false, error: result.error || 'Erreur lors de l\'inscription' };
      }

      // Ajouter les alias pour compatibilité
      const userData = {
        ...result.user,
        firstName: result.user.first_name,
        lastName: result.user.last_name,
        isAdmin: result.user.is_admin,
      };

      setUser(userData);
      localStorage.setItem('af-current-user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Erreur register:', error);
      return { success: false, error: 'Erreur de connexion au serveur' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('af-current-user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('af-current-user', JSON.stringify(updated));
  };

  const refreshUser = async () => {
    if (!user) return;
    // Recharger les données utilisateur depuis l'API si besoin
    // Pour l'instant on garde les données locales
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return context;
}
