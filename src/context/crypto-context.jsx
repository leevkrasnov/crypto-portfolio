import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCryptoData, fetchMarketCapData, getExchangeRate } from '../api';
import { notification } from 'antd';

const CryptoContext = createContext({
  cryptoData: [],
  assets: [],
  exchangeRate: null,
  loading: false,
  openNotification: () => {},
  setSelectedAsset: () => {},
  fetchExchangeRate: () => {},
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [assets, setAssets] = useState([]);
  const [cryptoMarketCap, setCryptoMarketCap] = useState({});
  const [hasError, setHasError] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    async function preload() {
      setLoading(true);
      setHasError(false);
      setIsDataReady(false);

      try {
        const [cryptoData, marketCapData] = await Promise.all([
          fetchCryptoData(),
          fetchMarketCapData(),
        ]);

        setCryptoData(cryptoData);
        setCryptoMarketCap(marketCapData);

        setIsDataReady(true);
      } catch (error) {
        setHasError(true);
        openNotification('error', 'Ошибка загрузки', `${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    preload();
    fetchExchangeRate();
  }, []);

  async function fetchExchangeRate() {
    try {
      const rate = await getExchangeRate();
      setExchangeRate(rate);
    } catch (error) {
      openNotification('error', 'Ошибка курса валют', `${error.message}`);
    }
  }

  function addAsset(newAsset) {
    setAssets((prevAsset) => [...prevAsset, newAsset]);
  }

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        cryptoMarketCap,
        assets,
        exchangeRate,
        addAsset,
        loading,
        isDataReady,
        hasError,
        openNotification,
      }}
    >
      {contextHolder}
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
