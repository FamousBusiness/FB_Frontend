
import React, { useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined, MobileOutlined, FundProjectionScreenOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card, Row, Col, Space, Spin, Result } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ChangePass = () => {

    const router = useRouter()
    const [formdata, setFormdata] = useState({})
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(true);


    const onFieldsChange = (changedFields, allFields) => {
        setFormdata(changedFields)
    }
    const onFinish = async (values) => {
        try {
            // const { password } = values;

            // Assume you have an authentication token stored in localStorage
            const token = localStorage.getItem('authToken');

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/changepassword/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get("accessToken")}`, // Include the authentication token in the headers
                },
                body: JSON.stringify(values), // Pass the new password to the backend
            });
 
            if (res.ok) {
                setSuccess(false);
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Password change failed');
            }
        } catch (err) {
            setError(err.message || 'Password change failed');
        }
    };


    const validatePassword = (_, value) => {
        const password1 = form.getFieldValue('password');

        if (password1 && value && password1 !== value) {
            return Promise.reject(new Error('Passwords do not match'));
        } else {
            const regexUpperCase = /[A-Z]/;
            const regexNumber = /[0-9]/;
            const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // You can adjust this regex for the required special characters
            const regexLength = /.{8,}/;

            if (!regexUpperCase.test(value)) {
                return Promise.reject(new Error('Password must contain at least 1 upper case letter (A-Z)'));
            } else if (!regexNumber.test(value)) {
                return Promise.reject(new Error('Password must contain at least 1 number (0-9)'));
            } else if (!regexSpecialChar.test(value)) {
                return Promise.reject(new Error('Password must contain at least 1 special character'));
            } else if (!regexLength.test(value)) {
                return Promise.reject(new Error('Password must be at least 8 characters long'));
            } else {
                return Promise.resolve();
            }
        }
    };



    return (

        <Card className=' sm:shadow-lg' style={{ padding: 20, width: '100%' }} bordered>
            {success ? <div className=' py-10'>
                <p className=' text-xl sm:text-3xl mb-8 font-bold text-gray-600'>Change your password</p>
                <Row justify='space-between' align='top' gutter={[24, 12]}>
                    <Col sm={24} xs={24} lg={12} xxl={12} md={12} xl={12}>
                        <Form
                            form={form}
                            name="normal_login"
                            className="login-form"
                            requiredMark={false}
                            layout='vertical'
                            onFinish={onFinish}
                            onValuesChange={onFieldsChange}
                        >
                            <Form.Item
                                name="password"
                                label="New Password"
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
                                // placeholder="New Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password2"
                                label="Confirm New Password"
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
                                // placeholder="Confirm Password"
                                />
                            </Form.Item>


                            <Form.Item>
                                <Button block size='large' style={{ width: '100%' }} type="primary" htmlType="submit" className="justify-center items-center login-form-button">
                                    Change My Password
                                </Button>
                            </Form.Item>

                        </Form>
                    </Col>


                    <Col sm={24} xs={24} lg={12} xxl={12} md={12} xl={12}>
                        <ol className=' space-y-2 text-xs sm:text-base font-semibold'>
                            <li className=' text-base sm:text-2xl font-bold text-purple-700'>Password must contain:</li>
                            <li>At least 1 upper case letter (A-Z)</li>
                            <li>At least 1 number case letter (0-9)</li>
                            <li>At least 1 special character letter </li>
                            <li>At least 8 characters (A-Z)</li>
                        </ol>

                    </Col>
                </Row>
            </div> : <Result
                status="success"
                title="Password updated!"
                subTitle="Your password has been changed successfully!"
                extra={[
                    <Button type="primary" onClick={() => router.back()} key="console">
                        Go Back
                    </Button>,
                    // <Button key="buy">Buy Again</Button>,
                ]}
            />}
        </Card>
    );
};

export default ChangePass;
