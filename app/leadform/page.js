"use client"

import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Chip, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SellIcon from '@mui/icons-material/Sell';
import { Button as JoyButton } from '@mui/joy';



const BackgroundWrapper = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  // backgroundImage: 'url("/shopping_bag.gif")', // Replace with actual background image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(8px)', // Blur effect for background
  zIndex: -1,
});



/// Leadform
export default function LeadForm() {
  const [noCategory, setNoCategory] = useState(false);
  const [LeadFormData, setLeadFormData] = useState([]);
  const [sentence, updateSentence] = useState('');
  const [error, setError] = useState('');
  const [LeadID, setLeadID] = useState(0);
  const [apiURL, setAPIUrl] = useState(
    process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 'https://api.famousbusiness.in')
  const [mediaUrl, setMediaUrl] = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? true : false);
  const [disableButton, setDisableButton] = useState(false);
  const [formData, updateFormData] = useState({
    question_1: '',
    question_2: '',
    question_3: '',
    question_4: '',
    city: '',
    state: '',
  });


  /// Update Form data
  const handleChangeFormData = (e) => {
    const { name, value } = e.target;

    updateFormData({
      ...formData,
      [name]: value
    })
  };


  useEffect(() => {
    if (formData) {
      let sentenceParts = []

      if (formData.question_1) sentenceParts.push(formData.question_1);
      if (formData.question_2) sentenceParts.push(formData.question_2);
      if (formData.question_3) sentenceParts.push(formData.question_3);
      if (formData.question_4) sentenceParts.push(formData.question_4);

      updateSentence(sentenceParts.join(','))
    }
  }, [formData]);



  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    const query_category = params.get('category')
    const query_lead = params.get('lead')

    setLeadID(query_lead)

    if (!query_category) {
      setNoCategory(true)
    };

    axios.post(`${apiURL}/lead-api/lead/form/`, {
      category: query_category

    }).then((res) => {
      // console.log(res)
      if (res.status === 200 && res.data.success === true) {
        setLeadFormData(res.data.lead_form_data)
      }

    }).catch((error) => {
      console.log(error)
    })
  }, [apiURL]);


  // Submit Form Data
  const handleSubmitForm = () => {
    setDisableButton(true);

    if (!sentence) {
      setError('Please fill up the questions')
    } else if (LeadFormData.city_required && !formData.city) {
      setError('Pleas fil your city')
    } else if (LeadFormData.state_required && !formData.state) {
      setError('Please Fill your State')
    } else {
      setError('')

      axios.post(`${apiURL}/lead-api/lead/form/question/`, {
        requirements: sentence,
        city: formData.city,
        state: formData.state,
        lead_id: parseInt(LeadID)

      }).then((res) => {
        // console.log(res)

        if (res.status === 200) {
          window.location.href = '/leadform/success/'
        }

      }).catch((error) => {
        // console.log(error)
        setDisableButton(false);

        if (error.response.status === 400) {
          setError('Something went wrong, Please try after sometime')
        }
      })
    };
  };


  if (noCategory) {
    return (
      <p>Not Found</p>
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
          marginTop: 6
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
              backgroundImage: `url(${mediaUrl ? 'http://127.0.0.1:8000/' + LeadFormData?.background_img : LeadFormData?.background_img || 'default image'
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

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Typography variant="p" gutterBottom>
              Famous Business
            </Typography>
          </Box>

          <CardContent sx={{ textAlign: 'center', backgroundColor: '#ffffff', mt: 0 }}>
            <Typography variant="h5" gutterBottom>
              <b>{LeadFormData?.headline}</b>
            </Typography>

            <Typography variant="body1" align='left' sx={{ ml: 3 }}>
              {LeadFormData.d1_required && (
                <b>
                  <SellIcon sx={{ color: 'green' }} /> {LeadFormData.description_1}
                </b>
              )}<br />

              {LeadFormData.d2_required && (
                <b>
                  <SellIcon sx={{ color: 'green' }} /> {LeadFormData.description_2}
                </b>
              )}<br />

              {LeadFormData.d3_required && (
                <b>
                  <SellIcon sx={{ color: 'green' }} /> {LeadFormData.description_3}
                </b>
              )}
            </Typography>

            {/* Input Fields */}
            {LeadFormData.q1_required &&
              <TextField
                label={LeadFormData?.question_1_data?.question || ''}
                variant="outlined"
                fullWidth
                name='question_1'
                value={formData.question_1}
                onChange={handleChangeFormData}
                sx={{ mt: 2 }}
              />
            }

            {LeadFormData.q2_required &&
              <TextField
                label={LeadFormData?.question_2_data?.question || ''}
                variant="outlined"
                fullWidth
                name='question_2'
                value={formData.question_2}
                onChange={handleChangeFormData}
                sx={{ mt: 2 }}
              />
            }

            {LeadFormData.q3_required &&
              <TextField
                label={LeadFormData?.question_3_data?.question || ''}
                variant="outlined"
                fullWidth
                name='question_3'
                value={formData.q3_required}
                onChange={handleChangeFormData}
                sx={{ mt: 2 }}
              />
            }

            {LeadFormData.q4_required &&
              <TextField
                label={LeadFormData?.question_4_data?.question || ''}
                variant="outlined"
                fullWidth
                name='question_4'
                value={formData.question_4}
                onChange={handleChangeFormData}
                sx={{ mt: 2 }}
              />
            }

            {LeadFormData.city_required &&
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                name='city'
                value={formData.city}
                onChange={handleChangeFormData}
                sx={{ mt: 2 }}
              />
            }

            {LeadFormData.state_required &&
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                name='state'
                value={formData.state}
                onChange={handleChangeFormData}
                sx={{ mt: 2 }}
              />
            }

            {/* Continue Button */}

            {disableButton ?
              <JoyButton fullWidth loading sx={{ mt: 3 }}>Loading</JoyButton>
              :
              <Button
                variant="contained"
                fullWidth
                color="primary"
                sx={{ mt: 3, backgroundColor: '#3b82f6' }}
                onClick={handleSubmitForm}
              >
                Continue
              </Button>
            }
          </CardContent>

          <p style={{ color: 'red' }}>{error && error}</p>
        </Card>
      </Box>
    </>
  );
};