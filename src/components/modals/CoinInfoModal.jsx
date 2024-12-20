import { Statistic, Divider, Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useCrypto } from '../../context/CryptoContext';
import { calculateMetrics } from '../../utils/calculateMetrics';

export default function CoinInfoModal() {
  const { assets } = useCrypto();
  const metrics = calculateMetrics(assets);

  // Если данные отсутствуют
  if (!assets || assets.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-500">Нет данных для отображения</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-gray-50 text-4xl lg:text-6xl font-bold mb-10 lg:ml-8 lg:mb-20 mt-6">
        Итоговые показатели
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {metrics.map((asset) => {
          const isProfit = asset.totalProfit > 0;

          return (
            <Card
              key={asset.coin.id}
              className="rounded-none bg-gray-50 w-[330px] h-52 pb-4 text-gray-800"
            >
              <div className="flex justify-start items-center gap-3">
                <h1 className="text-3xl">{asset.coin.name}</h1>
              </div>

              <Divider />

              <div className="flex justify-between gap-8 items-center">
                <Statistic
                  title="PNL"
                  value={`${asset.totalProfit.toFixed(2)} $`}
                  valueStyle={{ color: isProfit ? '#7e22ce' : '#1f2937' }}
                  prefix={
                    isProfit ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                  }
                />

                <Statistic
                  title="ROI"
                  value={`${asset.roi.toFixed(2)} %`}
                  valueStyle={{ color: isProfit ? '#7e22ce' : '#1f2937' }}
                  precision={2}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
