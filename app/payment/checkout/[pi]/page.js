
"use client";
import { Button, Col, Drawer, Row } from 'antd';
import React, { useState } from 'react';
import { product } from '@/data/data';
import SoftwarePage from '../SoftwarePage';
import { useParams } from 'next/navigation';
import CheckoutForm from '../CheckoutForm';



function Page() {
    const param = useParams()
    const [open, setOpen] = useState(false)
   
    const data = product.filter((item) => item.product_id === parseInt(param.pi))
    const filterData = data[0]

    return (
        <div className='relative'>
            <Row className='relative' gutter={[0, 12]}>
                <Col lg={16} xxl={16} md={16} sm={24} xs={24} xl={16}>
                    <SoftwarePage data={filterData} />
                </Col>
                <Col lg={8} xxl={8} md={8} sm={0} xs={0} xl={8} className='relative'>
                    <div className='p-8 sticky top-10'>
                        <CheckoutForm data={filterData} />
                    </div>
                </Col>
            </Row>
            
            <div className=' sm:invisible fixed w-full p-2 z-50 bottom-0 left-0'>
                <Button block size='large' type='primary' onClick={() => setOpen(true)}>
                    Order
                </Button>
                <Drawer open={open} placement='bottom' height="55%" onClose={() => setOpen(false)}>
                    <CheckoutForm data={filterData} />
                </Drawer>
            </div>
        </div>
    );
}

export default Page;
