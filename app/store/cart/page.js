"use client"

import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/Authentication/axios';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDataContext } from '@/app/DataContext';
import { useRouter } from 'next/navigation';
import UnAuthenticatedCartItems from '@/components/Cart/Unauthenticated';
import LoginForm from '@/components/LoginForm/LoginForm';




///// Product Checkout page
function Page() {
    const { isLoggedin }  = useDataContext();
    const router          = useRouter();

    const [userCartItem, setUserCartItem]       = useState([]);
    const [login, setLogin]                     = useState(false);
    const [loading, setLoading]                 = useState(true);
    const [toalAmount, setTotalAmount]          = useState(0);
    const [discountPrice, setDiscountPrice]     = useState(0);
    const [totalQuantity, setTotalQuantity]     = useState(0);
    const [disableButton, setDisableButton]     = useState(false);
    const [notification, setNotification]       = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    const { vertical, horizontal, open } = notification;


    ///// Open Notification
    const OpenNotification = (newState)=> {
        setNotification({ ...newState, open: true });
    };


    ////// Close Notification
    const CloseNotification = ()=> {
        setNotification({ ...notification, open: false });
    };
    
    
    ///// Remove Cart Items
    const handleRemoveCartItem = (id)=> {
        if (isLoggedin) {
            axiosInstance.delete(`/api/ecom/v1/cart/${id}`).then((res)=> {
                // console.log(res)
                if (res.status === 204) {
                    window.location.reload()
                }
            }).catch((error)=> {
                // console.log(error);
                if (error.response.status === 404) {
                    OpenNotification({ vertical: 'top', horizontal: 'center' })
                }
            });
            
        }
    };


    //// Get all the carts item from local storage
    //// And Transfer into DB then remove from localStorage
    React.useEffect(()=> {
        if (isLoggedin === true) {

            try{
                if (typeof window !== 'undefined'){
                    const  storage_cart = localStorage.getItem('cart_items');
    
                    if (storage_cart) {
                        const cartItems = JSON.parse(storage_cart);
    
                        const product_ids = cartItems.map(item => item.product_id)
                        const quantity    = cartItems.map(item => item.quantity)
    
                        axiosInstance.post(`/api/ecom/v1/update/cart/`, {
                            product: product_ids,
                            quantity: quantity
    
                        }).then((res)=> {
                            // console.log(res)
                            if (res.status === 200) {
                                localStorage.removeItem('cart_items')
                                localStorage.removeItem('ProductDetails')
                            }
                        })
                    }
                }

            } catch (error) {
                console.log('error', error);
            }
        }
    }, [isLoggedin]);


    
    ///// Fetch all the Cart Items
    useEffect(()=> {
        if (isLoggedin) {
            axiosInstance.get(`/api/ecom/v1/checkout/`).then((res)=> {
                // console.log(res.data)
                if (res.status === 200) {
                    setUserCartItem(res.data.data);
                    setLoading(false);
                    setTotalAmount(res.data.totalAmount)
                }
    
            }).catch((error)=> {
                 console.log(error);
    
            }).finally(()=> {
                setLoading(false)
            })

        }  else {
            setLoading(false);
        }

    }, [isLoggedin]);
    
    
    //////// Calculate Total Amount and Discount Price of Items
    useEffect(()=> {
        if (isLoggedin) {
            if (userCartItem.length > 0) {
                // const Amount = userCartItem.reduce(
                //     (acc, item) => acc + (Number(item?.product_details?.price) * Number(item?.quantity) || 0), 
                //     0
                // );
                
                const discount = userCartItem.reduce(
                    (accumulator, item)=> accumulator + (Number(item?.product_details?.discount_price) * Number(item?.quantity) ) || 0,
                        0
                );
                
                setDiscountPrice(discount);
                // setTotalAmount(Amount);
                // setProductCount(procutQuantity);
            }
        }
    },[userCartItem, isLoggedin]);


    
    
    ///// Update Product Quantity
    const handelUpdateProductQuantity = (product, process, qty)=> {

        if (isLoggedin) {
            const newQuantity = (process === 'increment' ? qty + 1 : process === 'decrement' ? Math.max(qty - 1, 0) : 0)
    
            axiosInstance.post(`/api/ecom/v1/cart/`, {
                product: parseInt(product),
                quantity: newQuantity
    
            }).then((res)=> {
                //  console.log(res)
                if (res.status === 200) {
                    window.location.reload();
                }

            }).catch((error)=> {
                // console.log(error);
            })

        } 
    };


    
    if (loading) {
        return (
            <>
                <Box sx={{ p: {xs: 1, sm:3, md:10} }}>
                    {/* Header Section */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Famous Business</Typography>
                    </Box>

                    {/* Address Section */}
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f3f6', p: 2, borderRadius: 1 }}>
                        <Typography><strong>Deliver to:</strong> New Delhi - 110068</Typography>
                        <Button variant="outlined">Change</Button>
                    </Box>

                    <Box sx={{display:'flex', justifyContent:'center'}}>
                        <CircularProgress />
                    </Box>
                </Box>
            </>
        )
    };



    ////// Cart items for Unauthenticated users
    if (!isLoggedin) {
        return (
            <UnAuthenticatedCartItems 
                isLoggedin = {isLoggedin}
                setLogin = {setLogin}
                login = {login}
            />
        )
    };
    
    
    
    ///// For empty Data 
    if (userCartItem.length === 0 && isLoggedin === true) {
        return (
            <>
              <Box sx={{ p: {xs: 1, sm:3, md:10} }}>
                    {/* Header Section */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Famous Business</Typography>
                    </Box>

                    {/* Address Section */}
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f3f6', p: 2, borderRadius: 1 }}>
                        <Typography><strong>Deliver to:</strong> New Delhi - 110068</Typography>
                        <Button variant="outlined">Change</Button>
                    </Box>

                    <Box sx={{display:'flex', justifyContent:'center'}}>
                        <DeleteIcon fontSize='large' sx={{ fontSize:'10rem'}} />
                    </Box>
                </Box>
            </>
        )};


    
    if (isLoggedin === false) {
        return (
            <>
              <Box sx={{ p: {xs: 1, sm:3, md:10} }}>
                    {/* Header Section */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Famous Business</Typography>
                    </Box>

                    {/* Address Section */}
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f3f6', p: 2, borderRadius: 1 }}>
                        <Typography><strong>Deliver to:</strong> New Delhi - 110068</Typography>
                        <Button variant="outlined">Change</Button>
                    </Box>

                    <Box sx={{display:'flex', justifyContent:'center'}}>
                        <DeleteIcon fontSize='large' sx={{ fontSize:'10rem'}} />
                    </Box>
                </Box>
            </>
        )};



return (
    <>
        <Box sx={{ p: {xs: 1, sm:3, md:10} }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Famous Business</Typography>
            </Box>

            {/* Address Section */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f3f6', p: 2, borderRadius: 1 }}>
                <Typography><strong>Deliver to:</strong> New Delhi - 110068</Typography>
                <Button variant="outlined">Change</Button>
            </Box>


            {loading ?
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <CircularProgress />
                </Box>

                :
                <Grid container spacing={2}>
                    {/* Product Section */}
                    <Grid size={{xs: 12, md:8}}>
                        {userCartItem.map((item, index)=> (
                                <Card sx={{ mb: 2 }} key={index}>
                                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={item?.picture} alt="Product" width={100} height={100} style={{ marginRight: 16 }} />

                                        <Box sx={{ display:'flex', gap:1, flexDirection:'column'}}>
                                            <Typography variant="h6">{item?.product_details?.name}</Typography>

                                            <Typography color="text.secondary">Gold - Seller: TanviEnterprise</Typography>

                                            <Typography variant="body1">
                                                <span style={{color:'#867979'}}>₹<del>{item?.product_details?.discount_price}</del> </span>

                                                <b>₹{item?.product_details?.price}</b> &nbsp;

                                                <span style={{ color:'green' }}><b>({item?.product_details?.percentage_off}% Off)</b></span>
                                            </Typography>

                                            <Typography color="success.main">Free Delivery by Tue Dec 3</Typography>
                                        </Box>
                                    </CardContent>

                                    <Box sx={{display:'flex', justifyContent:'flex-start', mb:2, ml:2}}>
                                        <ButtonGroup variant="contained" aria-label="Basic button group">
                                            
                                            <Button 
                                                onClick={() => {
                                                        handelUpdateProductQuantity(item.product, 'decrement', item.quantity);
                                                    }}>
                                                <RemoveIcon fontSize="small" />
                                            </Button>

                                            {/* <Button>{productCount ? productCount[index] : 0}</Button> */}
                                            <Button>{item.quantity}</Button>

                                            {/* <Button onClick={()=> setProductCount(productCount + 1)}> */}
                                            <Button onClick={()=> {
                                                    handelUpdateProductQuantity(item.product, 'increment', item.quantity);
                                                }}>
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>
                                        
                                        <Button onClick={()=> handleRemoveCartItem(item.id)}>
                                            Remove From Cart
                                        </Button>
                                    </Box>
                                </Card>

                                // Warranty Section 
                                //  <Card>
                                //     <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                //         <Box>
                                //             <Typography variant="h6">OneAssist Extended Warranty Plan</Typography>
                                //             <Typography variant="body2">1 Year - 36% Off</Typography>
                                //             <Typography>₹69 <del>₹109</del></Typography>
                                //         </Box>
                                //         <Button variant="contained" color="warning">Add Item</Button>
                                //     </CardContent>
                                // </Card> 
                        ))}
                    </Grid>

                    {/* Price Details Section */}
                    <Grid size={{xs:12, md:4}}>
                        <Card sx={{ p: 2 }}>
                            <Typography variant="h6" mb={1}>PRICE DETAILS</Typography>
                            <Divider />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Typography>Price </Typography>
                                <Typography>₹{toalAmount ? toalAmount : 0}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography>Discount</Typography>
                                <Typography color="success.main">−₹{discountPrice ? discountPrice : 0}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography>Delivery Charges</Typography>
                                <Typography color="success.main">Free</Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Total Amount</Typography>
                                <Typography variant="h6">
                                    ₹{(toalAmount && discountPrice ) ? (parseFloat(toalAmount).toFixed(2) - parseFloat(discountPrice).toFixed(2)): 0}
                                </Typography>
                            </Box>

                            <Button 
                                variant="contained" 
                                color="warning" 
                                fullWidth
                                disabled={disableButton}
                                onClick={() => {
                                    if (isLoggedin === false) {
                                        setLogin(true);
                                    } else {
                                        setDisableButton(true); 
                                        router.push('/checkout'); 
                                    }
                                }}
                                >
                                PLACE ORDER
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
        }

    </Box>

    <LoginForm visible={login} onClose={() => setLogin(false)} />

    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={CloseNotification}
        key={vertical + horizontal}
        autoHideDuration={4000}
      >
        <Alert
          onClose={CloseNotification}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Unable to Delete the Item
        </Alert>

    </Snackbar>

    </>

    );
};



export default Page;