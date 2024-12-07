import { cryptoSectors } from '../data/CryptoSectors';

import {
  Select,
  Space,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from 'antd';
import { useRef, useState } from 'react';
import { useCrypto } from '../context/crypto-context';

const validateMessages = {
  required: '',
  types: {
    number: '${label} должно быть числом!',
  },
  number: {
    range: '${label} должно быть больше 0!',
  },
};

export default function AddAssetForm() {
  const [form] = Form.useForm();
  const { cryptoData, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [sector, setSector] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (submitted && coin) {
    return (
      <Result
        status="success"
        title={coin.name}
        subTitle={
          <div style={{}}>
            Стоимость покупки:{' '}
            <b>
              {
                +(
                  assetRef.current.priceBuy * assetRef.current.amountBuy
                ).toFixed(3)
              }
            </b>{' '}
            <br />
            Дата покупки:{' '}
            <b>{assetRef.current.purchaseDate?.toLocaleDateString()}</b> <br />
            <br />
            Стоимость продажи:{' '}
            <b>
              {
                +(
                  assetRef.current.priceSell * assetRef.current.amountSell
                ).toFixed(3)
              }
            </b>{' '}
            <br />
            Дата продажи:{' '}
            <b>{assetRef.current.saleDate?.toLocaleDateString()}</b>
          </div>
        }
        extra={[
          <Button
            key="closeButton"
            type="primary"
            onClick={() => window.location.reload()}
          >
            Закрыть
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        value={coin?.id || undefined}
        onChange={(id) => setCoin(cryptoData.find((c) => c.id === id))}
        placeholder="Выбери криптовалюту"
        optionLabelProp="label"
        showSearch={true}
      >
        {cryptoData.map((coin) => (
          <Select.Option key={coin.id} value={coin.id}>
            <Space>
              <img
                src={coin.image}
                alt={coin.name}
                style={{ width: 20, height: 20 }}
              />
              {coin.name}
            </Space>
          </Select.Option>
        ))}
      </Select>
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
      assetRef.current = newAsset;
      setSubmitted(true);
    } catch (error) {
      console.error('Ошибка добавления актива:', error);
    }
  }

  return (
    <Form
      form={form}
      name="coin"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Select
        style={{ width: '100%' }}
        value={coin?.id || undefined}
        onChange={(id) => setCoin(cryptoData.find((c) => c.id === id))}
        placeholder="Выбери криптовалюту"
        optionLabelProp="children"
      >
        {cryptoData.map((coin) => (
          <Select.Option key={coin.id} value={coin.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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

      <Divider />
      <Form.Item label="Сектор" name="sector" rules={[{ required: true }]}>
        <Select placeholder="Выбрать">
          {cryptoSectors.map((cryptoSection) => (
            <Select.Option key={cryptoSection} value={cryptoSection}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {cryptoSection}
              </div>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Дата покупки"
        name="purchaseDate"
        rules={[{ required: true }]}
      >
        <DatePicker placeholder="Выбрать" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Стоимость" name="priceBuy" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        help={null}
        label="Количество"
        name="amountBuy"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Divider />

      <Form.Item
        label="Дата продажи"
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
        <DatePicker placeholder="Выбрать" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Стоимость"
        name="priceSell"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        help={null}
        label="Количество"
        name="amountSell"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 20 }}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
}
