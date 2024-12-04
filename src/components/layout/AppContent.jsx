import { Layout } from 'antd';

import AssetsTable from '../AssetsTable';

const contentStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  margin: '2rem',
  color: '#fff',
  background: '#fafafa',
};

export default function AppContent() {
  return (
    <Layout.Content style={contentStyle}>
      <AssetsTable />
    </Layout.Content>
  );
}
