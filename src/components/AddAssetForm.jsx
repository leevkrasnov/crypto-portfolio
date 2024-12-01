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

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { cryptoData, setSelectedAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title={coin.name}
        subTitle={
          <div style={{}}>
            Стоимость:{' '}
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
            Стоимость:{' '}
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
          <Button type="primary" onClick={onClose}>
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
        onChange={(v) => setCoin(cryptoData.find((c) => c.id === v))}
        placeholder="Выбери криптовалюту"
        options={cryptoData.map((coin) => ({
          label: (
            <Space>
              <img
                src={coin.image}
                alt={coin.name}
                style={{ width: 20, height: 20 }}
              />
              {coin.name}
            </Space>
          ),
          value: coin.id,
        }))}
        optionLabelProp="label"
      />
    );
  }

  function onFinish(values) {
    const selectedCoin = cryptoData.find((c) => c.id === values.coin);

    if (!selectedCoin) {
      console.error('Криптовалюта не найдена');
      return;
    }

    const newAsset = {
      coin: selectedCoin,
      priceBuy: values.priceBuy,
      amountBuy: values.amountBuy,
      priceSell: values.priceSell,
      amountSell: values.amountSell,
      purchaseDate: values.purchaseDate?.$d,
      saleDate: values.saleDate?.$d,
    };

    console.log('New Asset:', newAsset);
    assetRef.current = newAsset;
    setSubmitted(true);
    setSelectedAsset(newAsset);
  }

  return (
    <Form
      form={form}
      name="coin"
      // layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item name="coin">
        <Select
          style={{ width: '100%' }}
          value={coin?.id || undefined}
          onChange={(id) => setCoin(cryptoData.find((c) => c.id === id))}
          placeholder="Выбери криптовалюту"
          optionLabelProp="children"
        >
          {cryptoData.map((coin) => (
            <Select.Option key={coin.id} value={coin.id}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
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
      </Form.Item>

      <Divider />

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
