import { Layout } from 'antd';

import AssetsTable from '../AssetsTable';

export default function AppFooter() {
  return (
    <Layout.Content className="app-footer">
      <AssetsTable />
    </Layout.Content>
  );
}
