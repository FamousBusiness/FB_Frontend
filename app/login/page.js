'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';



function Page() {
  // const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError]               = useState('');
  const [disableButton, setDisableButton] = useState(false);


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

    <Box sx={{ flexGrow: 1, padding: '20px', mt:9 }}>
     
    <Grid container spacing={2} alignItems="center" justifyContent="center">

        <Grid size={{md:6}}>
          <Box sx={{ textAlign: 'center', mb: 2, color:'green' }}>
            <Typography variant="h5" gutterBottom>
                <b>Indias Largest B2B and B2C Business Portal</b>
            </Typography>
          </Box>

          <Image
            src="/Model.png"
            alt="Business Portal"
            width={400}
            height={400}
          />
        </Grid>

      {/* Login Form */}
      <Grid size={{xs:12, md:6}}>
        <Paper sx={{ textAlign: 'center', p:4, borderRadius:5 }} elevation={3}>

            <Typography variant="h4" gutterBottom>
              Welcome
            </Typography>

            <TextField
              label="Enter Mobile Number"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChangeMobileNumber}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="I agree to Terms and Conditions"
            />

            <Typography variant="body2">
              <a href="#">Privacy Policy</a>
            </Typography>

            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleRedirectOTPLogin} fullWidth disabled={disableButton}>
                Login with OTP
              </Button>

              <Button variant="contained" onClick={handleRedirectPasswordLogin} color="success" fullWidth sx={{ mt: 1 }}>
                Login with Password
              </Button>

              <p style={{color:'red'}}>{error && error}</p>
            </Box>

        </Paper>
      </Grid>
    </Grid>
  </Box>
  )
}

export default Page;
