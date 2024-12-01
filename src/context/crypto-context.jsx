import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCryptoData, fetchMarketCapData } from '../api';
import { percentDifference } from '../utils';
import { notification } from 'antd';

const CryptoContext = createContext({
  cryptoData: [],
  selectedAsset: null,
  loading: false,
  openNotification: () => {},
  setSelectedAsset: () => {},
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
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

  // function mapAssets(assets, result) {
  //   return assets.map((asset) => {
  //     const coin = result.find((c) => c.id === asset.id);
  //     return {
  //       grow: asset.price < coin.price,
  //       growPercent: percentDifference(asset.price, coin.price),
  //       totalAmount: asset.amount * coin.price,
  //       totalProfit: asset.amount * coin.price - asset.amount * asset.price,
  //       name: coin.name,
  //       ...asset,
  //     };
  //   });
  // }

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
        console.log(cryptoData);
        setCryptoMarketCap(marketCapData);

        setIsDataReady(true); // Данные успешно загружены
        openNotification('success', 'Done!', 'Данные успешно загружены.');
      } catch (error) {
        setHasError(true);
        openNotification('error', 'Ошибка загрузки', `${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    preload();
  }, []);

  // function addAsset(newAsset) {
  //   setAssets((prev) => mapAssets([...prev, newAsset], cryptoData));
  // }

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        cryptoMarketCap,
        selectedAsset,
        setSelectedAsset,
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
