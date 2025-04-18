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
    
      <div className="relative dark:text-black sm:rounded-2xl shadow-sm m-0 bg-white pt-6 pb-6" style={{minHeight:'150px', paddingInline:'1rem'}}>
        <Row justify='center' align='middle'>
          <Col span={23}>
            <Row justify='start' align='top'>
              <Col span={18} >
                <Row justify='start' gutter={[{ xs: 8, sm: 8, md: 8, lg: 24, xl: 24 }, 12]}>

                  <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                    <div className=" text-3xl text-start font-extrabold text-blueGray-700">{BusinessName ? `${BusinessName.business_name}` : (<><span className=' text-blue-600'>Famous </span><span className=' text-green-700'>Business</span></>)}</div>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    {BusinessName ? <div className=" text-lg font-bold text-blueGray-700">{BusinessName.business_name}</div> :
                      <div><span className=' font-black text-blue-600'>Famous</span><span className=' font-black text-green-700'>Business</span></div>}
                    <div className=" text-sm font-medium  text-blueGray-600">Thank you for being a valued customer!</div>
                  </Col>

                  <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                    <Row align='middle' gutter={[{ xs: 8, sm: 8, md: 8, lg: 24, xl: 24 }, 12]}>

                      <Col span={3}  >
                        <Player 
                          src='/Footer/secure.json' 
                          autoplay={false}
                          // loop 
                          />
                      </Col>

                      <Col span={3}>
                        <Image src='https://mdwebzotica.famousbusiness.in/Payment_Image/visa.webp' width={200} height={200} alt='visa' priority />
                      </Col>

                      <Col span={3}>
                        <Image src='https://mdwebzotica.famousbusiness.in/Payment_Image/payment.webp' width={200} height={200} alt='paytm' priority />
                      </Col>

                      <Col span={3}>
                        <Image src='https://mdwebzotica.famousbusiness.in/Payment_Image/mastercard.webp' width={200} height={200} alt='master' priority />
                      </Col>

                      <Col span={3}>
                        <Image src='https://mdwebzotica.famousbusiness.in/Payment_Image/upi.webp' width={200} height={200} alt='upi' priority />
                      </Col>

                      <Col span={3}>
                        <Image src='https://mdwebzotica.famousbusiness.in/Payment_Image/paytm.webp' width={100} height={100} alt='paytm' priority />
                      </Col>

                      <Col span={3}>
                        <Image src='https://mdwebzotica.famousbusiness.in/Payment_Image/google-pay.webp' width={100} height={100} alt='gpay' priority />
                      </Col>

                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className=' relative'>
                <Row justify='center' >
                  <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <Player 
                      src='/Footer/main.json' 
                      autoplay={false}
                      // loop 
                      />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0} ><div className=' font-semibold'>Make In India</div></Col>
                </Row>
              </Col>
            </Row>
          </Col>
          
          <Col xs={24} md={24} sm={24} lg={0} xl={0} xxl={0}>
            <Row align='middle' justify='space-around'>
              <Col span={3}  >
                <Player 
                  src='/Footer/secure.json' 
                  autoplay={false}
                  // loop
                  />
              </Col>

              <Col span={3}>
                <Image priority src='https://mdwebzotica.famousbusiness.in/Payment_Image/visa.webp' width={200} height={200} alt='visa' />
              </Col>

              <Col span={3}>
                <Image priority src='https://mdwebzotica.famousbusiness.in/Payment_Image/payment.webp' width={200} height={200} alt='paytm' />
              </Col>

              <Col span={3}>
                <Image priority src='https://mdwebzotica.famousbusiness.in/Payment_Image/mastercard.webp' width={200} height={200} alt='master' />
              </Col>

              <Col span={3}>
                <Image priority src='https://mdwebzotica.famousbusiness.in/Payment_Image/upi.webp' width={200} height={200} alt='upi' />
              </Col>

              <Col span={3}>
                <Image priority src='https://mdwebzotica.famousbusiness.in/Payment_Image/paytm.webp' width={100} height={100} alt='paytm' />
              </Col>

              <Col span={3}>
                <Image priority src='https://mdwebzotica.famousbusiness.in/Payment_Image/google-pay.webp' width={100} height={100} alt='gpay' />
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
              className="w-full mt-4 bg-neutral-100 p-4 text-center ">
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
