import { cryptoSectors } from '../data/cryptoSectors.js';
import { Select, Divider, Form, InputNumber, DatePicker } from 'antd';
import { useState } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { validateMessages } from '../data/validateMesseges.js';

export default function AddAssetForm() {
  const [form] = Form.useForm();
  const { cryptoData, addAsset } = useCrypto();

  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted && coin) {
    return (
      <div className="m-12 flex flex-col">
        <h1 className="text-6xl">{coin.name}</h1>
        <h2 className="text-6xl">успешно добавлен!</h2>
        <button
          className="button-flip text-2xl mt-20"
          data-hover-text="ВЫХОД"
          onClick={() => window.location.reload()}
        ></button>
      </div>
    );
  }

  if (!coin) {
    return (
      <div>
        <h1 className="h-20 flex justify-end items-center text-6xl font-bold mt-10 mb-10">
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
      addAsset(newAsset);

      setSubmitted(true);
    } catch (error) {
      console.error('Ошибка добавления актива:', error);
    }
  }

  return (
    <div>
      <div className="h-20 flex justify-end items-center text-6xl font-bold mt-10 mb-10 mr-10">
        {coin && (
          <div className="flex items-center gap-4">
            <h1 className="text-6xl">{coin.name}</h1>
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
        {/* <Select
          className="w-[100%] h-10 mt-20 custom-select"
          value={coin?.id || undefined}
          onChange={(id) => setCoin(cryptoData.find((c) => c.id === id))}
          placeholder="Выбери криптовалюту"
          optionLabelProp="children"
        >
          {cryptoData.map((coin) => (
            <Select.Option key={coin.id} value={coin.id}>
              <div className="flex gap-4 items-center text-xl">
                <img src={coin.image} alt={coin.name} className="w-7" />
                {coin.name}
              </div>
            </Select.Option>
          ))}
        </Select> */}

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
          <DatePicker placeholder="Дата покупки" className="w-[100%]" />
        </Form.Item>
        <Form.Item name="priceBuy" rules={[{ required: true }]}>
          <InputNumber placeholder="Стоимость актива" className="w-[100%]" />
        </Form.Item>
        <Form.Item name="amountBuy" rules={[{ required: true }]}>
          <InputNumber placeholder="Количество" className="w-[100%]" />
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
          <DatePicker placeholder="Дата продажи" className="w-[100%]" />
        </Form.Item>
        <Form.Item name="priceSell" rules={[{ required: true }]}>
          <InputNumber placeholder="Стоимость" className="w-[100%]" />
        </Form.Item>
        <Form.Item name="amountSell" rules={[{ required: true }]}>
          <InputNumber placeholder="Количество" className="w-[100%]" />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end mt-10">
            <button
              className="button-flip text-xl"
              type="submit"
              data-hover-text="ОТПРАВИТЬ"
            ></button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
