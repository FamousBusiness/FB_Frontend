// Import necessary libraries and components
"use client";
import { Button, Card, Carousel, Col, Empty, Row, Skeleton } from 'antd';
import React, { useRef } from 'react';
import CardVerify from '../../CardVerify';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useHomeData } from '@/services/Commondata/HomeData';
import MobileCard from './mobileCard';




// VerifyBusiness functional component
function VerifyBusiness() {
    // Create a ref for the carousel
    const carouselRefOne = useRef();

    // Fetch data using useHomeData hook
    const { homedata, isLoading, isError } = useHomeData();

    // If data is still loading, display Skeleton
    if (isLoading) {
        return (<div className=' my-2'>
            <Row justify='center' gutter={8}>
                {[...Array(3)].map((_, index) => (
                    <Col key={index} lg={7} xxl={7} sm={0} md={0} xs={0} xl={7}>
                        <Card loading={true} >

                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
        );
    }

    
    // If there's an error, display an error message
    if (isError) {
        return <p>Error loading data.</p>;
    }

    // Functions to handle next and previous for the first carousel
    const handleNextOne = () => {
        carouselRefOne.current.next();
    };

    const handlePrevOne = () => {
        carouselRefOne.current.prev();
    };

    return (
        <>
            {/* Desktop view: Carousel with CardVerify */}
            <Row justify='center' gutter={[0, 8]} align='middle'>
                {homedata.Business && homedata.Business.length > 0 ? (<Col xl={24} xxl={24} sm={0} xs={0} md={24} lg={24}>
                    <Row justify='center' gutter={[0, 8]} align='middle'>
                        <Col>

                            <LeftOutlined onClick={handlePrevOne} className='text-3xl hover:text-white hover:bg-blue-400 hover:shadow-md hover:-translate-x-1 duration-75 p-2 border border-1 rounded-full' />

                        </Col>
                        <Col xl={22} xxl={22} sm={0} xs={0} md={0} lg={22} className='relative place-content-center'>
                            {/* Display business data carousel */}
                            <Carousel dots={false} pauseOnFocus={true} rows={1} slidesToShow={3} className='p-1' ref={carouselRefOne}>
                                {homedata.Business.map((item) => (
                                    <div key={item.id} className='p-1'>
                                        <CardVerify key={item.id} item={item} />
                                    </div>
                                ))}
                            </Carousel>
                        </Col>
                        <Col  >
                            <RightOutlined onClick={handleNextOne} className='text-3xl hover:text-white hover:bg-blue-400 hover:shadow-md hover:translate-x-1 duration-75 p-2 border border-1 rounded-full' />
                        </Col>
                    </Row>
                </Col>) : (
                    <Empty />
                )}

                {/* Mobile view: Carousel with MobileCard */}
                <Col xl={0} xxl={0} sm={24} xs={24} md={0} lg={0}>
                    {homedata.Business && homedata.Business.length > 0 ? (
                        <Carousel dots={false} className=' ml-1' draggable={true} swipeToSlide={false} effect='scrollx' infinite={false} centerMode={false} touchThreshold={10} speed={400} slidesToShow={1.1}>
                            {homedata.Business.map((item, index) => (
                                <div key={item.id} className='p-2'>
                                    <MobileCard key={item.id} items={item} />
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <p>No business data available</p>
                    )}
                </Col>
            </Row>
        </>
    );
}

// Export the VerifyBusiness component
export default VerifyBusiness;
