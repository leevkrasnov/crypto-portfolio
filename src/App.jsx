import AppLayout from './components/layout/AppLayout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CryptoProvider, useCrypto } from './context/CryptoContext';
import AuthForm from './components/AuthForm';
import Loading from './components/animations/Loading';

function AuthContainer() {
  const { isAuthenticated } = useAuth();
  const { isDataReady } = useCrypto();
  if (isDataReady) {
    return !isAuthenticated ? <AuthForm /> : <AppLayout />;
  } else {
    return <Loading />;
  }
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
