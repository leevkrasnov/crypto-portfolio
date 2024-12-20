import { Card } from 'antd';
import { calculateTotalProfit } from '../utils/calculateMetrics';
import { formatCurrency } from '../utils/formatCurrency';
import { useCrypto } from '../context/CryptoContext';

export default function CardProfit() {
  const { exchangeRate, assets } = useCrypto();
  const { usd, rub } = calculateTotalProfit({ exchangeRate, assets });

  // if (!exchangeRate || !assets || assets.length === 0) {
  //   return (
  //     <Card className="marque-container">
  //       <p className="text-gray-500">Данные не поступили</p>
  //     </Card>
  //   );
  // }

  return (
    <div className="flex flex-col justify-end h-28 lg:h-48 bg-[#2C372E] text-gray-50 rounded-none">
      <h2 className="text-2xl lg:text-3xl font-bold mb-2">
        Реализованная прибыль
      </h2>
      <div className="text-lg lg:text-2xl">
        <p>{`${usd ? formatCurrency(usd) : 0} (${
          rub ? formatCurrency(rub, 'RUB', 'ru-RU') : 0
        })`}</p>
        <p className="text-sm text-gray-400">{`Актуальный курс EUR/RUB: ${exchangeRate}`}</p>
      </div>
    </div>
  );
}
