"use client";


import { Box, Typography, List, ListItem, CircularProgress, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';




const ServerMmode = process.env.NEXT_IS_DEVELOPMENT;
let apiURL = '';


if (ServerMmode === 'True') {
  apiURL = 'http://127.0.0.1:8000'
} else {
  apiURL = 'https://api.famousbusiness.in'
};





const TimerPage = () => {
    const [minutes, setMinutes] = useState(6);
    const [seconds, setSeconds] = useState(59);
    const [isRunning, setIsRunning] = useState(false);
    const [counter, setCounter] = useState(0);
    const [delayPassed, setDelayPassed] = useState(false);

    const upiauthRequestId     = localStorage.getItem('upiAuth');
    const decodedauthRequestId = atob(upiauthRequestId);
    const token                = Cookies.get('accessToken');
    const amount               = Cookies.get('amount')
  
    // Start sending request after 30 sec
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setDelayPassed(true);
        setIsRunning(true);
      }, 30000); 
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);
  

    // Start sending Request every 10 second
    useEffect(() => {
      if (delayPassed && isRunning) {
        const intervalId = setInterval(() => {
          sendRequest();
        }, 10000); 
  
        return () => {
          clearInterval(intervalId);
        };
      }
    }, [delayPassed, isRunning, sendRequest]);
  

    /// Send API Request
    const sendRequest = async () => {
      try {
           await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/premium-plan-api/autopay/payment/status/`, {
            authRequestId: decodedauthRequestId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
        }).then((res)=> {
            if (res.status === 200) {
                setIsRunning(false);
                window.location.href = '/plan/success/'
            }
        }).catch((error)=> {
            console.log(error);

        })

      } catch (error) {
        // console.log(error);
      }
  
      setCounter((prevCounter) => prevCounter + 1);
  
      if (counter >= 60) {
        setIsRunning(false);
      }
    };
  
  
  
    useEffect(() => {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0 && seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
  
      return () => clearInterval(countdown);
    }, [seconds, minutes]);
  
  
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        padding={3}
      >
        {/* Header Section */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Pay ₹{amount? amount : 0}
        </Typography>
        
        {/* Progress Bar */}
        <Box width="100%" maxWidth="600px" marginBottom={2} sx={{display:'flex', justifyContent:'center'}}>
          <CircularProgress variant="indeterminate" color="secondary" />
        </Box>
  
        {/* Timer */}
        <Typography color="textSecondary" gutterBottom>
          This page will automatically expire in
        </Typography>
        <Typography variant="h6" color="success" fontWeight="bold" gutterBottom>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes
        </Typography>
  
        {/* Instructions */}
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          <ListItem>
            <Typography variant="body1" fontWeight="bold">
              1. Go to your PhonePe App.
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body1" fontWeight="bold">
              2. Select the payment request from Famous Business.
            </Typography>

          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body1" fontWeight="bold">
              3. Enter the UPI PIN and complete the payment.
            </Typography>
          </ListItem>
        </List>
  
        {/* Footer Instruction */}
        <Typography color="textSecondary" style={{ marginTop: '20px' }}>
          Please do not press back or close the app
        </Typography>
      </Box>

    );
};



export default TimerPage;



