"use client";

import { useState, useEffect, useCallback  } from 'react';
import { Card, Typography, Divider, Box, CardContent
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { GenerateQRCode } from '../components/AutoPay/qrCode';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Alert from '@mui/joy/Alert';
import Image from 'next/image';





// Autopay payment page
export default function PhonePeAutoPay() {
    const [isRunning, setIsRunning] = useState(false);
    const [counter, setCounter] = useState(0);
    const [delayPassed, setDelayPassed] = useState(false);
    const [QrValue, setQrValue]         = useState('');
    const [showUpiInput, setShowUpiInput] = useState(false);  // Open the Input field below UPI ID
    const [errorMessage, setErrorMessage] = useState('');     // Error message for wrong UPI ID
    const [upiId, setUpiId]               = useState('');     // UPI ID
    const [time, setTime]                 = useState(6 * 60); // 6 minutes in seconds


    const router =  useRouter();
    // const { id } = router.query;

    useEffect(() => {
      if (time > 0) {
        const timerInterval = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
        }, 1000);
  
        // Cleanup interval on unmount
        return () => clearInterval(timerInterval);
      }
    }, [time]);
  
    // Convert seconds into minutes and seconds for display
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    };


    // UPI ID validation
    const isValidUpiId = (upi) => {
      const upiPattern = /^[\w.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      return upiPattern.test(upi);
    };



    const token = Cookies.get('accessToken')
    const qrCode = Cookies.get('QrCode')
    const amount        = Cookies.get('amount');
    const premiumPlan   = Cookies.get('premium_plan');


    // Update the QR value into a state
    useEffect(()=> {
      if (qrCode) {
        setQrValue(qrCode)
      }
    }, [qrCode]);



    // Method for UPI ID
    const handleUpiSubmit = () => {
      if (isValidUpiId(upiId)) {
          setErrorMessage('');
           
          axios.post(`${process.env.NEXT_PUBLIC_API_URL}/premium-plan-api/autopay/upi/payment/`, {
            amount: parseFloat(amount),
            premium_plan_id: parseInt(premiumPlan),
            upi_id: upiId
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then((res)=> {
              // console.log(res)

              if (res.status === 200 && res.data.success === true) {

                const upiauthRequestId = btoa(res.data.authRequestId)
                localStorage.setItem('upiAuth', upiauthRequestId)

                router.push('/plan/phonepe/upipayment/')
              }

          }).catch((error)=> {

          })
      } else {
        setErrorMessage('Invalid UPI ID format. Please check and try again.');
      }
    };



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



    // Send API Requests
    // const sendRequest = async () => {
    //   try {
    //         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/premium-plan-api/autopay/payment/status/`,{
    //           authRequestId: decodedAuthRequestId
    //       },{
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${token}`
    //         }
    //     });

    //     if (response.status === 200) {
    //       setIsRunning(false);
    //       window.location.href = '/plan/success/'
    //     }
    //   } catch (error) {
    //     // console.log(error);

    //     if (error.response.status === 401) {
    //         router.push('/login/')
    //     }
    //   }

    //   setCounter((prevCounter) => prevCounter + 1);
    //     if (counter >= 60) {
    //       setIsRunning(false);
    //     }
    // };

    // Define the sendRequest function using useCallback
    const sendRequest = useCallback(async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/premium-plan-api/autopay/payment/status/`,
          {
            authRequestId: decodedAuthRequestId, // Ensure this is correctly defined elsewhere
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.status === 200) {
          setIsRunning(false);
          window.location.href = '/plan/success/';
        }
      } catch (error) {
        if (error.response?.status === 401) {
          router.push('/login/');
        }
      }

      setCounter((prevCounter) => prevCounter + 1);
      if (counter >= 60) {
        setIsRunning(false);
      }
      
    }, [counter, token, router]);

    
    // If access token not available in cookies
    if (!token) {
      return (
        <p>Not Accessible</p>

      );
    };



  return (
  
    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#f1f1f1'}}>
      <Card sx={{ borderRadius: '16px', padding: '16px', maxWidth: 400, mt:2 }}>
        <CardContent>
          {/* Business and Amount Section */}
          <Box display="flex" justifyContent="space-between" >
            <Box display="flex" alignItems="center" flexGrow={1}>
              <Image src="/autopay/shoping-cart.svg" alt="icon1" style={{ marginRight: 8, maxWidth:'50px' }} />

              <Typography variant="p" fontWeight="bold">
                Famous Business
              </Typography>
            </Box>

            <Typography variant="h6" fontWeight="bold">
              ₹{amount}
            </Typography>
          </Box>

          {/* QR Code Section */}
          <Box my={2}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <QrCodeIcon />
                  </ListItemIcon>
                  
                  <ListItemText 
                      primary="Show QR Code"
                      secondary="Scan with any UPI app" 
                      />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>


          {/* QR Code Image Placeholder */}
          <Box  sx={{display: 'flex', justifyContent: 'center'}}>
              <GenerateQRCode value={QrValue ? QrValue : 'No QR'} />
          </Box>

          {/* Payment Status */}
          <Typography variant="body2" align="center" color="textSecondary">
            Checking payment status: <span style={{color:'green'}}>{formatTime(time)}</span>
          </Typography>

          {/* UPI Icons and Others */}
          <Box display="flex" justifyContent="center" mt={2} mb={2}>
            {/* Add actual icons here */}
            <Image src="/autopay/phonepe.svg" alt="icon1" style={{ marginRight: 8, maxWidth:'50px' }} />
            <Image src="/autopay/google-pay.svg" alt="icon2" style={{ marginRight: 1,  maxWidth:'30px', marginLeft:1 }} />
            <Image src="/autopay/paytm.svg" alt="icon3" style={{ marginRight: 8,  maxWidth:'20px',  marginLeft:2 }} />
            <Image src="/autopay/bhim.svg" alt="icon3" style={{ marginRight: 8,  maxWidth:'20px',  marginLeft:2 }} />
            <Typography variant="body2" color="textSecondary">
              and more
            </Typography>
          </Box>
          <Divider />

          {/* Payment Options */}
          <List>
            <ListItem>
              <Radio onClick={() => setShowUpiInput(!showUpiInput)} />
              <ListItemText primary="UPI ID" secondary="PhonePe, Gpay, Paytm, BHIM & more" />
            </ListItem>
          </List>

          {showUpiInput && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Input
                placeholder="Enter your UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                color={errorMessage ? 'danger' : 'neutral'}
                fullWidth
              />
              {errorMessage && (
                <Alert sx={{ mt: 1 }} color="danger">
                  {errorMessage}
                </Alert>
              )}
              <Button onClick={handleUpiSubmit} sx={{ mt: 2 }} fullWidth>
                 Proceed to Pay
              </Button>
            </Box>
          )}


          {/* Footer */}
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="caption" color="textSecondary">
              Powered by
            </Typography>
            <Image src="/autopay/phonepe.svg" alt="icon3" style={{ maxWidth:'60px' }} />

          </Box>

        </CardContent>
      </Card>
  </Box>

  );
};



