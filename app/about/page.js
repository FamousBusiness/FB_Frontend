"use client"
import { Player } from '@lottiefiles/react-lottie-player'
import { Col, Row } from 'antd'
import React from 'react'

function Page() {
    return (
         <>    
         {/* <Navbar/>   */}
        <div className=' p-6'>
            <Row justify='center' align='middle' gutter={[24, 24]}>
                <Col xxl={11} sm={23} xs={23} lg={11} xl={11}>
                    <div className=' text-sm font-black sm:text-3xl'>About Us</div>
                    <Player src='about/creative-idea.json' loop autoplay />
                </Col>
                <Col xxl={11} sm={23} xs={23} lg={11} xl={11}>

                    <p className=' text-2xl sm:text-5xl font-bold font-sans text-purple-800'>Make In INDIA Make For India  MSMEs Go Digital &apos;<span className=' text-red-500'>Power to Empower</span>&apos;</p>
                    <p className=' text-lg mt-3 '>
                        Micro, Small & Medium Enterprises India&apos;s No. 1 Marketplace
                        We are one of India&apos;s largest B2B & B2C e-commerce supply chain Network platforms that connect buyers and suppliers to create a customer-driven value chain for all businesses, including SMEs, integrate businesses into global value chains by implementing innovative solutions and facilitating seamless connections between buyers and suppliers, thereby enhancing the efficiency of the entire supply chain for diverse enterprises, including SMEs, large corporations, and individual entrepreneurs
                    </p>



                </Col>
                <Col span={22}>
                    <p className=' text-lg'>
                        The Webzotica Business Famous Software Private Limited operates www.famousbusiness.in. Through (www.famousbusiness.in). Webzotica Business Famous Software Private Limited is a company incorporated under CIN: U63112HR2023PTC116103 the Companies Act, 1956, with its registered office located at Building 545 Sector-58 Transport Nagar Ballabgarh Faridabad-121004-Haryana. Famous Business engages in the business of furnishing information about Vendors (as defined hereinafter) offering various products and services (&quot;Information&quot;) in selected towns and cities in India (&quot;Service&quot;) to end users. Operating as both a B2B and B2C Marketplace, Famous Business primarily provides directory services to its Callers/Users based on their requirements and searches made on www.famousbusiness.in&apos;s portals, as applicable to the vendors.
                    </p>
                </Col>
                <Col span={22}>
                    <p className=' text-2xl sm:text-5xl text-purple-800 font-bold'>Our Mission and Vision</p>
                </Col>
                <Col xxl={11} sm={23} xs={23} lg={11} xl={11} >

                    <Player src='/about/indian-spaceship-in-space (1).json' style={{ width: '80%' }} loop autoplay />


                </Col>
                <Col xxl={11} sm={23} xs={23} lg={11} xl={11} >
                    <p className=' text-lg sm:text-3xl font-bold text-gray-700  '>
                        The mission is to empower over 63 million SMEs to embark on their digital journey.
                    </p>
                    <p className=' text-xl mt-3'>
                        Utilizing technology providing digital information to both buyers and sellers innovation as catalysts, our goal is to assist users in reinventing their businesses to compete and succeed, with digitization as the central focus. We take pride in being the exclusive marketplace that provides 360° digital marketing solutions tailored for Micro, Small & Medium Enterprises (MSMEs), empowering them to become tech-enabled and thrive in the digital landscape
                    </p>
                </Col>
            </Row>

        </div>
    </>
    )
}

export default Page