import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';

const items = [
  {
    label: <a href="/">Profile</a>,
    key: '0',
  },
  {
    label: <a href="/">Setting</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Log Out',
    key: '3',
  },
];
const Drop = () => (
  <Dropdown
    arrow={true}
    placement='bottomRight'
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <Avatar style={{ marginBottom: 10 }} size={30} icon={<UserOutlined />} />
      </Space>
    </a>
  </Dropdown>
);
export default Drop;