import { Layout, Button, Modal, Drawer, Flex } from 'antd';
import AddAssetForm from '../AddAssetForm';
import CoinProfitModal from '../CoinProfitModal';
import ButtonLogOut from '../ButtonLogOut';
import { useModalState } from '../../hooks/useModalState';

export default function AppHeader() {
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useModalState();

  const {
    isOpen: isDrawerOpen,
    open: openDrawer,
    close: closeDrawer,
  } = useModalState();

  return (
    <Layout.Header className="header">
      <div className="header-buttons">
        <ButtonLogOut />
      </div>

      <div className="header-buttons">
        <Button className="button-primary" type="primary" onClick={openModal}>
          История
        </Button>
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={1000}
          style={{ height: '800px', overflow: 'auto' }}
        >
          <CoinProfitModal />
        </Modal>

        <Button className="button-primary" type="primary" onClick={openDrawer}>
          Добавить
        </Button>

        <Drawer
          destroyOnClose
          title="Добавить операцию"
          width={600}
          onClose={closeDrawer}
          open={isDrawerOpen}
        >
          <AddAssetForm onClose={closeDrawer} />
        </Drawer>
      </div>
    </Layout.Header>
  );
}
