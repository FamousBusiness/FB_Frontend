"use client";
import React from 'react'
import { Table, Row, Col, Input, Button } from 'antd';
import UploadX from '@/components/Upload';

function page() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'State',
            dataIndex: 'chinese',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'City',
            dataIndex: 'math',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: 'Category',
            dataIndex: 'english',
            //   sorter: {
            //     compare: (a, b) => a.english - b.english,
            //     multiple: 1,
            //   },
        },
        {
            title: 'Page link',
            dataIndex: 'english',
            // sorter: {
            //   compare: (a, b) => a.english - b.english,
            //   multiple: 1,
            // },
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div>
            <Row justify='end' gutter={[24, 24]}>
                <Col span={24}>
                    <Row justify='space-between' align='middle'>
                        <Col><h1 style={{ fontSize: 30, fontFamily: "monospace", fontWeight: 'bold' }}>New Email Compaign</h1></Col>
                        <Col><UploadX /></Col>
                    </Row>

                </Col>
                <Col span={24}>
                    <Row gutter={24}>
                        <Col span={12}><Input size='large' style={{ padding: 20 }} placeholder='Sender Email Address' /></Col>
                        <Col span={12}><Input size='large' style={{ padding: 20 }} placeholder='Subject Line' /></Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Table pagination={false} columns={columns} dataSource={data} onChange={onChange} />
                </Col>
                <Col span={24}>
                    <Row justify='end'>
                        <Col>
                        <Button size='large'>Next</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    )
}

export default page