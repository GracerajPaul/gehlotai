import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
  }

  async function signup(data) {
    const { name, grade, school } = data;
    const { data: result, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { name, grade, school } },
    });
    if (error) throw new Error(error.message);
    return result;
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  function updateUser(userData) {
    setUser(prev => prev ? { ...prev, ...userData, user_metadata: { ...prev.user_metadata, ...userData } } : prev);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
