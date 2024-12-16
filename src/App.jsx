import AppLayout from './components/layout/AppLayout';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CryptoProvider, useCrypto } from './context/CryptoContext';
import AuthForm from './components/AuthForm';
import LoadingScreen from './components/animations/LoadingScreen';

function AuthContainer() {
  const { isAuthenticated } = useAuth();
  const { isDataReady } = useCrypto();
  const [animationFinished, setAnimationFinished] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (animationFinished) {
      const timeout = setTimeout(() => {
        setContentVisible(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [animationFinished]);
  if (!isAuthenticated) return <AuthForm />;
  if (!animationFinished) {
    return (
      <LoadingScreen
        isDataReady={isDataReady}
        onAnimationEnd={() => {
          setAnimationFinished(true); // Анимация завершена, можно показывать контент
        }}
      />
    );
  }
  return (
    <div
      className={`transition-opacity duration-500 ease-in-out ${
        contentVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <AppLayout />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CryptoProvider>
          <AuthContainer />
        </CryptoProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
