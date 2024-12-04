import { Layout, Button, Modal, Drawer } from 'antd';
import { useState } from 'react';
import AddAssetForm from '../AddAssetForm';
import CoinProfitModal from '../CoinProfitModal';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 40,
  marginRight: '2rem',
  marginTop: '3rem',
  display: 'flex',
  background: '#fafafa',
  justifyContent: 'end',
  gap: '2rem',
  alignItems: 'center',
};

export default function AppHeader() {
  const [modal, setModal] = useState(false);
  const [drower, setDrawer] = useState(false);

  return (
    <Layout.Header style={headerStyle}>
      <Button
        style={{
          width: '180px',
          height: '40px',
          fontSize: '16px',
        }}
        type="primary"
        onClick={() => setModal(true)}
      >
        История
      </Button>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        width={1000}
      >
        <CoinProfitModal />
      </Modal>

      <Button
        style={{
          width: '180px',
          height: '40px',
          fontSize: '16px',
        }}
        type="primary"
        onClick={() => setDrawer(true)}
      >
        Добавить
      </Button>
      <Drawer
        destroyOnClose
        title="Добавить операцию"
        width={600}
        onClose={() => setDrawer(false)}
        open={drower}
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
