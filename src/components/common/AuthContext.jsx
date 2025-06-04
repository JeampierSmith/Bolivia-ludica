import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('bludica_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (data) => {
    // TEMPORAL: Solo permite usuario 'admin@gmail.com' y contraseña 'admin' para probar el frontend
    if ((data.email === 'admin@gmail.com' || data.usuario === 'admin@gmail.com') && data.password === 'admin') {
      setUser({ email: 'admin@gmail.com', nombre: 'Admin' });
      localStorage.setItem('bludica_user', JSON.stringify({ email: 'admin@gmail.com', nombre: 'Admin' }));
      return true;
    } else {
      alert('Usuario o contraseña incorrectos. Use admin@gmail.com/admin para probar.');
      return false;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('bludica_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
