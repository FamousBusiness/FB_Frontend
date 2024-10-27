"use client"

import React from 'react';
import { Box, Typography, Button, Avatar, Divider } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useRouter } from 'next/navigation';



export default function ConfirmationPage() {
    const router = useRouter();

    return (
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="#f1f1f1"
        p={2}
      >
        <Box
          maxWidth="400px"
          width="100%"
          bgcolor="white"
          borderRadius="12px"
          boxShadow={3}
          textAlign="center"
          p={4}
        >
          {/* Header */}
          <Typography variant="h6" fontWeight="bold">
            Famous Business
          </Typography>
      
          {/* Icon */}
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={1}>
            <Avatar sx={{ bgcolor: '#2e7d32', width: 64, height: 64 }}>
                <ShoppingBagIcon sx={{ fontSize: 40 }} />
            </Avatar>
          </Box>
          
          {/* Title */}
          <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={2}>
            Thanks, you &apos; re all set.
          </Typography>
      
          {/* Description */}
          <Typography variant="body2" color="textSecondary" mb={2}>
            Famous Business is India &apos;s Trusted Business Directory Portal. Our Verified Dealers will contact you shortly.
            Please coordinate with them and share your feedback. For more support, contact us at: 
            <Typography component="span" variant="body2" fontWeight="bold" color="textPrimary">
              08062181258
            </Typography>
          </Typography>
      
          <Divider sx={{ my: 2 }} />
      
          {/* Footer Message */}
          <Typography variant="caption" color="textSecondary">
            You successfully submitted your responses.
          </Typography>
      
          {/* Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => router.push('/')}
          >
            View Website
          </Button>
        </Box>
      </Box>
      

    );
  }