import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);
  const [role, setRole] = useState(localStorage.getItem('role'));

  const updateRole = (newRole) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
  };

  const logIn = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setLoggedIn(true);
    setRole(userRole);
  };

  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setRole(null);
    window.location.href = '/';
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(localStorage.getItem('token') !== null);
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, role, logIn, logOut, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};
