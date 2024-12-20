import { cryptoSectors } from '../../data/cryptoSectors.js';
import { Select, Divider, Form, InputNumber, DatePicker } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useCrypto } from '../../context/CryptoContext.jsx';
import { validateMessages } from '../../data/validateMesseges.js';
import InteractiveButton from '../common/InteractiveButton.jsx';

export default function AddAssetForm({ closeDrawer }) {
  const [form] = Form.useForm();
  const { cryptoData, addAsset, refreshAssets } = useCrypto();

  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Если данные успешно отправлены, показываем экран успеха
  if (submitted && coin) {
    return (
      <div className="m-12 flex flex-col">
        <h1 className="text-6xl">{coin.name}</h1>
        <h2 className="text-6xl">успешно добавлен!</h2>

        <button
          className="button-flip text-2xl mt-20"
          data-hover-text="ВЫХОД"
          onClick={closeDrawer}
        ></button>
      </div>
    );
  }

  // Если монета не выбрана, отображаем выбор
  if (!coin) {
    return (
      <div>
        <h1 className="h-20 flex justify-end items-center text-4xl lg:text-6xl font-bold mt-10 mb-10">
          Создать сделку
        </h1>
        <Select
          className="w-[100%] h-[40px]"
          value={coin?.id || undefined}
          onChange={(id) => setCoin(cryptoData.find((c) => c.id === id))}
          placeholder="Криптовалюта"
          optionLabelProp="label"
          showSearch={true}
        >
          {cryptoData.map((coin) => (
            <Select.Option key={coin.id} value={coin.id}>
              <div className="flex gap-4 items-center text-xl">
                <img
                  src={coin.image}
                  alt={coin.name}
                  style={{ width: 20, height: 20 }}
                />
                {coin.name}
              </div>
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }

  // Функция обработки отправки данных формы
  async function onFinish(values) {
    const newAsset = {
      coin: coin,
      sector: values.sector,
      priceBuy: values.priceBuy,
      amountBuy: values.amountBuy,
      priceSell: values.priceSell,
      amountSell: values.amountSell,
      purchaseDate: values.purchaseDate?.$d,
      saleDate: values.saleDate?.$d,
    };

    try {
      await addAsset(newAsset);
      await refreshAssets();
      setSubmitted(true);
    } catch (error) {
      console.error('Ошибка добавления актива:', error);
    }
  }

  // Основная форма
  return (
    <div>
      <div className="h-20 flex justify-between items-center mb-10 lg:m-10">
        <InteractiveButton
          onClick={() => setCoin(false)}
          arrowDirection={<LeftOutlined />}
        />
        {coin && (
          <div className="flex items-center gap-4">
            <h1 className="text-6xl font-bold">{coin.name}</h1>
          </div>
        )}
      </div>

      <Form
        form={form}
        name="coin"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600, margin: '0 auto' }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="sector" rules={[{ required: true }]}>
          <Select placeholder="Сектор" className="h-[40px]">
            {cryptoSectors.map((cryptoSection) => (
              <Select.Option key={cryptoSection} value={cryptoSection}>
                <div className="flex items-center text-xl">{cryptoSection}</div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="purchaseDate" rules={[{ required: true }]}>
          <DatePicker placeholder="Дата покупки" className="w-full" />
        </Form.Item>
        <Form.Item name="priceBuy" rules={[{ required: true }]}>
          <InputNumber placeholder="Стоимость актива" className="w-full" />
        </Form.Item>
        <Form.Item name="amountBuy" rules={[{ required: true }]}>
          <InputNumber placeholder="Количество" className="w-full" />
        </Form.Item>
        <Divider />

        <Form.Item
          name="saleDate"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || value.isAfter(getFieldValue('purchaseDate'))) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Дата продажи должна быть позже даты покупки!')
                );
              },
            }),
          ]}
        >
          <DatePicker placeholder="Дата продажи" className="w-full" />
        </Form.Item>
        <Form.Item name="priceSell" rules={[{ required: true }]}>
          <InputNumber placeholder="Стоимость" className="w-full" />
        </Form.Item>
        <Form.Item name="amountSell" rules={[{ required: true }]}>
          <InputNumber placeholder="Количество" className="w-full" />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end mt-10">
            <button
              className="button-flip min-w-28 text-lg lg:text-xl"
              type="submit"
              data-hover-text="ОТПРАВИТЬ"
            ></button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
