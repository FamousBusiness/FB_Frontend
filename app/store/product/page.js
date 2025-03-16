"use client";

import React from 'react'; 
import { useEffect, useState } from 'react';
import { Paper, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import ImageGallery from '@/components/Product/ProductImage';
import ProductDetails from '@/components/Product/ProductDetails';
import BottomProductNav from '@/components/Navbar/ProductBottomNav';
// import 'bootstrap/dist/css/bootstrap.min.css';





function Product() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState('');
    const [Images, setImages]           = useState([]);
    const [productID, setProductID]     = useState('');
    const [apiURL, setAPIURL]           = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 'https://api.famousbusiness.in')

    
    ///// Get the data from query params
    useEffect(() => {
      if (typeof window !== 'undefined') {  
          const params = new URLSearchParams(window.location.search);
          setProductID(params.get('product_id'));
      }
    }, []);



    ///// Fetch the product details when page loads
    useEffect(()=> {
      if (productID) {
          axios.get(`${apiURL}/api/ecom/v1/product/?product_id=${productID}`).then((res)=> {
              if (res.status === 200) {
                setLoading(false)
                setProductData(res.data.results)
                setImages(res.data.results[0].multiple_img);
              }

          }).catch((error)=> {
              setLoading(false);
              setError('Something went wrong');

          });
      }
    }, [productID, apiURL]);



  return (
    <>
      <Paper elevation={3}>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>

            <Grid size={{xs:12, md:4.5 }} >
              <Box sx={{ marginTop: 2 }}>
                  <ImageGallery 
                    Images={Images} 
                    productID={productID}
                    />
              </Box>
            </Grid>
        
            <Grid size={{ xs:12, md:7.5 }}>
              <Box sx={{ marginTop: 2 }}>
                <ProductDetails 
                  productData={productData} 
                  />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <BottomProductNav 
            productData={productData}
            productID={productID}
          />
      </Paper>

    </>
  );
}


export default Product;
