"use client"
import { Player } from '@lottiefiles/react-lottie-player'
import { Col, Row } from 'antd'
import React from 'react'





function Page() {
    return (
           
    <div style={{ padding: '1.5rem' }}>
    <Row justify='center' align='middle' gutter={[24, 24]}>
        <Col xxl={11} sm={23} xs={23} lg={11} xl={11}>
            <div style={{ fontSize: '0.875rem', fontWeight: '900', 
                '@media (minWidth: 640px)': { fontSize: '1.875rem' } }}>About Us</div>
            <Player src='about/creative-idea.json' loop autoplay />
        </Col>
        <Col xxl={11} sm={23} xs={23} lg={11} xl={11}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'sans-serif', color: '#6b21a8',
                '@media (minWidth: 640px)': { fontSize: '3rem' } }}>
                Make In INDIA Make For India MSMEs Go Digital &apos;
                <span style={{ color: '#dc2626' }}>Power to Empower</span>&apos;
            </p>
            <p style={{ fontSize: '1.125rem', marginTop: '0.75rem' }}>
                Micro, Small & Medium Enterprises India&apos;s No. 1 Marketplace...
            </p>
        </Col>
        <Col span={22}>
            <p style={{ fontSize: '1.125rem' }}>
                The Webzotica Business Famous Software Private Limited operates www.famousbusiness.in...
            </p>
        </Col>
        <Col span={22}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6b21a8', 
                '@media (minWidth: 640px)': { fontSize: '3rem' } }}>
                Our Mission and Vision
            </p>
        </Col>
        <Col xxl={11} sm={23} xs={23} lg={11} xl={11}>
            <Player src='/about/indian-spaceship-in-space (1).json' style={{ width: '80%' }} loop autoplay />
        </Col>
        <Col xxl={11} sm={23} xs={23} lg={11} xl={11}>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', 
                '@media (minWidth: 640px)': { fontSize: '1.875rem' } }}>
                The mission is to empower over 63 million SMEs to embark on their digital journey.
            </p>
            <p style={{ fontSize: '1.25rem', marginTop: '0.75rem' }}>
                Utilizing technology providing digital information to both buyers and sellers...
            </p>
        </Col>
    </Row>
</div>

    )
}

export default Page