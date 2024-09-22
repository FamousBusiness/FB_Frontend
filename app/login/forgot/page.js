"use client";
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { notification, Card, Col, Row } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import EmailPass from '@/utils/EmailPasswordSet';

function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const searchparam = useSearchParams();
    const uuid = searchparam.get('uuid');
    const token = searchparam.get('token');

    const handleForget = async () => {
        try {
            if (!email) {
                // Check if email is empty
                throw new Error('Email is required');
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email format');
            }
            const res = await fetch(`https://api.famousbusiness.in/api/send-reset-password-mail/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Add this line to specify JSON content type
                },
                body: JSON.stringify({
                    "email": email,
                }),
            });

            if (res.ok) {
                notification.success({
                    message: `Reset Password Link sent on ${email}`,
                    description: 'Please reset your password',
                    duration: 10000,
                    placement: 'bottomLeft',
                });

            } else {
                const data = await res.json();
                throw new Error(data.msg || 'Password reset failed');
            }
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: error.message,
                duration: 5000,
                placement: 'bottomLeft',
            });
        }
    };

    return (
        <div>
            <Row justify='center'>
                <Col span={22}>
                    <div className=' h-96 flex justify-center items-centern flex-col'>
                        <Row justify='center'>
                            <Col xl={14} xxl={14} sm={24} xs={24} md={22} lg={14}>
                                <ArrowLeftOutlined className=' py-2 text-2xl hover:-translate-x-1 duration-100 cursor-pointer' onClick={() => router.back()} />
                                <Card title={<div className=' text-lg font-bold text-gray-700 sm:text-2xl'>Forgot password?</div>}>
                                    <TextField
                                        required
                                        type='email'
                                        variant='outlined' // Corrected variant
                                        onChange={(e) => setEmail(e.target.value)} // Corrected onChange
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={handleForget} disabled={!email} className='cursor-pointer bg-indigo-400 rounded-md px-5 py-2 text-white font-semibold flex flex-row justify-between hover:translate-x-1 transition-transform duration-300'>
                                                        Submit<ArrowRightOutlined className='ml-1' />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder='example@mail.com'
                                        label='Enter Email'
                                        fullWidth
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            {uuid && token && <EmailPass tokens={token} uuid={uuid} visible={true} />}
        </div>
    );
}

export default Page;
