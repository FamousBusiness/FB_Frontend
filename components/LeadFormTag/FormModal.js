import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Box,Typography, TextField, Button, styled, Card, CardContent, Select, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { Button as  JoyButton} from '@mui/joy';
import SellIcon from '@mui/icons-material/Sell';
import { Spin, message } from 'antd';






const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '55vh', sm: '80vh'},
    height: {xs: '80vh', sm: 600}, // Set a fixed height
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto', 
};



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





//////// Home page Lead forms according to tag wise
export default function HomeLeadFormModal({open, setOpen, item}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => setOpen(false); ////// Close the Modal
    const [countryCode, setCountryCode]        = React.useState('+91');  //// Country Code in form
    const [inValicategory, setInvalidcategory] = React.useState(false);
    const [error, setError]                    = React.useState('');
    const [leadId, setLeadID]                  = React.useState(0);
    const [LeadGenereted, setLeadGenerated]    = React.useState(false)
    const [LeadFormData, setLeadFormData]      = useState([]);
    const [disableButton, setDisableButton]    = useState(false); ///// Disable button
    const [loading, setLoading]                = useState(true);  //// API data fetch loading
    const [questionForm, setQuestionForm]      = useState(false);
    const [messageApi, contextHolder]          = message.useMessage();  ////// Success Message
    const [sentence, updateSentence]           = useState(''); /////// Requirement Questions
    const [apiURL, setAPIUrl] = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 'https://api.famousbusiness.in');
    const [mediaUrl, setMediaUrl] = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? true : false);
    const [formData, updateFormData] = useState({
        full_name: '',
        number: ''
    });
    const [questionFormData, updateQuestionFormData] = useState({
      question_1: '',
      question_2: '',
      question_3: '',
      question_4: '',
      city: '',
      state: '',
    });


    //// Update Question Form Data
    const handleChangeFormData = (e) => {
      const { name, value } = e.target;

      updateQuestionFormData({
        ...questionFormData,
        [name]: value
      })
    };

    
    ////// Show success message
    const handleShowSuccessMessage = ()=> {
        messageApi.success('Thankyou for the Enquiry, We will contact you shortly.');
    };


    ///// Create requirement from Questions
    useEffect(() => {
      if (questionFormData) {
        let sentenceParts = []
  
        if (questionFormData.question_1) sentenceParts.push(questionFormData.question_1);
        if (questionFormData.question_2) sentenceParts.push(questionFormData.question_2);
        if (questionFormData.question_3) sentenceParts.push(questionFormData.question_3);
        if (questionFormData.question_4) sentenceParts.push(questionFormData.question_4);
  
        updateSentence(sentenceParts.join(','))
      }
    }, [questionFormData]);



    ///// Country Code Change
    const handleCountryCodeChange = (event) => {
      setCountryCode(event.target.value);
    };


    //// Fetch Leadform design
    useEffect(()=> {
      axios.post(`${apiURL}/lead-api/lead/form/`, {
          lead_form_id: item.id

      }).then((res)=> {
        //// console.log(res)
        if (res.status === 200 && res.data.success === true) {
            setLeadFormData(res.data.lead_form_data)
            setLoading(false)
        }

      }).catch((error)=> {
          //// console.log(error)
          setLoading(false);
      })
   }, [apiURL, item.id]);


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



   // Submit form data
    const handleSubmitLeadGenerateFormData = ()=> {

         if (!formData.full_name) {
            setError('Please fill your Full Name');

         } else if (!formData.number) {
            setError('Please fill your Mobile Number');

         } else if (formData.number.length < 10) {
            setError('Phone Number can not be less than 10 digit');

         } else if (formData.full_name.length > 40) {
            setError('Name should not greater than 40 Letter ');

         } else {
            setError('');
            setDisableButton(true);

            axios.post(`${apiURL}/lead-api/lead/form/lead/generate/`, {
                full_name: formData.full_name,
                mobile_number: formData.number,
                category: item?.category || 0

            }).then((res)=> {
                // console.log(res)
                if (res.status === 200) {
                    setLeadID(res.data.lead_id)
                    setLeadGenerated(true)
                    setQuestionForm(true)
                    setDisableButton(false);
                }

            }).catch((error)=> {
              //  console.log(error)
                if (error.response.status === 400) {
                    setError('Something went wrong Please try after sometime');
                    setInvalidcategory(true);
                    setDisableButton(false);
                }
            })
         }
    };


    

  // Submit Form Data
  const handleSubmitQuestionForm = () => {

      if (!sentence) {
        setError('Please fill up the questions');

      } else if (LeadFormData.city_required && !questionFormData.city) {
        setError('Pleas fil your city');

      } else if (LeadFormData.state_required && !questionFormData.state) {
        setError('Please Fill your State');

      } else {
        setError('')
        setDisableButton(true);

        axios.post(`${apiURL}/lead-api/lead/form/question/`, {
          requirements: sentence,
          city: questionFormData.city,
          state: questionFormData.state,
          lead_id: parseInt(leadId)

        }).then((res) => {
          // console.log(res)

          if (res.status === 200) {
            setDisableButton(false)
            handleShowSuccessMessage();

            setTimeout(() => {
              handleClose();
            }, 1000);
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


    if (!item.category) {
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
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {loading ? 
            <Spin />  :

            <Box sx={style}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '110vh',
                    backgroundColor: 'rgba(229, 237, 234, 0.8)', 
                    marginTop:-10
                  }}
                >
                <BackgroundWrapper />

              <Card
                sx={{
                  width: 600,
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
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
                  {questionForm ? (
                    <>
                      {LeadFormData.q1_required &&
                        <TextField
                          label={LeadFormData?.question_1_data?.question || ''}
                          variant="outlined"
                          fullWidth
                          name='question_1'
                          value={questionFormData.question_1}
                          onChange={(e)=> handleChangeFormData(e)}
                          sx={{ mt: 2 }}
                        />
                      }
          
                      {LeadFormData.q2_required &&
                        <TextField
                          label={LeadFormData?.question_2_data?.question || ''}
                          variant="outlined"
                          fullWidth
                          name='question_2'
                          value={questionFormData.question_2}
                          onChange={(e)=> handleChangeFormData(e)}
                          sx={{ mt: 2 }}
                        />
                      }
          
                      {LeadFormData.q3_required &&
                        <TextField
                          label={LeadFormData?.question_3_data?.question || ''}
                          variant="outlined"
                          fullWidth
                          name='question_3'
                          value={questionFormData.question_3}
                          onChange={(e)=> handleChangeFormData(e)}
                          sx={{ mt: 2 }}
                        />
                      }
          
                      {LeadFormData.q4_required &&
                        <TextField
                          label={LeadFormData?.question_4_data?.question || ''}
                          variant="outlined"
                          fullWidth
                          name='question_4'
                          value={questionFormData.question_4}
                          onChange={(e)=> handleChangeFormData(e)}
                          sx={{ mt: 2 }}
                        />
                      }
          
                      {LeadFormData.city_required &&
                        <TextField
                          label="City"
                          variant="outlined"
                          fullWidth
                          name='city'
                          value={questionFormData.city}
                          onChange={(e)=> handleChangeFormData(e)}
                          sx={{ mt: 2 }}
                        />
                      }
          
                      {LeadFormData.state_required &&
                        <TextField
                          label="State"
                          variant="outlined"
                          fullWidth
                          name='state'
                          value={questionFormData.state}
                          onChange={(e)=> handleChangeFormData(e)}
                          sx={{ mt: 2 }}
                        />
                      }
                    </>

                  ) : (
                    <>
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
                          size='small'
                          onChange={(event)=> handleCountryCodeChange(event)}
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
                          placeholder={isSmallScreen ? "Phone number" : "Phone number for Famous Business"}
                          value={formData.number}
                          onChange={(e) => handleChangeForm(e)}
                        />
                      </Box>
                    </>
                  )}
                {/* Input Fields */}


                  {disableButton ?
                    <JoyButton fullWidth loading sx={{mt:3}}>Loading</JoyButton>
                    :
                    <Button
                      variant="contained"
                      fullWidth
                      color="primary"
                      sx={{ mt: 3, height: 48, backgroundColor: '#3b82f6' }}
                      onClick={()=> {questionForm ? handleSubmitQuestionForm() : handleSubmitLeadGenerateFormData() }}
                    >
                      Continue
                    </Button>
                  }
                </CardContent>

                <p style={{color:'red'}}>{error && error}</p>
              </Card>
            </Box>
        </Box>
          }
        </Modal>

        {/* Success Message */}
        <div>
          {contextHolder}
        </div>

      </div>
    );
  }



