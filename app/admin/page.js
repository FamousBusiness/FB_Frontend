"use client";
import React from 'react'
import { Row, Col } from 'antd'
function page() {
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <div className=' bg-indigo-500 font-bold text-white rounded-lg flex flex-col  h-20 justify-center items-center  w-full '>Ads Review</div>
                </Col>
                <Col span={8}>
                    <div className=' bg-indigo-500 font-bold text-white rounded-lg flex flex-col  h-20 justify-center items-center  w-full '>Banner Review</div>
                </Col>
                <Col span={8}>
                    <div className=' bg-indigo-500 font-bold text-white rounded-lg flex flex-col  h-20 justify-center items-center  w-full '>Campaigns Review</div>
                    {/* <Card1 content={<center>NOTIFICATION</center>} /> */}
                </Col>
                <Col span={8}>
                    <div className=' bg-orange-600 rounded-lg flex flex-col  justify-start items-center py-3 h-52 w-full '>
                        <p className=' text-white font-bold text-xl'>All Businesses</p>

                    </div>
                    {/* <Card1 style={style} title="All Listing"  content={content.all} /> */}
                </Col>
                <Col span={8}>
                    <div className=' bg-orange-600 rounded-lg flex flex-col  justify-start items-center py-3 h-52 w-full '>
                        <p className=' text-white font-bold text-xl'>All Verified Businesses</p>
                    </div>
                    {/* <Card1 style={style} title="All Verified Listing" content={content.verified} /> */}
                </Col>
                <Col span={8}>
                    <div className=' bg-orange-600 rounded-lg flex flex-col  justify-start items-center py-3 h-52 w-full '>
                        <p className=' text-white font-bold text-xl'>Unverified Businesses</p>
                    </div>
                    {/* <Card1 style={style} title="Unverified Listing" content={content.unverified} /> */}
                </Col>
                <Col span={24}>
                    <Row justify='center'>
                        <Col span={8}>
                            <div className=' bg-orange-600 rounded-lg flex flex-col  justify-start items-center py-3 h-52 w-full '>
                                <p className=' text-white font-bold text-xl'>User Created Businesses</p>
                            </div>
                        </Col>
                    </Row>

                    {/* <Card1 style={style} title="User Created Listing" content={content.user} /> */}
                </Col>

            </Row>
        </div>
    )
}

export default page;