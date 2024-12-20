import { useCrypto } from '@context/CryptoContext';
import CoinInfo from './CoinInfo';

export default function CoinCards() {
  const { cryptoData, isDataReady } = useCrypto();

  // Если данные ещё не загружены
  if (!isDataReady) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500">
        Загрузка данных...
      </div>
    );
  }

  // Список ID монет, которые нужно отобразить
  const coinsToDisplay = ['bitcoin', 'ethereum'];

  // Фильтруем данные, чтобы найти монеты по указанным ID
  const filteredCoins = coinsToDisplay.map((id) =>
    cryptoData.find((coin) => coin.id === id)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {filteredCoins.map((coin, index) =>
        coin ? (
          <CoinInfo
            key={coin.id}
            coin={coin}
            image={`src/assets/icons/${coin.id}.svg`}
          />
        ) : (
          <div
            key={index}
            className="flex items-center justify-center h-32 bg-gray-100 text-gray-500 rounded-md"
          >
            Данные недоступны
          </div>
        )
      )}
    </div>
  );
}
