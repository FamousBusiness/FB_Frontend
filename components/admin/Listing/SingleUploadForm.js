"use client";
import { Card, Col, Row, Button, Form, Input, Upload, InputNumber } from 'antd';
import React, { useState } from 'react';
import Category from './CategorySelect';
import CityOption from './City';
import Uploadnew from '../../Uploadlist';
import axios from 'axios';
import { Pincode, State, city } from '@/data/data';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import Category1 from './CategorySelect';

function SingleUploadForm() {
    const [formData, setFormData] = useState({
        category: '',
        cities: [],
        title: '',
        description: '',
        file: null, // Initialize the file to null
    });

    const handleCityChange = (value) => {
        console.log(`Selected cities:`, value);
        // Update the cities in the form data
        setFormData({ ...formData, cities: value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        // Update the formData state with the selected file
        setFormData({ ...formData, file });
    };

    const handleFormSubmit = () => {
        const form = new FormData();
        form.append('category', formData.category);
        form.append('cities', formData.cities.join(', '));
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('file', formData.file);

        axios.post('your-django-api-endpoint', form)
            .then((response) => {
                // Handle success, e.g., show a success message
                console.log('Submission success:', response.data);
            })
            .catch((error) => {
                // Handle errors, e.g., show an error message
                console.error('Submission error:', error);
            });
    };

    return (
        <div>
            <Card>
                <Form onFinish={handleFormSubmit} layout='vertical'>
                    <Row gutter={24} align='middle'>
                        <Col span={24}>
                            <Form.Item name='business_name' label="Businame Name">
                                <Input placeholder=" Stayaa Private Ltd " size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='mobile_number' label="Mobile Number">
                                <Row gutter={12}>
                                    <Col span={8}>
                                        <InputNumber className=' w-full' placeholder="9752432526" size='large' required />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber className=' w-full' placeholder="9752432526" size='large' />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber className=' w-full' placeholder="9752432526" size='large' />
                                    </Col>
                                </Row>

                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Category" name="category">
                                <Category1 />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='email' label="Email">
                                <Row gutter={12} align='bottom'>
                                    <Col span={8}>
                                        <Input type='email' className=' w-full' size='large' placeholder='example@mail.com' required />
                                    </Col>
                                    <Col span={8}>
                                        <Input type='email' className=' w-full' size='large' placeholder='example@mail.com' />
                                    </Col>
                                    <Col span={8}>
                                        <Input type='email' className=' w-full' size='large' placeholder='example@mail.com' />
                                    </Col>


                                </Row>

                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name='whatsapp' label='Whatsapp'>
                                <InputNumber type='tel' className='w-full' size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name='website' label='Website'>
                                <Input type='url' className='w-full' size='large' />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='business_info' label='Business Info'>
                                <TextArea maxLength={1000} showCount rows={5} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Row justify='end' gutter={[12, 12]}>
                                <Col>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Form.Item>
                                        <Button type="default" htmlType='reset'>
                                            Reset                                                    </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>

    );
}

export default SingleUploadForm;
