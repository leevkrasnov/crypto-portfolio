import { Flex, Typography, Statistic, Divider, Card } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useCrypto } from '../context/crypto-context';

export default function CoinInfoProfit() {
  const { selectedAsset } = useCrypto();

  if (!selectedAsset) return <p>Выберите актив для отображения информации</p>;

  const { coin, priceBuy, amountBuy, priceSell, amountSell } = selectedAsset;
  const profit = priceSell * amountSell - priceBuy * amountBuy;
  const isProfit = profit > 0;

  return (
    <Flex vertical align="center" justify="center" style={{ margin: '2rem' }}>
      <Card>
        <Flex>
          <img
            src={coin.image}
            alt={coin.name}
            style={{ width: 40, marginRight: 10 }}
          />
          <Typography.Title level={2} style={{ margin: 0 }}>
            {coin.name}
          </Typography.Title>
        </Flex>
        <Divider />
        <Flex>
          <Statistic
            style={{ marginRight: '20px' }}
            title="Прибыль / Убыток"
            value={profit.toFixed(2)}
            precision={2}
            prefix={isProfit ? <CaretUpOutlined /> : <CaretDownOutlined />}
            valueStyle={{
              color: isProfit ? '#3f8600' : '#cf1322',
            }}
          />
        </Flex>
      </Card>
    </Flex>
  );
}
