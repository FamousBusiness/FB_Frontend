"use client";
import { Carousel, Col, Row } from 'antd'
import { useRouter } from 'next/navigation';
import React from 'react'
import Image from 'next/image';


function Banner({ banner, side }) {
    const router = useRouter()
    return (

        <Row justify='center'>
            <Col span={24}>
                <Row justify='center' gutter={12} >
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}>
                        {/* <HealthComponent /> */}
                        <div className='w-full bg-slate-100 relative overflow-hidden h-60 rounded-lg '>
                            {side && side.length>0 && <Image src={side[0].image1} fill sizes='100%' style={{ objectFit: 'cover', width: '100%' }} alt='image1' />}
                        </div>
                    </Col>
                    <Col sm={23} xs={23} md={23} lg={16} xl={16} xxl={16}>
                        {banner && banner.length > 0 ? <Carousel effect='fade' slidesToScroll={1} slidesToShow={1} autoplay pauseOnFocus pauseOnHover autoplaySpeed={3000} dots={true}>
                            {banner.map((item) => <div key={item.id} onClick={() => router.push(`/userprofile/${item.city}/?z_id=${item.id}`)} className=' relative w-full h-32 overflow-hidden rounded-lg lg:h-60 bg-slate-100'>
                                <Image src={item.image} sizes="100%" alt='home' fill className=' object-contain' />
                            </div>)}
                        </Carousel> : "No banner"}
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4} >

                        <div className='w-full bg-slate-100 relative overflow-hidden h-60 rounded-lg '>
                            {side && side.length>0  && <Image src={side[0].image2} fill sizes='100%' width={160} height={160} alt='image2' />}
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}

export default Banner