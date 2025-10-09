import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  // This effect will run whenever the token changes.
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // You could also add logic here to verify the token with your backend if it expires
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token]);

  const login = (newToken, newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken); // Setting the token will trigger the useEffect
    setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};