import CryptoCarousel from '../CryptoCarousel';
import TotalProfit from '../TotalProfit';
import { Layout } from 'antd';

const { Sider } = Layout;

export default function AppSider() {
  return (
    <Sider width="25%" className="app-sider">
      <TotalProfit />
      <CryptoCarousel />
    </Sider>
  );
}
