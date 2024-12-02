import { Layout, Button, Modal, Drawer } from 'antd';
import { useState } from 'react';
import AddAssetForm from '../AddAssetForm';
import CoinProfitModal from '../CoinProfitModal';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  marginRight: '2rem',
  marginTop: '3rem',
  display: 'flex',
  background: '#BC8F8F',
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
          backgroundColor: '#FFF0F5',
          color: 'black',
        }}
        type="primary"
        onClick={() => setModal(true)}
      >
        Показать операции
      </Button>
      <Modal
        title="Все операции"
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinProfitModal />
      </Modal>

      <Button
        style={{
          width: '180px',
          height: '40px',
          backgroundColor: '#FAF0E6',
          color: 'black',
        }}
        type="primary"
        onClick={() => setDrawer(true)}
      >
        Добавить операцию
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
