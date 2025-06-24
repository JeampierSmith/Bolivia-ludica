import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Inicializa el usuario desde localStorage si existe
    const stored = localStorage.getItem('bludica_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    // Sincroniza el usuario si cambia localStorage (por ejemplo, en otra pestaña)
    const syncUser = () => {
      const stored = localStorage.getItem('bludica_user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const login = (data) => {
    // Permite guardar tanto data.usuario+token como solo usuario
    if (data && (data.token || data.rol)) {
      setUser(data);
      localStorage.setItem('bludica_user', JSON.stringify(data));
    } else if (data && data.usuario) {
      setUser(data.usuario);
      localStorage.setItem('bludica_user', JSON.stringify(data.usuario));
    } else {
      setUser(null);
      localStorage.removeItem('bludica_user');
    }
    return true;
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
