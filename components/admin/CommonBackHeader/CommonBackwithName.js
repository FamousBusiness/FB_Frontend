"use client"
import { Player } from '@lottiefiles/react-lottie-player'
import { Col, Row } from 'antd'
import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa6'
import { IoIosArrowBack } from 'react-icons/io'
import CountUp from 'react-countup';
import { BiUserCircle } from 'react-icons/bi'
import { usePathname, useRouter } from 'next/navigation'

function CommonBackwithName() {
    const router=useRouter();
     const pathName=usePathname();
    return (
        <div className=' px-2 py-2 bg-white '>
        <Row justify='start' align='middle'>
            <Col span={4}>
            <Row gutter={8} align='middle'>
                <Col>
                <IoIosArrowBack onClick={()=>router.back()} className='text-xl'/>
                </Col>
              
            </Row>
           
            
            </Col>
            <Col span={20}>
                <Row justify='center' align='middle'>
                    <Col>{pathName}</Col>
                </Row>
            </Col>

        </Row>
        </div>
    )
}

export default CommonBackwithName