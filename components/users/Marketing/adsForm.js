"use client";
import { Card, Col, Row, Form, Select, Input, InputNumber, Button, ConfigProvider } from 'antd'
import { FaFilter } from 'react-icons/fa';
import React, { useState } from 'react'
import Upload1 from '@/components/users/Upload';
import { useRouter } from 'next/navigation';
import { locations } from '@/data/data';
import { Option } from 'antd/es/mentions';
import Category1 from '@/components/admin/Listing/CategorySelect';

function FormMarket() {
    const router = useRouter();
    const [form] = Form.useForm(); // Create a form instance
    const handleSubmit = (values) => {
        console.log(values);

    };
    return (
        <div className='p-10' >
            <Row justify='center' gutter={[24, 24]}>
                <Col xs={24} sm={24} md={22} lg={21} xl={21}>
                    <Card>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        colorPrimary: '#00b96b',
                                    },
                                    Input: {
                                        colorPrimary: 'green',
                                    }
                                },
                            }}
                        >
                            <Form form={form} onFinish={handleSubmit}>
                                <Row gutter={[8, 8]}>
                                    <Col xs={23} sm={23} md={12} lg={6} xl={6}>
                                        <Category1 label={false} />
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                        <Form.Item name='city'>
                                            <Select size='large' placeholder="Select city">
                                                {locations.map((location) => <Option value={location} key={location}>
                                                    {location}
                                                </Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name='ads_title'>
                                            <Input size='large' placeholder='Ads Title' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name='details'>
                                            <Input.TextArea size='10' placeholder='Details' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                                        <Form.Item
                                            name='mobile_number'>
                                            <InputNumber size='large' style={{ width: '100%' }} placeholder='Mobile Number' />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                                        <Form.Item
                                            name='email'>
                                            <Input size='large' type='email' style={{ width: '100%' }} placeholder='Email' />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                                        <Form.Item
                                            name='whatsapp'>
                                            <InputNumber size='large' type='number' style={{ width: '100%' }} placeholder='Whatsapp' />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                        <Form.Item
                                            name='price'>
                                            <InputNumber size='large' type='number' style={{ width: '100%' }} placeholder='Price' />

                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                        <Form.Item
                                            name='offer'>
                                            <InputNumber size='large' type='number' style={{ width: '100%' }} placeholder='Offer' />

                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Upload1 />
                                    </Col>
                                </Row>
                            </Form>
                        </ConfigProvider>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default FormMarket