import { Card, Carousel, Col, Row } from 'antd'
import React from 'react'
import BrandCard from './BrandCard'

function Banner({ brand, dealer, banner, handleShareClick }) {
    const array = [1, 2, 3]
    return (

        <Row justify='center'>
            <Col span={24} className='  mt-3 rounded-lg'>
                <BrandCard brand={brand} handleShareClick={handleShareClick} />
            </Col>
        </Row>

    )
}

export default Banner
