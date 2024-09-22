"use client";
import { Button, Col, Form, Row, Input, Checkbox } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import Upload1 from './Upload';
import Link from 'next/link';

function BidForm() {

    const onFinish = (value) => {
        console.log('success', value);
    }
    return (
        <Form onFinish={{ onFinish }}>
            <Row gutter={[0, 12]} justify='center'>
                <Col span={24}>

                    <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                        <TextArea rows={8} maxLength={1000} size='50' showCount placeholder=" Write your proposal" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Upload1 />
                </Col>
                <Col span={24}>
                    <Checkbox align="top"> <p className='text-white'>I have read and agree with the <Link href='#' className=' text-black '>Terms & Conditions.</Link></p></Checkbox>
                </Col>
                <Col span={14}>

                    <Form.Item >
                        <Button type='primary' htmlType="submit" title='SUBMIT' size="large" className=" w-full" >Apply</Button>
                    </Form.Item>
                </Col>

            </Row>

        </Form>
    )
}

export default BidForm