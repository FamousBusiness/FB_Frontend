"use client"
import { Player } from '@lottiefiles/react-lottie-player'
import { Col, Row } from 'antd'
import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa6'
import { IoIosArrowBack } from 'react-icons/io'
import CountUp from 'react-countup';
import { BiUserCircle } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

function Back() {
    const router = useRouter();
    return (
        <Row>
            <Col xl={0} lg={0} xxl={0} xs={24} md={24} sm={24} className=' px-2 py-2 bg-white '>
                <Row justify='space-between' align='middle'>
                    <Col>
                        <Row gutter={8} align='middle'>
                            <Col>
                                <IoIosArrowBack onClick={() => router.back()} className='text-xl' />
                            </Col>
                            <Col><span className=' font-black text-blue-500'>Famous</span><span className=' font-black text-green-600'>Business</span> </Col>
                        </Row>


                    </Col>

                    

                </Row>
            </Col>
        </Row>
    )
}

export default Back