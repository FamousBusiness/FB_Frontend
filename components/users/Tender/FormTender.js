"use client";
import { Card, Col, Row, Form, Select, Input, InputNumber, Button, ConfigProvider } from 'antd'
import { FaFilter } from 'react-icons/fa';
import Image from 'next/image'
import React, { useState } from 'react'
import Upload1 from '@/components/users/Upload';
import { useRouter } from 'next/navigation';
import { Player } from '@lottiefiles/react-lottie-player';
import SelectCat from './SelectCat';
import Category1 from '@/components/admin/Listing/CategorySelect';
import { locations } from '@/data/data';
import AddressForm from '../editpage/ComplateAddress';



function FormTender({ color }) {

    const router = useRouter();
    const [form] = Form.useForm(); // Create a form instance

    const handleSubmit = (values) => {
        // Use router to navigate to the next page with form data as query parameters
        console.log(values);
    };

    const handlePinCodeChange = async (value) => {
        if (value.length === 6) {
            try {
                const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
                const data = response.data;
                // console.log(data);
                if (data && data.length > 0 && data[0].Status === 'Success') {
                    const placeData = data[0].PostOffice[0];
                    form.setFieldsValue({
                        city: placeData['District'],
                        state: placeData['State'],
                        locality: placeData['Block'],
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {

        }
    };
    return (
        <div className='p-10' >
            <Row justify='center' gutter={[24, 24]}>

                {/* Category */}

                <Col xs={24} sm={24} md={22} lg={21} xl={21}>

                    <Card title='Tender' style={{ background: color, boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
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
                                    <Col span={24}>
                                        <Form.Item
                                            name='ads_title'>
                                            <Input size='large' placeholder='Tender Title' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                      <AddressForm handlePinCodeChange={handlePinCodeChange}/>
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                                        <Category1 label={false} size={'large'} />
                                    </Col>

                                    <Col span={24}>
                                        <Form.Item
                                            name='details'>
                                            <Input.TextArea size='10' placeholder='Details' />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                                        <Form.Item
                                            name='mobile_number'
                                            rules={[{
                                                required: true,
                                                type: 'number'
                                            }]}
                                        >
                                            <Input size='large' style={{ width: '100%' }} placeholder='Mobile Number' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                                        <Form.Item
                                            name='email'
                                            rules={[{
                                                required: true,
                                                type: 'email'
                                            }]}
                                        >
                                            <Input size='large' type='email' style={{ width: '100%' }} placeholder='Email' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                                        <Form.Item
                                            name='whatsapp'
                                            rules={[{
                                                required: true,
                                                type: 'number'
                                            }]}>
                                            <InputNumber size='large' type='number' style={{ width: '100%' }} placeholder='Whatsapp' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                        <Form.Item
                                            name='price'>
                                            <InputNumber addonBefore={'₹'} size='large' type='number' style={{ width: '100%' }} placeholder='Price' />
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
                                    {/* <Col span={24}>
                                        <Row justify='end'>
                                            <Col >
                                                <Button size='large' type='default' htmlType='submit'>
                                                    Tender Preview
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col> */}
                                </Row>
                            </Form>
                        </ConfigProvider>
                    </Card>
                </Col>

            </Row>

        </div>
    )
}

export default FormTender