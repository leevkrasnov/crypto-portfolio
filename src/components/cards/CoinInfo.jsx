import { Statistic, Divider, Card } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export default function CoinInfo({ coin, image }) {
  // Если данных о монете нет, отображаем заглушку
  if (!coin) {
    return (
      <Card className="w-[330px] h-48 px-1 border border-gray-50 bg-gray-50 rounded-none lg:ml-6">
        <section className="flex items-center justify-center h-full">
          <p className="text-xl text-gray-500">Данные не прогрузились</p>
        </section>
      </Card>
    );
  }

  // Определяем, растёт ли цена монеты
  const isPriceGrowing = coin.price_change_percentage_24h > 0;

  return (
    <Card className="w-[330px] h-48 px-1 border border-gray-50 bg-gray-50 rounded-none lg:ml-6 shadow-2xl">
      <section className="flex items-center gap-2">
        <img src={image} alt={coin.name} width={32} />
        <p className="text-2xl font-semibold text-gray-800">{coin.name}</p>
      </section>

      <Divider className="border-gray-300" />

      <section className="flex justify-between items-center">
        <Statistic
          title="Стоимость"
          value={coin.current_price}
          precision={2}
          valueStyle={{ fontSize: '22px' }}
          className="text-lg text-gray-700"
        />

        <Statistic
          title="Динамика (24ч)"
          value={coin.price_change_percentage_24h}
          precision={2}
          valueStyle={{
            color: isPriceGrowing ? '#a855f7' : '#374151',
            fontSize: '22px',
          }}
          prefix={isPriceGrowing ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="%"
        />
      </section>
    </Card>
  );
}
