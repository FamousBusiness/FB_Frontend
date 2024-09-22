import React, { useState } from 'react'
import { Card, Col, Row, Space, Rate } from 'antd'
import Image from 'next/image'
import { Player } from '@lottiefiles/react-lottie-player'


function AdsCard1({ item }) {
    const [status, setStatus]=useState(false)
    return (

        <Card className=' w-full shadow-md relative' hoverable>
            <Row gutter={[16, 12]}>
                <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                    <div className=' text-lg font-bold '>Ads Title</div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    <div className=' text-lg font-bold '>Ads Title</div>
                </Col>

                <Col span={24}>
                    <Row justify='space-between' gutter={[24, { xs: 5, md: 6, xs: 6, lg: 12, xl: 12, xxl: 12 }]}>
                        <Col span={7} className=' border border-1 h-33 rounded-lg' style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1661764256397-af154e87b1b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop")' }}>

                        </Col>
                        <Col span={17} >
                            <Row gutter={[0, 4]}>
                                <Col span={24} className=' text-lg font-semibold'> Price: ₹</Col>
                                {/* <Col span={24}><Space align='middle' size={2} dir='horizontal'><p className=' font-bold text-white bg-green-600 rounded-lg p-1'>4.2</p><Rate1 /><p className=' text-green-250 font-bold'>1883 Ratings</p></Space></Col> */}
                                <Col span={24} className=' text-lg font-semibold'> Sector 128 Noida 201304</Col>
                                <Col span={24} className=' mb-2'> IND | Noida</Col>
                                <Col span={24} className=' mb-2'> Remaining Time:</Col>

                            </Row>

                        </Col>



                    </Row>

                </Col>

            </Row>

            <div className={`absolute top-2 flex justify-center items-center flex-row right-3`}>
                Status <div className={` h-2 ml-1 rounded-full ${status?"bg-green-700":"bg-red-600"} w-2`}></div>
            </div>
        </Card>
    )
}

export default AdsCard1