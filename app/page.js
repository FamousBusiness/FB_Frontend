"use client"
import React, { useEffect } from 'react';
import { Carousel, Col, Row, Space, Tooltip, Typography } from 'antd';
import Top from '@/components/users/home/TopSection/Top';
import TrendingBusiness from '@/components/users/home/BusinessCategoryNearme/TrendingBusiness';
import VerifyBusiness from '@/components/users/home/VerifyBusinessNearMe/VerifyBusiness';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { Poppins } from 'next/font/google';
// import Brands from '@/components/users/home/Brands/Brands';
// import Index from '@/components/users/home/Combo';
// import ProfilePop from '@/utils/ProfilePop';
// import SoftwareComponent from '@/components/users/home/SoftwareSection/SoftwareComponent';


const poppins = Poppins({
    weight: '500',
    subsets: ['latin']
})



const poppinss = Poppins({
    weight: '700',
    subsets: ['latin']
})


const { Text, Title } = Typography


function Page() {
    const controls = useAnimation();
    useEffect(() => {
        controls.start({ opacity: 1 });
    }, [controls]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.5 }}
        >
            <div className=' relative overflow-hidden dark:text-black'>
                {/* <ProfilePop /> */}
                <Row justify='center' gutter={[0, { xs: 12, sm: 12, md: 12, lg: 24, xl: 24 }]}>
                    <Col span={24}>
                        <Row justify="center" className=' bg-white drop-shadow-lg p-2'>
                            {/* Top Heading  */}
                            <Col xl={23} xxl={23} xs={0} md={23} sm={0} lg={23}>
                                <Row gutter={4} align='middle'>
                                    <Col>
                                        <div className={` ${poppinss.className} text-gray-700 font-sans dark:text-gray-700 text-base sm:text-3xl `}>Search</div>
                                    </Col>
                                    <Col span={12}>
                                        <Carousel swipeToSlide={true} effect='fade' vertical dots={false} autoplay>
                                            <div className=' sm:px-2 flex justify-center'>
                                                <p className={` ${poppinss.className} text-sm dark:text-black sm:text-2xl text-black `}>India&apos;s Largest <span className=' text-green-600'>B2B</span> And <span className='  text-green-600'>B2C</span> Marketplace!</p>
                                            </div>
                                            <div className=' sm:px-2  flex justify-center'>
                                                <p className={` ${poppinss.className} text-sm dark:text-black sm:text-2xl text-black  `}> 2 Crore+ <span className=' text-green-500'>Business</span></p>
                                            </div>
                                            <div className=' sm:px-2  flex justify-center'>
                                                <p className={` ${poppinss.className} text-sm dark:text-black sm:text-2xl text-black  `}>3.3 Crore+ <span className='  text-green-500'>Products & Services</span></p>
                                            </div>
                                        </Carousel>
                                    </Col>
                                </Row>
                            </Col>
                            {/* Top Heading  */}
                            {/* Top Heading for Mobile View */}
                            {/* Top Banner  */}
                            <Col className=' mt-2' xl={23} xxl={23} xs={24} md={23} sm={24} lg={24}>
                                <Top />
                            </Col>
                            {/* Top Banner  */}
                        </Row>
                    </Col>
                    <Col span={24} className=' bg-white drop-shadow-lg p-4'>
                        <Row justify='center' gutter={[0, 12]}>
                            <Col span={23}>
                                <p className={`${poppins.className} text-sm sm:text-xl text-gray-500`}>Trending Category Near Me</p>
                            </Col>
                            <Col span={23}>
                                <TrendingBusiness />
                            </Col>
                        </Row>
                    </Col>

                    {/* Business Tools For Mobile View */}
                    <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0} className=' p-4 bg-white drop-shadow-lg'>
                        <p className={`${poppins.className} text-lg  text-gray-500`}>Business Tools</p>
                        <Row justify='space-between' gutter={[0, 12]}>
                            <Col span={7}>
                                <Link href='/invoice-generator'>
                                    <div style={{ background: 'rgba(255, 76, 48)' }} className=' w-full text-xs py-1 relative  font-semibold rounded-lg border border-1 flex flex-col justify-center h-28 items-center text-center'>
                                        <Player
                                            style={{ width: '80%', marginTop: '-10px ', objectFit: 'cover', padding: 5 }}
                                            src='/CategoryNearMe/Invoice.json'
                                            loop
                                            autoplay
                                        />
                                        <div className=' static bottom-0 text-white font-bold'>Invoice Maker</div>
                                    </div>
                                </Link>
                            </Col>
                            <Col span={7}>
                                <Link href='/tender' >
                                    <div style={{ background: 'rgba(245, 40, 145, 0.8)' }} className=' w-full text-xs p-1 py-1 relative  font-semibold rounded-lg border border-1 flex flex-col justify-center h-28 items-center text-center'>
                                        <Player
                                            style={{ width: '80%', marginTop: '-10px ', objectFit: 'cover', padding: 5 }}
                                            src='/Lotties/Cart1.json'
                                            loop
                                            autoplay
                                        />
                                        <div className=' static bottom-0 text-white font-bold'>Online Tender</div>
                                    </div>
                                </Link>
                            </Col>
                            <Col span={7}>
                                <Link href='/leads'  >
                                    <div style={{ background: 'green' }} className=' w-full text-xs py-1 relative  font-semibold rounded-lg border border-1 flex flex-col justify-center h-28 items-center text-center'>
                                        <Player
                                            style={{ width: '80%', marginTop: '-10px ', objectFit: 'cover', padding: 5 }}
                                            src='/Lotties/Database.json'
                                            loop
                                            autoplay
                                        />
                                        <div className=' static bottom-0 text-white font-bold'>Live Leads</div>
                                    </div>
                                </Link>
                            </Col>
                            <Col span={7}>
                                <Link href='/registration' >
                                    <div style={{ background: 'rgba(3, 138, 255)' }} className=' w-full text-xs py-1 relative font-semibold rounded-lg border border-1  h-28 flex flex-col justify-center items-center text-center'>
                                        <Player
                                            style={{ width: '80%', marginTop: '-10px ', objectFit: 'cover', padding: 5 }}
                                            src='/Lotties/List.json'
                                            loop
                                            autoplay />
                                        <div className=' static bottom-0 text-white font-bold'>List Business</div>
                                    </div>
                                </Link>
                            </Col>
                            <Col span={7}>
                                <Link href='/enquiry' >
                                    <div style={{ background: 'rgba(255, 148, 112)' }} className=' w-full text-xs p-1 py-1 relative  font-semibold rounded-lg border border-1 flex flex-col justify-center h-28 items-center text-center'>
                                        <Player src='/Lotties/ads.json' loop autoplay style={{ width: '80%', marginTop: '-10px ', objectFit: 'cover', padding: 5 }} />
                                        <div className=' static bottom-0 text-white font-bold'>Post Enquiry</div>
                                    </div>
                                </Link>
                            </Col>

                            <Col span={7}>
                                <Link href='/plan/dashboard'>
                                    <div style={{ background: 'rgba(191, 85, 236)' }} className=' w-full text-xs py-1 relative  font-semibold rounded-lg border border-1 flex flex-col justify-center h-28 items-center text-center'>
                                        <Player
                                            style={{ width: '80%', marginTop: '-10px ', objectFit: 'cover', padding: 5 }}
                                            src='/Lotties/manage-order.json'
                                            loop
                                            autoplay
                                        />
                                        <div className=' static bottom-0  text-white font-bold'>My Plan</div>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    {/* Business Tools For Mobile View */}

                    {/* Trending Business */}
                   

                    {/* Verify Business Near ME */}
                    <Col span={24}>
                        <Row justify='center' className=' bg-white drop-shadow-lg py-2'>
                            <Col span={23}>
                                <p className={`${poppins.className} text-lg sm:text-xl text-gray-500`}>Business Near Me</p>
                            </Col>
                            <Col xl={24} md={24} xs={24} sm={24} xxl={24} lg={24}>
                                <VerifyBusiness />
                            </Col>
                        </Row>
                    </Col>

                    {/* Ads Near ME */}
                    {/* <Col span={23}>
                        <BasicCard/>
                    </Col> */}

                    {/* Ads Near ME */}

                    {/* Combo leads */}
                   
                    {/* Desktop View Software section */}
                   

                </Row>
                <div className='fixed invisible -right-9 sm:visible z-30 top-1/2'>
                    <Link href='/registration'>
                        <div className='drop-shadow-lg  rotate-90 text-base rounded-b-md cursor-pointer border-2 hover:px-3
             text-white dark:text-white dark:bg-orange-600 bg-red-600 hover:text-white duration-100
             border-white py-2 px-4 font-semibold'>
                            Free Listing
                        </div>
                    </Link>
                </div>
                <div className='fixed invisible sm:visible -right-6 z-30 top-2/3 sm:top-3/4'>
                    <Link href='/enquiry'>
                        <div className='drop-shadow-lg  rotate-90 text-base rounded-b-md cursor-pointer border-2 hover:px-3
             text-white dark:text-white dark:bg-indigo-600 bg-indigo-600 hover:text-white duration-100
             border-white py-2 px-4 font-semibold'>
                            Enquiry
                        </div>
                    </Link>
                </div>

            </div>
        </motion.div>
    )
}
export default Page
