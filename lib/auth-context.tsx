'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  addressComplement?: string;
  postalCode?: string;
  city?: string;
  isAdmin?: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Seed admin account if not exists
    const users = JSON.parse(localStorage.getItem('af-users') || '[]');
    const adminExists = users.some((u: { isAdmin?: boolean }) => u.isAdmin);
    if (!adminExists) {
      users.push({
        id: 'admin-001',
        firstName: 'Anne',
        lastName: 'Freret',
        email: 'admin@annefreret.fr',
        phone: '02 33 50 26 15',
        password: 'AnneFreret2026!',
        isAdmin: true,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('af-users', JSON.stringify(users));
    }

    const stored = localStorage.getItem('af-current-user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('af-users') || '[]');
    const found = users.find((u: { email: string; password: string }) => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: 'Email ou mot de passe incorrect' };
    
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem('af-current-user', JSON.stringify(userData));
    return { success: true };
  };

  const register = async (data: RegisterData) => {
    const users = JSON.parse(localStorage.getItem('af-users') || '[]');
    const exists = users.find((u: { email: string }) => u.email.toLowerCase() === data.email.toLowerCase());
    if (exists) return { success: false, error: 'Un compte existe déjà avec cet email' };

    const newUser = {
      id: crypto.randomUUID(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('af-users', JSON.stringify(users));

    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('af-current-user', JSON.stringify(userData));
    return { success: true };
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
    
    // Also update in users array
    const users = JSON.parse(localStorage.getItem('af-users') || '[]');
    const idx = users.findIndex((u: { id: string }) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...data };
      localStorage.setItem('af-users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
