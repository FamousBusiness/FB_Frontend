"use client"

import React from 'react'; 
import ProductDetails from './ProductDetails';
import ImageGallery from './ProductImage';
import { useEffect, useState } from 'react';
import { Paper, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Grid from '@mui/material/Grid2';





function Page() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState('');
    const [Images, setImages]           = useState([]);
    const [productID, setProductID]     = useState('');

    
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

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/ecom/v1/product/?product_id=${productID}`).then((res)=> {

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
    }, [productID]);



  return (
    <>
      <Paper elevation={3}>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>


          
            <Grid size={{xs:12, md:4.5 }} >
              <Box sx={{ marginTop: 2 }}>
                <ImageGallery Images={Images} />
              </Box>
            </Grid>

        
            <Grid size={{ xs:12, md:7.5 }}>
              <Box sx={{ marginTop: 2 }}>
                <ProductDetails productData={productData} />
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Paper>

    {/* <Paper elevation={3}>
        <div className="container" style={{ padding: 2 }}>
          <div className="row">
            <div className="col-sm-12 col-md-6" style={{ marginTop: 7 }}>
              <ImageGallery 
                 Images={Images}
              />
            </div>

            <div className="col-sm-12 col-md-6" style={{ marginTop: 7 }}>
              <ProductDetails 
                 productData={productData}
              />
            </div>
          </div>
        </div>
      </Paper> */}

    </>
  );
}


export default Page;
