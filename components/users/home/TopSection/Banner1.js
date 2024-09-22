// import { Player } from '@lottiefiles/react-lottie-player'
import { Col, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



function Banner1({ banner }) {
    return (
        <Row justify='center' gutter={12} >
            <Col lg={4} xl={4} xxl={4} sm={0} xs={0} md={0}>
                <div className=' w-full flex flex-col items-center bg-green-700 relative h-56 rounded-lg '>
                    <div className=' static h-44 '>
                        {/* <Player src='/Lotties/List.json' alt='just' style={{ width: "80%" }} autoplay loop /> */}
                    </div>
                    <Link href="/list-business" ><div className=' px-2 py-1 font-semibold text-base rounded-lg border border-1 text-center text-white'>List Business Page</div></Link>
                </div>
            </Col>
            <Col lg={16} xl={16} xxl={16} sm={24} xs={24} md={24} className=' rounded-lg border-1 border'>
                {/* <Image */}
            </Col>
            <Col lg={4} xl={4} xxl={4} sm={0} xs={0} md={0}>

                <div className=' bg-amber-600 w-full flex flex-col items-center h-56 rounded-lg '>
                    <div className='h-44 static'>
                        {/* <Player src='/Lotties/Database1.json' style={{ width: '80%' }} alt='loop' autoplay loop /> */}
                    </div>
                    <Link href="/leads" ><div className=' px-2 py-1 font-semibold text-base rounded-lg border border-1 text-center text-white'>View Leads</div></Link>
                </div>
            </Col>
        </Row>
    )
}

export default Banner1
