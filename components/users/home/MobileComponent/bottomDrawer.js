"use client";
import React, { useState } from "react";
import { Divider, Drawer, Menu, Button } from "antd";
import { useAuth } from "@/context/AuthContext";
import { RxDashboard } from "react-icons/rx";
import LoginForm from "@/utils/LandingPageModel";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ShopOutlined,
  EditOutlined,
  LogoutOutlined,
  CreditCardOutlined,
  StarOutlined,
  BellOutlined,
  FileTextFilled,
  CustomerServiceOutlined,
} from "@ant-design/icons";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiSuitcaseSimple } from "react-icons/pi";
import Person2Icon from '@mui/icons-material/Person2';





const BottomDrawer = () => {
  const { authTokens, logoutUser, userdata } = useAuth();
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const router = useRouter();


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
  };

  const handleRouter = (path) => {
    setOpen(false);
    router.push(path);
  };


  return (
    <>
      {/* Profile Button */}
      <button
        onClick={()=> showDrawer()}
        type="button"
        className="inline-flex flex-col items-center justify-center px-5 group"
      >
        {authTokens ? <Person2Icon color="primary" /> : <Person2Icon color="primary" />}
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Profile
          </span>
      </button>


      <Drawer
        width="80%"
        title="My Profile"
        placement="right"
        closable={true}
        closeIcon={<ArrowLeftOutlined />}
        onClose={onClose}
        open={open}
      >
        {authTokens ? (
          <Menu theme="light" mode="vertical">
            {userdata && userdata.business && (
              <Menu.Item
                onClick={() =>
                  router.push(
                    `/userprofile/${userdata.name}?z_id=${userdata.business}`
                  )
                }
                key="profile"
                icon={<UserOutlined />}
              >
                Profile
              </Menu.Item>
            )}

            <Menu.Item
              onClick={() => handleRouter("/registration")}
              key="business"
              icon={<ShopOutlined />}
            >
              List the Business
            </Menu.Item>

            {userdata && userdata.business ? (
              <Menu.Item
                onClick={() =>
                  handleRouter(`/edit/${userdata.name}?id=${userdata.business}`)
                }
                key="editprofile"
                icon={<EditOutlined />}
              >
                  Edit Business Profile
              </Menu.Item>

            ) : (
              <Menu.Item
                onClick={() => handleRouter("/job/profile")}
                key="jobprofile"
                icon={<EditOutlined />}
              >
                Job Profile
              </Menu.Item>

            )}

            {userdata && userdata.business && (

              <Menu.Item
                onClick={() => handleRouter("/job/postjob")}
                key="postjob"
                icon={<PiSuitcaseSimple />}
              >
                Post Job
              </Menu.Item>

            )}

            {userdata && userdata.business ? (
              <Menu.Item
                onClick={() => handleRouter("/job/employerdash")}
                key="emdashboard"
                icon={<RxDashboard />}
              >
                Job Dashboard
              </Menu.Item>
            ) : (

              <Menu.Item
                onClick={() => handleRouter("/job/employeedash")}
                key="emdashboard"
                icon={<RxDashboard />}
              >
                Job Dashboard
              </Menu.Item>

            )}

            {userdata && userdata.business && (
              <Menu.Item
                onClick={() => handleRouter("/plan/dashboard")}
                key="transaction"
                icon={<CreditCardOutlined />}
              >
                My Plan
              </Menu.Item>
            )}

            <Divider />

              <Menu.Item
                onClick={() => handleRouter("/plan")}
                key="plan"
                icon={<CreditCardOutlined />}
              >
                Premium Plan
              </Menu.Item>

              <Menu.Item
                onClick={() => handleRouter("/leads")}
                key="leads"
                icon={<StarOutlined />}
              >
               Leads
              </Menu.Item>

              <Menu.Item
                onClick={() => handleRouter("/notification")}
                key="notifications"
                icon={<BellOutlined />}
              >
                Notifications
              </Menu.Item>

              <Menu.Item
                onClick={() => handleRouter("/about/policy")}
                key="policy"
                icon={<FileTextFilled />}
              >
                Policy
              </Menu.Item>

            <Divider />

              <Menu.Item
                onClick={() => handleRouter("/about/Contact")}
                key="support"
                icon={<CustomerServiceOutlined />}
              >
                Customer Support
              </Menu.Item>

              <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            
          </Menu>
          
        ) : (
          <div>
            <Button
              block
              style={{ background: "#3c89d0", color: "white" }}
              onClick={() => {
                setLogin(true);
                setOpen(false);
              }}
            >
              Login
            </Button>
          </div>
        )}
      </Drawer>

      <LoginForm visible={login} onClose={() => setLogin(false)} />
    </>

  );
};


export default BottomDrawer;
