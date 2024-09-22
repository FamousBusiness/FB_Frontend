"use client";
import { Card, Form, Row, Col, Select, Button } from 'antd'
import React, { useState } from 'react'
import FilterLoc from '../location/FilterLoc';
import BannerSelect from './BannerSelect';
import BannerUpload from './uploadBanner';
import Image from 'next/image';

function BannerForm() {
    const [image, Setimage] = useState([
        {
            uuid: null,
            name: null,
            url: null,
        }
    ]);
    const handle = (value) => {
        Setimage(value);
    }
    const category = 'category';
    const onFinish = (value) => {
        console.log("Banner", value);
    }
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <div className=' p-4'>
            <Card className=' shadow-sm'>
                <Form onFinish={onFinish}>
                    <Row gutter={[8, 12]} className=' w-full'>
                        <Col span={24}>
                            <Form.Item name='category'
                                label="Your Business Category">
                                <Button size='large' type='default' className=' w-full' disabled >{category}</Button>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='city'
                                label="Select the city"
                                required={true} >
                                <FilterLoc />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Banner Type" name='city' required={true} >
                                <BannerSelect />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Banner Type" name='city' required={true} >
                                <BannerSelect />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Image src={image.url} alt="banner" className=' border border-1' width={500} height={250} />
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Upload Banner" name='banner' required={true} >
                                <BannerUpload handle={handle} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>

    )
}

export default BannerForm