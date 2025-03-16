import React from 'react';
import {  UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Divider } from 'antd';
import { useAuth } from '@/Authentication/auth';
import Image from 'next/image';
import { MuiOtpInput } from 'mui-one-time-password-input';
// import Cookies from 'js-cookie';
import { useState } from 'react';
import { message } from 'antd';
import Grid from '@mui/material/Grid2';





const handleMobileNumberchange = (e, setMobileNumber, setMobileError, setDisableContinueButton)=> {
    const {name, value} = e.target;
    const isNumeric = /^\d*$/.test(value);

    if (value.length < 10) {
        setMobileError('Please type 10 digit mobile number')
        setDisableContinueButton(true)
    } else if (!isNumeric) {
        setMobileError('Please enter numeric value')
        setDisableContinueButton(true)
    } else {
        setMobileError('')
        setMobileNumber(value)
        setDisableContinueButton(false)
    }

};




export default function LoginWithOTP({onClose}) {
    // const { loginUser, loading }          = useAuth();
    const [visibleOTP, setVisibleOTP]     = useState(false);
    const [otpValue, setOTPValue]         = useState('');
    const [mobileError, setMobileError]   = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [disableContinueButtton, setDisableContinueButton] = useState(true);
    const [visibleContinueButton, setVisibleContinueButton]  = useState(true);
    const [visibleLoginButton, setVisibleLoginButton]        = useState(false);
    const [error, setError] = useState('');
    const [apiURL, setAPIURL]  = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 'https://api.famousbusiness.in')


    ////// Send OTP 
    const handleSendOTP = async ()=> {
        if(mobileNumber == '') {
            setError('Please type your Mobile Number')
        } else if (mobileNumber.length !== 10) {
            setError('Mobile number length should be 10 digit')
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            setError('Mobile number should contain only digits');
        } else {
           setError('')
           setVisibleOTP(true);
    
           // Send API Request for OTP
           try{
               const response = await fetch(`${apiURL}/api/send/login/otp/`, {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ 'mobile_number': mobileNumber }),
               });
    
               const data = await response.json()
    
               if (response.status === 200) {
                    setDisableContinueButton(false);
                    setVisibleLoginButton(true);
                    setVisibleContinueButton(false);
    
               } else if (response.status === 400) {
                   // console.log(data.message)
                   setVisibleLoginButton(true);
                   setVisibleContinueButton(false);
    
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


     // Submit OTP to API
    const handleSubmitLogin = async ()=> {
        if (otpValue === '') {
            setError('Please type otp');

        } else {
            setError('');

            try {
                    const response = await fetch(`${apiURL}/api/login/otp/`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            mobile_number: mobileNumber,
                            otp: otpValue
                        }),
                    });
            
                    const data = await response.json();

                    if (response.ok) {
                        message.success('Login successfull');

                        localStorage.setItem('userData', JSON.stringify({
                            name: data.user_name,
                            business: data.business_id,
                            number: data.mobile_number,
                            plan: data.plan_status
                        }));

                        // Cookies.set('accessToken', data.token.access);
                        localStorage.setItem('accessToken', data.token.access)

                        // Cookies.set('authTokens', JSON.stringify(data.token), { expires: 15 });
                        localStorage.setItem('authTokens', JSON.stringify(data.token))

                        onClose()

                        window.location.reload()

                    } else if (response.status === 400 || response.status === 401) {
                        // Display a message for invalid credentials
                        alert('Login failed. Please check your credentials.');
            
                    } else {
                        // Handle other errors gracefully
                        alert('An error occurred during login.');

                    }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login.');
        
            }
        };
    };


   // Get otp value
   const handleOTPChange = (newValue) => {
        setOTPValue(newValue)
    };


return (
   
    // <Row justify='space-between' align='middle' gutter={12}>
    <Grid container spacing={2} justifyContent='space-between' alignItems='center'>
        <Grid size={{ xs: 12 }}>

            <div className='p-2 sm:p-2'>
                <Form className="login-form" layout='vertical'>
                    <Form.Item
                        label="Mobile Number/Email"
                        name="mobile_number"
                        validateStatus={mobileError ? 'error' : ''}
                        help={mobileError}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Mobile Number or Email!',
                            },
                        ]}
                    >
                        <Input 
                            style={{ padding: 10 }} 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Mobile Number/Email" 
                            onChange={(e)=> {handleMobileNumberchange(e, setMobileNumber, setMobileError, setDisableContinueButton)}}
                            count={{
                                show: true,
                                max:10
                            }}
                            />
                    </Form.Item>

                    {visibleOTP && 
                        <Form.Item
                            name="otp"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input OTP',
                                },
                            ]}>

                            <MuiOtpInput 
                                value={otpValue} 
                                onChange={handleOTPChange} 
                                length={5} 
                                autoFocus 
                                TextFieldsProps={{ placeholder: '-' }}
                                />
                        </Form.Item>
                    }

                    {visibleContinueButton && 
                        <Form.Item>
                            <Button block size='large' style={{ width: '100%', background: '#3c89d0',color:'white' }} 
                            onClick={()=> handleSendOTP()}
                            disabled={disableContinueButtton}
                            className="login-form-button">
                                Login With OTP
                            </Button>
                        </Form.Item>
                    }
                    
                    {visibleLoginButton && 
                        <Form.Item>
                            <Button block size='large' style={{ width: '100%', background: '#3c89d0', color:'white' }} 
                            onClick={()=> handleSubmitLogin()} 
                            className="login-form-button">
                                Login
                            </Button>
                        </Form.Item>
                    }

                    <p style={{color:'red'}}>{error && error}</p>
                </Form>

                {/* <p className=' text-center'>If you don&apos;t have an account?<Link href='/registration' className=' mx-1'>Business</Link> | <Link href='/registration/user' className=' ml-1'>User</Link></p> */}

                <Divider />
                {/* <Button block icon={<FacebookFilled />} style={{ borderRadius: 0, background: 'blue', color: 'white', borderWidth: 1, borderColor: 'black' }}>
                    Login with Facebook
                </Button>
                <Button block icon={<GoogleOutlined />} style={{ borderRadius: 0, color: 'black', marginTop: 5, borderWidth: 1, borderColor: 'black' }}>
                    Login with Google
                </Button> */}
            </div>
        </Grid>

        {/* <Col sm={0} xs={0} md={12} xl={12} xxl={12} lg={12} className=' relative'> */}
        {/* <Grid size={{ xs:'none' }}  className='relative'>
            <Flex className=' min-h-min' justify='center' align='flex-end'>
                <Image src="/Model.png" width={500} height={500} alt='login' />
            </Flex>
        </Grid> */}
    </Grid>

    );
};
