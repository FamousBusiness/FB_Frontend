import { Col, Row, Skeleton } from 'antd'
import React from 'react'

function BrandSkeleton() {
    return (
        <Row justify='space-between'>
            <Col xs={0} sm={0} xl={24} lg={24} xxl={24} md={0}>
                <Row justify='space-around'>
                    <Col span={3}>
                        <Skeleton.Input block active style={{ height: '218px' }} />
                    </Col>
                    <Col span={3}>
                        <Skeleton.Input block active style={{ height: '218px' }} />
                    </Col>
                    <Col span={3}>
                        <Skeleton.Input block active style={{ height: '218px' }} />
                    </Col>
                    <Col span={3}>
                        <Skeleton.Input block active style={{ height: '218px' }} />
                    </Col>
                    <Col span={3}>
                        <Skeleton.Input block active style={{ height: '218px' }} />
                    </Col>
                    <Col span={3}>
                        <Skeleton.Input block active style={{ height: '218px' }} />
                    </Col>
                </Row>
            </Col>
            <Col xs={23} sm={23} xl={0} lg={0} xxl={0} md={0}>
                <Row justify='space-around'>
                    <Col span={6}>
                        <Skeleton.Avatar shape='square' size={100} active />
                    </Col>
                    <Col span={6}>
                        <Skeleton.Avatar shape='square' size={100} active />
                    </Col>
                    <Col span={6}>
                        <Skeleton.Avatar shape='square' size={100} active />
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}

export default BrandSkeleton
