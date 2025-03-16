"use client";
import { Player } from '@lottiefiles/react-lottie-player'
import { Col, Flex, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaSquareFacebook } from 'react-icons/fa6';




function Footer({ BusinessName }) {
  const pathName = usePathname()

return (
<>
{
    pathName.includes('/failure') || pathName.includes('/success') || pathName.includes('/admin') || pathName.includes('/userprofile') || pathName.includes('/brands/Branddeatails') || pathName.includes('/login') || pathName.includes('/registration') || pathName.includes('/job/employerdash') || pathName.includes('/job/employeedash') ? null :
    
      <div 
      style={{
        position: "relative",
        color: "black",
        borderRadius: "1rem", 
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", 
        margin: "0", 
        marginTop: "1rem", 
        marginBottom: "1rem", 
        backgroundColor: "white", 
        paddingTop: "1.5rem", 
        paddingBottom: "1.5rem", 
      }}
      >
        <Row justify='center' align='middle'>
          <Col span={23}>
            <Row justify='start' align='top'>
              <Col span={18} >
                <Row justify='start' gutter={[{ xs: 8, sm: 8, md: 8, lg: 24, xl: 24 }, 12]}>

                  <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                    <div 
                     style={{
                        fontSize: "1.875rem", 
                        textAlign: "start", 
                        fontWeight: "800", 
                        color: "#334155", 
                      }}
                    >
                        {BusinessName ? `${BusinessName.business_name}` : 
                        (<><span className=' text-blue-600'>Famous </span><span className=' text-green-700'>Business</span></>)}
                    </div>
                  </Col>


                  <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    {BusinessName ? 
                    <div 
                    style={{
                        fontSize: "1.125rem", 
                        fontWeight: "700", 
                        color: "#334155", 
                      }}
                    >{BusinessName.business_name}</div> :
                      <div>
                        <span style={{fontWeight: "900", color: "#2563eb"}}>Famous</span>
                        <span style={{fontWeight: "900", color: "#15803d"}}>Business</span>
                    </div>}
                    <div style={{fontSize: "0.875rem", fontWeight: "500", color: "#64748b"}}>Thank you for being a valued customer!</div>
                  </Col>


                  <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                    <Row align='middle' gutter={[{ xs: 8, sm: 8, md: 8, lg: 24, xl: 24 }, 12]}>

                      <Col span={3}  >
                        <Player src='/Footer/secure.json' autoplay loop />
                      </Col>

                      <Col span={3}>
                        <Image src='/payments/visa.svg' width={110} height={110} alt='visa' />
                      </Col>

                      <Col span={3}>
                        <Image src='/payments/payment.svg' width={140} height={140} alt='paytm' />
                      </Col>

                      <Col span={3}>
                        <Image src='/payments/mastercard.svg' width={110} height={110} alt='master' />
                      </Col>

                      <Col span={3}>
                        <Image src='/payments/upi.svg' width={110} height={110} alt='upi' />
                      </Col>

                      <Col span={3}>
                        <Image src='/payments/paytm.svg' width={110} height={110} alt='paytm' />
                      </Col>

                      <Col span={3}>
                        <Image src='/payments/google-pay.svg' width={110} height={110} alt='gpay' />
                      </Col>

                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className=' relative'>
                <Row justify='center' >
                  <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <Player src='/Footer/main.json' autoplay loop />
                  </Col>
                  
                  <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    <div className=' font-semibold'>Make In India</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          
          <Col xs={24} md={24} sm={24} lg={0} xl={0} xxl={0}>
            <Row style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>

              <Col span={3}  >
                <Player src='/Footer/secure.json' autoplay loop />
              </Col>

              <Col span={3}>
                <Image priority src='/payments/visa.svg' width={200} height={200} alt='visa' />
              </Col>

              <Col span={3}>
                <Image priority src='/payments/payment.svg' width={200} height={200} alt='paytm' />
              </Col>

              <Col span={3}>
                <Image priority src='/payments/mastercard.svg' width={200} height={200} alt='master' />
              </Col>

              <Col span={3}>
                <Image priority src='/payments/upi.svg' width={200} height={200} alt='upi' />
              </Col>

              <Col span={3}>
                <Image priority src='/payments/paytm.svg' width={100} height={100} alt='paytm' />
              </Col>

              <Col span={3}>
                <Image priority src='/payments/google-pay.svg' width={100} height={100} alt='gpay' />
              </Col>

              <Col span={3}>
                <a href={'/Download/Famous_Business (1).apk'} download>
                  <Image src="/app-download.svg" width={60} height={60} alt='' />
                </a>
              </Col>

            </Row>
          </Col>

          <Col span={24}>
            <Row justify='center' align='top' gutter={[12, 12]}>

              {/* <!--First links section--> */}
              <Col  >
                <Link href="/about" 
                >
                  About Us
                </Link>
              </Col>

              {/* <!--Second links section--> */}
              <Col   >

                |<Link href="/about/policy" 
                >
                  Privacy Policy
                </Link>
              </Col>

              {/* <!--Third links section--> */}
              <Col  >
                |<Link href="/about/Terms-Condition" 
                >
                  Terms and Conditions
                </Link>
              </Col>
              {/* <!--Fourth links section--> */}
              <Col  >
                |<Link href="/about/Cancellation-and-Refund" 
                >
                  Cancellation and Refund
                </Link>
              </Col>
              <Col  >
                |<Link href="/about/shipment-and-delivery" 
                >
                  Shipment and Delivery
                </Link>
              </Col>
              <Col>
                |<Link href="/about/Contact" >
                  Contact Us
                </Link>
              </Col>
            </Row>
          </Col>
          <Col span={24}>

            <Flex
              justify='center'
              style={{
                width: "100%",
                marginTop: "1rem",
                backgroundColor: "#f5f5f5",
                padding: "1rem",
                textAlign: "center"
              }}
              >
              Copyright 2023-24 All Rights Reserved
              <a
                className="ml-2 "
                href="https://www.famousbusiness.in">
                Webzotica Business Famous Software Private Limited.
              </a>
              <Link href='/about/policy' className=' mx-1'>Privacy</Link> | <Link href='/about/Terms-Condition' className=' mx-1'>Terms</Link>

              <Link href='https://www.facebook.com/profile.php?id=61555443724142'>
                <FaSquareFacebook className='text-lg hover:translate-y-1 duration-100' />
              </Link>
            </Flex>
          </Col>
        </Row>
      </div>}
  </>
  )
}


export default Footer
