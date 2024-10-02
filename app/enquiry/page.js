"use client";
import Category1 from '@/components/admin/Listing/CategorySelect';
import { useAuth } from '@/context/AuthContext';
import { locations } from '@/data/data';
import { CategoryWiseEnquiry } from '@/utils/Enquiry';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import LoginForm from '@/utils/LandingPageModel';
import { Button, Card, Col, Divider, Flex, Form, Input, Row, Select, Space, Typography, notification } from 'antd';
import { Option } from 'antd/es/mentions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { CiMail } from "react-icons/ci";
import { BsTelephoneFill } from 'react-icons/bs';
import { TbMapPinCode } from "react-icons/tb";
import { FaUser } from 'react-icons/fa';
import CustomSelect from '@/components/Custom/SelectCustom';
import CategorySelect from '@/components/admin/Listing/CategorySelect';




function Page() {
    const { userdata, authTokens } = useAuth()
    const { locationState } = useGlobalState()
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [form] = Form.useForm();
    const Search = useSearchParams()
    const category = decodeURIComponent(Search.get('type'));
    const city= decodeURIComponent(Search.get('city'));
    const state= decodeURIComponent(Search.get('state'));
    const pincode=decodeURIComponent(Search.get('pincode'));


    const onFinish = async (values) => {
        // console.log(values);
        try {
              let datasend;
            if (category) {
                datasend = {
                    ...values,
                    category: category,
                    state: state ? state : locationState.state
                };
                form.resetFields();
            } else {
                datasend = {
                    ...values,
                    state: state ? state : locationState.state
                };
            }
            
            const data = await CategoryWiseEnquiry(datasend);
            if (data.ok) {
                notification.info({
                    message: "Enquiry Posted successfully",
                    placement: 'bottomLeft',
                    duration: 1000
                });
                
            }
            else {
                notification.error({
                    message: "Something went wrong",
                    placement: 'bottomLeft'
                });
            }
        } catch (error) {
            console.error('Error submitting enquiry:', error);
        }
    };


     useEffect(() => {
        // Update form fields when category or city changes in the URL
        form.setFieldsValue({
            city: city ? city : undefined,
        });
    }, [category, city, form]);



    return (
        <div className=' min-h-screen bg-white'>
            <Row justify='center' gutter={[0, 36]}>
                <Col span={22} className=' top-6'>
                    <Link className="text-lg sm:text-3xl font-bold" href="/" prefetch scroll={false}>
                        <span className='text-blue-600'>Famous </span>
                        <span className='text-green-700'>Business</span>
                    </Link>
                    <Divider />
                </Col>

                <Col span={23}>
                    <Row justify='space-around' align='top'>
                        <Col xs={0} sm={0} md={12} xl={12} xxl={12}>
                            <Flex justify='space-around' align='center' vertical>
                                <p className=' text-center text-lg mb-6 text-green-600 drop-shadow-lg font-bold sm:text-4xl'>
                                    India`s Largest B2B And B2C Business Platform
                                </p>
                                <p className=' text-3xl font-semibold text-center text-black'>Share Your Requirement to Get the Best Deals and Exclusive Offers with Trusted Seller</p>
                                <Image src='/SignUp/web-search.svg' width={500} height={500} alt='message' />
                            </Flex>
                        </Col>

                        <Col xs={24} sm={24} md={10} xl={10} xxl={10} >
                            <Card className=' shadow-xl' style={{ borderRadius: '20px', borderWidth: 2, borderColor: 'blue' }}>
                                <div className=' text-center'>

                                    <Typography.Title level={3} lang='English'>
                                        Get Instant Quatation From Verified Sellers
                                    </Typography.Title>
                                </div>

                                <Form form={form} onFinish={onFinish} initialValues={{ name: userdata?.name, mobile_number: userdata?.number}}>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item rules={[{
                                                required: true,
                                                message: 'Enter your name!'
                                            }]} name='name'>
                                                <Input
                                                    placeholder='Name'
                                                    addonBefore={<FaUser className='text-gray-500' />}
                                                    className='w-full'
                                                    type='text'
                                                    size='large'
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item
                                                rules={[{
                                                    required: true,
                                                    message: 'Enter your number!'
                                                }]} name='mobile_number'>
                                                <Input
                                                    addonBefore={<BsTelephoneFill className='text-gray-500' />}
                                                    className='w-full'
                                                    size='large'
                                                />
                                            </Form.Item>
                                        </Col>

                                        {/* <Col span={24}>
                                            {category? null : <Category1 label={false} />}
                                        </Col> */}

                                        <Col span={24}>
                                            <CategorySelect label={false} />
                                        </Col>
                                        

                                        <Col span={24}>
                                            <Form.Item rules={[{
                                                required: true,
                                                message: 'Select Cities'
                                            }]} name='city'>
                                               <CustomSelect mode={'multiple'}/>
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item
                                                rules={[{
                                                    required: true,
                                                    message: 'Enter your requirement!'
                                                }]}
                                                name='requirements'
                                            >
                                                <Input.TextArea placeholder='Requirement ' rows={5} maxLength={100} showCount style={{ color: 'black' }} className='w-full' />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item>
                                                <Button style={{background:'#3c89d0',color:'white'}} size='large' className=' w-full font-bold' htmlType='submit'>Submit</Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                 <Col xs={24} sm={24} md={0} xl={0} xxl={0}>
                            <Flex justify='space-around' align='center' vertical>
                                <p className=' text-center text-lg mb-6 text-green-600 drop-shadow-lg font-bold sm:text-4xl'>
                                    India`s Largest B2B And B2C Business Platform
                                </p>
                                <p className=' text-3xl font-semibold text-center text-black'>Share Your Requirement to Get the Best Deals and Exclusive Offers with Trusted Seller</p>
                                <Image src='/SignUp/web-search.svg' width={500} height={500} alt='message' />
                            </Flex>
                        </Col>
            </Row>
            <LoginForm onClose={() => setOpen(false)} visible={open} />
        </div>

    )
}

export default Page
