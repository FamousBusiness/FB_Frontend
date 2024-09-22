import React from 'react';
import { FacebookFilled, GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Spin, Flex, notification, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { createStyles, useTheme } from 'antd-style';
import Modal from '@mui/joy/Modal';
import { ModalClose, ModalDialog } from '@mui/joy';
import { usePathname } from 'next/navigation';

const useStyle = createStyles(({ token }) => ({
    'my-modal-body': {
        background: token.blue1,
    },
    'my-modal-mask': {
        boxShadow: `inset 0 0 15px #fff`,
    },
}));

const LoginForm = ({ visible, onClose, onCloseCount, width }) => {
    const { loginUser, loading } = useAuth();
    // const [isModalOpen, setIsModalOpen] = useState([false, false]);
    const pathName = usePathname()
    const { styles } = useStyle();
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
        loginUser(data, pathName);
        onClose();
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

    const classNames = {
        body: styles['my-modal-body'],
        mask: styles['my-modal-mask'],
    };
    const modalStyles = {

        mask: {
            backdropFilter: 'blur(10px)',
        },
    };

    return (
        <Modal open={visible} onClose={onClose}>
            <ModalDialog
                size='lg'
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
                <ModalClose />
                <Row justify='space-between' align='middle' gutter={12}>
                    <Col sm={24} xs={24} md={12} xxl={12} lg={12} xl={12}>
                        <Col span={24}>
                            <p className=" text-base ml-2 sm:text-3xl font-bold">
                                <span className=' text-blue-600'>Famous </span><span className=' text-green-700'>Business</span>
                            </p>
                            <p className=' ml-2  mt-2 text-base font-semibold text-gray-800'>Sign In to get The Best Deals & Offers </p>
                        </Col>
                        <div className=' p-4 sm:p-8'>
                            <Form
                                className="login-form"
                                layout='vertical'
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Mobile Number/Email"
                                    name="mobile_number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Mobile Number or Email!',
                                        },
                                    ]}
                                >
                                    <Input style={{ padding: 10 }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Mobile Number/Email" />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}>
                                    <Input.Password
                                        style={{ padding: 10 }}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Link href="/login/forgot" target="_parent">
                                        Forgot password?
                                    </Link>
                                </Form.Item>

                                <Form.Item>
                                    <Button block size='large' style={{ width: '100%', background: '#3c89d0',color:'white' }}  htmlType="submit" className="login-form-button">
                                        {loading ? <Spin indicator={antIcon} /> : "Log in"}
                                    </Button>
                                </Form.Item>
                            </Form>
                            <p className=' text-center'>If you don&apos;t have an account?<Link href='/registration' className=' mx-1'>Business</Link> | <Link href='/registration/user' className=' ml-1'>User</Link></p>
                            <Divider />
                            <Button block icon={<FacebookFilled />} style={{ borderRadius: 0, background: 'blue', color: 'white', borderWidth: 1, borderColor: 'black' }}>
                                Login with Facebook
                            </Button>
                            <Button block icon={<GoogleOutlined />} style={{ borderRadius: 0, color: 'black', marginTop: 5, borderWidth: 1, borderColor: 'black' }}>
                                Login with Google
                            </Button>
                        </div>
                    </Col>
                    <Col sm={0} xs={0} md={12} xl={12} xxl={12} lg={12} className=' relative'>
                        <Flex className=' min-h-min' justify='center' align='flex-end'>
                            <Image src="/Model.png" width={500} height={500} alt='login' />
                        </Flex>
                    </Col>
                </Row>
            </ModalDialog>
        </Modal>


    );
};
export default LoginForm;
