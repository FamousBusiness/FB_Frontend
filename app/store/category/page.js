"use client"

import React from 'react';
import { Container, Typography, Card, CardMedia, CardContent, CardActions, Button, Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';



const products = [
  {
    id: 1,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },
  {
    id: 2,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },
  {
    id: 3,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },
  {
    id: 4,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },
  {
    id: 5,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },
  {
    id: 6,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },
  {
    id: 7,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },
  {
    id: 8,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },
  {
    id: 9,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },
  {
    id: 10,
    image: '/store/cctv.png', // replace with actual image URLs
    title: 'PHILIPS HSP 3800, 2MP, Color Night Vision, 2-Way Talk, ...',
    rating: 4.1,
    reviews: 939,
    price: '₹4,299',
    discountPrice: '₹7,795',
    discount: '44% off',
    delivery: 'Free delivery by 22nd Nov',
  },

];



function Page() {

  return (
    <>
    <Container maxWidth="xl" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      {/* Header Breadcrumb */}
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Showing 1 40 of 13,818 results for &quot;cctv camera set&quot;
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" color="textPrimary">
          Sort By: <strong>Relevance</strong>
        </Typography>
        {/* Sort options can be a dropdown */}
      </Box>

      {/* Product Grid */}
      <Grid container spacing={{xs:1, sm:3}}>
        {products.map((product) => (
          <Grid size={{xs:6, sm:6, md:4, lg:3}} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />  
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Sponsored
                </Typography>

                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold" 
                  fontSize={{xs:'12px', sm:'14px'}}
                  sx={{
                    overflow:'hidden',
                    whiteSpace:{xs: 'nowrap', sm:'normal'},
                    textOverflow:'ellipsis'
                  }}
                  >
                  {product.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2" color="textPrimary">
                    {product.rating} ★
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    ({product.reviews})
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Typography variant="h6" color="textPrimary">
                    {product.price}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }} fontSize={{xs:'10px', sm:'13px'}}>
                    {product.discountPrice}
                  </Typography>

                  <Typography variant="body2" color="success.main" fontSize={{xs:'9px', sm:'13px'}}>
                    {product.discount}
                  </Typography>
                </Stack>

                <Typography variant="body2" color="textSecondary">
                  {product.delivery}
                </Typography>
              </CardContent>

              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Bank Offer
                </Button>
              </CardActions>
            </Card>

          </Grid>
        ))}
      </Grid>

    </Container>
    </>
  );
}

export default Page;
