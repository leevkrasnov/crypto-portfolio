import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const openNotification = (type, message, description) => {
    switch (type) {
      case 'success':
        toast.success(`${message} ${description}`);
        break;
      case 'error':
        toast.error(`${message} ${description}`);
        break;

      default:
        toast(`${message} - ${description}`);
    }
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
        icon={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
