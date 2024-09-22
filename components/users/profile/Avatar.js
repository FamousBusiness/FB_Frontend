import React, { useState } from 'react';
import { Avatar, Col, Divider, Drawer, Row, Menu, Flex, Tag, Typography } from 'antd';
import { PiSuitcaseSimple } from 'react-icons/pi';
import { RxDashboard } from "react-icons/rx";
import {
  CreditCardOutlined,
  StarOutlined,
  BellOutlined,
  FileTextOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
const { Text, Title, Paragraph } = Typography
const ProfileDrawer = () => {
  const { logoutUser, userdata, user } = useAuth();
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handlejump = (path) => {
    setOpen(false);
    router.push(path);

  }
  return (
    <>
      <Avatar onClick={showDrawer} className=' cursor-pointer' size='large' shape='circle' icon={<UserOutlined />} />
      <Drawer
        title={
          <div>
            <Row justify='space-between' align='middle'>
              <Col>
                <Flex justify='space-between' gap={4}> <Title level={5} ellipsis={{ rows: 1 }} className=' text-lg'>{userdata.name}</Title></Flex>
                {userdata && userdata.business && <Link href='/userprofile' as={`/userprofile/${userdata.name}?z_id=${userdata.business}`}>View My Business Page</Link>}
              </Col>
              {/* <Col>
                <Avatar size='large' shape='circle' icon={<UserOutlined />} />
              </Col> */}
            </Row>
          </div>
        } placement="right" onClose={onClose} open={open}>
        <Menu selectable={true}>
          {userdata && userdata.business &&
            <Menu.Item onClick={() => handlejump(`/edit/${userdata.name}?id=${userdata.business}`)} key="editprofile" icon={<EditOutlined />}>
              Edit Business Profile
            </Menu.Item>}
          {/* 
            <Menu.Item onClick={() =>handlejump('/job/')} key="jobprofile" icon={<EditOutlined />}>
              <Link href='/job/profile'>Job Profile</Link>
            </Menu.Item>} */}
          {userdata && userdata.business && <Menu.Item onClick={() => handlejump('/job/postjob')} key="postjob" icon={<PiSuitcaseSimple />}>
            Post Job
          </Menu.Item>}
          {userdata && userdata.business ? <Menu.Item onClick={() => handlejump("/job/employerdash")} key="emdashboard" icon={<RxDashboard />}>
            Job Dashboard
          </Menu.Item> : <Menu.Item onClick={() => handlejump("/job/employeedash")} key="emdashboard" icon={<RxDashboard />}>
            Job Dashboard
          </Menu.Item>}
          {userdata && userdata.business && <Menu.Item onClick={() => handlejump("/plan/dashboard")} key="transaction" icon={<CreditCardOutlined />}>
            My Plan
          </Menu.Item>}
          <Divider />
          <Menu.Item onClick={() => handlejump("/leads")} key="leads" icon={<StarOutlined />}>
            Leads
          </Menu.Item>
          {/* <Menu.Item key="notifications" icon={<BellOutlined />}>
            <Link href="/notification">Notifications</Link>
          </Menu.Item> */}
          <Menu.Item onClick={() => handlejump("/about/policy")} key="policy" icon={<FileTextOutlined />}>
            Policy
          </Menu.Item>
          {/*<Menu.Item key="requirement" icon={<FileAddOutlined />}>
            <Link href="/">Post Your Requirement</Link>
          </Menu.Item> */}
          <Divider />
          <Menu.Item onClick={() => handlejump("/about/Contact")} key="support" icon={<CustomerServiceOutlined />}>
            Customer Support
          </Menu.Item>
          <Menu.Item onClick={() => logoutUser()} key="logout" icon={<LogoutOutlined />}>
            Log Out
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};
export default ProfileDrawer;