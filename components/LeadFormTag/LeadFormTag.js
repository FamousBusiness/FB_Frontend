"use client"

// import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import { Carousel, Col, Empty, Row } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import LeadFormTagCard from './LeadFormTagCard';


// const LeadFormTagCard = dynamic(()=> import ('./LeadFormTagCard'), { ssr: false })



///// Lead form tag
export default function HomeLeadFormTagWise({ leadFormData = [] }) {
    const carouselRefOne = useRef();
    // const [apiURL, setAPIUrl] = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 'https://api.famousbusiness.in');

    const handleNextOne = () => {
        carouselRefOne.current.next();
    };

    const handlePrevOne = () => {
        carouselRefOne.current.prev();
    };


    return (
        <Row justify='center' gutter={[0, 8]} align='middle'>
            {leadFormData && leadFormData.length > 0 ? (

                // <Col xl={24} xxl={24} sm={0} xs={0} md={24} lg={24}>
                <Col span={24}>
                    {/* <Row justify='center' gutter={[0, 8]} align='middle'> */}
                    <Row justify='center' gutter={[16, 16]} align='middle'>
                        <Col xs={2} sm={1}>
                            <LeftOutlined onClick={handlePrevOne} className='text-3xl hover:text-white hover:bg-blue-400 hover:shadow-md hover:-translate-x-1 duration-75 p-2 border border-1 rounded-full' />
                        </Col>

                        <Col xs={20} sm={22} md={22} lg={22} className="relative">
                            <Carousel 
                                dots={false} 
                                pauseOnFocus={true} 
                                rows={1} 
                                slidesToShow={3} 
                                className='p-1' 
                                ref={carouselRefOne}
                                responsive={[
                                    {
                                      breakpoint: 768,
                                      settings: {
                                        slidesToShow: 2,
                                      },
                                    },
                                    {
                                      breakpoint: 480,
                                      settings: {
                                        slidesToShow: 1,
                                      },
                                    },
                                ]}
                                >
                                {leadFormData.map((item) => (
                                    <div key={item.id} className='p-1'>
                                        <LeadFormTagCard key={item.id} item={item} />
                                    </div>
                                ))} 
                               
                            </Carousel>
                        </Col>

                        {/* <Col> */}
                        <Col xs={2} sm={1}>
                            <RightOutlined onClick={handleNextOne} className='text-3xl hover:text-white hover:bg-blue-400 hover:shadow-md hover:translate-x-1 duration-75 p-2 border border-1 rounded-full' />
                        </Col>
                    </Row>
                </Col>

            ) : (
                <Empty />
            )}

        </Row>

    );
};



