import { Layout } from 'antd';

import AssetsTable from '../AssetsTable';

const contentStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  margin: '3rem',
  color: '#fff',
  backgroundColor: '#BC8F8F',
};

export default function AppContent() {
  return (
    <Layout.Content style={contentStyle}>
      <AssetsTable />
    </Layout.Content>
  );
}
