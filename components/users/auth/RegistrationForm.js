"use client";
import React, { useState, useContext } from 'react';
import { LockOutlined, UserOutlined, MailOutlined, MobileOutlined, FundProjectionScreenOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card, Row, Col, Space, Spin } from 'antd';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';





const RegistrationForm = () => {
    const [formdata, setFormdata] = useState({})
    const [form] = Form.useForm();
    const { registerClientUser, useloading } = useAuth();

    const onFieldsChange = (changedFields, allFields) => {
        setFormdata(changedFields)
    }
    const onFinish = (values) => {
        registerClientUser(values)
    }

    const validatePassword = (_, value) => {
        const password1 = form.getFieldValue('password');
        if (password1 && value && password1 !== value) {
            return Promise.reject(new Error('Passwords do not match'));
        } else {
            return Promise.resolve();
        }
    };

    return (
        <div className=' sm:p-8' style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Card title={<center><p style={{ fontSize: 20 }}>Sign-Up</p></center>} className=' sm:shadow-lg' style={{ padding: 20, width: '100%' }} bordered>
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        agreement: true,
                    }}
                    onFinish={onFinish}
                    onFieldsChange={onFieldsChange}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input type='text' style={{ padding: 10 }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                    </Form.Item>
                    {/* <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input type='email' style={{ padding: 10 }} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item> */}
                    <Form.Item
                        name="mobile_number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mobile number!',
                            },
                        ]}
                    >
                        <Input type='number' style={{ padding: 10 }} prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="Mobile Number" />
                    </Form.Item>
                    {/* <Form.Item
                        name="business_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your business name!',
                            },
                        ]}
                    >
                        <Input type='text' style={{ padding: 10 }} prefix={<FundProjectionScreenOutlined className="site-form-item-icon" />} placeholder="Business Name" />
                    </Form.Item> */}
                    {/* <Form.Item
                        name="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Location!',
                            },
                        ]}
                    >
                        <Input
                            style={{ padding: 10 }}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="address"
                            placeholder="Location"
                        />
                    </Form.Item> */}
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            style={{ padding: 10 }}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password2"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            { validator: validatePassword },
                        ]}
                    >
                        <Input.Password
                            style={{ padding: 10 }}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Confirm Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                    // {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I agree to<Link href='/about/Terms-Condition'>Terms and Conditions</Link>
                        </Checkbox>
                    </Form.Item>
                    <Row justify='center' gutter={[12, 12]} align='middle'>
                        <Col span={10}>
                            <Form.Item>
                                <Button disabled={useloading} size='large' style={{ width: '100%',background: '#3c89d0' }}  htmlType="submit" className="justify-center items-center login-form-button">
                                    {useloading ? <Spin
                                        indicator={
                                            <LoadingOutlined
                                                style={{
                                                    fontSize: 24,
                                                }}
                                                spin
                                            />
                                        }
                                    /> : "Registration"}
                                </Button>
                            </Form.Item>
                        </Col>

                        <Col span={24} className='text-center'>
                            <Space dir='horizontal' size={10}><p>If you already have an account? </p><Link href="/login" className=' text-blue-800'>Login</Link></Space>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default RegistrationForm;
