"use client";
import React, { useState } from 'react';
import {
  DashOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { FaSuitcase } from 'react-icons/fa';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link href='/job/employeedash'><p className=' text-white'>Dashboard</p></Link>, '1', <DashOutlined />),
];
const Employeelay = ({ children, }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu className=' h-full  font-bold' theme='dark' defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >

        </Footer>
      </Layout>
    </Layout>
  );
};
export default Employeelay;