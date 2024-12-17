"use client"

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, styled, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import SellIcon from '@mui/icons-material/Sell';
import { Button as JoyButton } from '@mui/joy';



const countryCodes = [
    { code: 'IN', label: 'IN +91', value: '+91' },
  ];




const BackgroundWrapper = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(8px)', 
  zIndex: -1,
});
  

function ContactInformation() {
    const [countryCode, setCountryCode] = React.useState('+91');
    const [inValicategory, setInvalidcategory] = React.useState(false);
    const [error, setError]                    = React.useState('');
    const [leadId, setLeadID]                  = React.useState(0);
    const [LeadGenereted, setLeadGenerated]    = React.useState(false)
    const [LeadFormData, setLeadFormData]      = useState([]);
    const [disableButton, setDisableButton]    = useState(false);

    const [apiURL, setAPIUrl] = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 'https://api.famousbusiness.in');
    const [mediaUrl, setMediaUrl] = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? true : false);

    const [formData, updateFormData] = useState({
        full_name: '',
        number: ''
    });

    const url          = new URL(window.location.href);
    const query_params = url.searchParams
    const query_category = query_params.get("category")
  
    const handleCountryCodeChange = (event) => {
      setCountryCode(event.target.value);
    };


    //// Fetch Leadform design
    useEffect(()=> {
      const url = new URL(window.location.href);
      const params = url.searchParams;

      const query_category = params.get('category')

      axios.post(`${apiURL}/lead-api/lead/form/`, {
        category: query_category

      }).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.success === true) {
          setLeadFormData(res.data.lead_form_data)
        }

      }).catch((error)=> {
          // console.log(error)
      })
   }, []);


    // Get the input data
    const handleChangeForm = (e)=> {
        const { name, value } = e.target;

        if (name === 'full_name' && value.length > 40) {
          setError('Please type short name')

        }else if (name === 'number' && value.length > 10) {
          setError('Number must contain 10 digit')
          
        } else {
          setError('')
          updateFormData({...formData,
            [name]: value
          })
        }
    };


    /// Lead generated
    useEffect(()=> {
        if (LeadGenereted) {
            window.location.href = `/leadform/?category=${query_category}&lead=${leadId}`
        }
    }, [LeadGenereted, leadId, query_category]);


   // Submit form data
    const handleSubmitFormData = ()=> {
        setDisableButton(true);

         if (!formData.full_name) {
            setError('Please fill your Full Name')
         } else if (!formData.number) {
            setError('Please fill your Mobile Number')
         } else if (formData.full_name.length < 10) {
            setError('Name can not be less than 10 Letter')
         } else {
            setError('');

            axios.post(`${apiURL}/lead-api/lead/form/lead/generate/`, {
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
                    setDisableButton(false)
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
      <>
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '110vh',
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              marginTop:1
            }}
          >
        <BackgroundWrapper />

        <Card
          sx={{
            width: 500,
            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Main Image with icon in center */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '250px', 
              backgroundImage: `url(${ mediaUrl ? 'http://127.0.0.1:8000/' + LeadFormData?.background_img : LeadFormData?.background_img || 'default image'
              })`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Box
              component="img"
              src={mediaUrl ? 'http://127.0.0.1:8000/' + LeadFormData?.logo : LeadFormData?.logo || 'default image'} 
              alt="Icon"
              sx={{
                position: 'absolute',
                top: '95%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                padding: '8px',
              }}
            />
          </Box>

          <Box sx={{display:'flex', justifyContent:'center', marginTop:3}}>
            <Typography variant="p" gutterBottom>
                Famous Business
            </Typography>
          </Box>

          <CardContent sx={{ textAlign: 'center', backgroundColor: '#ffffff', mt:0 }}>
            <Typography variant="h5" gutterBottom>
              <b>{LeadFormData?.headline}</b>
            </Typography>

            <Typography variant="body1" align='left' sx={{ml:3}}>
              {LeadFormData.d1_required && (
                  <b>
                    <SellIcon sx={{color:'green'}} /> {LeadFormData.description_1}
                  </b>
                )}<br/>

              {LeadFormData.d2_required && (
                  <b>
                    <SellIcon sx={{color:'green'}} /> {LeadFormData.description_2}
                  </b>
                )}<br/>

              {LeadFormData.d3_required && (
                  <b>
                    <SellIcon sx={{color:'green'}} /> {LeadFormData.description_3}
                  </b>
                )}
            </Typography>

            {/* Input Fields */}
            <TextField
              label="Full name"
              name='full_name'
              variant="outlined"
              fullWidth
              value={formData.full_name}
              onChange={(e) => handleChangeForm(e)}
              sx={{ mt: 2 }}
            />

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


            {disableButton ?
              <JoyButton fullWidth loading sx={{mt:3}}>Loading</JoyButton>
              :

              <Button
                variant="contained"
                fullWidth
                color="primary"
                sx={{ mt: 3, height: 48, backgroundColor: '#3b82f6' }}
                onClick={handleSubmitFormData}
              >
                Continue
              </Button>
            }
            
          </CardContent>

          <p style={{color:'red'}}>{error && error}</p>
        </Card>
      </Box>
      </>
      // <Box
      //   sx={{
      //     display: 'flex',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     minHeight: '100vh',
      //     backgroundColor: '#f0f2f5',
      //     padding: 2,
      //   }}
      // >
      //   <Card
      //     sx={{
      //       width: '100%',
      //       maxWidth: 400,
      //       padding: 2,
      //       borderRadius: 3,
      //       boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
      //       textAlign: 'center',
      //     }}
      //   >
      //     <CardContent>
      //       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      //         <Typography variant="h6" fontWeight="bold">
      //           Contact information
      //         </Typography>
      //         <IconButton size="small">
      //           <InfoOutlinedIcon fontSize="small" />
      //         </IconButton>
      //       </Box>
      //       <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
      //         We are using your data to contact you.
      //       </Typography>
  
      //       {/* Full Name Field */}
      //       <TextField
      //         label="Full name"
      //         name='full_name'
      //         variant="outlined"
      //         fullWidth
      //         value={formData.full_name}
      //         onChange={(e) => handleChangeForm(e)}
      //         sx={{ mt: 2 }}
      //       />
  
      //       {/* Country Code and Phone Number */}
            // <Box sx={{ display: 'flex', mt: 2 }}>
            //   <Select
            //     value={countryCode}
            //     onChange={handleCountryCodeChange}
            //     sx={{
            //       width: '30%',
            //       mr: 1,
            //     }}
            //     displayEmpty
            //   >
            //     {countryCodes.map((option) => (
            //       <MenuItem key={option.code} value={option.value}>
            //         {option.label}
            //       </MenuItem>
            //     ))}
            //   </Select>

            //   <TextField
            //     variant="outlined"
            //     fullWidth
            //     name='number'
            //     placeholder="Phone number for Famous Business"
            //     value={formData.number}
            //     onChange={(e) => handleChangeForm(e)}
            //   />
            // </Box>
  
      //       {/* Continue Button */}
            // <Button
            //   variant="contained"
            //   fullWidth
            //   color="primary"
            //   sx={{ mt: 3, height: 48, backgroundColor: '#3b82f6' }}
            //   onClick={handleSubmitFormData}
            // >
            //   Continue
            // </Button>
      //     </CardContent>

      //     <p style={{color:'red'}}>{error && error}</p>
      //   </Card>
      // </Box>
    );
  };


  
export default ContactInformation;