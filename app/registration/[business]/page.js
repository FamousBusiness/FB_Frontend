"use client";

import React, { useState } from 'react';
import { Button, Col, Card, Form, Input, Row, Checkbox, Typography,Tag, Select } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import zxcvbn from 'zxcvbn';
import FetchAllCategories from '../Category/categories';
import { FaSeedling } from 'react-icons/fa';

const { Text } = Typography




const PasswordStrengthMeter = ({ password }) => {

    const result = zxcvbn(password);
    // Use the password strength score to determine the strength
    const strength = result.score; // 0 to 4 (0: weakest, 4: strongest)

    let color = '';
    let text = '';

    switch (strength) {
        case 0:
            color = 'red';
            text = 'Very Weak';
            break;
        case 1:
            color = 'orange';
            text = 'Weak';
            break;
        case 2:
            color = 'yellow';
            text = 'Fair';
            break;
        case 3:
            color = 'green';
            text = 'Good';
            break;
        case 4:
            color = 'darkgreen';
            text = 'Strong';
            break;
        default:
            break;
    }

    return <Text type={color}>{text}</Text>;
};



const PasswordInput = ({ value, onChange, placeholder }) => {
    return (
        <>
            <Input.Password
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                
                prefix={<LockOutlined />}
            />
            {value && <PasswordStrengthMeter password={value} />}
        </>
    );
};



const { Option } = Select;



const Address = () => {
    const [form] = Form.useForm();
    const param = useParams()
    const mobile = param.business
    const { registerUser, useloading } = useAuth();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handlePassword2Change = (value) => {
        setPassword2(value);
    };




    // Custom validation function for confirming passwords
    const handleConfirmPassword = (rule, value) => {
        const passwordFieldValue = form.getFieldValue('password');
        if (passwordFieldValue && value !== passwordFieldValue) {
            return Promise.reject('The two passwords do not match!');
        } else {
            return Promise.resolve();
        }
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
                        // city: placeData['District'],
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

    const onFinish = (values) => {
        // console.log(values)
        registerUser(values);
    };

    const customRequiredMark = (label, {required}) => (
        <>
          {required ? <Tag color="error">Required</Tag> : <Tag color="warning">Optional</Tag>}
          {label}
        </>
    );


    return (
        <Row justify='center'>
            <Col xs={24} sm={24} md={20} lg={15} xl={12}>
                <Card className='shadow-lg p-6 rounded-lg border border-gray-200'>
                    <div className='text-center mb-6'>
                        <FaSeedling className='inline text-blue-600 text-3xl mr-2' />
                        <span className='text-2xl font-bold text-blue-600'>Grow Your Business</span>
                    </div>

                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onFinish}
                        initialValues={{
                            agreement: true,
                            mobile_number: mobile
                        }}
                        requiredMark={customRequiredMark}
                        scrollToFirstError
                    >
                        <Form.Item 
                            name="name"
                            label=" Your Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input size='large' placeholder='Enter your name' />
                        </Form.Item>

                        <Form.Item 
                            name="business_name"
                            label="Business Name"
                            tooltip
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your business name!',
                                },
                            ]}
                        >
                            <Input size='large' placeholder='Enter your business name' />
                        </Form.Item>

                        <Form.Item 
                            required
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password size='large' placeholder='Enter your password' value={password} onChange={handlePasswordChange} />
                        </Form.Item>

                        <Form.Item 
                            required
                            name="password2"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            validateTrigger="onBlur"
                            rules={[
                                {

                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {

                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords do not match!');
                                    },
                                }),
                            ]}
                        >
                            <PasswordInput value={password2} onChange={handlePassword2Change} placeholder='XXXXXXX' />
                        </Form.Item>

                        <Form.Item name='category'>
                            <FetchAllCategories required={true} label={true} />
                        </Form.Item>

                        <Form.Item 
                            name="mobile_number"
                            label="Mobile Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your mobile number!',
                                },
                            ]}
                        >
                            <Input size='large' placeholder='Mobile number' />
                        </Form.Item>

                        <Form.Item 
                            name="whatsapp_number"
                            label="Whatsapp Number"
                            rules={[{
                                type: 'tel',
                                  required: true,
                                    message: 'Please input your WhatsApp number!',
                            }]}
                        >
                            <Input size='large' placeholder='WhatsApp number' />
                        </Form.Item>

                        <Form.Item 
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: false,
                                    type: 'email'
                                },
                            ]}
                        >
                            <Input size='large' placeholder='examplae@mail.com'  />
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}>
                            <Checkbox>
                                I agree to<Link href='about/Terms-Condition'>Terms and Conditions</Link>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                block
                                loading={useloading}
                                style={{
                                    backgroundColor: '#28a745',
                                    borderColor: '#28a745',
                                    fontWeight: 600,
                                }}
                                size='large'
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};


export default Address;

