"use client";
import Category1 from '@/components/admin/Listing/CategorySelect';
import { useAuth } from '@/context/AuthContext';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import { CategoryWiseEnquiry } from '@/utils/Enquiry';
import { Form, Row, Col, Input, Button, notification } from 'antd'
import Card from 'antd/es/card/Card'
import { useRouter } from 'next/navigation';
import React from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

function Enquiry1({ getRequire, id }) {
    const { locationState } = useGlobalState()
    const { userdata, authTokens } = useAuth()
    const [form] = Form.useForm();
    const router = useRouter()
    const onFinish = async (value) => {
        const dataToSend = {
            ...value,
            city: locationState.city,
            state: locationState.state,// Include the id with the form values
        };

        try {

            if (!authTokens) {
                router.push('/login')
                return;
            }
            const data = await CategoryWiseEnquiry(dataToSend);
            // console.log('CategoryWIse', data);
            if (data.ok) {
                notification.info({
                    message: "Enquiry Posted successfully",
                    placement: 'bottomLeft',
                    duration: 1000
                });
                form.resetFields();
            }

        } catch (error) {
            console.error('Error submitting enquiry:', error);
        }
    }

    return (<>
        <Card style={{ background: '#ffbf00' }} bordered={true} >
            <div className='  text-center mb-4 text-white text-base font-semibold'>
                {getRequire ? <p className=' max-w-fit'>Get the {getRequire}</p> : 'Post Your Requirement '}</div>
            <Form form={form} onFinish={onFinish} initialValues={{ name: userdata?.name, mobile_number: userdata?.number, category: id }}>
                <Row>
                    <Col span={24}>
                        <Form.Item rules={[{
                            required: true,
                            message: 'Enter your name!'
                        }]} name='name'>
                            <Input

                                placeholder='Name'
                                addonBefore={<FaUser className='text-gray-500' />}
                                className='w-full'
                                type='text'
                                size='large'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            rules={[{
                                required: true,
                                message: 'Enter your number!'
                            }]} name='mobile_number'>
                            <Input

                                placeholder='Number'
                                addonBefore={<BsFillTelephoneFill className='text-gray-500' />}
                                className='w-full'
                                type='number'
                                size='large'
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Category1 label={false} />
                    </Col>
                    <Col span={24}>
                        <Form.Item

                            rules={[{
                                required: true,
                                message: 'Enter your requirement!'
                            }]}
                            name='requirements'
                        >
                            <Input.TextArea placeholder=' Requirement ' rows={5} maxLength={100} showCount style={{ color: 'white' }} className='  w-full' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <Button  style={{background:'#3c89d0',color:'white'}} size='large' className=' w-full font-bold' htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Card>
    </>
    )
}

export default Enquiry1