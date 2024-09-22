"use client";
import React from 'react'
import { Row, Col } from 'antd';
import Card1 from '@/components/admin/Card';

function page() {
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={8}><Card1/></Col>
        <Col span={8}><Card1/></Col>
        <Col span={8}><Card1/></Col>
    

      </Row>
    </>
  )
}

export default page