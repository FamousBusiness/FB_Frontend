"use client"
import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { Button, Drawer, Menu } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const MobileDrawer = () => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <FiMenu onClick={showDrawer} />
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <Menu mode='vertical' >
                    <Menu.Item key="/about">
                        <Link href="/about">About Us</Link>
                    </Menu.Item>
                    <Menu.Item key="/about/our-services">
                        <Link href="/about/our-service">Our Services</Link>
                    </Menu.Item>
                    <Menu.Item key="/about/Terms-Condition/seller">
                        <Link href="/about/Terms-Condition/seller">Terms & Condition For Seller</Link>
                    </Menu.Item>
                    <Menu.Item key="/about/Terms-Condition/buyer">
                        <Link href="/about/Terms-Condition/buyer">Terms & Condition For Buyer</Link>
                    </Menu.Item>
                    <Menu.Item key="/about/help">
                        <Link href="/about/return-cancellation">Return & Cancellation</Link>
                    </Menu.Item>
                    <Menu.Item key="/about/Contact">
                        <Link href="/about/Contact">Contact Us</Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </>
    );
};
export default MobileDrawer;