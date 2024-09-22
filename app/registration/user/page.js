"use client"
import RegistrationForm from '@/components/users/auth/RegistrationForm'
import { Player } from '@lottiefiles/react-lottie-player'
import { Col, Row } from 'antd'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <Row justify='center' gutter={[0, 24]}>
      <Col xl={23} xxl={23} sm={24} xs={24} lg={23} >
        <div className=' min-h-screen bg-white'>
          <Row justify='center' gutter={[0, 24]}>
            <Col span={22} className=' top-6'>
              <Link className="text-lg sm:text-3xl font-bold" href="/"  scroll={false}>
                <span className='text-blue-600'>Famous </span>
                <span className='text-green-700'>Business</span>
              </Link>
              <hr className=' my-2' />
            </Col>


            <Col xl={14} xxl={14} sm={24} xs={24} lg={14}>
              <div className=' flex flex-col  justify-center items-center'>
                <Player src='/SignUp/SignUp.json' autoplay loop className=' w-full '/>
              </div>
            </Col>
            <Col xl={10} xxl={10} sm={24} xs={24} lg={10}>
             <RegistrationForm/>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  )
}

export default Page