import { Layout, Button, Modal, Drawer, Flex } from 'antd';
import { useState } from 'react';
import AddAssetForm from '../AddAssetForm';
import CoinProfitModal from '../CoinProfitModal';
import ButtonLogOut from '../ButtonLogOut';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 80,
  marginTop: '3rem',
  display: 'flex',
  flexDirection: 'column',
  background: '#fafafa',
  justifyContent: 'center',
};

export default function AppHeader() {
  const [modal, setModal] = useState(false);
  const [drower, setDrawer] = useState(false);

  return (
    <Layout.Header style={headerStyle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <ButtonLogOut />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Button
          style={{
            width: '180px',
            height: '40px',
            fontSize: '16px',
            marginTop: '20px',
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
          style={{ height: '800px', overflow: 'auto' }}
        >
          <CoinProfitModal />
        </Modal>

        <Button
          style={{
            width: '180px',
            height: '40px',
            fontSize: '16px',
            marginTop: '20px',
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
      </div>
    </Layout.Header>
  );
}
