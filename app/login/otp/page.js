import React from 'react';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';



export default function LoginOptionPage() {
    return(
        <Box sx={{ flexGrow: 1, padding: '20px', mt:9 }}>
     
      <Grid container spacing={2} alignItems="center" justifyContent="center">

          <Grid item md={6}>
            <Box sx={{ textAlign: 'center', mb: 2, color:'green' }}>
              <Typography variant="h5" gutterBottom>
                  <b>India's Largest B2B and B2C Business Portal</b>
              </Typography>
            </Box>

            <Image
              src="https://famousbusiness.in/_next/image?url=%2FModel.png&w=828&q=75"
              alt="Business Portal"
              style={{ width: '75%', height: 'auto' }}
            />
          </Grid>

        {/* Login Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ textAlign: 'center', p:4, borderRadius:5 }} elevation={3}>

              <Typography variant="h4" gutterBottom>
                Welcome
              </Typography>

              <TextField
                label="Enter Mobile Number"
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <FormControlLabel
                control={<Checkbox />}
                label="I agree to Terms and Conditions"
              />

              <Typography variant="body2">
                <a href="#">Privacy Policy</a>
              </Typography>

              <Box mt={2}>
                <Button variant="contained" color="primary" fullWidth>
                  Login with OTP
                </Button>
                <Button variant="contained" color="success" fullWidth sx={{ mt: 1 }}>
                  Login with Password
                </Button>
              </Box>

          </Paper>
        </Grid>
      </Grid>
    </Box>
    )
}