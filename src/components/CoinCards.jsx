import { useCrypto } from '../context/CryptoContext';
import CoinInfo from './CoinInfo';

export default function CoinCards() {
  const { cryptoData, isDataReady } = useCrypto();

  if (isDataReady) {
    const bitcoin = cryptoData.find((coin) => coin.id === 'bitcoin') || null;
    const ethereum = cryptoData.find((coin) => coin.id === 'ethereum') || null;

    return (
      <>
        <CoinInfo coin={bitcoin} image="/bitcoin.svg" />
        <CoinInfo coin={ethereum} image="/ethereum.svg" />
      </>
    );
  }
}
