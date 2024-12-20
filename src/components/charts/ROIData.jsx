//НЕ ИСПОЛЬЗУЕТСЯ НА СТРАНИЦЕ

import { useCrypto } from '../context/CryptoContext';
import { calculateMetrics } from '../utils/calculateMetrics';

export default function ROIData() {
  const { assets } = useCrypto();
  const metrics = assets && assets.length > 0 ? calculateMetrics(assets) : [];

  // Если данные отсутствуют
  if (!metrics || metrics.length === 0) {
    return (
      <div className="p-4 flex items-center justify-center h-32 text-gray-500">
        Нет данных для отображения ROI
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-start justify-start bg-white rounded-lg shadow-md">
      {/* Заголовок */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">ROI</h1>

      {/* Список активов */}
      <ul className="w-full space-y-2">
        {metrics.map((asset) => (
          <li
            key={asset.coin.name}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="text-xl font-semibold text-gray-700">
              {asset.coin.name}
            </span>
            <span className="text-xl text-gray-900">
              {asset.roi !== undefined ? `${asset.roi.toFixed(2)}%` : '—'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
