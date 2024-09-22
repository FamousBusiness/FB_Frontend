import { Job_Profile } from '@/services/Admin/Jobs';
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Divider, Flex, notification, Form, Input, Modal, Row, Skeleton, Space, Typography, Upload, Select } from 'antd'
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { BsGenderAmbiguous } from 'react-icons/bs';
import { CiLocationOn, CiMail, CiCalendar } from "react-icons/ci";
import { PiWalletThin } from "react-icons/pi";
import { PiPhoneCallThin } from "react-icons/pi";
import useSWR from 'swr';
const { Text, Title, Paragraph } = Typography
function ProfileCard() {
    const { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/job-api/aspirant-profile/`, Job_Profile)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    if (!data) {
        return (
            <Card className='shadow-xl' >
                <Flex gap={4} align='center'>
                    <Skeleton.Avatar size={150} shape='circle' /> <Skeleton active paragraph={{ rows: 4 }} />
                </Flex>
            </Card>);
    }
    if (error) {
        return <div> Error</div>
    }

    const onFinish = async (values) => {
        console.log(values);
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (key === 'image') {
                // Handle file upload separately
                formData.append(key, value[0].originFileObj);
            } else {
                formData.append(key, value);
            }
        });

        try {
            const res = await fetch(`https://api.famousbusiness.in/job-api/aspirant-profile-create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                },
                body: formData,
            });

            if (res.ok) {
                api.open({
                    message: "Profile created successfully",
                    description: 'Find the Job and Grow your career',
                    duration: 0,
                    placement: 'bottomLeft'
                });
                setIsModalVisible(false);
                mutate();
            } else {
                throw new Error('Failed to create profile');
            }
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (<>
        {contextHolder}
        <Card className=' shadow-xl '>
            {data.length > 0 ? <Row justify='space-around' gutter={[10, 12]} align='middle'>
                <Col lg={4} xxl={4} md={4} sm={20} xs={20} xl={4}>
                    <div className=' text-center'>
                        <Avatar src={data[0].image} size={180} shape='circle' icon={<UserOutlined />} />
                    </div>
                </Col>
                <Col lg={9} xxl={9} sm={24} xs={24} md={9} xl={9}>
                    <Row justify='space-between' gutter={[10, 24]} align='bottom'>
                        <Col span={12}>
                            <Flex vertical>
                                <p className=' text-2xl'>{data[0].first_name} {data[0].last_name}</p>
                                {/* <p className=' text-lg'>{Experience_Details.is_current_job ? `${Experience_Details.job_title}` : null}</p> */}
                                {/* {Experience_Details.is_current_job && <p className=' text-sm'>at <span className=' text-base'>{Experience_Details.company_name}</span></p>} */}
                            </Flex>
                        </Col>
                        {/* <Col>
                            <p>Profile last update</p>
                        </Col> */}
                        <Col span={24}>
                            <hr />
                        </Col>
                        <Col span={24}>
                            <Row justify='space-between'>
                                <Col span={11}>
                                    <Flex vertical gap='middle'>
                                        <Space direction='horizontal'><CiLocationOn />{data[0].address}</Space>
                                        <Space direction='horizontal'><BsGenderAmbiguous />{data[0].gender}</Space>
                                        <Space direction='horizontal'><PiWalletThin />₹{data[0].current_salary}</Space>
                                    </Flex>
                                </Col>
                                <Col>
                                    <Divider className='full-height-divider h-56' type='vertical' />
                                </Col>
                                <Col span={11}>
                                    <Flex vertical gap='middle'>
                                        <Space direction='horizontal'><PiPhoneCallThin />{data[0].mobile_number}</Space>
                                        <Space direction='horizontal'><CiMail />
                                            <Paragraph ellipsis={{ rows: 1 }}> {data[0].email}</Paragraph></Space>
                                        {/* <Space direction='horizontal'><CiCalendar />{Experience_Details.notice_period}</Space> */}
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg={9} xxl={9} md={9} sm={24} xs={24} xl={9}>
                    <div className=' h-60 w-full bg-orange-100 rounded-md'>

                    </div>
                </Col>
            </Row> : (
                <div>
                    <Typography.Title level={3} italic>Please add the Profile details</Typography.Title>
                    <Button type="primary" onClick={showModal}>
                        Add Profile
                    </Button>
                    <Modal
                        title="Create Profile"
                        open={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form layout='vertical' onFinish={onFinish}>
                            <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="mobile_number" label="Mobile Number" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                                <Select placeholder="Select Gender">
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="image"
                                label="Image"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}>
                                {/* You can customize the image upload logic */}
                                <Upload >
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="current_salary" label="Current Salary" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Create Profile
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            )}
        </Card>
    </>
    )
}

export default ProfileCard