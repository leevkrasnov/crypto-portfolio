import { Layout, Button, Modal, Drawer } from 'antd';
import AddAssetForm from '../AddAssetForm';
import CoinProfitModal from '../CoinProfitModal';
import { useModalState } from '../../utils/useModalState';
import { useCrypto } from '../../context/crypto-context';
import { LogoutOutlined } from '@ant-design/icons';

export default function AppHeader() {
  const { logout } = useCrypto();

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
      <div className="button-container">
        <button
          class="button-flip"
          data-hover-text="СВОДКА"
          onClick={openModal}
        ></button>
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={1200}
          className="modal"
        >
          <CoinProfitModal />
        </Modal>
        <div class="button-container">
          <button
            class="button-flip"
            data-hover-text="ДОБАВИТЬ"
            onClick={openDrawer}
          ></button>
        </div>

        <button
          class="button-flip ml-6"
          data-hover-text="ВЫХОД"
          onClick={logout}
        ></button>

        <Drawer
          destroyOnClose
          title="Добавить операцию"
          width={800}
          onClose={closeDrawer}
          open={isDrawerOpen}
        >
          <div className="drawer-body">
            <AddAssetForm onClose={closeDrawer} />
          </div>
        </Drawer>
      </div>
    </Layout.Header>
  );
}
