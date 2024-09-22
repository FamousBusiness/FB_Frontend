"use client"
import Category1 from '@/components/admin/Listing/CategorySelect';
import { locations } from '@/data/data';
import { Button, Card, Col, Collapse, Flex, Form, Input, InputNumber, Row, Select, Typography, Upload } from 'antd'
import React, { useState } from 'react'
import App from './Plan';
import { PlusOutlined } from '@ant-design/icons';
import Paragraph from 'antd/es/typography/Paragraph';
import Link from 'next/link';
import { showRazorpay } from '@/utils/RazorPayApiUtils';

function Page() {
    const [form] = Form.useForm();
    const [plan, setPlan] = useState({});
    const onFinish = (values) => {
        const data = {
            plan: plan,
            form: values,
        }
        showRazorpay(data);
    }

    const handleplan = (value) => {
        console.log('active Plan: ' + value);
        setPlan(value);
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (

        <Row justify='center' gutter={[0, 12]}>
            <Col span={18} >
                <Link className="text-lg sm:text-3xl font-bold" href="/" prefetch scroll={false}>
                    <span className='text-blue-600'>Famous </span>
                    <span className='text-green-700'>Business</span>
                </Link>
            </Col>
            <Col lg={18} xxl={18} sm={24} xs={24} xl={18}>
                <Card style={{ borderRadius: 0 }} bordered>
                    <Form onFinish={onFinish} requiredMark='optional' layout='vertical' form={form} >
                        <Row gutter={12}>
                            <Col lg={18} md={18} xxl={18} sm={24} xs={24} xl={18}>
                                <Row gutter={[12, { xs: 0, sm: 0, md: 24, lg: 32 }]}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Category1 required={true} tooltip="This is a required field" label={true} />
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item required tooltip="This is a required field" label="Condition" name='condition'>
                                            <Select style={{ borderRadius: 0 }} placeholder="Select Condition">
                                                <Select.Option value="Almost Like New">Almost Like New</Select.Option>
                                                <Select.Option value="Brand New">Brand New</Select.Option>
                                                <Select.Option value="Gently used">Gently used</Select.Option>
                                                <Select.Option value="Heavily used">Heavily used</Select.Option>
                                                <Select.Option value="Unboxed">Unboxed</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            required tooltip="This is a required field"
                                            label="Title"
                                            name='ads_title'>
                                            <Input style={{ borderRadius: 0 }} type='text' placeholder='Ads Title' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item
                                            label="City"
                                            name='city'
                                            required tooltip="This is a required field"
                                        >
                                            <Select style={{ borderRadius: 0 }} placeholder="Select City">
                                                {locations.map((location) => <Select.Option key={location} value={location}>{location}</Select.Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            required tooltip="This is a required field"
                                            label="Mobile Number"
                                            name='mobile_number'>
                                            <Input style={{ borderRadius: 0 }} placeholder='Mobile Number' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            required tooltip="This is a required field"
                                            label="Email"
                                            name='email'>
                                            <Input style={{ borderRadius: 0 }} placeholder='Email' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            label="Whatsapp Number"
                                            name='whatsapp'>
                                            <Input style={{ borderRadius: 0 }} placeholder='Whatsapp' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            required tooltip="This is a required field"
                                            label="Price"
                                            name='price'>
                                            <Input style={{ borderRadius: 0 }} placeholder='Price' />
                                        </Form.Item>
                                    </Col>
                                    {/* <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item
                                            required tooltip="This is a required field"
                                            label="GST"
                                            name='gst'>

                                        </Form.Item>
                                    </Col> */}
                                </Row>
                            </Col>
                            <Col lg={6} xxl={6} md={6} sm={24} xs={24} xl={6}>
                                <Row justify='center' gutter={[0, 12]}>
                                    <Col span={24}>
                                        <Flex justify='center'><Typography.Text type='secondary'>You can add up to 5 photos</Typography.Text> </Flex>
                                        <div className=' max-h-40 p-2 min-w-xl overflow-auto relative' style={{ overflowX: 'auto', overflowY: 'scroll' }}>
                                            <Form.Item name='products' required valuePropName="fileList" getValueFromEvent={normFile}>
                                                <Upload maxCount={5} listType="picture-card">
                                                    <button
                                                        style={{
                                                            border: 0,
                                                            background: 'none',
                                                        }}
                                                        type="button"
                                                    >
                                                        <PlusOutlined />
                                                        <div
                                                            style={{
                                                                marginTop: 8,
                                                            }}
                                                        >
                                                            Upload
                                                        </div>
                                                    </button>
                                                </Upload>
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <App handlePlan={handleplan} />
                                    </Col>
                                    <Col span={22}>
                                        <Form.Item>
                                            <Button htmlType='submit' type='primary' block size='large'>POST AD</Button>
                                        </Form.Item>
                                    </Col>
                                    <Col span={22}>
                                        <Paragraph>By clicking &quot;Post Ad&quot;, you agree to our <Link href='/about/Terms-Condition' >Terms of Use</Link> and <Link href='/about/policy'>Privacy Policy</Link></Paragraph>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Page