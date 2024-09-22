"use client";
import TenderCard from '@/components/users/Tender/TenderCard';
// import Banner from '@/components/users/home/leads/Banner'
// import Layoutlead from '@/components/users/home/leads/Layout';
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd';
import Image from 'next/image';
import React from 'react'
import { MdSortByAlpha } from 'react-icons/md';


function Page() {
    const leads = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return (
        <div className=' min-h-min relative'>

            <Row justify='center' gutter={[12, 12]}>
                <Col span={23}>
                    {/* <Banner/> */}
                </Col>
                <Col xs={22} sm={22} md={22} xl={0} lg={0} xxl={0} className=' pl-1'>
                    <Row className=' bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient rounded-l-md pl-1 rounded-r-md' align='middle' justify='space-between'>
                        <Col style={{ fontSize: 12 }} className=' drop-shadow-2xl text-white font-semibold'>Release your Tender with Expert</Col>
                        <Col><div className=' border border-1 text-white rounded-md bg-red-500 py-1 w-full px-2'>Create Tender</div></Col>
                    </Row>
                </Col>
                <Col xs={22} sm={22} md={22} xl={0} lg={0} xxl={0} >
                    <div className=' text-lg font-bold'>Discounted Entry</div>
                    <div className=' text-sm text-gray-500 font-semibold'>Up to 80% can be utilised for the Leads below</div>
                    <Row>
                        <Col span={6}>
                            <div className=' shadow-sm bg-yellow-300 border border-1 font-bold text-center py-2 px-2'>Discount</div>
                        </Col>
                    </Row>

                </Col>
                <Col xs={22} sm={22} lg={23} xl={23} xll={23} md={22}>
                    {/* <Row justify='start' gutter={[12, 12]}>
                        {leads.map((index) => {

                            return (
                                <Col key={index} xs={24} sm={24} md={24} lg={8} xl={8}>
                                    <TenderCard key={lead.id} limit={40} color='green' icon='/leads/leads.svg' title='Leads' item={lead} />
                                </Col>
                            )
                        }

                        )}
                    </Row> */}

                </Col>
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    <div className=' fixed bottom-0 p-2 w-full bg-slate-100'>
                        <Row gutter={4}>
                            <Col span={8}>
                                <div className=' w-full rounded-md bg-white border-1 border py-1 text-center' >Category</div>
                            </Col>
                            <Col span={8}>
                                <Button className=' w-full' icon={<MdSortByAlpha />}>Sort By</Button>
                            </Col>
                            <Col span={8}>
                                <Button className=' w-full' icon={<FilterOutlined />}>Filter</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>

            </Row>
        </div>

    )
}

export default Page