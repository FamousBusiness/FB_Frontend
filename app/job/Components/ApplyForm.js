"use client";
import { Button, Col, Form, Row, Input, Checkbox, Upload, Skeleton, message } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import Link from 'next/link';
import { ApplyJob } from '@/services/Admin/Jobs';
import Upload1 from '@/components/users/Tender/Upload';
import { UploadOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import axios from 'axios';
function ApplyForm({ jobid, data, ckeck }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const onFinish = async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('resume', values.resume[0].originFileObj);
        formData.append('message', values.message);
        formData.append('job_post', jobid);
        if (ckeck) {
            formData.append('brand_id', data.business_page_jobs && data.business_page_jobs[0].company);
        }
        else {
            formData.append('business_id', data.business_page_jobs && data.business_page_jobs[0].company);
        }
        try {
            const response = await axios.post('https://api.famousbusiness.in/job-api/apply-job/', formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            message.success(response.msg);
            form.resetFields();
            console.log('Response:', response.data);
        } catch (error) {
            message.error('Error submitting application');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <Form onFinish={onFinish} layout='vertical'>
            <Row gutter={[0, 12]} justify='center'>
                <Col span={24}>
                    <Form.Item
                        name="message"
                        label="Message"
                        rules={[{ required: true, message: 'Please enter a message' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="resume"
                        label="Resume"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Please upload your resume' }]}
                    >
                        <Upload name="resume" customRequest={() => { }} showUploadList={false}>
                            <Button icon={<UploadOutlined />}>Upload Resume</Button>
                        </Upload>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Checkbox align="top"> <p className='text-white'>I have read and agree with the <Link href='#' className=' text-black '>Terms & Conditions.</Link></p></Checkbox>
                </Col>
                <Col span={14}>
                    <Form.Item >
                        <Button block size='large' type="primary" htmlType="submit" loading={loading}>
                            Apply
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default ApplyForm