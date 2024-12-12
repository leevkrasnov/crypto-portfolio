import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { useRef } from 'react';

export default function AppLayout() {
  const headerRef = useRef(null);

  return (
    <>
      <AppHeader headerRef={headerRef} />
      <AppContent headerRef={headerRef} />
    </>
  );
}
