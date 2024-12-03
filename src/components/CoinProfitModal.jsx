import { Flex, Typography, Statistic, Divider, Card } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useCrypto } from '../context/crypto-context';

export default function CoinProfitModal() {
  const { assets } = useCrypto();

  if (!assets || assets.length === 0) {
    return <Typography.Text>Нет данных для отображения</Typography.Text>;
  }

  return (
    <>
      {assets.map((asset) => {
        const profit =
          asset.priceSell * asset.amountSell - asset.priceBuy * asset.amountBuy;
        const isProfit = profit > 0;
        return (
          <Flex
            vertical
            align="center"
            justify="center"
            style={{ margin: '2rem' }}
            key={asset.coin.id}
          >
            <Card style={{ marginBottom: '16px' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <img
                  src={asset.coin.image}
                  alt={asset.coin.name}
                  style={{ width: 40, height: 40 }}
                />
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {asset.coin.name}
                </Typography.Title>
              </div>
              <Divider />
              <Statistic
                title="Прибыль / Убыток ($)"
                value={profit.toFixed(2) + ' $'}
                precision={2}
                valueStyle={{ color: isProfit ? '#3f8600' : '#cf1322' }}
                prefix={isProfit ? <CaretUpOutlined /> : <CaretDownOutlined />}
              />
            </Card>
          </Flex>
        );
      })}
    </>
  );
}
