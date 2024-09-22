"use client";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Card, Carousel, Col, Row, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import BrandSkeleton from './BrandSkeleton'
import { useHomeData } from '@/services/Commondata/HomeData';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
    weight:'500',
    subsets:['latin']
})

function Brands({font}) {
    const [category, setCategory] = useState(1)
    // const { data, error } = useSWR(category, fetcher);
    const { homedata, isLoading, isError } = useHomeData()
    const carouselRefOne = useRef();

    if (isLoading) {
        return <div><BrandSkeleton /></div>
    }

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
        <Row justify='center' >
            {/* Desktop */}
            <Col xs={0} sm={0} md={0} xl={24} xxl={24} lg={24}>
                <Row justify='center' gutter={[12, 20]} align='middle'>
                    <Col span={23}>
                        <Row justify='space-between'>
                            <Col>
                                <p className={`${poppins.className} text-lg sm:text-xl text-gray-500`}>Authorize Dealer & Supplier By Brands</p>
                            </Col>
                            <Col>
                        <Link href='/brands/all-brands' className=' no-underline'>
                                <p className=' sm:text-2xl'>View All</p>
                            </Link>
                        </Col>
                        </Row>
                    </Col>
                    {homedata && homedata.brands.length > 0 ?
                        <Col xs={0} sm={0} md={23} xl={24} xxl={24} lg={24}>
                            <Row justify='space-between' align='middle' gutter={[0, 12]}>
                                <Col><LeftOutlined onClick={handlePrevOne} className=' text-3xl hover:text-white border-1 border hover:bg-blue-500 hover:-translate-x-1 hovver:shadow-md p-2 rounded-full duration-75 ' /></Col>
                                <Col span={21}>
                                    <Carousel ref={carouselRefOne} rows={1} dots={false} slidesToShow={homedata.brands.length >= 6 ? 6 : homedata.brands.length} >
                                        {homedata.brands.map((item, index) =>
                                            <div className=' p-2' key={item.id}>
                                                <Link
                                                    href={`/brands/all-brands/[city]`}
                                                    as={`/brands/all-brands/${item.brand_name}`}>
                                                    <Card hoverable bordered style={{borderRadius:'20px'}} className=' relative  shadow-md'>
                                                        <div className='h-52 relative'>
                                                            {item.products && item.products.length > 0 && <Image src={item.products[0].image} alt={`Product image for`} fill sizes="100%" className="object-contain w-auto h-auto" />}
                                                        </div>
                                                        <div className=' bg-white relative h-16'>
                                                            <div className=' relative h-full '>
                                                                <Image src={item.icons} alt='brans' fill className=' object-fill w-full h-auto ' sizes="(min-width: 808px) 50vw, 100vw" />
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </div>
                                        )}
                                    </Carousel>
                                </Col>
                                <Col >
                                    <RightOutlined onClick={handleNextOne} className=' text-3xl hover:text-white border-1 border hover:bg-blue-500 hover:translate-x-1 hovver:shadow-md p-2 rounded-full duration-75  ' />
                                </Col>
                            </Row>
                        </Col> : <Col span={24}><BrandSkeleton /></Col>}
                </Row>

            </Col>

            {/* Mobile View */}
            <Col xs={24} sm={24} md={0} xl={0} xxl={0} lg={0}>
                <Row justify='center' gutter={[12, 20]} align='middle'>
                    <Col span={23}>
                        <div className={`${poppins.className} text-lg text-gray-500`}>Authorize Dealer & Supplier By Brands</div>
                    </Col>
                    {homedata && homedata.brands.length > 0 ?
                        <Col span={24}>
                            <Carousel infinite={false} effect='scrollx'  swipeToSlide rows={1} dots={false} slidesToShow={2.4} >
                                {homedata.brands.map((item, index) =>
                                    <div key={item.id} className=' p-1'>
                                        <Link
                                            href={`/brands/all-brands/[city]`}
                                            as={`/brands/all-brands/${item.brand_name}`}>
                                            <Card  bordered hoverable style={{borderRadius:'20px'}} className=' relative shadow-sm'>
                                                
                                                    {item.products && item.products.length > 0 && (
                                                        <div className='h-24 relative'>
                                                            {item.products && item.products.length > 0 && <Image src={item.products[0].image} alt={`Product image for`} fill sizes="100%" className="object-contain w-auto h-auto" />}
                                                        </div>
                                                    )}
                                                <div className=' bg-white static h-10'>
                                                    <div className=' relative h-full '>
                                                        <Image src={item.icons} alt='brans' fill className=' object-fill w-full h-auto ' sizes="(min-width: 808px) 50vw, 100vw" />
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                )}
                            </Carousel>
                        </Col>
                        : <Col span={24}><BrandSkeleton /></Col>}
                    <Col ><Link href='/brands/all-brands' className=' px-3 py-1 bg-blue-500 rounded-full text-white text-semibold'>All Brands</Link></Col>
                </Row>
            </Col>
        </Row>





    )
}

export default Brands
