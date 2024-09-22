import React from "react";
import {
  UserOutlined,
  OrderedListOutlined,
  DashboardOutlined,
  BellOutlined,
  MoneyCollectOutlined,
  StarOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Row, Col, Avatar } from "antd";
import Search from "antd/es/input/Search";
import Drop from "../Dropdown";
import Link from "next/link";
import NextBreadcrumb from "../NextBreadcrum";
import { MdAdsClick } from "react-icons/md";

const { Header, Content, Footer, Sider } = Layout;

function AdminLayout({ children }) {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          background: "darkorange",
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            width: "100%",
            textAlign: "center",
            color: "white",
            fontSize: 20,
            padding: 10,
            fontWeight: 600,
          }}
        >
          ADMIN
        </div>
        <Menu
          className=" h-full"
          style={{ background: "green", color: "white" }}
          mode="inline"
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: <Link href="/admin">Dashboard</Link>,
            },
            getItem(
              <Link href="/admin/listing/listmanagement">
                {" "}
                List Management{" "}
              </Link>,
              "sub1",
              <OrderedListOutlined />
            ),
            // {
            //     key: '2',
            //     icon: <OrderedListOutlined />,
            //     label: <Link href="/admin/listing">Listing</Link>,
            // },
            // {
            //     key: '3',
            //     icon: <UploadOutlined />,
            //     label: <Link href='/admin/marketing' >Marketing</Link>,
            // },
            getItem("Marketing", "sub2", <UserOutlined />, [
              getItem(
                <Link href="/admin/marketing">Dashboard</Link>,
                "3",
                <DashboardOutlined />
              ),
              getItem(
                <Link href="/admin/marketing/bulkemail">Bulk Email</Link>,
                "7",
                <MailOutlined />
              ),
              getItem(
                <Link href="/admin/marketing">Bulk SMS</Link>,
                "8",
                <MessageOutlined />
              ),
              // getItem(<Link href='/admin/marketing' >Bulk Whatsapp</Link>, '9', <WhatsAppOutlined />),
              // getItem(<Link href='/admin/marketing' >Setting</Link>, '10', <SettingOutlined />),
              // getItem(<Link href='/admin/marketing' >Report</Link>, '11', <BarChartOutlined />),
            ]),
            {
              key: "4",
              icon: <MoneyCollectOutlined />,
              label: "Premium",
            },
            {
              key: "5",
              icon: <MdAdsClick />,
              label: (
                <Link href="/admin/adsmanager" prefetch={true}>
                  Ads Manager
                </Link>
              ),
            },
            {
              key: "6",
              icon: <StarOutlined />,
              label: "Rating & Preview",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "white",
          }}
        >
          <Row gutter={10} justify="end" align="bottom">
            <Col xs={16} sm={10} md={10} lg={10} xl={10}>
              <Search style={{ marginTop: 15 }} />
            </Col>
            <Col xs={2} sm={1} md={1} lg={2} xl={1}>
              <BellOutlined style={{ fontSize: 25 }} />
            </Col>
            <Col xs={3} sm={2} md={2} lg={2} xl={2}>
              <Drop />
            </Col>
          </Row>
        </Header>
        <div className=" ml-4 mt-4">
          {/* <NextBreadcrumb separator=">" capitalizeLinks={true}/> */}
        </div>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "white",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ©2023 Created by
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
