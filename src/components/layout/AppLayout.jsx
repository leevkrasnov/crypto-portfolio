import { Layout, Spin } from 'antd';
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';

import AppCarousel from './AppCarousel';
import CoinInfoProfit from '../CoinInfoProfit';

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppCarousel />
        <CoinInfoProfit />
        {/* <AppContent /> */}
      </Layout>
    </Layout>
  );
}
