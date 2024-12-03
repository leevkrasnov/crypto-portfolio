import { Layout, Spin } from 'antd';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';
import AppSider from './AppSider';

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout style={{ background: '#BC8F8F' }}>
      <AppHeader />
      <Layout style={{ background: '#BC8F8F' }}>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
