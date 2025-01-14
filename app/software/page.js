
"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Card, Carousel, Col, Row } from 'antd';
import Software from '@/components/users/home/SoftwareSection/Software';
import { product } from '@/data/data';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Poppins } from 'next/font/google';



const poppins = Poppins({
    weight: '500',
    subsets: ['latin']
})



function SoftwareComponent() {

    const [data, setData] = useState([])
    const carouselRefOne = useRef();
    const array = [1, 2, 3, 4]

    // Functions to handle next and previous for the first carousel
    const handleNextOne = () => {
        carouselRefOne.current.next();
    };

    const handlePrevOne = () => {
        carouselRefOne.current.prev();
    };

    useEffect(() => {

        setData(product);

    }, []);


    
    return (
        <div style={{
            padding: '24px 0',
            background: '#FFF8F2'
        }}
        >
            {data.length > 0 ?
                <Row gutter={[12, 12]} justify='center' align='middle'>
                    <Col span={24}>
                        <Row justify='center'>
                            <Col span={23}>
                                <p className={`${poppins.className} text-lg sm:text-xl text-gray-500`}>
                                    Best Software To Start A Business
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={0} xs={0} lg={24} xxl={24} md={24} xl={24}>
                        <Row gutter={[12, 12]} justify='center' align='middle'>
                            <Col className='  bg-slate-100 hover:bg-red-200 duration-100 cursor-pointer py-10 shadow-sm h-full'> <div onClick={handlePrevOne} className='  left-0 z-10 ' ><LeftOutlined className=' text-3xl ' /></div></Col>
                            <Col span={22}>
                                <Carousel dots={false} ref={carouselRefOne} slidesToShow={4} >
                                    {data.map((item, index) => {
                                        return (
                                            <div key={item.product_id} className=' p-2'>
                                                <Software item={item} />
                                            </div>
                                        )
                                    })}
                                </Carousel>
                            </Col>
                            <Col className='bg-slate-100 hover:bg-red-200 duration-100 cursor-pointer py-10 shadow-sm h-full'> <div onClick={handleNextOne} className='  right-0 z-10' ><RightOutlined className=' text-3xl ' /></div></Col>
                        </Row>
                    </Col>
                    <Col sm={24} xs={24} lg={0} xxl={0} md={0} xl={0}>
                        <Carousel dots={false} className=' ml-2' draggable={true} swipeToSlide={false} effect='scrollx' infinite={false} centerMode={false} touchThreshold={10} speed={400} slidesToShow={1.4}>
                            {data.map((item, index) => {
                                return (
                                    <div key={item.product_id} className=' p-2'>
                                        <Software item={item} />
                                    </div>
                                )
                            })}
                        </Carousel>
                    </Col>
                </Row> : <Carousel slidesToShow={4}>
                    {array.map(index =>
                        <div key={index} className=' p-2'>
                            <Card loading={true}>

                            </Card>
                        </div>
                    )}
                </Carousel>}
        </div>

    )
};


export default SoftwareComponent



