import { Col, Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import PolicyDetails from './Data'

function Page() {
  return (
    <div className=' mx-10 py-4 bg-white'>
      <Row justify='center' gutter={[0,12]}>
        <Col>
          <div className=' relative'>
            <Image src='/about/privacy-policy.svg' width={400} height={400} alt='policy' />
            <div className=' w-full absolute text-2xl bottom-4 font-bold text-blue-600 text-center'>Privacy Policy</div>
          </div>
        </Col>
        <Col span={20}>
          <div>
          &quot;Respecting your privacy and prioritizing secure transactions, Webzotica Business Famous Software Private Limited and its affiliates, collectively referred to as &apos;WBFS Pvt. Ltd,&apos; are dedicated to transparently outlining our data practices. Through the Platform, <a href="https://famousbusiness.in">https://famousbusiness.in</a>, we ensure stringent security measures to protect your personal information from unauthorized access or disclosure.&quot;
          </div>
        </Col>
        <Col span={18}>
          <PolicyDetails/>
        </Col>
      </Row>

    </div>
  )
}

export default Page