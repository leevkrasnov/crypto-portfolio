import { Layout, Select, Space, Button } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useState, useEffect } from 'react';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1 rem',
  display: 'flex',
  background: 'white',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {}

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: '250px',
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              src={option.data.icon}
              alt={option.data.label}
              style={{ width: 20 }}
            />{' '}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary">Add Asset</Button>
    </Layout.Header>
  );
}
