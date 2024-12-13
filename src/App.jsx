import AppLayout from './components/layout/AppLayout';
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CryptoProvider, useCrypto } from './context/CryptoContext';
import AuthForm from './components/AuthForm';
import SpinningLogo from './components/animations/SpinnigLogo';

function AuthContainer() {
  const { isAuthenticated } = useAuth();
  const { isDataReady } = useCrypto();
  const [animationFinished, setAnimationFinished] = useState(false);

  if (!isAuthenticated) return <AuthForm />;
  if (!animationFinished) {
    return (
      <SpinningLogo
        isDataReady={isDataReady}
        onAnimationEnd={() => {
          setAnimationFinished(true); // Анимация завершена, можно показывать контент
        }}
      />
    );
  }
  return <AppLayout />;
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
