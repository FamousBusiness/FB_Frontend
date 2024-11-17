"use client"

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, MenuItem, InputAdornment, IconButton, Select } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';


const countryCodes = [
    { code: 'IN', label: 'IN +91', value: '+91' },
  ];

  

function ContactInformation() {
    const [countryCode, setCountryCode] = React.useState('+91');
    const [inValicategory, setInvalidcategory] = React.useState(false);
    const [error, setError] = React.useState('');
    const [leadId, setLeadID] = React.useState(0);
    const [LeadGenereted, setLeadGenerated] = React.useState(false)
    const [formData, updateFormData] = useState({
        full_name: '',
        number: ''
    })

    const url          = new URL(window.location.href);
    const query_params = url.searchParams
    const query_category = query_params.get("category")
  
    const handleCountryCodeChange = (event) => {
      setCountryCode(event.target.value);
    };

    // Get the input data
    const handleChangeForm = (e)=> {
        const { name, value } = e.target;

        updateFormData({...formData,
            [name]: value
        })
    };

    /// Lead generated
    useEffect(()=> {
        if (LeadGenereted) {
            window.location.href = `/leadform/?category=${query_category}&lead=${leadId}`
        }
    }, [LeadGenereted, leadId, query_category]);


   // Submit form data
    const handleSubmitFormData = ()=> {
         if (!formData.full_name) {
            setError('Please fill your Full Name')
         } else if (!formData.number) {
            setError('Please fill your Mobile Number')
         } else {
            setError('');

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/lead-api/lead/form/lead/generate/`, {
                full_name: formData.full_name,
                mobile_number: formData.number,
                category: query_category

            }).then((res)=> {
                // console.log(res)
                if (res.status === 200) {
                    setLeadID(res.data.lead_id)
                    setLeadGenerated(true)
                }

            }).catch((error)=> {
            //    console.log(error)
                if (error.response.status === 400) {
                    setError('Something went wrong Please try after sometime')
                    setInvalidcategory(true)
                }
            })
         }
    };


    if (!query_category) {
        return (
            <p>Page not found</p>
        );
    };


    if (inValicategory) {
        return (
            <p>Page not found</p>
        );
    };

    
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f2f5',
          padding: 2,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            padding: 2,
            borderRadius: 3,
            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                Contact information
              </Typography>
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              We are using your data to contact you.
            </Typography>
  
            {/* Full Name Field */}
            <TextField
              label="Full name"
              name='full_name'
              variant="outlined"
              fullWidth
              value={formData.full_name}
              onChange={(e) => handleChangeForm(e)}
              sx={{ mt: 2 }}
            />
  
            {/* Country Code and Phone Number */}
            <Box sx={{ display: 'flex', mt: 2 }}>
              <Select
                value={countryCode}
                onChange={handleCountryCodeChange}
                sx={{
                  width: '30%',
                  mr: 1,
                }}
                displayEmpty
              >
                {countryCodes.map((option) => (
                  <MenuItem key={option.code} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                variant="outlined"
                fullWidth
                name='number'
                placeholder="Phone number for Famous Business"
                value={formData.number}
                onChange={(e) => handleChangeForm(e)}
              />
            </Box>
  
            {/* Continue Button */}
            <Button
              variant="contained"
              fullWidth
              color="primary"
              sx={{ mt: 3, height: 48, backgroundColor: '#3b82f6' }}
              onClick={handleSubmitFormData}
            >
              Continue
            </Button>
          </CardContent>

          <p style={{color:'red'}}>{error && error}</p>
        </Card>
      </Box>
    );
  };


  
export default ContactInformation;