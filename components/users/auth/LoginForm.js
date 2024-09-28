import React from 'react';
import { FacebookFilled, GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Row, Col, Spin, Space, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { MdBusiness } from 'react-icons/md';




const LoginForm = () => {
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
        <div style={{ marginTop: '70px' }}>
            <Row justify='space-between' gutter={[0, 12]}
            >
                <Col xxl={11} sm={0} xs={0} xl={11} lg={11}>

                    <Button block size='large' style={{ fontWeight: 700, color: "white", background: "#FB8C00" }} icon={<MdBusiness />} href="/registration">Register as Business</Button>

                </Col>

                <Col xxl={11} sm={0} xs={0} xl={11} lg={11}>
                    <Button size='large' block href='/registration/user' style={{ background: "green", fontWeight: 700, color: "white" }} icon={<UserOutlined />} >Register as User</Button>
                </Col>
                
                <Col span={24}>
                    <Card className=' sm:shadow-lg' title={<center><p style={{ fontSize: 20 }}>Login</p></center>} bordered>
                        <Form
                            name="normal_login"
                            className="login-form"
                            // initialValues={{
                            //     remember: true,
                            // }}
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
                    </Card>

                </Col>
                <Col xxl={0} sm={24} xs={24} xl={0} lg={0}>

                    <Button block size='large' style={{ fontWeight: 700, color: "white", background: "#FB8C00" }} icon={<MdBusiness />} href="/registration">Register as Business</Button>
                </Col>
                <Col xxl={0} sm={24} xs={24} xl={0} lg={0}>
                    <Button size='large' block href='/registration/user' style={{ background: "green", fontWeight: 700, color: "white" }} icon={<UserOutlined />} >Register as User</Button>
                </Col>
            </Row>

        </div>
    );
};
export default LoginForm;