import CryptoCarousel from '../CryptoCarousel';
import TotalProfit from '../TotalProfit';
import { Layout } from 'antd';

const { Sider } = Layout;

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  marginLeft: '2rem',
  marginTop: '2rem',
  color: '#fff',
  backgroundColor: '#fafafa',
};

export default function AppSider() {
  return (
    <Sider width="25%" style={siderStyle}>
      <TotalProfit />
      <CryptoCarousel />
    </Sider>
  );
}
