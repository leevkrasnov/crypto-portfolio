import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCryptoData, getExchangeRate } from '../api';
import { supabase } from '../../supabase';
import { demoAssets } from '../data/demoAssets';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const { isDemoMode, isAuthenticated, setIsAuthenticated, setDemoMode } =
    useAuth();
  const { openNotification } = useNotification();

  const [cryptoData, setCryptoData] = useState([]);
  const [assets, setAssets] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const demoStatus = localStorage.getItem('isDemoMode');

    if (authStatus) {
      setIsAuthenticated(true);
    }

    if (demoStatus) {
      setDemoMode(true);
    }

    if (isAuthenticated || demoStatus) {
      async function preload() {
        setLoading(true);
        setIsDataReady(false);

        try {
          const cryptoData = await fetchCryptoData();
          setCryptoData(cryptoData);

          const exchangeRate = await getExchangeRate();
          setExchangeRate(exchangeRate);

          if (demoStatus) {
            setAssets(demoAssets);
          } else {
            const { data: supabaseAssets, error } = await supabase
              .from('assets')
              .select('*');

            if (error) throw new Error(error.message);

            const parsedAssets = supabaseAssets.map((asset) => {
              return {
                ...asset,
                coin: JSON.parse(asset.coin),
              };
            });
            setAssets(parsedAssets || []);
          }

          setIsDataReady(true);
        } catch (error) {
          openNotification('error', 'Ошибка загрузки', `${error.message}`);
        } finally {
          setLoading(false);
        }
      }

      preload();
    }
  }, [isAuthenticated, isDemoMode]);

  const addAsset = async (newAsset) => {
    try {
      const { data, error } = await supabase.from('assets').insert([newAsset]);

      if (error) throw new Error(error.message);
      if (data) {
        setAssets((prevAssets) => [...prevAssets, data[0]]);
        openNotification('success', `${newAsset.coin.name} добавлен!`);
      }
    } catch (error) {
      openNotification('error', 'Ошибка добавления', error.message);
    }
  };

  const removeAsset = async (assetId) => {
    try {
      const assetToRemove = assets.find((asset) => asset.id === assetId);
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', assetId);

      if (error) throw new Error(error.message);

      setAssets((prevAssets) =>
        prevAssets.filter((asset) => asset.id !== assetId)
      );
      openNotification('success', `${assetToRemove.coin.name} удалён!`, '');
    } catch (error) {
      openNotification('error', 'Ошибка удаления', error.message);
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        assets,
        exchangeRate,
        loading,
        isDataReady,
        addAsset,
        removeAsset,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
