"use client"

import React, { useState } from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TimerIcon from '@mui/icons-material/Timer';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';




export default function LoginOTPPaga() {
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const [timer, setTimer] = useState(55);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length <= 1) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        }
    };

    const handleResendOtp = () => {
        // Logic to resend OTP
        setTimer(55); // Reset the timer
    };


    return (
        <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            {/* Image Section (Using sx media query to hide on small screens) */}
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Image
                src="path_to_your_image.png"
                alt="Business Portal"
                style={{ width: '100%', height: 'auto' }}
            />
            </Grid>

            {/* OTP Form Section */}
            <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'green' }}>
                Famous Business
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                India's Largest B2B And B2C Business Portal
                </Typography>
                <Typography variant="h4" gutterBottom>
                Welcome
                </Typography>
                <Typography variant="body1" gutterBottom>
                Enter the code sent to <b>+91 - 9871475373</b> 
                <IconButton size="small" sx={{ ml: 1 }}>
                    <EditIcon fontSize="small" />
                </IconButton>
                </Typography>

                {/* OTP Input Fields */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                {otp.map((data, index) => (
                    <TextField
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e, index)}
                    variant="outlined"
                    inputProps={{
                        maxLength: 1,
                        style: { textAlign: 'center', width: '50px', marginRight: '10px' },
                    }}
                    />
                ))}
                </Box>

                {/* Resend OTP Section */}
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <TimerIcon fontSize="small" sx={{ mr: 1 }} />
                Didn’t Receive the OTP? Retry in 00:{timer < 10 ? `0${timer}` : timer}
                </Typography>
                <Typography variant="body2" sx={{ color: 'blue', cursor: 'pointer' }} onClick={handleResendOtp}>
                Resend OTP
                </Typography>

                {/* Continue Button */}
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, height: '50px' }}>
                Continue
                </Button>

                {/* Register Buttons */}
                <Box mt={2}>
                <Button variant="contained" color="secondary" fullWidth>
                    Register as Business
                </Button>
                <Button variant="outlined" color="primary" fullWidth sx={{ mt: 1 }}>
                    Register as User
                </Button>
                </Box>
            </Box>
            </Grid>
        </Grid>
    </Box>
    );
};