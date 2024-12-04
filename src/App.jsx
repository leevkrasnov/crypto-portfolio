import AppLayout from './components/layout/AppLayout';
import { CryptoContextProvider } from './context/crypto-context';
import AuthForm from './components/AuthForm';
import { useCrypto } from './context/crypto-context';

function Authconteiner() {
  const { isAuthenticated } = useCrypto();

  return !isAuthenticated ? <AuthForm /> : <AppLayout />;
}

export default function App() {
  return (
    <CryptoContextProvider>
      <Authconteiner />
    </CryptoContextProvider>
  );
}
