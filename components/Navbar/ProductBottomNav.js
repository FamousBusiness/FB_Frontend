"use client";

import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import { useTheme, useMediaQuery  } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import { useEffect, useState } from 'react';
import { useDataContext } from '@/app/store/DataContext';
import { useAuth } from '@/Authentication/auth';
import { useRouter } from 'next/navigation';
import LoginForm from '../LoginForm/LoginForm';
import axiosInstance from '@/Authentication/axios';
import CheckIcon from '@mui/icons-material/Check';






//// Mobile view of Product Bottom Navbar
export default function BottomProductNav({productData=[], productID}) {
    const theme  = useTheme();
    const router = useRouter();
    const isSmallScreen  = useMediaQuery(theme.breakpoints.down('sm'));
    const { isLoggedin } = useDataContext();
    const { viewCart, setViewCart } =  useDataContext();

    const [login, setLogin]                 = useState(false);  //// Open Login Modal state
    const { authTokens }                    = useAuth();
    const [storageProduct, setStorageProduct] = useState(() => {
        // Initialize state with data from localStorage
        if (typeof window !== 'undefined') {
          const storedProducts = localStorage.getItem('cart_products');
          return storedProducts ? JSON.parse(storedProducts) : [];
        }
        return [];
    });



    ///// Clicked on Add to cart buttons
    const handleClickCart = ()=> {
        setViewCart(true);

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
                // console.log(error);
            })

        } else {
            ///// If not Authenticated
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
        };
    };



     //// Clicked on Buy on EMI 
     const handleBuyOnEMIClicked = ()=> {
        if (authTokens) {
            setLogin(false);
        } else {
          setLogin(true);
        }
    };


return (
    <>
    
    {isSmallScreen && (
        <ButtonGroup
            buttonFlex={1}
            aria-label="flex button group"
            spacing='0.2rem'
            sx={{
                position:'fixed',
                bottom:0,
                left:0,
                right:0,
                boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
                zIndex: 1200, 
                display: 'flex',
                justifyContent: 'center', 
                p: 2,
                width: '100%',
                maxWidth: '100%',
                overflow: 'auto',
                resize: 'horizontal',
                backgroundColor:'#ffff'
            }}
        >

            {viewCart ? (
                <IconButton sx={{p:1}}>
                    <Badge badgeContent={<CheckIcon sx={{ fontSize:'10px'}}/>} color="success">
                        <AddShoppingCartIcon sx={{fontSize:'40px'}}/>
                    </Badge>
                </IconButton>
            ) : (
                <IconButton sx={{p:1}} onClick={handleClickCart}>
                    <AddShoppingCartIcon sx={{fontSize:'40px'}}/>
                </IconButton>
            )}
            

            <Button>
                Pay with EMI <br/>
                From 2,000/m
            </Button>

            <Button 
                variant='contained' 
                sx={{ backgroundColor:'black', color:'white'}} 
                onClick={()=> {isLoggedin ? router.push('/cart') : handleBuyOnEMIClicked()}}
                >
                Buy Now
            </Button>

    </ButtonGroup>
    )}

    <LoginForm visible={login} onClose={() => setLogin(false)} />
</>

)};