"use client"
import { Col, Row, Skeleton } from 'antd'
import React from 'react'

function SearchPageSkeleton() {
  return (
    <div>
    <Row justify='center'  gutter={[0,30]}>
        <Col sm={24} xs={24} md={24} lg={23} xl={23} xxl={23} className=' h-48'> 
        <Skeleton.Input block={true} active  style={{ width: '100%', height:"192px"}} /></Col>

        <Col span={23}>
            <Row gutter={12} align='middle'>
                <Col sm={24} xs={24} md={24} lg={18} xl={18} xxl={18}>
                <Skeleton paragraph={{rows:8}} className=' w-full'/>
                </Col>

                <Col sm={0} xs={0} md={0} lg={6} xl={6} xxl={6}>
                    <Skeleton active paragraph={{rows:8}}/>
                </Col>
            </Row>
        </Col>
    </Row>
      
    </div>
  )
}

export default SearchPageSkeleton
