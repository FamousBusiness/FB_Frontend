"use client";
import { Card, Col, Row, Form, Select, Input, InputNumber, Button, ConfigProvider } from 'antd'
import React from 'react'
import Upload1 from '@/components/users/Upload';
import { useRouter } from 'next/navigation';
function Page() {
    const router = useRouter();
    const [form] = Form.useForm(); // Create a form instance
    const handleSubmit = (values) => {
        console.log(values);
    };
    return (
        <div className='p-0 bg-slate-200' >
            <Row justify='center' gutter={[24, 24]} className=' p-20'>
                <Col xs={24} sm={24} md={22} lg={21} xl={21}>
                    <Card>
                        <Form form={form} onFinish={handleSubmit}>
                            <Row gutter={[8, 8]}>
                                <Col xs={23} sm={23} md={12} lg={6} xl={6}>
                                    <Form.Item name='category'>
                                        <Select size='large' placeholder="Select Category">
                                            <Select.Option value="option1">Option 1</Select.Option>
                                            <Select.Option value="option2">Option 2</Select.Option>
                                            <Select.Option value="option3">Option 3</Select.Option>
                                            <Select.Option value="option4">Option 4</Select.Option>
                                            <Select.Option value="option5">Option 5</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <Form.Item name='condition'>
                                        <Select size='large' placeholder="Select Condition">
                                            <Select.Option value="option1">Option 1</Select.Option>
                                            <Select.Option value="option2">Option 2</Select.Option>
                                            <Select.Option value="option3">Option 3</Select.Option>
                                            <Select.Option value="option4">Option 4</Select.Option>
                                            <Select.Option value="option5">Option 5</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        name='location'>
                                        <Select size='large' placeholder="Select Location">
                                            <Select.Option value="option1">Option 1</Select.Option>
                                            <Select.Option value="option2">Option 2</Select.Option>
                                            <Select.Option value="option3">Option 3</Select.Option>
                                            <Select.Option value="option4">Option 4</Select.Option>
                                            <Select.Option value="option5">Option 5</Select.Option>
                                        </Select>
                                    </Form.Item>



                                </Col>

                                <Col span={24}>
                                    <Form.Item
                                        name='ads_title'>
                                        <Input size='large' type='text' placeholder='Ads Title' />

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
                                        <InputNumber type='number' size='large' style={{ width: '100%' }} placeholder='Mobile Number' />

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
                                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                    <Form.Item
                                        name='select_tag'
                                    >
                                        <Select size='large' placeholder="Select Tag">
                                            <Select.Option value="option1">Option 1</Select.Option>
                                            <Select.Option value="option2">Option 2</Select.Option>
                                            <Select.Option value="option3">Option 3</Select.Option>
                                            <Select.Option value="option4">Option 4</Select.Option>
                                            <Select.Option value="option5">Option 5</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Upload1 />
                                </Col>
                                <Col span={24}>
                                    <Row justify='end'>
                                        <Col >
                                            <Form.Item>
                                                <Button size='large' type='primary' htmlType='submit'>
                                                    Next
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Page