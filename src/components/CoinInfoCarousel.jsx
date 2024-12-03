import { Flex, Typography, Statistic, Divider, Card } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
} from '@ant-design/icons';

export default function CoinInfoCarousel({ coin, image }) {
  const isPriceGrowing = coin.price_change_percentage_24h > 0;

  return (
    <Flex vertical align="center" justify="center">
      <Card className="card">
        <Flex>
          <img
            src={image}
            alt={coin.name}
            style={{ width: 36, marginRight: 10 }}
          />
          <Typography.Title level={2} style={{ margin: 0 }}>
            {coin.name}
          </Typography.Title>
        </Flex>
        <Divider />
        <Flex style={{ justifyContent: 'space-between' }}>
          <Statistic
            style={{ marginRight: '3rem' }}
            title="Цена"
            value={coin.current_price}
            precision={2}
            prefix={<DollarOutlined />}
          />

          <Statistic
            title="Динамика (24)"
            value={coin.price_change_percentage_24h}
            precision={2}
            valueStyle={{
              color: isPriceGrowing ? '#3f8600' : '#cf1322',
            }}
            prefix={
              isPriceGrowing ? <ArrowUpOutlined /> : <ArrowDownOutlined />
            }
            suffix="%"
          />
        </Flex>
      </Card>
    </Flex>
  );
}
