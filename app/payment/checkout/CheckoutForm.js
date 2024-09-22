
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/utils/LandingPageModel';
import { LockOutlined } from '@ant-design/icons';
import { Col, Flex, Row, Spin } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import Axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

function CheckoutForm({ data }) {
    const amout = parseInt(data.price);
    const Gst = (amout * 18) / 100;
    const total = amout + Gst;
    const [open, setOpen] = useState(false)
    const { authTokens } = useAuth()
    const [checkout, setCheckOut] = useState(false);
    const router = useRouter()
    const showRazorpay = async () => {
        // await loadScript();
        let bodyData = new FormData();
        bodyData.append("amount", amout);
        bodyData.append("name", data.product_name);
        try {
            setCheckOut(false);
            const { data } = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/soft-api/payment-initiate/`, bodyData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
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

    const HandlePayment = () => {
        if (checkout) return;  // Prevent multiple clicks during payment processing
        setCheckOut(true);
        if (authTokens) {
            showRazorpay();
        }
        else {
            setOpen(true);
        }
    }
    return (
        <div className=' p-8  bg-slate-100'>
            <Row gutter={[0, 24]} >
                <Col span={24} className=' text-xl font-black'>
                    Order Summary
                </Col>
                <Col span={24} className=' text-lg font-thin'>
                    <div >Items</div>
                    <hr dir='vertical' className=' mt-3 ' />
                </Col>
                <Col span={24}>
                    <Row justify='space-between' gutter={[0, 24]}>
                        <Col span={9} className=' text-base font-bold'>
                            Amout(INR)
                        </Col>
                        <Col className=' text-base font-bold' span={9}>
                            ₹ {amout}
                        </Col>
                        <Col className=' text-base font-bold' span={9}>
                            GST(18%)
                        </Col>
                        <Col className=' text-base font-bold' span={9}>
                            ₹ {Gst}
                        </Col>
                        <Col span={24}>
                            <hr />
                        </Col>
                        <Col span={9} className=' text-lg font-bold'>
                            Subtotal(INR)
                        </Col>
                        <Col span={9} className=' text-lg font-bold'>
                            ₹ {total}
                        </Col>
                        <Col span={24} className=' text-center'>
                            Subtotal does not include applicable taxes.
                        </Col>
                        <Col span={24}>
                            <div onClick={HandlePayment} className=' py-4 cursor-pointer text-center w-full bg-indigo-500 rounded-md text-white font-bold text-xl'>
                                {checkout ? <Spin /> : 'Order Now'}
                            </div>
                        </Col>
                        {/* Secure payment icons */}
                        <Col lg={24} md={24} xxl={24} sm={0} xs={0} xl={24}>
                            <Row justify='center' align='middle' gutter={[10, 12]}>
                                <Col span={24}>
                                    <Flex gap={4} justify='center' align='center'>
                                        <Col>
                                            <LockOutlined className=' text-lg' /></Col><Col><div className=' text-lg font-bold'>Secure Payment</div>
                                        </Col>
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
            <LoginForm visible={open} onClose={() => setOpen(false)} />
        </div>
    )
}

export default CheckoutForm