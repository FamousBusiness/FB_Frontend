"use client";

import { Typography, Container, Card, CardContent, CardMedia, Box } from '@mui/material';
import Image from 'next/image';
import Grid from '@mui/material/Grid2';
import { Carousel } from 'antd';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';





////// Store Home page
function Page() {
      const [anchorEl, setAnchorEl]               = useState(null);
      const [currentMenu, setCurrentMenu]         = useState([]);
      const [categoryLoading, setCategoryLoading] = useState(true); //// Category Loading
      const [bannerLoading, setBannerLoading]     = useState(true); //// Category Loading
      const [productLoading, setProductLoading]   = useState(true);
      const [topCategory, setTopCategory]         = useState([]);  ////Top Category data
      const [banner, SetBanner]                   = useState([]);  // Banner
      const [productData, setProductData]         = useState([]);
      const [error, setError]                     = useState(''); //// Error Message
      const [categoryId, setCategoryID]           = useState(0);  //// selected category ID
      const [subCatgoryName, setSubCategoryName]  = useState(''); //// Selected subcategory Name
      const [productID, setProductID]             = useState('');  /// Clicked product ID


      const handleClick = (event, subItems) => {
        setAnchorEl(event.currentTarget);
        setCurrentMenu(subItems);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      
      //// Set product ID
      const handleRedirectProductPage = (id)=> {
        setProductID(id);
      };
      
      //// redirect to product page
      useEffect(()=> {
        if (productID) {
          window.location.href = `/store/product/?product_id=${productID}`
        }
      }, [productID]);


      ////// Redirect to category product page if clicked on any subcategory
      useEffect(()=> {
        if (categoryId && subCatgoryName) {
          window.location.href =  `/store/category/?cat_id=${categoryId}&sub_cat=${subCatgoryName}`
        }
      }, [categoryId, subCatgoryName]);


      //// Get all the top categories
      useEffect(()=> {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/ecom/v1/store/category`).then((res)=> {
          // console.log(res.data.results)

          if (res.status === 200) {
              setCategoryLoading(false);
              setTopCategory(res.data.results)
          }

        }).catch((error)=> {
            // console.log(error);
            setError('Something went wrong')

        });

    }, []);


    //// Get all the Banner
    useEffect(()=> {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/ecom/v1/store/banner`).then((res)=> {
          // console.log(res.data.results)

          if (res.status === 200) {
              setBannerLoading(false);
              SetBanner(res.data.results)
          }

        }).catch((error)=> {
            // console.log(error);
            setError('Something went wrong')

        });

    }, []);


    ///// Get all the product
    useEffect(()=> {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/ecom/v1/store/home/product`).then((res)=> {
        // console.log(res.data.results)

        if (res.status === 200) {
            setProductLoading(false);
            setProductData(res.data.results)
        }

      }).catch((error)=> {
          // console.log(error);
          setError('Something went wrong')

      })
  }, []);



  return (
    <Container maxWidth="xl">

       <Box
          component="nav"
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'space-around' },
            flexWrap: { xs: 'nowrap', md: 'wrap' },
            overflowX: { xs: 'auto', md: 'auto' },
            whiteSpace: 'nowrap',
            borderBottom: 1,
            borderColor: 'divider',
            padding: 2,
            backgroundColor: 'white',
            mb: 1,
          }}
        >

      {categoryLoading ? 
         <CircularProgress /> :

         topCategory.map((item, index) => (
          <>
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: { xs: 2, md: 4 },
                cursor: 'pointer',
                position: 'relative',
                height:'80px'
              }}
              onClick={(e) => {handleClick(e, item.subcategory_names); setCategoryID(item.id); }}
            >
              <Tooltip title={item.type}>
                <Image
                  src={item.image ? item.image : '/store/t_shirt.webp'}
                  width={70}
                  height={65}
                  alt='img'
                  style={{ marginBottom: '4px' }}
                />
              </Tooltip>

              <Typography variant="p" style={{position:'absolute', bottom:0, textAlign:'center', width:'100%', fontSize:'15px'}}>
                 {item.type}
              </Typography>
            </Box>
          </>
        ))
      }
    

      {/* Dropdown Menu */}
      {/* <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: { maxHeight: 200, width: '20ch' },
        }}
      >
        {currentMenu.map((subItem, index) => (
          <MenuItem key={index} onClick={()=> {handleClose(); setSubCategoryName(subItem); }}>
            {subItem}
          </MenuItem>
        ))}
      </Menu> */}
    </Box>


    {/* Banner */}
    <Grid container spacing={1} sx={{ marginTop: 2 }}>
      <Grid size={{xs:12}}>
        {bannerLoading ?  (
          <CircularProgress />
        )
         :
         (
          <Carousel autoplay slidesToScroll={true}>
            {banner.map((item, index)=> (
              <div className='relative overflow-hidden rounded-lg mx-1 lg:rounded-md xl:rounded-md 2xl:rounded-md xl:h-60 lg:h-60 2xl:h-60' key={index}>
                <Image 
                  src={item.image}
                  fill
                  style={{ objectFit: 'fill', width:'100%' }}
                  alt='home' 
                  />
              </div>
            ))}
          </Carousel>
         )}
      </Grid>
    </Grid>

        {/* Mobile Section */}

      {productLoading ? 
        (
          <CircularProgress />
        ): (

          productData.map((category) => (
            <React.Fragment key={category.id}>
              <Typography variant="h4" sx={{ marginTop: 2 }}>
                {category.name}
              </Typography>

              <Box
                  sx={{
                    display: 'flex',
                    overflowX: 'auto',  // Horizontal scroll
                    gap: 2,
                    padding: 1,
                    width: '100%',
                    height: 250,
                    '&::-webkit-scrollbar': {   // Hide scrollbar in Chrome, Safari, Edge
                      display: 'none',
                    },
                    'scrollbarWidth': 'none', 
                  }}
                >
                {category.products.map((product) => (
                    <Box  size={{xs:6, sm:4, md:2}} key={product.id}
                      sx={{
                        flex: '0 0 auto',
                        cursor: "pointer",
                      }}>

                      <Card sx={{ width: '14.5rem', height: 220 }} onClick={()=> handleRedirectProductPage(product.id)}>
                        <CardMedia
                          component="img"
                          style={{ height: '70%', objectFit: 'contain', paddingTop: 15 }}
                          image={product.picture}
                          alt={product.name}
                        />
                        <CardContent>
                          <Typography variant="body1">{product.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            From ₹{product.price}
                          </Typography>
                        </CardContent>
                      </Card>

                    </Box>
                ))}
                </Box>
            </React.Fragment>

          ))
        )}

  </Container>
  );
}


export default Page;
