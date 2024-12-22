import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';










export default function LoginWithPassword({onClose}) {
    const { loginUser, useloading } = useAuth();

    const onFinish = (values) => {
        // Check if the input value is an email or a mobile number
        const isEmail = values.mobile_number.includes('@');

        // Prepare the data object for submission based on the input type
        let data = {};
        if (isEmail) {
            data = {
                email: values.mobile_number,
                password: values.password,
            };
        } else {
            data = {
                mobile_number: values.mobile_number,
                password: values.password,
            };
        }

        // Call loginUser with the appropriate data
        loginUser(data);
        // console.log('data', data)
        // console.log('useloading', useloading)

        if (!useloading && data) {
            onClose()
        }
    };

    


    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
                color: 'white'
            }}
            spin
        />
    );


    return (
        <Row justify='space-between' align='middle' gutter={12}>
            <Col sm={24} xs={24} md={12} xxl={12} lg={12} xl={12}>
                <div className=' p-4 sm:p-8'>
                    <Form
                        className="login-form"
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="mobile_number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Mobile Number or Email!',
                                },
                            ]}
                        >
                            <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Mobile Number / Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                size='large'
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Link className=' font-sans font-semibold ' href="/login/forgot">
                                Forgot password?
                            </Link>
                        </Form.Item>
                        
                        <Row justify='center' gutter={[12, 12]} align='middle'>
                            <Col span={10}>
                                <Row justify='center'>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Button disabled={useloading} shape='round' size='large' style={{ width: '100%',       background: '#3c89d0', color: 'white' }} htmlType="submit" >
                                                {useloading ? <Spin indicator={antIcon} /> : "Log in"}
                                            </Button>
                                        </Form.Item>

                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </Col>
        </Row>
    );
};