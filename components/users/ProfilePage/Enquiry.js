import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { usePathname } from 'next/navigation';
import { FaUser } from 'react-icons/fa6';
import { BsFillTelephoneFill, BsTelephoneFill } from 'react-icons/bs';
import { EnquiryIndivisual } from '@/utils/Enquiry';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Spin, Flex, notification, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Modal from '@mui/joy/Modal';
import { ModalClose, ModalDialog } from '@mui/joy';
import Category1 from '@/components/admin/Listing/CategorySelect';




const Enquiry = ({ business }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathName = usePathname();
    const { userdata } = useAuth()
    const [loading, setLoading] = useState(false)
    const { locationState } = useGlobalState()
    const [form] = Form.useForm(); // Initialize form instance

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const onFinish = async (value) => {
        const dataToSend = {
            ...value,
            business_id: business.id,
            city: locationState.city,
            state: locationState.state // Update to use 'business' instead of 'businessId'
        };

        try {
            setLoading(true);
            const data = await EnquiryIndivisual(dataToSend);
            if (data.ok) {
                notification.success({
                    message:'Enquiry Posted Successfully',
                    placement:'bottomRight',
                    duration:1000
                })
                handleCancel()
            }
            setLoading(false)
        }
        catch (err) {
            setLoading(false);
            form.resetFields();
            console.log(err)
        }

    }


    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
                color: 'white'
            }}
            spin
        />
    );
    return (<>
        <div className='cursor-pointer flex flex-col justify-center items-center' onClick={showModal}>
            <Player src='/ChatIcon/Virtual.json' autoplay loop />
            <div className='text-center font-bold absolute bottom-4'>Enquiry Now!</div>
        </div>

        <Modal open={isModalOpen} onClose={handleCancel}>
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

                <Row>
                    <Col span={24}>
                        <div className=' text-center'>

                            <Typography.Title level={3} lang='English'>
                                Get Instant Quatation From Verified Sellers
                            </Typography.Title>
                        </div>
                        <Form form={form} onFinish={onFinish} initialValues={{ name: userdata?.name, mobile_number: userdata?.number }}>
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
                                            addonBefore={<BsTelephoneFill className='text-gray-500' />}
                                            className='w-full'
                                            type='number'
                                            size='large'
                                        />
                                    </Form.Item>
                                </Col>
                                {/* <Col span={24}>
                                    <Category1 label={false} />
                                </Col> */}
                                {/* <Col span={24}>
                                    <Form.Item rules={[{
                                        required: true,
                                        message: 'Select City'
                                    }]} name='city'>
                                        <Select placeholder='select the city'>
                                            {locations.map((location) => <Option key={location} value={location}>
                                                {location}
                                            </Option>)}
                                        </Select>
                                    </Form.Item>
                                </Col> */}
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
                                        <Button style={{background:'#3c89d0',color:'white'}} size='large' className=' w-full font-bold' htmlType='submit'>Submit</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                </Col>
            </Row>
      </ModalDialog>
    </Modal>
  </>

  );
};
export default Enquiry;