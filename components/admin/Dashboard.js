import { Row, Col } from 'antd'
import React from 'react'
import Card1 from './Card'

function Dashboard() {
    return (
        <Row gutter={[16, 16]}>
            {/* Top Bar */}
            <Col span={8} ><Card1 height={100} width="100%" /></Col>
            <Col span={8} ><Card1 height={100} width="100%" /></Col>
            <Col span={8} ><Card1 height={100} width="100%" /></Col>
            {/* Top bar end */}

            {/* Main card */}
            <Col span={12} ><Card1 height={250} width="100%" /></Col>
            <Col span={12} ><Card1 height={250} width="100%" /></Col>
            <Col span={12} ><Card1 height={250} width="100%" /></Col>
            <Col span={12} ><Card1 height={250} width="100%" /></Col>
            {/* Main card end */}
        </Row>
    )
}

export default Dashboard