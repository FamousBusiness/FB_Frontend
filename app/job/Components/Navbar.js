import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Input, Row, Space } from 'antd'
import React from 'react'

function Navbar() {
    return (
        <div className='py-4 font-semibold bg-white sticky top-0 right-0 mr-3 z-30 shadow-xl'>
            <Row justify='center'>
                <Col span={16}>
                    <Row justify='space-around' gutter={24} align='middle'>
                        <Col >
                            <span className=' text-xl text-blue-600'>Famous </span><span className=' text-xl text-green-700'>Business</span>
                        </Col>
                        <Col span={10}>
                            <Space.Compact>
                                <Input size='large' style={{ borderRadius: "100px 0 0px 100px" }} />
                                <Button size='large' icon={<SearchOutlined />} shape='round' ></Button>
                            </Space.Compact>
                        </Col>
                        <Col>
                            <Avatar icon={<UserOutlined />} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Navbar