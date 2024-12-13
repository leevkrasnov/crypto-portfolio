import { useCrypto } from '../context/CryptoContext';
import CoinInfo from './CoinInfo';

export default function CoinCards() {
  const { cryptoData, isDataReady } = useCrypto();

  if (!isDataReady) {
    return <p>Загрузка данных...</p>;
  }

  const safeCryptoData = Array.isArray(cryptoData) ? cryptoData : [];

  const bitcoin = safeCryptoData.find((coin) => coin.id === 'bitcoin') || null;
  const ethereum =
    safeCryptoData.find((coin) => coin.id === 'ethereum') || null;

  return (
    <>
      <CoinInfo coin={bitcoin} image="/bitcoin.svg" />
      <CoinInfo coin={ethereum} image="/ethereum.svg" />
    </>
  );
}
