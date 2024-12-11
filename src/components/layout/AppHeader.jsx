import { Modal, Drawer } from 'antd';
import AddAssetForm from '../AddAssetForm';
import CoinProfitModal from '../CoinProfitModal';
import { useModalState } from '../../utils/useModalState';
import { useCrypto } from '../../context/crypto-context';

export default function AppHeader({ headerRef }) {
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
    <header ref={headerRef} className="header">
      <div className="button-container">
        <h2 className="text-2xl">COINBOOK</h2>
      </div>
      <div className="button-container">
        <button
          className="button-flip"
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
        <button
          className="button-flip"
          data-hover-text="ДОБАВИТЬ"
          onClick={openDrawer}
        ></button>

        <button
          className="button-flip"
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
          <section className="drawer-body">
            <AddAssetForm onClose={closeDrawer} />
          </section>
        </Drawer>
      </div>
    </header>
  );
}
