"use client"

import LoginForm from "@/components/users/auth/LoginForm";
import {  Col, Flex, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



/// Login using Password
function PasswordLoginPage () {
      return (
        <Row justify='center' gutter={[0, 24]}>
            <Col xl={23} xxl={23} sm={23} xs={24} lg={23} >
                <div className=' min-h-screen bg-white'>
                    <Row justify='center' gutter={[0, 36]}>

                        <Col span={22} className=' top-6'>
                            <Link className="text-lg sm:text-3xl font-bold" href="/" prefetch scroll={false}>
                                <span className='text-blue-600'>Famous </span>
                                <span className='text-green-700'>Business</span>
                            </Link>
                            <hr className=' my-2' />
                        </Col>

                        <Col span={23}>
                            <Row justify='center'>
                                <Col xs={0} sm={0} md={18} xl={12} xxl={12}>
                                <Flex vertical align='center' gap={10}>
                                    <div className=' text-center text-xl  text-green-600 drop-shadow-lg font-bold sm:text-4xl'>
                                    India&apos;s Largest B2B And B2C Business Portal
                                    </div>
                                    <Image src='/Model.png' alt='model' width={400} height={400} />
                                </Flex>

                                </Col>
                                <Col xs={24} sm={24} md={18} xl={10} xxl={10} >
                                {/* <div className=' font-black text-sm sm:text-3xl space-x-2 text-slate-700 font-sans text-center'><span className=' font-bold text-orange-600 font-dark'>Log in</span> now to access the <span className=' font-bold text-orange-600 font-dark'>finest deals</span> and
                                    <span className=' font-bold text-orange-600 font-dark'>exclusive offers.</span>
                                </div> */}
                                <LoginForm />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={0}>
                            <div className=' text-center text-lg '>
                                All rights reserved By Webzotica Business Famous Software Private Limited.
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>

      );
};


export default PasswordLoginPage;