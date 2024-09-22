"use client"
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Spin, Checkbox, notification, Divider, Typography, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { useRouter } from 'next/navigation';
const { Text } = Typography

const EmailPass = ({ visible, tokens, uuid }) => {
    // const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const [form] = Form.useForm();
    const router = useRouter()
    const url = tokens ? `https://api.famousbusiness.in/api/reset-password/${uuid}/${tokens}/` : `https://api.famousBusiness.in/password-reset/${uuid}/`
    const onFinish = async (values) => {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Add this line to specify JSON content type
                },
                body: JSON.stringify({
                    "password": values.password,
                    "password2": values.password2
                }),
            });
            if (res.ok) {
                notification.success({
                    message: 'Password set successfully',
                    description: 'Now Login and Grow Your Business',
                    duration: 3000,
                    placement: 'bottomLeft'
                })
                router.push('/login')
            } else {
                const data = await res.json();
                throw new Error(data.msg || 'Password reset failed');
            }
        } catch (error) {
            console.error(error);    

        }
    };
    const validatePassword = (_, value) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!regex.test(value)) {
            return Promise.reject(new Error('Password must be 8 characters long and include alphabets, numerics, and special characters.'));
        } else {
            return Promise.resolve();
        }
    };
    const validateConfirmPassword = (_, value) => {
        const password = form.getFieldValue('password');
        if (password !== value) {
            return Promise.reject("password did not match");
        }
        else {
            return Promise.resolve();
        }
    };

    return (

        <Modal open={visible}>
            <ModalDialog
                aria-labelledby="nested-modal-title"
                aria-describedby="nested-modal-description"
                sx={(theme) => ({
                    [theme.breakpoints.only('xs')]: {
                        top: 'unset',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 0,
                        transform: 'none',
                        maxWidth: 'unset',
                    },
                })}
            >
                <Row justify='space-between' gutter={12}>
                    <Col sm={24} xs={24} md={12} xxl={12} lg={12} xl={12}>
                        <div>
                            <p className=" text-base ml-2 sm:text-3xl font-bold">
                                <span className=' text-blue-600'>Famous </span>
                                <span className=' text-green-700'>Business</span>
                            </p>
                            <p className=' ml-2  mt-2 text-base font-semibold text-gray-800'> {tokens ? 'Reset' : 'Set'} your password and grow with us. </p>
                        </div>
                        <div className=' p-4 sm:p-8'>
                            <Form
                                preserve={false}
                                form={form}
                                layout='vertical'
                                onFinish={onFinish}
                                initialValues={{
                                    agreement: true,
                                }}
                            >
                                <Form.Item
                                    label="New Password"
                                    name="password"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input new password',
                                        },
                                        // {
                                        //     validator: validatePassword
                                        // }
                                    ]}
                                >
                                    <Input.Password allowClear style={{ padding: 10 }} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="********" />
                                </Form.Item>
                                <Form.Item
                                    label="Confirm New Password"
                                    name="password2"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm new Password!',
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        allowClear
                                        style={{ padding: 10 }}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="*******"
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
                                    ]}>

                                    <Checkbox>
                                        I agree to <Link href='/about/Terms-Condition'>Terms and Conditions</Link>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item>
                                    <Button block size='large' style={{ width: '100%' }} type="primary" htmlType="submit" >
                                        SUBMIT
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Text type='secondary'>Password must contain Special characters, Alphabets(a-z/A_Z) and numbers(0-9).</Text>
                        </div>

                    </Col>
                    <Col sm={0} xs={0} md={12} xl={12} xxl={12} lg={12}>
                        <Flex className=' h-full w-full' justify='center' align='center'>
                            <Image src="/Facebook.png" width={500} height={500} alt='login' />
                        </Flex>
                    </Col>
                </Row>

            </ModalDialog>
        </Modal>

    );
};
export default EmailPass;





