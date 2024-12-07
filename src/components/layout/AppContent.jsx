import { Layout } from 'antd';

import ChartRoi from '../ChartRoi';

export default function AppContent() {
  return (
    <Layout.Content className="app-content">
      <ChartRoi />
    </Layout.Content>
  );
}
