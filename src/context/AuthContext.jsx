import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Инициализация состояний из localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem('isAuthenticated')) || false;
  });

  const [isDemoMode, setIsDemoMode] = useState(() => {
    return JSON.parse(localStorage.getItem('isDemoMode')) || false;
  });

  // Метод для входа
  const login = (password) => {
    if (password === import.meta.env.VITE_SECRET_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      throw new Error('Неверный пароль!');
    }
  };

  // Метод для выхода
  const logout = () => {
    setIsAuthenticated(false);
    setIsDemoMode(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isDemoMode');
  };

  // Установка демо-режима
  const setDemoMode = (isDemo) => {
    setIsDemoMode(isDemo);
    setIsAuthenticated(true); // Устанавливаем true для корректной работы
    localStorage.setItem('isDemoMode', JSON.stringify(isDemo));
    localStorage.setItem('isAuthenticated', 'true'); // Сохраняем статус аутентификации
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
