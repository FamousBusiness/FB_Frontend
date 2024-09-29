'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Player } from '@lottiefiles/react-lottie-player';
import {  FormControl, InputAdornment, TextField } from '@mui/material';
import { Col,   Row } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button as MUButton} from '@mui/material';




function Page() {
  // const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('');  // Mobile Number 
  const [error, setError]               = useState('');  // Error state
  const [disableButton, setDisableButton] = useState(false);  // Disable Button


  // Redirect to Login with password page
   const handleRedirectPasswordLogin = ()=> {
      window.location.href = '/login/password/'
   };

   
   // Get mobile number 
   const handleChangeMobileNumber = (e)=> {
        const {name, value} = e.target;

        setMobileNumber(value)
   };

   // Redirect to OTP Page
   const handleRedirectOTPLogin = async ()=> {
         if(mobileNumber == '') {
            setError('Please type your Mobile Number')
         } else if (mobileNumber.length !== 10) {
            setError('Mobile number length should be 10 digit')
         } else if (!/^\d{10}$/.test(mobileNumber)) {
            setError('Mobile number should contain only digits');
         } else {
            setError('')
            setDisableButton(true);

            // Send API Request for OTP
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send/login/otp/`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 'mobile_number': mobileNumber }),
                });
    
                const data = await response.json()
    
                if (response.status === 200) {
                    let userMobileNumber = btoa(mobileNumber)

                    window.location.href = `/login/otp/?mn=${userMobileNumber}`

                } else if (response.status === 400) {
                    // console.log(data.message)
                    setDisableButton(false);

                    if (data.message === 'Invalid User') {
                      setError('User with this mobile number does not exists')
                    } else if (data.message === 'Invalid Mobile Number') {
                      setError('User with this mobile number does not exists')
                    } else {
                      setError('')
                    }

                } else {
                  setError('Invalid Data')
                };

            } catch(e) {
                // console.log(e);
            }
         }
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
                    
                    <Col xl={14} xxl={14} sm={0} xs={0} lg={14}>
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

                    <Col sm={12} xs={12} lg={10} className=' top-20' >
                        <Row justify='end' gutter={[0, 24]}>
                            <Col span={24} >
                                <div className=' h-48 sm:h-96 dark:text-black flex flex-col justify-center mt-10 items-center'>
                                    <Row gutter={[0, 24]} justify='end'>
                                        <Col span={22}>
                                            <div className='text-xs sm:text-2xl font-black'>
                                              <span className='text-blue-700'> Business Directory</span> Portal Connecting Buyers with Suppliers. 
                                            </div>
                                            {/* <div className='mt-2 text-lg sm:text-xl font-semibold'>
                                                with India`s No.1 B2B & B2C Business Platform
                                            </div> */}
                                        </Col>

                                        <Col span={22}>
                                            <FormControl>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-basic"
                                                    required
                                                    label="Enter Mobile No."
                                                    onChange={handleChangeMobileNumber}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                 +91
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <b onClick={handleRedirectOTPLogin} 
                                                                disabled={disableButton}
                                                                className=' cursor-pointer bg-[linear-gradient(to_right,theme(colors.blue.600),theme(colors.blue.300),theme(colors.blue.600),theme(colors.blue.200),theme(colors.blue.600))] bg-[length:200%_auto] animate-gradient rounded-md px-5 py-2 text-white font-semibold flex flex-row justify-between hover:translate-x-1 transition-transform duration-300'
                                                                >
                                                                    Start Now <ArrowRightOutlined className=' ml-1' /></b>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </FormControl>
                                        </Col>
                                        
                                        <Col span={22}>
                                            <div className=' text-xs'>By proceeding, you consent to abide by our <Link href="/about/Terms-Condition/">Terms of Use</Link>, <Link href='/about/policy'>Privacy Policy</Link></div>

                                            <MUButton variant="contained" color="primary" fullWidth sx={{ mt: 1, width:{xs:'100%', sm:'100%', md:'70%'} }} onClick={handleRedirectPasswordLogin}>
                                                Login with Password
                                            </MUButton>

                                            <p style={{color:'red'}}>{error && error}</p>

                                        </Col>
                                    </Row>

                                </div>

                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
        </Row>

  );
};

export default Page;




