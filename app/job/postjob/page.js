"use client";
import ResultModal from '@/components/Result/ResultModal';
import { useAuth } from '@/context/AuthContext';
import { locations } from '@/data/data';
import { PostJob } from '@/services/Admin/Jobs';
import LoginForm from '@/utils/LandingPageModel';
import { Player } from '@lottiefiles/react-lottie-player';
import { Col, Row, Checkbox, Form, Select, Input, Button, Card, Modal, Result, notification, message } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react'
import Categories from '../Components/FilterCom';

function Page() {
    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState(false)
    const { authTokens, userdata } = useAuth()
    const [location, setLocation] = useState(locations)
    const [category, setCategory] = useState(null)
    const [form] = Form.useForm();
    const [jobTypes, setJobTypes] = useState({
        full_time: false,
        part_time: false,
        work_from_home: false,
        internship: false,
        work_abroad: false,
    });

    const onChange = (checkedValues) => {
        setJobTypes({
            ...jobTypes,
            full_time: checkedValues.includes('Full Time Job'),
            part_time: checkedValues.includes('Part Time Jobs'),
            work_from_home: checkedValues.includes('Work From Home'),
            internship: checkedValues.includes('Internships'),
            work_abroad: checkedValues.includes('Work Abroad'),
        });
        // console.log(jobTypes)
    };


    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        if (authTokens) {
            const formdata = {
                company: userdata && userdata.business ? userdata.business : null,
                ...values,
                ...jobTypes,
                job_type: category
            };

            console.log(formdata);
            try {
                if (userdata && userdata.business) {
                    const data = await PostJob(formdata);
                    console.log("postJob", data);
                    if (data) {
                        message.info(data.msg)
                        form.resetFields();
                    }
                }
                else {
                    message.info('Only Business and brand owner can post job')
                }

            } catch (error) {
                // Handle the error, display an error message, or take appropriate action
                console.error("Error posting job:", error);
                // You might want to set an error state to display an error message to the user
            }
        }
        else {
            setLogin(true);
        }

    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    }
    return (
        <div className=' flex flex-col relative justify-center bg-slate-200 items-center'>
            <Row justify='center' align='middle' gutter={[0, { sm: 0, xl: 12, lg: 12, xxl: 12, xs: 0 }]}>
                <Col span={24}>
                    <div className=' h-56 bg-orange-200'>
                    </div>
                </Col>
                <Col xs={24} sm={24} lg={16} xl={16} xxl={16} md={16}>
                    <Card style={{ borderWidth: 1, borderColor: "blue" }} className=' absolute sm:-top-20 shadow-md'>
                        <Row justify='center' gutter={[24, 24]}>
                            <Col span={24}>
                                <Row>
                                    <Col>
                                        <Title level={5}>Job Type*</Title>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={22}>
                                <Checkbox.Group
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={onChange}>
                                    <Row>
                                        <Col xs={12} sm={12} md={10} lg={8} xl={8}>
                                            <Checkbox value="Full Time Job">Full Time Jobs </Checkbox>
                                        </Col>
                                        <Col xs={12} sm={12} md={10} lg={8} xl={8}>
                                            <Checkbox value="Part Time Jobs">Part Time Jobs </Checkbox>
                                        </Col>
                                        <Col xs={12} sm={12} md={10} lg={8} xl={8}>
                                            <Checkbox value="Work From Home">Work From Home </Checkbox>
                                        </Col>
                                        <Col xs={12} sm={12} md={10} lg={8} xl={8}>
                                            <Checkbox value="Internships">Internships</Checkbox>
                                        </Col>
                                        <Col xs={12} sm={12} md={10} lg={8} xl={8}>
                                            <Checkbox value="Work Abroad">Work Abroad</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Col>
                            <Col span={24}>
                                <Form form={form} onFinish={onFinish} layout="vertical">
                                    <Row gutter={[24, 12]} justify='space-between'>
                                        <Col lg={12} xxl={12} md={12} sm={24} xs={24} xl={12}>
                                            <Form.Item
                                                name='position'
                                                label="Position"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select your role!',
                                                    },
                                                ]}>
                                                <Input placeholder="Type a role" size='large' />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Form.Item
                                                name='salary'
                                                label="Monthly Salary"
                                                rules={[
                                                    {
                                                        // type: 'number',
                                                        required: true,
                                                        message: 'Please select your salary!',
                                                    },
                                                ]}>
                                                <Input placeholder='20000-40000' addonBefore="Min-Max" size='large' style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item
                                                name='experience'
                                                label="Experience"
                                                rules={[
                                                    {
                                                        // type:'number',
                                                        required: true,
                                                        message: 'Please select your max experience!',
                                                    },
                                                ]}>

                                                <Input placeholder='2-5' addonBefore="Min-Max" size='large' style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        {/* End Experience */}

                                        {/* City */}
                                        <Col lg={8} xxl={8} md={8} sm={24} xs={24} xl={8}>
                                            <Form.Item
                                                name='location'
                                                label="City"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select your city!',
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    size='large'
                                                    style={{ width: '100%' }}
                                                    placeholder="Select locations">
                                                    {location.map((location) => <Select.Option key={location} value={location}>
                                                        {location}
                                                    </Select.Option>)}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} xxl={8} md={8} sm={24} xs={24} xl={8}>
                                            <Form.Item
                                                name='job_type'
                                                label="Job-Type"
                                            >
                                                <Categories handleCategoryChange={handleCategoryChange} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                name="description"
                                                label="Job Description"

                                                rules={
                                                    [
                                                        {
                                                            required: true,
                                                            message: 'Please enter your job description!'
                                                        }
                                                    ]
                                                }>
                                                <TextArea maxLength={3000} showCount spellCheck rows={4} placeholder="Enter your job description" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item>
                                                <Button block size='large' type='primary' htmlType='submit' >Post Job</Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>

                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <ResultModal icon={<Player src='/Result/success.json' style={{ width: "100%" }} autoplay loop />} title="Job successfully posted!" open={open} />
            <LoginForm visible={login} onClose={() => setLogin(false)} />

        </div>
    )
}

export default Page

