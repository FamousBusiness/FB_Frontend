"use client"
import Address from '@/components/users/editpage/Address'
import { useAuth } from '@/context/AuthContext';
import { Row, Col } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'




function Page() {
    const { user, userdata } = useAuth()
    const router      = useRouter()
    const searchParam = useSearchParams()
    const id          = searchParam.get('id');
    const brand       = searchParam.get('brand');


    useEffect(() => {
        if (!user) {
            router.push('/');

        } else if (user.user_id !== 1 && user.user_id !== 2 && (userdata && userdata.business !== parseInt(id))) {
            router.push('/');
        }
    }, [user, id, router, userdata]);


    return (
        <div className=' relative overflow-hidden'>
            <Row justify='center'>
                <Col xl={18} xxl={18} sm={23} xs={23} lg={18}>
                    <Address id={id} brand={brand} />
                </Col>
            </Row>
        </div>
    )
};


export default Page;
