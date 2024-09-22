import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card, Row, Col, Space } from 'antd';
const RegistrationForm = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div style={{ width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Card title={<center ><p style={{fontSize:20}}>Registration Admin</p></center>} style={{ padding: 20, width: '100%' }} bordered>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input type='email' style={{ padding: 10 }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
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
                        <Input
                            style={{ padding: 10 }}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password2"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your re-password!',
                            },
                        ]}
                    >
                        <Input
                            style={{ padding: 10 }}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>
                    <Row justify='center' gutter={[12,12]} align='middle'>
                        <Col span={10}>
                            <Form.Item>
                                <Button size='large' style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
                                    Registration
                                </Button>
                               
                            </Form.Item>
                            <Row justify='center'>
                                <Col>
                                If you have already an account? <a href="">Login </a>
                                </Col>
                            </Row>
                          
                        </Col>
                        
                       
                    </Row>

                </Form>
            </Card>
        </div>
    );
};
export default RegistrationForm;