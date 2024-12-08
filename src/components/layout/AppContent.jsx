import { Layout } from 'antd';

import ChartRoi from '../ChartRoi';
import ChartDoughnut from '../ChartDoughnut';

export default function AppContent() {
  return (
    <Layout.Content className="app-content">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <ChartRoi />
        <ChartDoughnut />
      </div>
    </Layout.Content>
  );
}
