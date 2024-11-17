"use client"

import React from 'react';
import { Box, Card, CardContent, Typography, Button, useMediaQuery  } from '@mui/material';
import useTheme from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';

const menuItems = [
  "Electronics",
  "TVs & Appliances",
  "Men",
  "Women",
  "Baby & Kids",
  "Home & Furniture",
  "Sports, Books & More",
  "Flights",
  "Offer Zone",
];

  

function Page() {
  
    return (
      <>
        <Box
          component="nav"
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'space-between' },
            overflowX: { xs: 'auto', md: 'visible' },
            whiteSpace: 'nowrap',
            borderBottom: 1,
            borderColor: 'divider',
            padding: 2,
            backgroundColor: 'white',
            mb:1
          }}
        >
          {menuItems.map((item, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                fontWeight: 'bold',
                paddingX: 2,
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {item}
            </Typography>
          ))}
      </Box>

      <Box sx={{ padding: 2 }}>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 1, ml:'1.4%'  }}>
        <Typography variant="h5">CCTV Cameras</Typography>
      </Box>

      <Typography variant="body2" sx={{ml:'1.4%' }}><b>Showing 1 - 40 of 13,718 results for "cctv camera set"</b></Typography>

      {/* Sort Options */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent:'flex-start' ,gap: 2, ml:'1%' }}>
        <Button variant="text">Relevance</Button>
        <Button variant="text">Popularity</Button>
        <Button variant="text">Price - Low to High</Button>
        <Button variant="text">Price - High to Low</Button>
        <Button variant="text">Newest First</Button>
        <Button variant="text">Newest First</Button>
        <Button variant="text">Newest First</Button>
        <Button variant="text">Newest First</Button>
      </Box>


      {/* Main Content */}
      <Grid container spacing={2} sx={{ml:'1%' }}>
        {/* Product Grid */}
        <Grid container spacing={2} xs={12} md={9}>
          {[1, 2, 3, 4].map((product) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={product}>
              <Card sx={{width: {xs:'10.5rem', sm:'10.5rem', md:'14rem'}}}>
                  <Image
                    width={230}
                    height={50}
                    src="/store/realme_P1.jpg" // replace with actual image URLs
                    alt="CCTV Camera"
                  />
                <CardContent>
                  <Typography variant="body1">Product Name</Typography>

                  <Typography variant="body2" color="text.secondary">
                    Product details like resolution, camera type, etc.
                  </Typography>

                  <Button variant="contained" sx={{ mt: 1 }}>View Details</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
    </>
    
    );
};


  
export default Page;