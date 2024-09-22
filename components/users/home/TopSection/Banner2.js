// import { Player } from '@lottiefiles/react-lottie-player'
import { Col, Row } from 'antd'
import React from 'react'




function Banner2() {
    return (
        <Row justify='center' gutter={12}>
            <Col lg={4} xl={4} xxl={4} sm={0} xs={0} md={0}>
                <div className="w-full bg-amber-500 relative rounded-lg h-56  items-center ">
                    <div className=' flex flex-col items-center justify-center '>
                        {/* <Player src='/Lotties/ads.json' loop autoplay style={{ width: '70%' }} /> */}
                        <div className=' border border-1 rounded-lg border-white py-2 px-4 text-white font-bold text-xl'>Post Free Ads</div>
                    </div>
                </div>
            </Col>
            <Col  lg={16} xl={16} xxl={16} sm={24} xs={24} md={24}>
                <div className=' bg-slate-300 rounded-lg flex flex-col justify-center items-center h-56 w-full'>

                </div>
            </Col>
            <Col lg={4} xl={4} xxl={4} sm={0} xs={0} md={0}>
                <div style={{ background: '#19A29A' }} className="w-full rounded-lg h-56 relative  items-center ">
                <div className=' flex flex-col items-center justify-center '>
                        {/* <Player src='/Lotties/View.json' loop autoplay style={{ width: '70%' }} /> */}
                        <div className=' border border-1 rounded-lg border-white py-2 px-4 text-white font-bold text-xl'>View My Ads</div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Banner2