import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const login = (password) => {
    if (password === import.meta.env.VITE_SECRET_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      throw new Error('Неверный пароль!');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsDemoMode(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isDemoMode');
  };

  const setDemoMode = (isDemo) => {
    setIsDemoMode(isDemo);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isDemoMode', isDemo);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isDemoMode,
        login,
        logout,
        setDemoMode,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
