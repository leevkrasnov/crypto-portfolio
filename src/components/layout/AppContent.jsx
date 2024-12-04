import { Layout } from 'antd';

import AssetsTable from '../AssetsTable';

export default function AppContent() {
  return (
    <Layout.Content className="app-content">
      <AssetsTable />
    </Layout.Content>
  );
}
