import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCryptoData, fetchMarketCapData, getExchangeRate } from '../api';
import { notification } from 'antd';
import { supabase } from '../../supabase';

const CryptoContext = createContext({
  cryptoData: [],
  assets: [],
  exchangeRate: null,
  loading: false,
  login: () => {},
  logout: () => {},
  addAsset: () => {},
  removeAsset: () => {},
  openNotification: () => {},
  setSelectedAsset: () => {},
  fetchExchangeRate: () => {},
  isDemoMode: () => {},
  setIsDemoMode: () => {},
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [assets, setAssets] = useState([]);
  const [cryptoMarketCap, setCryptoMarketCap] = useState({});
  const [hasError, setHasError] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  function login(password) {
    if (password === import.meta.env.VITE_SECRET_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      openNotification('error', 'Неверный пароль!');
    }
  }

  function logout() {
    setIsAuthenticated(false);
    setIsDemoMode(false); // Сбрасываем демо-режим
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isDemoMode');
  }

  function setDemoMode(isDemo) {
    setIsDemoMode(isDemo);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isDemoMode', isDemo);
  }

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const demoStatus = localStorage.getItem('isDemoMode') === 'true';

    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    if (demoStatus) {
      setDemoMode(true);
    }

    if (isAuthenticated || demoStatus) {
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

          if (demoStatus) {
            const demoAssets = [
              {
                id: '1',
                coin: {
                  name: 'Bitcoin',
                  current_price: 30000,
                  image: '/bitcoin.svg',
                },
                amountBuy: 10,
                amountSell: 10,
                priceBuy: 65000,
                priceSell: 66000,
                purchaseDate: new Date(),
                saleDate: new Date(),
              },
              {
                id: '2',
                coin: {
                  name: 'Ethereum',
                  current_price: 2500,
                  image: '/ethereum.svg',
                },
                amountBuy: 10,
                amountSell: 10,
                priceBuy: 2300,
                priceSell: 2500,
                purchaseDate: new Date(),
                saleDate: new Date(),
              },
            ];
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
          setHasError(true);
          openNotification('error', 'Ошибка загрузки', `${error.message}`);
        } finally {
          setLoading(false);
        }
      }

      preload();
      fetchExchangeRate();
    }
  }, [isAuthenticated, isDemoMode]);

  async function fetchExchangeRate() {
    try {
      const rate = await getExchangeRate();
      setExchangeRate(rate);
    } catch (error) {
      openNotification('error', 'Ошибка курса валют', `${error.message}`);
    }
  }

  async function addAsset(newAsset) {
    try {
      const { data, error } = await supabase.from('assets').insert([newAsset]);

      if (error) throw new Error(error.message);

      if (data) {
        setAssets((prevAssets) => [...prevAssets, data[0]]);
        openNotification('success', 'Актив добавлен!');
      }
    } catch (error) {
      openNotification('error', 'Ошибка добавления', `${error.message}`);
    }
  }

  async function removeAsset(assetId) {
    try {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', assetId);

      if (error) throw new Error(error.message);

      setAssets((prevAssets) =>
        prevAssets.filter((asset) => asset.id !== assetId)
      );
      openNotification('success', 'Актив удалён!');
    } catch (error) {
      openNotification('error', 'Ошибка удаления', `${error.message}`);
    }
  }

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        cryptoMarketCap,
        assets,
        exchangeRate,
        addAsset,
        removeAsset,
        loading,
        isDataReady,
        hasError,
        openNotification,
        login,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        isDemoMode,
        setDemoMode,
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
