import React, { useState } from 'react';
import { Drawer, Menu } from 'antd';
import { CgMenuGridO } from 'react-icons/cg';
import Link from 'next/link';

const { SubMenu } = Menu;




function MenuBar1() {
    const [open, setOpen] = useState(false);

    const handleMenuClick = () => {
        setOpen(!open);
    };

    
    return (
        <>
            <CgMenuGridO className='text-xl' onClick={handleMenuClick} />
            <Drawer
                placement="left"
                onClose={() => setOpen(false)}
                open={open}
            >
                <Menu mode="vertical" onClick={() => setOpen(false)}>
                    <Menu.Item key="1">
                        <Link href="/">
                            Home
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="2">
                        <Link href="/about">
                           About Us
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <Link href="/lead">
                            Leads
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="5">
                        <Link href="/about/Contact">
                           Contact
                        </Link>
                    </Menu.Item>

                </Menu>
            </Drawer>
        </>
    );
}

export default MenuBar1;
