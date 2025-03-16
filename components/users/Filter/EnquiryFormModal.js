"use client";
import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import { FaUser } from 'react-icons/fa6';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { EnquiryIndivisual } from '@/utils/Enquiry';
import { useAuth } from '@/context/AuthContext';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';



const EnquiryFormModel = ({ businessId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const card = false;
    // const pathName = usePathname();
    const [form] = Form.useForm();
    const { locationState } = useGlobalState()
    const { userdata } = useAuth()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }


    const onFinish = async (value) => {
        const dataToSend = {
            ...value,
            business_id: businessId.id,
            city: locationState.city,
            state: locationState.state // Include the id with the form values
        };

        try {
            const data = await EnquiryIndivisual(dataToSend);
            if (data.ok) {
                message.success('Successfully sent')
            }

        }
        catch (error) {
            form.resetFields();
            message.error("error sending")
        }



    }



    return (
        <>
            {/* Button for Enquiry - visible when path is not '/userprofile' */}

            <div onClick={showModal} className='rounded-md flex bg-green-600 border border-1 hover:bg-slate-200 transition-all duration-1000 justify-center items-center flex-row text-center px-4 py-2 hover:border-blue-600 font-semibold text-white'>
                <div className='text-white hover:text-black text-center ml-1 font-serif'>Enquiry</div>
            </div>
            {/* Animated icon for Enquiry - visible only when path is '/userprofile' */}

            {/* Modal for Enquiry Form */}
            <Modal open={isModalOpen} onCancel={handleCancel} closable style={{ backgroundColor: 'transparent' }} footer={null} >
                <Form form={form} onFinish={onFinish} initialValues={{ name: userdata?.name, mobile_number: userdata?.number }}>
                    <Row>
                        <Col span={24}>
                            <Form.Item rules={[{
                                required: true,
                                error: 'Enter your name!'
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
                            <Form.Item rules={[{
                                required: true,
                                error: 'Enter your number!'
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
                            <Form.Item
                                rules={[{
                                    required: true,
                                    error: 'Enter your requirement!'
                                }]}
                                name='requirements'
                            >
                                <Input.TextArea placeholder=' Requirement ' rows={5} maxLength={100} showCount style={{ color: 'white' }} className='  w-full' />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item

                            >
                                <Button  style={{background:'#3c89d0',color:'white'}} size='large' className=' w-full font-bold' htmlType='submit'>Submit</Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </>
    );
};

export default EnquiryFormModel;
