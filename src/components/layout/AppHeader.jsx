import { Modal, Drawer } from 'antd';
import AddAssetForm from '../AddAssetForm';
import CoinInfoModal from '../CoinInfoModal';
import { useModalState } from '../../utils/useModalState';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as Logo } from '../../assets/logo.svg';

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
      <div className="hidden md:flex items-center md:text-lg lg:text-4xl">
        <span className="leading-none">C</span>
        <Logo className="w-[1em] h-[1em] inline-block align-middle" />
        <span className="leading-none">INBOOK</span>
      </div>
      <Logo className="w-[30px] md:hidden" />
      <div className="flex items-center text-gray-900 gap-2">
        <button
          className="button-flip min-w-24 text-sm lg:text-lg"
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
          className="button-flip min-w-24 text-sm lg:text-lg"
          data-hover-text="ДОБАВИТЬ"
          onClick={openDrawer}
        ></button>

        <button
          className="button-flip min-w-24 text-sm lg:text-lg"
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
