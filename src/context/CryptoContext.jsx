import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCryptoData, getExchangeRate } from '../api';
import { supabase } from '../../supabase';
import { demoAssets } from '../data/demoAssets';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const { isDemoMode, isAuthenticated } = useAuth();
  const { openNotification } = useNotification();

  const [cryptoData, setCryptoData] = useState([]);
  const [assets, setAssets] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !isDemoMode) {
      // Если пользователь не авторизован и не в демо-режиме, очищаем данные
      setCryptoData([]);
      setAssets([]);
      setExchangeRate(null);
      setIsDataReady(false);
      return;
    }

    async function preload() {
      setLoading(true);
      setIsDataReady(false);

      try {
        const [cryptoData, exchangeRate, assetsData] = await Promise.all([
          fetchCryptoData(),
          getExchangeRate(),
          isDemoMode
            ? Promise.resolve(demoAssets)
            : supabase
                .from('assets')
                .select('*')
                .then(({ data, error }) => {
                  if (error) throw new Error(error.message);
                  return data.map((asset) => ({
                    ...asset,
                    coin: JSON.parse(asset.coin),
                  }));
                }),
        ]);

        setCryptoData(cryptoData);
        setExchangeRate(exchangeRate);
        setAssets(assetsData);

        // Кэшируем данные в localStorage
        localStorage.setItem('cryptoData', JSON.stringify(cryptoData));
        localStorage.setItem('exchangeRate', JSON.stringify(exchangeRate));
        localStorage.setItem('assets', JSON.stringify(assetsData));

        setIsDataReady(true);
      } catch (error) {
        openNotification('error', 'Ошибка загрузки', `${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    preload();
  }, [isAuthenticated, isDemoMode]);

  const addAsset = async (newAsset) => {
    try {
      const { data, error } = await supabase.from('assets').insert([newAsset]);

      if (error) throw new Error(error.message);
      if (data) {
        const updatedAssets = [...assets, data[0]];
        setAssets(updatedAssets);
        localStorage.setItem('assets', JSON.stringify(updatedAssets));
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

      const updatedAssets = assets.filter((asset) => asset.id !== assetId);
      setAssets(updatedAssets);
      localStorage.setItem('assets', JSON.stringify(updatedAssets));
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
