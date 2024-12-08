import { Layout } from 'antd';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';
import AppSider from './AppSider';
import AppFooter from './AppFooter';
import Loading from '../animations/Loading';

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  // Отображение спиннера при загрузке
  if (loading) {
    return <Loading />;
  }

  // Основной макет приложения
  return (
    <Layout className="layout-container">
      <AppHeader />
      <Layout className="layout-container">
        <AppSider />
        <AppContent />
      </Layout>
      <AppFooter />
    </Layout>
  );
}
