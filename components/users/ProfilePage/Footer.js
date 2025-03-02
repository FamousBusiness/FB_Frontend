"use client";
import { Player } from '@lottiefiles/react-lottie-player'
import { Col, Flex, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaSquareFacebook } from 'react-icons/fa6';




function Footer({ BusinessName }) {

    const pathName = usePathname()

    return (<>
        {pathName.includes('/plan') || pathName.includes('/login') ? null :
            <div className=" relative dark:text-black sm:rounded-2xl shadow-sm m-0 sm:m-4 bg-white pt-6 pb-6">
                <Row justify='center' align='middle'>
                    <Col span={23}>
                        <Row justify='start' align='top'>
                            <Col span={18} >
                                <Row justify='start' gutter={[{ xs: 8, sm: 8, md: 8, lg: 24, xl: 24 }, 12]}>
                                    <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                                        <div className=" text-3xl text-start font-extrabold text-blueGray-700">{BusinessName ? `${BusinessName.business_name}` : (<><span className=' text-blue-600'>Famous </span><span className=' text-green-700'>Business</span></>)}</div>
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                                        {BusinessName ? <div className=" text-lg font-bold text-blueGray-700">{BusinessName.business_name}</div> :

                                            <div><span className=' font-black text-blue-600'>Famous</span><span className=' font-black text-green-700'>Business</span></div>}
                                        <div className=" text-sm font-medium  text-blueGray-600">Thank you for being a valued customer!</div>
                                    </Col>
                                    <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                                        <Row align='middle' gutter={[{ xs: 8, sm: 8, md: 8, lg: 24, xl: 24 }, 12]}>
                                            <Col span={3}  >
                                                <Player src='/Footer/secure.json' autoplay loop />
                                            </Col>
                                            <Col span={3}>
                                                <Image src='/payments/visa.svg' width={200} height={200} alt='visa' />
                                            </Col>
                                            <Col span={3}>
                                                <Image src='/payments/payment.svg' width={200} height={200} alt='paytm' />
                                            </Col>
                                            <Col span={3}>
                                                <Image src='/payments/mastercard.svg' width={200} height={200} alt='master' />
                                            </Col>
                                            <Col span={3}>
                                                <Image src='/payments/upi.svg' width={200} height={200} alt='upi' />
                                            </Col>
                                            <Col span={3}>
                                                <Image src='/payments/paytm.svg' width={100} height={100} alt='paytm' />
                                            </Col>
                                            <Col span={3}>
                                                <Image src='/payments/google-pay.svg' width={100} height={100} alt='gpay' />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className=' relative'>
                                <Row justify='center' >
                                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                                        <Player src='/Footer/main.json' autoplay loop />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0} ><div className=' font-semibold  '>Make In India</div></Col>
                                    {/* <Col xs={0} sm={0} md={0} lg={18} xl={18} xxl={18}>
                  <div className=' text-center font-semibold text-sm text-gray-800'>MAKE IN INDIA MAKE FOR INDIA</div>
                </Col> */}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} md={24} sm={24} lg={0} xl={0} xxl={0}>
                        <Row align='middle' justify='space-around'>
                            <Col span={3}  >
                                <Player src='/Footer/secure.json' autoplay loop />
                            </Col>
                            <Col span={3}>
                                <Image priority src='/payments/visa.svg' width={200} height={200} alt='visa' />
                            </Col>
                            <Col span={3}>
                                <Image priority src='/payments/payment.svg' width={200} height={200} alt='paytm' />
                            </Col>
                            <Col span={3}>
                                <Image priority src='/payments/mastercard.svg' width={200} height={200} alt='master' />
                            </Col>
                            <Col span={3}>
                                <Image priority src='/payments/upi.svg' width={200} height={200} alt='upi' />
                            </Col>
                            <Col span={3}>
                                <Image priority src='/payments/paytm.svg' width={100} height={100} alt='paytm' />
                            </Col>
                            <Col span={3}>
                                <Image priority src='/payments/google-pay.svg' width={100} height={100} alt='gpay' />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>

                        <Row justify='center' align='top' gutter={[12, 12]}>

                            {/* <!--First links section--> */}
                            <Col  >

                                <Link href="/about" className="text-neutral-800 ml-2 dark:text-neutral-200"
                                >
                                    About Us
                                </Link>
                            </Col>

                            {/* <!--Second links section--> */}
                            <Col   >

                                |<Link href="/about/policy" className="text-neutral-800 ml-2 dark:text-neutral-200"
                                >
                                    Privacy Policy
                                </Link>



                            </Col>

                            {/* <!--Third links section--> */}
                            <Col  >

                                |<Link href="/about/Terms-Condition" className="text-neutral-800 ml-2 dark:text-neutral-200"
                                >
                                    Terms and Conditions
                                </Link>



                            </Col>

                            {/* <!--Fourth links section--> */}
                            <Col  >

                                |<Link href="/about/Cancellation-and-Refund" className="text-neutral-800 ml-2 dark:text-neutral-200"
                                >
                                    Cancellation and Refund
                                </Link>



                            </Col>

                            <Col  >

                                |<Link href="/about/shipment-and-delivery" className="text-neutral-800 ml-2 dark:text-neutral-200"
                                >
                                    Shipment and Delivery
                                </Link>

                            </Col>
                            <Col  >

                                |<Link href="/about/shipment-and-delivery" className="text-neutral-800 ml-2 dark:text-neutral-200"
                                >
                                    Shipment and Delivery
                                </Link>

                            </Col>
                            <Col  >

                                |<Link href="/about/Contact" className="text-neutral-800 ml-2 dark:text-neutral-200"
                                >
                                    Contact Us
                                </Link>

                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>

                        <Flex
                            justify='center'
                            className="w-full mt-4 bg-neutral-100 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-100">
                            Copyright 2023-24 All Rights Reserved
                            <a
                                className="text-neutral-800 ml-2 dark:text-neutral-400"
                                href="https://www.famousbusiness.in">
                                Webzotica Business Famous Software Private Limited.
                            </a>
                            <Link href='/about/policy' className=' mx-1'>Privacy</Link> | <Link href='/about/Terms-Condition' className=' mx-1'>Terms</Link>
                            <Link href='https://www.facebook.com/profile.php?id=61555443724142'>
                                <FaSquareFacebook className=' text-lg hover:translate-y-1 duration-100' />
                            </Link>
                        </Flex>
                    </Col>
                </Row>

            </div>}
    </>
    )
}

export default Footer