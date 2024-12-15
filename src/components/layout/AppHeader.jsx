import { Modal, Drawer } from 'antd';
import AddAssetForm from '../AddAssetForm';
import CoinInfoModal from '../CoinInfoModal';
import { useModalState } from '../../utils/useModalState';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import HomeLogo from '../animations/HomeLogo';

export default function AppHeader({ headerRef }) {
  const { logout } = useAuth();

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
      <div className="absolute left-0 w-[200px] rotate-90 z-0">
        <HomeLogo className="w-full h-full" />
      </div>
      <div className="text-2xl ml-[70px]">COINBOOK</div>
      <div className="button-container">
        <button
          className="button-flip text-lg"
          data-hover-text="СВОДКА"
          onClick={openModal}
        ></button>
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={1300}
          className="modal"
        >
          <CoinInfoModal />
        </Modal>
        <button
          className="button-flip text-lg"
          data-hover-text="ДОБАВИТЬ"
          onClick={openDrawer}
        ></button>

        <button
          className="button-flip text-lg"
          data-hover-text="ВЫХОД"
          onClick={logout}
        ></button>

        <Drawer
          destroyOnClose
          width={800}
          onClose={closeDrawer}
          open={isDrawerOpen}
          styles={{
            header: { display: 'none' },
            body: { backgroundColor: 'white' },
          }}
        >
          <section className="drawer-body">
            <AddAssetForm onClose={closeDrawer} />
          </section>
        </Drawer>
      </div>
    </header>
  );
}
