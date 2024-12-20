import { calculateTotalProfit } from '@utils/calculateMetrics';
import { formatCurrency } from '@utils/formatCurrency';
import { useCrypto } from '@context/CryptoContext';

export default function CardProfit() {
  const { exchangeRate, assets } = useCrypto();

  // Рассчитать прибыль
  const { usd, rub } = assets?.length
    ? calculateTotalProfit({ exchangeRate, assets })
    : { usd: 0, rub: 0 };

  // Форматировать валюту
  const formatProfit = (amount, currency = 'USD', locale = 'en-US') =>
    amount ? formatCurrency(amount, currency, locale) : 0;

  // Проверка данных
  if (!exchangeRate || !assets || assets.length === 0) {
    return (
      <div className="flex items-center justify-center h-28 lg:h-48 bg-gray-800 text-gray-400 rounded-md">
        <p>Данные не поступили</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-end h-28 lg:h-48 bg-dark-900 text-gray-50 rounded-md p-4">
      <h2 className="text-2xl lg:text-3xl font-bold mb-2">
        Реализованная прибыль
      </h2>

      <div className="text-lg lg:text-2xl">
        <p>{`${formatProfit(usd)} (${formatProfit(rub, 'RUB', 'ru-RU')})`}</p>
        <p className="text-sm text-gray-400">{`Курс USD/RUB: ${
          exchangeRate || 'нет данных'
        }`}</p>
      </div>
    </div>
  );
}
