"use client";
import { Col, Row } from 'antd'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import MobileDrawer from './MobileDraw';

function Navbar() {
    const pathname = usePathname()
    return (<>
        <Row justify='center' className=' bg-white py-4 shadow-md text-2xl dark:text-gray-700 font-bold sticky top-0 z-10'>
            <Col span={23}>
                <Row justify='space-between' align='middle'>
                    <Col>
                        <Link className="text-lg sm:text-3xl font-bold" href="/" prefetch scroll={false}>
                            <span className='text-blue-600'>Famous </span>
                            <span className='text-green-700'>Business</span>
                        </Link>
                    </Col>
                    <Col sm={0} xs={0} lg={18} xxl={18} xl={18}>
                        <Row justify='space-around' align='middle'>
                            <Col>
                                <Link className={`${pathname === '/about' ? 'text-black' : 'text-gray-400'}`} href='/about'>About Us</Link>
                            </Col>
                            <Col>
                                <Link className={`${pathname === '/about/policy' ? 'text-black' : 'text-gray-400'}`} href='/about/policy'>Privacy Policy</Link>
                            </Col>
                            <Col>
                                <Link className={`${pathname === '/about/Terms-Condition' ? 'text-black' : 'text-gray-400'}`} href='/about/Terms-Condition'>Terms And Condition </Link>
                            </Col>
                            
                            <Col>
                                <Link className={`${pathname === '/about/Cancellation-and-Refund' ? 'text-black' : 'text-gray-400'}`} href='/about/Cancellation-and-Refund'>Cancellation & Refund</Link>
                            </Col>
                            
                            <Col>
                                <Link className={`${pathname === '/about/shipment-and-delivery' ? 'text-black' : 'text-gray-400'}`} href='/about/shipment-and-delivery'>Shipment and Delivery</Link>
                            </Col>
                            <Col>
                                <Link className={`${pathname === '/about/Contact' ? 'text-black' : 'text-gray-400'}`} href='/about/Contact'>Contact Us </Link>
                            </Col>
                        </Row>

                    </Col>
                    <Col sm={2} xs={2} xl={0} xxl={0} lg={0}>
                       <MobileDrawer/>
                    </Col>
                </Row>

            </Col>
        </Row>
        </>


    )
}

export default Navbar