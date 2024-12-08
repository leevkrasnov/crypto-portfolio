import { useCrypto } from '../context/crypto-context';
import { LockOutlined } from '@ant-design/icons';
import { Button, Typography, Form, Input } from 'antd';

export default function AuthForm() {
  const { login, setDemoMode, setIsAuthenticated } = useCrypto();

  function handleSubmit(values) {
    console.log('Пароль:', import.meta.env.VITE_SECRET_PASSWORD);

    login(values.password);
  }

  function handleDemoMode() {
    setDemoMode(true);
    setIsAuthenticated(true);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <Typography.Title style={{ color: '#DCDCDC' }} level={1}>
        Ходлер, да?
      </Typography.Title>
      <Form
        name="login"
        style={{
          display: 'inline-block',
          textAlign: 'center',
        }}
        onFinish={handleSubmit}
      >
        <Form.Item name="password" rules={[{ required: true, message: '' }]}>
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
            style={{
              padding: '8px',
              fontSize: '16px',
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ height: '40px', fontSize: '16px' }}
            block
            type="primary"
            htmlType="submit"
          >
            Войти
          </Button>
          <Button
            style={{ height: '30px', marginTop: '10px', fontSize: '14px' }}
            block
            type="primary"
            onClick={handleDemoMode}
          >
            Демо-режим
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
