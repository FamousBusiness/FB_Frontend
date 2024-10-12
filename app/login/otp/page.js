"use client"

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TimerIcon from '@mui/icons-material/Timer';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { message } from 'antd';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';



// Login using OTP
export default function LoginOptionPage() {

    const [otp, setOtp] = useState('');
    const [disableButton, setDisableButton] = useState(true);
    const [timeLeft, setTimeLeft] = useState(120); // Timer
    const [disableResendOTP, setDisableResendOTP] = useState(true);
    const [mobileNumber, setMobileNumber]         = useState('');
    const [error, setError]                       = useState('');



    const queryString = window.location.search
    const urlParams   = new URLSearchParams(queryString);

    const encoded_user_mobile_number = urlParams.get('mn');
    const decoded_user_mobile_number = atob(encoded_user_mobile_number)

    // Set the decoded mobile number inside a state
    useEffect(()=> {
      if (decoded_user_mobile_number) {
        setMobileNumber(decoded_user_mobile_number)
      }

    }, [decoded_user_mobile_number]);

    
    // Resend OTP
    const handleResendOtp = () => {
        setTimer(55);
    };

    // Timer Input
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
  
        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
      }
    }, [timeLeft]);

    // Format the timeLeft in MM:SS format
    const formatTime = () => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    // Set button to false
    useEffect(()=> {
      if (otp.length == 5) {
        setDisableButton(false);
      }
    }, [otp]);


    // Set button to false
    useEffect(()=> {

      if (timeLeft == 0) {
        setDisableResendOTP(false);
      }
    }, [timeLeft]);


    // Get OTP 
    const handleOTPChange = (newValue) => {
      setOtp(newValue)
    };



    // Submit OTP to API
    const handleSubmitOTP = async ()=> {
         if (otp === '') {
            setError('Please type Password')
         } else {
            setError('')

            try {

                  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/otp/`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        mobile_number: mobileNumber,
                        otp: otp
                      }),
                  });
            
                  const data = await response.json();

                  if (response.ok) {

                    setDisableButton(true)
                    // Successful login
                    message.success(data.msg);

                    localStorage.setItem('userData', JSON.stringify({
                      name: data.user_name,
                      business: data.business_id,
                      number: data.mobile_number,
                      plan: data.plan_status
                    }));

                    Cookies.set('accessToken', data.token.access);

                    Cookies.set('authTokens', JSON.stringify(data.token), { expires: 15 });

                    window.location.href = '/'

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
    


    return(
      <Box sx={{ flexGrow: 1, padding: '20px', mt:15}}>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{}}>

          {/* OTP Form Section */}
          <Grid size={{xs:12}} sx={{width:{xs:'100%', sm:'50%', md:'30%'}}}>
              <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'green' }}>
                      Famous Business
                  </Typography>

                  <Typography variant="h4" gutterBottom>
                    Welcome
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                      Enter the code sent to <b>+91 - {mobileNumber ? mobileNumber : ''}</b> 
                    <IconButton size="small" sx={{ ml: 1 }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                  </Typography>

                  {/* OTP Input Fields */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <MuiOtpInput 
                        value={otp} 
                        onChange={handleOTPChange} 
                        length={5} 
                        autoFocus 
                        TextFieldsProps={{ placeholder: '-' }}
                        />
                  </Box>

                  {/* Resend OTP Section */}
                  <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <TimerIcon fontSize="small" sx={{ mr: 1 }} />
                      Didnot Receive the OTP? Retry in 00:{formatTime()}
                  </Typography>


                  {/* Continue Button */}
                  <Button 
                    variant="text" 
                    color="primary" 
                    fullWidth 
                    disabled={disableResendOTP}
                    onClick={handleResendOtp}
                    >
                    Resend OTP
                  </Button>


                  {/* Continue Button */}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2, height: '50px' }}
                    disabled={disableButton}
                    onClick={handleSubmitOTP}
                    >
                    Continue
                  </Button>

                  <p style={{color:'red'}}>{error && error}</p>
              </Box>
          </Grid>
      </Grid>
  </Box>
    )
}