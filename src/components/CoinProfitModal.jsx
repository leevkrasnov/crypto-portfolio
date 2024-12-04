import { Flex, Typography, Statistic, Divider, Card } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useCrypto } from '../context/crypto-context';

export default function CoinProfitModal() {
  const { assets } = useCrypto();

  if (!assets || assets.length === 0) {
    return <Typography.Text>Нет данных для отображения</Typography.Text>;
  }

  const groupedAssets = assets.reduce((acc, asset) => {
    const profit =
      asset.priceSell * asset.amountSell - asset.priceBuy * asset.amountBuy;
    if (acc[asset.coin.name]) {
      acc[asset.coin.name].totalProfit += profit;
    } else {
      acc[asset.coin.name] = {
        ...asset,
        totalProfit: profit,
      };
    }
    return acc;
  }, {});

  const uniqueAssets = Object.values(groupedAssets);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: '2rem',
        margin: '2rem 6rem',
      }}
    >
      {uniqueAssets.map((asset) => {
        const isProfit = asset.totalProfit > 0;
        return (
          <Card
            key={asset.coin.id}
            style={{ width: '350px', marginBottom: '12px' }}
            className="shadow"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <img
                src={asset.coin.image}
                alt={asset.coin.name}
                style={{ width: 30, height: 30 }}
              />
              <Typography.Title level={3} style={{ margin: 0 }}>
                {asset.coin.name}
              </Typography.Title>
            </div>

            <Divider />

            <Statistic
              title="Прибыль / Убыток ($, все время)"
              value={asset.totalProfit.toFixed(2) + ' $'}
              precision={2}
              valueStyle={{ color: isProfit ? '#3f8600' : '#cf1322' }}
              prefix={isProfit ? <CaretUpOutlined /> : <CaretDownOutlined />}
            />
          </Card>
        );
      })}
    </div>
  );
}
