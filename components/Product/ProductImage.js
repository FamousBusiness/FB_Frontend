'use client';

import { useState, useEffect } from 'react';
import { Box, ImageList, ImageListItem, Paper, Button, useTheme, useMediaQuery } from '@mui/material';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import { useDataContext } from '@/app/store/DataContext';
// import { useAuth } from '@/Authentication/auth';
import LoginForm from '../LoginForm/LoginForm';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/Authentication/axios';
import { Button as JoyButton } from '@mui/joy';






function ImageGallery({Images = [], productID}) {
    const theme               = useTheme();
    const isXs                = useMediaQuery(theme.breakpoints.down('sm'));
    const router              = useRouter();
    const { isLoggedin }      = useDataContext();
    
    const [selectedImage, setSelectedImage] = useState('');
    const [cartItem, setCartItem]           = useState([]); ///// Users Cart Items
    const { viewCart, setViewCart }         = useDataContext(); //// View cart button
    const [login, setLogin]                 = useState(false);   ///// Open Login Form
    const [CartLoading, setCartLoading]     = useState(false);
    const [disableBuyButton, setDisableBuyButton] = useState(false);


    const handleImageClick = (image) => {
      setSelectedImage(image);
    };

    // Update selectedImage when Images change or on initial load
    useEffect(() => {
      if (Images.length > 0) {
        setSelectedImage(Images[0].image); // Set first image as default
      }
    }, [Images]);


    //// Update the Cart of Product when the page reload
    useEffect(()=> {
        if (isLoggedin) {
          //// fetch the users cart item
          axiosInstance.get(`/api/ecom/v1/cart/`).then((res)=> {
              // console.log(res);
              if (res.status === 200) {
                 setCartItem(res.data)
              }

          }).catch((error)=> {
              // console.log(error);
          })

        } else if (productID) {
          ///// get the cart from localStorage
          if (typeof window !== 'undefined') {
                const cart_items = localStorage.getItem('cart_items')
                const cart       = JSON.parse(cart_items ? cart_items : null );
      
                if (cart) {
                    const exists = cart.some(item => item.product_id === productID);
      
                    if (exists) {
                      setViewCart(true);
                    } else {
                      setViewCart(false);
                    }
                }
            }
        };
    }, [productID, isLoggedin]);

    

    ////// Update the Cart if product is already added to cart
    useEffect(()=> {
      if (isLoggedin) {
          const cart_item = cartItem.find(item => item.product === parseInt(productID));

          if (cart_item) {
            setViewCart(true);
          }

      } else {
        ///// For Unauthenticated user
        if (typeof window !== 'undefined') {
          try {
              const cart_items = localStorage.getItem('cart_items')
              const cart       = JSON.parse(cart_items ? cart_items : null );

              if (cart) {
                  const exists = cart.some(item => item.product_id === productID);

                  if (exists) {
                    setViewCart(true);
                  } else {
                    setViewCart(false);
                  }
              }

          } catch {
              console.log('Problem Occured');
          }
        }
      }

    }, [cartItem, productID, isLoggedin]);

  

    ////// Added to Cart Clicked
    const handleProductAddedtoCart = ()=> {
        setViewCart(true);

        ///// If Authenticted
        if (isLoggedin) {
            ////// Make API Call to update Cart Item
            axiosInstance.post(`/api/ecom/v1/cart/`, {
                product: parseInt(productID),
                quantity: 1

            }).then((res)=> {
                //  console.log(res)
                 if (res.status === 200) {
                    setViewCart(true)
                 }

            }).catch((error)=> {
                console.log(error);

            })

        ///// If not Authenticated
        } else {
            try {
                  if (typeof window !== 'undefined') {
                      const existingCart = JSON.parse(localStorage.getItem('cart_items')) || [];
                      // Add new product to the cart
                      const newProduct = {
                        product_id: productID,
                        quantity: 1,
                      };

                      const updateCart = [...existingCart, newProduct]
                      localStorage.setItem('cart_items', JSON.stringify(updateCart));
                  }
            } catch {
                console.log('Product Added to Cart Problem')
            }
        }
    };

  
    //// Clicked on Buy on EMI 
    const handleBuyOnEMIClicked = async ()=> {
        setDisableBuyButton(true);

        if (isLoggedin) {
            setLogin(false);
            setDisableBuyButton(true);
            router.push('/cart');

        } else {
            setLogin(true);
            setDisableBuyButton(false);
        }
    };
    
   

    ///// View Checkout Page
    const handleClickViewCart = ()=> {
        setCartLoading(true);
        router.push('/cart/');
    };



return (
<>
  <Paper sx={{display:'flex', flexDirection:'row', alignItems:'flex-start', padding:0, height:{ xs:'420px', sm:'520px'}}} elevation={0}>

      <Box sx={{
            overflowY:'auto', 
            maxHeight:{xs:'330px', sm:'450px'}, 
            width: { xs: '60px', sm:'90px' }, 
            mt: { xs: 1}, 
            mr:2,
            '&::-webkit-scrollbar': {
              display: 'none', 
            },
            scrollbarWidth: 'none', 
          }}
          >
        <ImageList cols={1} gap={8}>
          {Images && 
            Images.map((item, index) => (
            <ImageListItem key={index} onClick={() => handleImageClick(item.image)}>
                <Image
                  src={item.image}
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                  style={{ cursor: 'pointer', borderRadius: '5px' }}
                  width={90}
                  height={150}
                />
            </ImageListItem>
            ))
          }
        </ImageList>
      </Box>

      {/* Large Image View */}
      <Box flex="1" sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
        <Box
          component="img"
          src={selectedImage ? selectedImage : '/store/blank_image.jpeg'}
          alt="Selected"
          sx={{
            maxHeight: {xs:'300px', sm:'400px'},
            objectFit: 'contain',
            borderRadius: '8px',
            alignSelf: 'center',
            height:{xs:'500px', sm:'100%'},
            width:{xs:'100%', sm:'100%'},
            marginLeft:{xs:0, sm:-10}
          }}
        />

        {/* Buttons for Buy COD and Pay with EMI */}
        <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
            {isXs ? (
            <>
            
            </>
          ) : (
            <>
                {viewCart ?
                  <JoyButton
                    startDecorator={<ShoppingCartIcon />}
                    fullWidth
                    loading={CartLoading}
                    sx={{p:1.5}}
                    onClick={handleClickViewCart}
                  >
                    VIEW CART
                  </JoyButton> 
                  :
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    sx={{p:1.5}}
                    onClick={handleProductAddedtoCart}
                    >
                    Cart
                  </Button>
                }


                <Button
                  variant="contained"
                  color="warning"
                  sx={{ml:2, mr:2, p:1.5}}
                  fullWidth
                  onClick={handleBuyOnEMIClicked}
                  disabled={disableBuyButton}
                >
                  BUY NOW
                </Button>

                {/* <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<FlashOnIcon />}
                  sx={{ p: { xs: 0, sm: 0, mb:2 } }}
                >
                  BUY NOW
                </Button> */}
            </>
          )}

        </Box>
      </Box>
    </Paper>

    <LoginForm visible={login} onClose={() => setLogin(false)} pathname={`/product?product_id=${productID}`} />
</>
  );
};



export default ImageGallery;
