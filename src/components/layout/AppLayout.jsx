import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { useContext, useRef } from 'react';
import CryptoContext from '../../context/crypto-context';
import Loading from '../animations/Loading';

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  const headerRef = useRef(null);

  // Отображение спиннера при загрузке
  if (loading) {
    return <Loading />;
  }

  // Основной макет приложения
  return (
    <>
      <AppHeader headerRef={headerRef} />
      <AppContent headerRef={headerRef} />
    </>
  );
}
