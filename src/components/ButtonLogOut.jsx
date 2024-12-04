import { Button } from 'antd';
import { useCrypto } from '../context/crypto-context';
import { LogoutOutlined } from '@ant-design/icons';

export default function ButtonLogOut() {
  const { logout } = useCrypto();

  return (
    <Button
      danger
      style={{ height: '30px', width: '90px' }}
      onClick={logout}
      icon={<LogoutOutlined />}
    ></Button>
  );
}
