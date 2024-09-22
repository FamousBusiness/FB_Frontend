"use client";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Player } from '@lottiefiles/react-lottie-player';
import { ButtonBase, FormControl, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import { Button, Col, Flex, Input, Row, Space } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsBookmarkCheck, BsCheckCircle } from 'react-icons/bs';

function Page() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [isFieldEmpty, setIsFieldEmpty] = useState(true);
    const router = useRouter()
    const handleMobileNumberChange = (event) => {
        const { value } = event.target;
        setMobileNumber(value);
        setIsFieldEmpty(value.trim() === '');
    };

    const handleButtonClick = () => {
        // Perform action when the mobile number field is not blank
        // console.log('Start Now button clicked');
        router.push(`/registration/${mobileNumber}`)
    };
    return (

        <Row justify='center' gutter={[0, 24]}>
            <Col xl={23} xxl={23} sm={24} xs={24} lg={23} >
                <Row justify='center' gutter={[0, 24]}>
                    <Col span={22} className=' top-6'>
                        <Link className="text-lg sm:text-3xl font-bold" href="/" prefetch scroll={false}>
                            <span className='dark:text-blue-600'>Famous </span>
                            <span className='text-green-700 dark:text-green-700'>Business</span>
                        </Link>
                        <hr className=' my-2' />
                    </Col>
                    <Col xl={14} xxl={14} sm={24} xs={24} lg={14}>
                        <div className=' flex flex-col mt-20 justify-center items-center'>
                            <div className='h-48 md:h-96 w-48 sm:w-3/4'>
                                <Row justify='space-between' gutter={[12, 12]}>
                                    <Col span={11} className='border-animate relative overflow-hidden border-2 h-24 sm:h-56 w-16 sm:w-52 rounded-3xl p-4 text-center' style={{ backgroundColor: 'rgba(255, 187, 17, 0.3)' }}>
                                        <div className=' absolute z-30 text-black text-sm sm:text-2xl font-bold'>
                                            Join Over 10.1 Crore Buyers*
                                        </div>
                                        <Player src='/BusinessList/shoping.json' loop autoplay className=' absolute top-16 left-1/3 -z-10 sm:z-0 w-full sm:w-2/3' />
                                    </Col>
                                    <Col span={11} className='border-animate relative overflow-hidden border-2 h-24 sm:h-56 w-16 sm:w-52 rounded-3xl p-4 text-center' style={{ backgroundColor: 'rgba(155, 180, 10, 0.3)' }}>
                                        <div className=' absolute z-30 text-black text-sm sm:text-2xl font-bold'>
                                            3.8 Crore+
                                            Businesses
                                            Listed
                                        </div>
                                        <Player src='/BusinessList/web.json' loop autoplay className=' absolute top-16 left-1/3 -z-10 sm:z-0 w-full sm:w-2/4' />
                                    </Col>
                                    <Col span={11} className='border-animate relative overflow-hidden border-2 h-24 sm:h-56 w-16 sm:w-52 rounded-3xl bg-red-200 p-4 text-center' >
                                        <div className=' absolute z-30 text-black text-sm sm:text-2xl font-bold'>
                                            Show Products and Services
                                        </div>
                                        <Player src='/BusinessList/product.json' loop autoplay className=' absolute top-16 left-1/3 -z-10 sm:z-0 w-full sm:w-2/4' />
                                    </Col>
                                    <Col span={11} className='border-animate relative overflow-hidden border-2 h-24 sm:h-56 w-16 sm:w-52 rounded-3xl bg-orange-100 p-4 text-center' >
                                        <div className=' absolute z-30 w-full text-center text-black text-sm sm:text-2xl font-bold'>
                                            Get Daily Potential Customers
                                        </div>
                                        <Player src='/BusinessList/customer.json' loop autoplay className=' absolute top-16 left-1/3 -z-10 sm:z-0 w-full sm:w-2/4' />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col xl={10} xxl={10} sm={23} xs={23} lg={10} className=' top-20' >
                        <Row justify='end' gutter={[0, 24]}>
                            <Col span={24} >
                                <div className=' h-48 sm:h-96 dark:text-black flex flex-col justify-center mt-10 items-center'>
                                    <Row gutter={[0, 24]} justify='end'>
                                        <Col span={22}>
                                            <div className='text-xl sm:text-4xl font-black'>
                                                List Your Business <span className='text-blue-700'>for FREE</span>
                                            </div>
                                            <div className='mt-2 text-lg sm:text-xl font-semibold'>
                                                with India`s No.1 B2B & B2C Business Platform
                                            </div>
                                        </Col>
                                        <Col span={22}>
                                            <FormControl>
                                                <TextField
                                                    value={mobileNumber}
                                                    onChange={handleMobileNumberChange}
                                                    fullWidth
                                                    id="outlined-basic"
                                                    required
                                                    label="Enter Mobile No."
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">

                                                                <Image src="/BusinessList/flag-of-india.svg" width={50} height={50} alt="india" />

                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <b onClick={handleButtonClick} className=' cursor-pointer bg-[linear-gradient(to_right,theme(colors.blue.600),theme(colors.blue.300),theme(colors.blue.600),theme(colors.blue.200),theme(colors.blue.600))] bg-[length:200%_auto] animate-gradient rounded-md px-5 py-2 text-white font-semibold flex flex-row justify-between hover:translate-x-1 transition-transform duration-300 '>Start Now <ArrowRightOutlined className=' ml-1' /></b>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </Col>
                                        <Col span={22}>
                                            <Flex gap={8} vertical>
                                                <p className='text-xs sm:text-lg font-semibold'>
                                                    <BsCheckCircle className='inline-block mr-2 text-green-600' /> Create free Business Account on B2B & B2C Marketplace
                                                </p>
                                                <p className='text-xs sm:text-lg font-semibold'>
                                                    <BsCheckCircle className='inline-block mr-2 text-green-600' /> Get Daily Free Potential Customers
                                                </p>
                                                <p className='text-xs sm:text-lg font-semibold'>
                                                    <BsCheckCircle className='inline-block mr-2 text-green-600' /> View Your Business Top in Your City
                                                </p>
                                                <p className='text-xs sm:text-lg font-semibold'>
                                                    <BsCheckCircle className='inline-block mr-2 text-green-600' /> Uncover Opportunities and Launch Your Online Business
                                                </p>

                                                <p className='text-xs sm:text-lg font-semibold'>
                                                    <BsCheckCircle className='inline-block mr-2 text-green-600' /> Display Your Products and Services
                                                </p>
                                                <p className='text-xs sm:text-lg font-semibold'>
                                                    <BsCheckCircle className='inline-block mr-2 text-green-600' /> Expand Your Business by Connecting with New Customers
                                                </p>
                                            </Flex>
                                        </Col>
                                        <Col span={22}>
                                            <div className=' text-xs'>By proceeding, you consent to abide by our <Link href="/about/Terms-Condition/">Terms of Use</Link>, <Link href='/about/policy'>Privacy Policy</Link></div>
                                        </Col>
                                    </Row>
                                </div>

                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Page
