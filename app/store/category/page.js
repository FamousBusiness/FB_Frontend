"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Box, Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';





///// Category wise product page
function Page() { 
    const [productData, setProductData] = useState([]);
    const [loading, setLoading]         = useState(true); //// Loading 
    const [error, setError]             = useState(''); //// Error Message
    const [productID, setProductID]     = useState('');  //// Selected Product
    const [catId, setCatId] = useState('');
    const [subCat, setSubCat] = useState('');

    
    ////// Get the data from query params
    useEffect(() => {
      if (typeof window !== 'undefined') {  // Ensure code runs only on the client side
        const params = new URLSearchParams(window.location.search);
        setCatId(params.get('cat_id'));
        setSubCat(params.get('sub_cat'));
      }
    }, []);


  //// Fetch all Category wise product
  useEffect(()=> {
    if (catId && subCat) {
      const category_id = parseInt(catId);
      const subcategory = subCat;

       axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/ecom/v1/category/product/?category_id=${category_id}&subcategory=${subcategory}`).then((res)=> {
            if (res.status === 200) {
              setProductData(res.data.results);
              setLoading(false);
            }

       }).catch((error)=> {
          setError('Something went wrong');
          setLoading(false);

       })
    }
}, [catId, subCat]);

  
  
  //// Redirect to product page
  useEffect(()=> {
    if (productID) {
       const product_id = parseInt(productID)

       window.location.href = `/store/product/?product_id=${product_id}`
    }

 }, [productID]);


   ///// If not data available
   if (productData.length === 0 && !loading) {
    return (
     <>
       <div style={{display:'flex', justifyContent:'center', marginTop:'30vh'}}>
           <DeleteOutlineIcon sx={{fontSize:'10rem'}} />
       </div>

       <div style={{display:'flex', justifyContent:'center'}}>
         <p>Nothing to show</p>
       </div>

     </>
    );
 };


  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ paddingTop: 4, paddingBottom: 4, cursor: "pointer" }}
      >
        {/* Header Breadcrumb */}
        <Typography variant="h6" color="textSecondary" gutterBottom>
            Showing 1 40 of 13,818 results for &quot;cctv camera set&quot;
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="subtitle1" color="textPrimary">
            Sort By: <strong>Relevance</strong>
          </Typography>
          {/* Sort options can be a dropdown */}
        </Box>

        {loading ? (
          <CircularProgress style={{display:'flex', justifyContent:'center'}} />

        ) : (
          <>

            {/* Product Grid */}
            <Grid container spacing={{ xs: 1, sm: 3 }}>
              {productData.map((product) => (
                <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={product.id}>

                  <Card onClick={()=> setProductID(product.id)} sx={{
                    height:'20rem',
                    borderRadius:3,
                    boxShadow:0,
                    '&:hover': {
                        boxShadow: 6,  // Apply shadow on hover
                      },
                      cursor:'pointer'
                    }}
                    >

                    <div style={{flex: '70%', position: 'relative', width: '100%', height: '65%', marginTop:10 }}>
                      <Image
                        src={product?.picture}
                        alt={product?.name}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>

                    <CardContent style={{ flex: '30%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      {product?.is_sponsored && 
                        <Typography variant="body2" color="success">
                          Sponsored
                        </Typography>
                      }

                      <Typography
                        variant="p"
                        fontWeight="bold"
                        fontSize={{ xs: "12px", sm: "14px" }}
                        sx={{
                          overflow: "hidden",
                          whiteSpace: 'nowrap',
                          textOverflow: "ellipsis",
                          '&:hover': {
                              color: 'primary.main',  
                            },
                        }}
                      >
                        {product?.description}
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" sx={{color:'green'}}>
                          {product?.rating} ★ 
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                          ({product?.reviews || 0})
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1}>
                        <Typography variant="p" color="textPrimary">
                          ₹{product?.price}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ textDecoration: "line-through" }}
                          fontSize={{ xs: "10px", sm: "13px" }}
                        >
                          ₹{product?.discount_price}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="success.main"
                          fontSize={{ xs: "9px", sm: "13px" }}
                        >
                          {product?.percentage_off}% off
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}

export default Page;
