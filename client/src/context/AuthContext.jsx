/* eslint-disable no-useless-catch */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.user.id });
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
        
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (!res.data || !res.data.token) {
        throw new Error('Invalid response from server');
      }
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser({ id: decoded.user.id });
    } catch (err) {
      throw err;
    }
  };

  const register = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      if (!res.data || !res.data.token) {
        throw new Error('Invalid response from server');
      }
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setUser({ id: decoded.user.id });
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;