"use client"

import { Typography, Container, Card, CardContent, CardMedia, Box, Menu, MenuItem, } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import Grid from '@mui/material/Grid2';
import { Carousel } from 'antd';
import { useState } from 'react';




const menuItems = [
  { 
    name: "Electronics", 
    image: "/store/realme_P1.jpg", 
    subItems: ["Mobiles", "Laptops", "Cameras"] 
  },
  { 
    name: "TVs & Appliances", 
    image: "/store/Vivo_T2_pro.webp", 
    subItems: ["Televisions", "Refrigerators", "Washing Machines"] 
  },
  { 
    name: "Men", 
    image: "/store/realme_P1.jpg", 
    subItems: ["Shirts", "Trousers", "Shoes"] 
  },
  { 
    name: "Men", 
    image: "/store/Vivo_T2_pro.webp", 
    subItems: ["Shirts", "Trousers", "Shoes"] 
  },
  { 
    name: "Men", 
    image: "/store/realme_P1.jpg", 
    subItems: ["Shirts", "Trousers", "Shoes"] 
  },
  { 
    name: "Men", 
    image: "/store/Vivo_T2_pro.webp", 
    subItems: ["Shirts", "Trousers", "Shoes"] 
  },
  { 
    name: "Men", 
    image: "/store/t_shirt.webp", 
    subItems: ["Shirts", "Trousers", "Shoes"] 
  },
  { 
    name: "Men", 
    image: "/store/women_shoes.webp", 
    subItems: ["Shirts", "Trousers", "Shoes"] 
  },
 
];




export default function Store() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentMenu, setCurrentMenu] = useState([]);

    const handleClick = (event, subItems) => {
      setAnchorEl(event.currentTarget);
      setCurrentMenu(subItems);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  

  return (

      <Container maxWidth="xl">
        <Box
            component="nav"
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'space-around' },
              flexWrap: { xs: 'nowrap', md: 'wrap' },
              overflowX: { xs: 'auto', md: 'visible' },
              whiteSpace: 'nowrap',
              borderBottom: 1,
              borderColor: 'divider',
              padding: 2,
              backgroundColor: 'white',
              mb: 1,
            }}
          >

        {menuItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: { xs: 2, md: 4 },
              cursor: 'pointer',
            }}
            onClick={(e) => handleClick(e, item.subItems)}
          >
            <Image
              src={item.image}
              width={30}
              height={30}
              alt={item.name}
              style={{ marginBottom: '4px' }}
            />
            <Typography variant="caption">{item.name}</Typography>
          </Box>
        ))}

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: { maxHeight: 200, width: '20ch' },
          }}
        >
          {currentMenu.map((subItem, index) => (
            <MenuItem key={index} onClick={handleClose}>
              {subItem}
            </MenuItem>
          ))}
        </Menu>
      </Box>


      {/* Banner */}
      <Grid container spacing={1} sx={{ marginTop: 2 }}>
        <Grid size={{xs:12}}>
            <Carousel autoplay slidesToScroll={true}>
                  <div className='relative overflow-hidden rounded-lg mx-1 lg:rounded-md xl:rounded-md 2xl:rounded-md xl:h-60 lg:h-60 2xl:h-60'>
                    <Image 
                      src='/store/banner.jpg' 
                      fill
                      style={{ objectFit: 'fill', width:'100%' }}
                      alt='home' 
                      />
                  </div>
              
                  <div className='h-48 relative overflow-hidden rounded-lg mx-1 lg:rounded-md xl:rounded-md 2xl:rounded-md xl:h-60 lg:h-60 2xl:h-60'>
                    <Image 
                      src='/store/banner2.jpg' 
                      fill
                      style={{ objectFit: 'fill' }}
                      alt='home' 
                      />
                  </div>

                  <div className='h-48 relative overflow-hidden rounded-lg mx-1 lg:rounded-md xl:rounded-md 2xl:rounded-md xl:h-60 lg:h-60 2xl:h-60'>
                    <Image 
                        src='/store/banner3.jpg' 
                        fill
                        style={{ objectFit: 'fill' }}  
                        alt='home' 
                        />
                  </div>
            </Carousel>
        </Grid>
      </Grid>

      {/* Mobile Section */}
        <Typography variant="h4" sx={{ marginTop: 1 }}>Best Seller</Typography>
        <Grid container spacing={2} s
              x={{ 
                marginTop: 2,
                flexWrap: { xs: 'nowrap', md: 'wrap' },
                overflowX: { xs: 'auto', md: 'visible' }, 
                display: { xs: 'flex', md: 'grid' }, 
                }}>

            {['Realme P1', 'vivo T2 Pro', 'Poco M6 Pro', 'Moto Edge', 'Realme', 'Vivvo'].map((item, index) => (

              <Grid size={{xs:6, sm:4, md:2 }} key={index}
                    sx={{
                      flex: { xs: '0 0 auto', md: 'none' },
                    }}
              >
                  <Card sx={{ width: '100%', height: 220 }}>
                    <CardMedia
                      component="img"
                      style={{height:'70%', objectFit:'contain'}}
                      image={`/store/${['Vivo_T2_pro.webp', 'Vivo_T2_pro.webp', 'realme_P1.jpg', 'realme_P1.jpg', 'Vivo_T2_pro.webp'][index]}`}
                      alt={item}
                    />
                    <CardContent>
                      <Typography variant="body1">{item}</Typography>
                      <Typography variant="body2" color="text.secondary">From ₹{[13999, 20999, 9249, 19999, 16999, 16999][index]}</Typography>
                    </CardContent>
                  </Card>
              </Grid>
            ))}
        </Grid>


        <Typography variant="h4" sx={{ marginTop: 1 }}>New Product</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {['Kurta Sets', 'Women\'s Shoes', 'T-shirts', 'Sarees', 'Women\'s Flats', 'Sarees'].map((item, index) => (
              <Grid size={{xs:6, sm:4, md:2 }} key={index}>
                  <Card sx={{ width: '100%', height: 220 }}>
                    <CardMedia
                      component="img"
                      style={{height:'70%', objectFit:'contain'}}
                      image={`/store/${['kurts_sets.AVIF', 'women_shoes.webp', 't_shirt.webp', 'saree.jpg', 'heels.webp', 'saree.jpg'][index]}`}
                      alt={item}
                    />
                    <CardContent>
                      <Typography variant="body1">{item}</Typography>
                      <Typography variant="body2" color="text.secondary">From ₹{[13999, 20999, 9249, 19999, 16999, 16999][index]}</Typography>
                    </CardContent>
                  </Card>
              </Grid>
            ))}
      </Grid>


        <Typography variant="h4" sx={{ marginTop: 1 }}>499 Only</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {['Kurta Sets', 'Women\'s Shoes', 'T-shirts', 'Sarees', 'Women\'s Flats', 'T-shirts'].map((item, index) => (
              <Grid size={{xs:6, sm:4, md:2 }} key={index}>
                  <Card sx={{ width: '100%', height: 220 }}>
                    <CardMedia
                      component="img"
                      style={{height:'70%', objectFit:'contain'}}
                      image={`/store/${['kurts_sets.AVIF', 'women_shoes.webp', 't_shirt.webp', 'saree.jpg', 'heels.webp', 't_shirt.webp'][index]}`}
                      alt={item}
                    />
                    <CardContent>
                      <Typography variant="body1">{item}</Typography>
                      <Typography variant="body2" color="text.secondary">From ₹{[13999, 20999, 9249, 19999, 16999, 16999][index]}</Typography>
                    </CardContent>
                  </Card>
              </Grid>
            ))}
      </Grid>


      {/* Footer */}
      {/* <Grid container spacing={2} sx={{ marginTop: 4, textAlign: 'center', paddingBottom: 4 }}>
        <Grid size={{xs:12}}>
          <Typography variant="body1" color="primary">Famous Business</Typography>
          <Grid container justifyContent="center" spacing={1}>
            {['visa', 'rupay', 'mastercard', 'upi', 'paytm', 'gpay'].map((payment, index) => (
              <Grid  key={index}>
                <img src={`${payment}-logo-url.jpg`} alt={payment} height="30" />
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" sx={{ marginTop: 1 }}>&#169; 2024 Famous Business. All rights reserved.</Typography>
        </Grid>
      </Grid> */}
    </Container>

  );
};