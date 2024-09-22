import { Button, Card, Carousel, Col, Flex, Rate, Row, Skeleton, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { FaRupeeSign } from "react-icons/fa";

import { useHomeData } from '@/services/Commondata/HomeData';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: '500',
    subsets: ['latin']
})

const { Text, Title } = Typography
function Index() {
    const { homedata, isLoading, isError } = useHomeData()
    if (isLoading) {
        return <div className='p-3'>
            <Row gutter={12}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <Col key={index} xs={24} sm={24} lg={8} md={8} xl={8} xxl={8}>
                        <Card>
                            <Flex gap={4} justify='center' vertical align='center'>
                                <Skeleton.Avatar shape='square' size={100} active />
                                <Skeleton active />
                            </Flex>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    }
    if (isError) {
        return <>Error</>
    }
    const planOrder = {
        'Starter': 1,
        'Business': 2,
        'Enterprises': 3,
    };

    const sortedCombo = homedata.combo_leads && homedata.combo_leads.length > 0 ? homedata.combo_leads.sort((a, b) => planOrder[a.name] - planOrder[b.name]) : [];
    return (
        <div style={{ padding: '24px 0', }}>
            <Row justify='center' gutter={[0, 24]}>
                <Col span={24}>
                    <Row justify='center'>
                        <Col span={23}>
                            <p className={`${poppins.className} text-lg sm:text-xl text-gray-500`}>
                                Get Guaranteed Customers
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={0} sm={0} md={23} lg={23} xl={23} xxl={23}>
                    {homedata.combo_leads && homedata.combo_leads.length > 0 &&
                        <Row justify='center' align='middle' gutter={12}>
                            {sortedCombo.map((leads) => <Col span={8} key={leads.id} >
                                <Link href='/combolead' as={`/combolead?q=${leads.id}`}>
                                    <Card style={{ borderRadius: '20px' }} hoverable bordered={true} className='shadow-xl '>
                                        <Row justify='center' gutter={[0, 12]}>
                                            <Col>
                                                <div style={{ position: 'relative', height: '180px', width: '180px' }}>
                                                    <Image
                                                        alt="Mountains"
                                                        src={leads.image}
                                                        fill
                                                        sizes="(min-width: 808px) 50vw, 100vw"
                                                        style={{
                                                            objectFit: 'contain', // cover, contain, none
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col span={24}>
                                                <Flex vertical gap={4} justify='center' align='center'>
                                                    <p className=' text-sm text-center sm:text-lg font-bold'>Buy <span className=' bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 text-3xl'>{leads.lead_quantity}</span> Guaranteed Customers*</p>
                                                    <p className=' mt-2 text-xs sm:text-sm text-gray-600'>{leads.tag_line}</p>
                                                </Flex>
                                                <Flex justify='space-between' align='center' className=' mt-3'>
                                                    <Space size={5} align='center' direction='horizontal'><FaRupeeSign className=' text-2xl' /><span className=' text-2xl font-semibold'>{leads.price}</span></Space>
                                                    <Button shape='default'  style={{ background: '#3c89d0', color: 'white' }}>Buy Now</Button>
                                                </Flex>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Link>
                            </Col>)}
                        </Row>}
                </Col>
                {/* Mobile View */}
                <Col xs={24} sm={24} lg={0} md={0} xl={0} xxl={0}>
                    {homedata.combo_leads && homedata.combo_leads.length > 0 && <Carousel dots={false} draggable className=' ml-2' effect='scrollx' infinite={false} centerMode={false} touchThreshold={10} speed={500} swipeToSlide={true} slidesToScroll={1} slidesToShow={1.4}>
                        {sortedCombo.map((leads) => <div key={leads.id} className=' p-2'>
                            <Link href='/combolead' as={`/combolead?q=${leads.id}`}>
                                <Card style={{ borderRadius: '20px', borderColor: 'gray', borderWidth: 0.3 }} hoverable bordered={false} className=' relative flex flex-col justify-center shadow-md '>
                                    <Flex vertical gap={4} justify='center' align='center'>
                                        <div className=' h-36 w-36 relative'>
                                            <Image src={leads.image} fill sizes='100%' className=' object-fill' alt="leads" />
                                        </div>
                                        <p className=' text-sm text-center font-bold'>Get <span className=' bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 text-lg'>{leads.lead_quantity}</span> Guaranteed Customers*</p>
                                        <p className=' mt-2 text-xs text-gray-600'>
                                            {leads.tag_line}
                                        </p>
                                    </Flex>
                                    <Flex justify='space-between' align='center' className=' mt-3'>
                                        <Space size={5} align='center' ><FaRupeeSign className=' text-lg text-gray-600' /><span className=' text-sm font-semibold'>{leads.price}</span></Space>
                                        <Button shape='default'  style={{ background: '#3c89d0', color: 'white' }}>Buy Now</Button>
                                    </Flex>
                                </Card>
                            </Link>
                        </div>)}
                    </Carousel>}
                </Col>
            </Row>
        </div>

    )
}

export default Index