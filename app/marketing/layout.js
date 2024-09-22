"use client";
import React from 'react';
import { Row, Col } from 'antd';
import LayoutMarket from '@/components/users/Marketing/Layout';
import AllTab from '@/components/users/Marketing/Tags';
import { redirect } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
function Layout({ children }) {
    const { authTokens } = useAuth()
    const maintnance = false
    // if (!authTokens) {
    //     redirect('/login')
    // }


    return (<>
        {maintnance ? <Row justify='center' gutter={[0, 24]} className=' relative mb-10'>
            <Col span={22}>
                <AllTab />
            </Col>
            <Col span={24}>
                <LayoutMarket >
                    {children}
                </LayoutMarket>
            </Col>
        </Row> : <div className=' flex justify-center items-center min-h-screen'>
            <Image src={'/coming-soon.svg'} width={500} height={500} alt='' />
        </div>

        }
    </>
    )
}

export default Layout

