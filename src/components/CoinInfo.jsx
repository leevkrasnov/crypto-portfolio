import { Flex, Typography, Statistic, Divider, Card } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export default function CoinInfo({ coin, image }) {
  const isPriceGrowing = coin.price_change_percentage_24h > 0;

  return (
    <Card className="card-container">
      <section className="flex items-end justify-start gap-2">
        <img src={image} alt={coin.name} width={36} />
        <p className="text-2xl">{coin.name}</p>
      </section>

      <Divider />

      <section className="flex justify-between">
        <Statistic
          title="Стоимость"
          value={coin.current_price}
          valueStyle={{ fontStyle: 'italic', fontSize: '22px' }}
          precision={1}
        />

        <Statistic
          title="Динамика (24)"
          value={coin.price_change_percentage_24h}
          precision={2}
          valueStyle={{
            fontStyle: 'italic',
            fontSize: '22px',
          }}
          prefix={isPriceGrowing ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="%"
        />
      </section>
    </Card>
  );
}
