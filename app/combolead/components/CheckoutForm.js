
"use client";
import Category1 from '@/components/admin/Listing/CategorySelect';
import LoginForm from '@/components/users/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { locations } from '@/data/data';
import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Drawer, Flex, Form, Row, Select, Skeleton, message } from 'antd'
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function CheckoutForm({ data }) {
    const [open, setOpen] = useState(false);
    const [isloggedin, setIsLoggedIn] = useState(false);
    const { authTokens } = useAuth();
    const [checkOut, setCheckOut] = useState(false);
    const [locate, setLoacte] = useState([])
    const router = useRouter()

    const handleChange = (value) => {
        console.log('Received', value);
        setLoacte(value);
        console.log('Received', locate);
    }

    const showRazorpay = async (values) => {
        const comdata = {
            amount: data ? data.data.price : null,
            combo_lead_id: data ? data.data.id : null,
            cities: locate,
            ...values
        }
        // console.log('Receive', comdata)

        try {
            setCheckOut(false);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/lead-api/combo-lead-payment/`, comdata, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`
                },
            });

            const redirect = data.payment_response.redirect_url;
            router.push(redirect)
        }
        catch (error) {
            console.error(error);
        }
    };

    const onFinish = (values) => {
        if (locate.length === 0) {
            message.warning('Please Select the cities');
            return;
        }
        if (checkOut) return;  // Prevent multiple clicks during payment processing
        setCheckOut(true);
        console.log(values);
        if (authTokens) {
            showRazorpay(values);
        }
        else {
            setIsLoggedIn(true);
        }

    }

    return (
        <div className=' sm:p-8  bg-white'>
            <Row gutter={[0, 12]} >
                <Col span={24} >
                    <p className=' text-xl font-black'>
                        Order Summary
                    </p>
                </Col>
                <Col span={24}>
                    <Divider />
                </Col>
                <Col span={24}>
                    <Row justify='space-between' gutter={[0, 10]}>
                        <Col span={9} >
                            <p className=' text-base font-bold'> Leads</p>
                        </Col>
                        <Col span={9}>
                            <p className=' text-base font-bold'>{data ? `${data.data.lead_quantity}` : <Skeleton.Input active />}</p>
                        </Col>
                        <Col span={24}>
                            <Divider />
                        </Col>
                        <Col span={9} >
                            <p className=' text-base font-bold'>Amout(INR)</p>
                        </Col>
                        <Col span={9}>
                            <p className=' text-base font-bold'>{data ? `₹ ${data.data.price}` : <Skeleton.Input active />}</p>
                        </Col>
                        <Col span={24}>
                            <Divider />
                        </Col>
                        <Col span={24}>
                            <Form onFinish={onFinish} layout='vertical'>
                                <Row gutter={[0, 12]}>
                                    <Col span={24}>
                                        <Category1 />
                                    </Col>
                                    <Col span={24}>

                                        <Select
                                            onChange={handleChange}
                                            mode='multiple'
                                            size='large'
                                            style={{ width: '100%' }}
                                            placeholder="Select location">
                                            {locations.map((location) => <Select.Option key={location} value={location}>
                                                {location}
                                            </Select.Option>)}
                                        </Select>

                                    </Col>

                                    <Col span={24}>
                                        <Form.Item>
                                            <Button loading={checkOut} style={{background:'#3c89d0',color:'white'}} htmlType='submit' block size='large'>
                                                Buy Now
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>

                            </Form>
                        </Col>
                        {/* Secure payment icons */}
                        <Col lg={24} md={24} xxl={24} sm={0} xs={0} xl={24}>
                            <Row justify='center' align='middle' gutter={[10, 12]}>
                                <Col span={24}>
                                    <Flex gap={4} justify='center' align='center'>
                                        <Col><LockOutlined className=' text-lg' /></Col><Col><div className=' text-lg font-bold'>Secure Payment</div></Col>
                                    </Flex>
                                </Col>
                                <Col span={3}>
                                    <Image priority src='/payments/visa.svg' width={100} height={100} alt='visa' />
                                </Col>
                                <Col span={3}>
                                    <Image priority src='/payments/payment.svg' width={100} height={100} alt='payment' />
                                </Col>
                                <Col span={3}>
                                    <Image priority src='/payments/mastercard.svg' width={100} height={100} alt='master' />
                                </Col>
                                <Col span={3}>
                                    <Image priority src='/payments/upi.svg' width={100} height={100} alt='upi' />
                                </Col>
                                <Col span={3}>
                                    <Image priority src='/payments/paytm.svg' width={100} height={100} alt='paytm' />
                                </Col>
                                <Col span={3}>
                                    <Image priority src='/payments/google-pay.svg' width={100} height={100} alt='gpay' />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

            </Row>
            <Drawer title="Login To Order" open={isloggedin} onClose={() => setIsLoggedIn(false)} width="60%" placement='bottom'>
                <LoginForm />
            </Drawer>
        </div>
    )
}

export default CheckoutForm