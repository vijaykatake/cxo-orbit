import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cxo_token');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data.user))
        .catch(() => localStorage.removeItem('cxo_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('cxo_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('cxo_token');
    setUser(null);
  };

  const isAdmin = () => ['super_admin', 'admin', 'content_manager', 'finance'].includes(user?.role);
  const isMember = () => user?.role === 'member';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isMember }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
