import { Modal, Drawer } from 'antd';
import AddAssetForm from '../forms/AddAssetForm';
import CoinInfoModal from '../modals/CoinInfoModal';
import { useModalState } from '@utils/useModalState';
import { useAuth } from '@context/AuthContext';
import { ReactComponent as Logo } from '@assets/icons/homeLogo.svg';

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
    <header
      ref={headerRef}
      className="relative flex w-full items-center h-16 lg:h-32 justify-between bg-[#9FB3A2] px-8 lg:px-20"
    >
      {/* Логотип */}
      <div className="hidden md:flex items-center md:text-lg lg:text-4xl">
        <span className="leading-none">C</span>
        <Logo className="w-[1em] h-[1em] inline-block align-middle" />
        <span className="leading-none">INBOOK</span>
      </div>
      {/* Логотип для мобильных устройств */}
      <Logo className="w-[40px] md:hidden" />

      {/* Кнопки управления */}
      <div className="flex items-center text-gray-900 gap-2">
        {/* Кнопка открытия модального окна с информацией */}
        <button
          className="button-flip min-w-24 text-sm lg:text-lg"
          data-hover-text="СВОДКА"
          onClick={openModal}
        ></button>

        {/* Модальное окно с информацией */}
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={1300}
          className="modal"
        >
          <CoinInfoModal />
        </Modal>

        {/* Кнопка открытия формы добавления актива */}
        <button
          className="button-flip min-w-24 text-sm lg:text-lg"
          data-hover-text="ДОБАВИТЬ"
          onClick={openDrawer}
        ></button>

        {/* Кнопка выхода */}
        <button
          className="button-flip min-w-24 text-sm lg:text-lg"
          data-hover-text="ВЫХОД"
          onClick={logout}
        ></button>

        {/* Выдвижное меню с формой добавления */}
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
            <AddAssetForm closeDrawer={closeDrawer} />
          </section>
        </Drawer>
      </div>
    </header>
  );
}
