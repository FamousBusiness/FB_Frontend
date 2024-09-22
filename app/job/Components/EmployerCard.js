
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Flex, Rate, Row, Skeleton, Space, Tag } from 'antd';
import { IoLocation } from 'react-icons/io5';
import { PiSuitcaseSimple } from 'react-icons/pi';
function EmployerCard({ error, isLoading, data }) {
    return (
        <Card loading={isLoading} style={{ borderRadius: "20px" }} bordered className='shadow-sm w-full'>
            {!isLoading && data.business_page_jobs && data.business_page_jobs.length > 0 ? (
                <Row justify='center' gutter={12} align='middle'>
                    <Col>
                        <Avatar shape='circle' size={200} icon={<UserOutlined />} />
                    </Col>
                    <Col xxl={18} sm={24} xs={24} lg={18} xl={18}>
                        <Row justify='center' gutter={[0, 12]}>
                            <Col span={24}>
                                <Space size={6} direction='horizontal'>
                                    <p className='text-xl uppercase font-bold'>{data.business_page_jobs[0].business_name}</p>
                                    <Rate count={1} value={3.9} />
                                    <p className='text-gray-600'>(Reviews)</p>
                                </Space>
                            </Col>

                            <Col span={24}>
                                <Row gutter={[12, 12]}>
                                    <Col>
                                        <div className='border border-1 py-1 px-3 rounded-full'>
                                            {data.business_page_jobs[0].category}
                                        </div>
                                    </Col>
                                    {/* Add other category tags as needed */}
                                </Row>
                            </Col>

                            <Col span={24}>
                                <Space size={6} direction='horizontal'>
                                    <Tag color='blue'>{data.business_page_jobs[0].city}, {data.business_page_jobs[0].state}</Tag>
                                    <Tag color='green'>{data.business_page_jobs[0].experience}</Tag>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ) : (
                // Skeleton while loading
                <Flex gap={6} align='flex-start'>
                    <Skeleton.Avatar size={150} shape='circle' />
                    <Flex vertical gap={3}>
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </Flex>
                    <Card bordered style={{ borderRadius: '20px' }}>
                        <Skeleton.Avatar shape='square' size={200} />
                    </Card>
                </Flex>
            )}
        </Card>
    );
}

export default EmployerCard;
