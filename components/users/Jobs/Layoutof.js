"use client";
import React, { useState } from 'react';
import {
  DashboardFilled,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { FaSuitcase } from 'react-icons/fa';
import { FaStaffSnake, FaTeamspeak, FaUser, FaUserGroup } from 'react-icons/fa6';
import { GiTeamDowngrade } from 'react-icons/gi';
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
  getItem(<Link href='/job/postjob'><p className=' text-white'>Post Job</p></Link>, '1', <PlusOutlined style={{ color: 'white' }} />),
  getItem(<Link href='/job/employerdash'><p className=' text-white'>Dashboard</p></Link>, '2', <DashboardFilled style={{ color: 'white' }} />),
  // getItem(<Link href='/job/employerdash/candidates' className=' text-white'>Candidates</Link>, '4', <FaUserGroup style={{ color: 'white' }} />),
];
const Layout1 = ({ children, }) => {
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
        <Menu className=' h-full  font-bold' theme='dark' defaultSelectedKeys={['2']} mode="inline" items={items} />
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
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
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
export default Layout1;