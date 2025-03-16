"use client"

import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import LoginForm from '@/components/LoginForm/LoginForm';
import axiosInstance from '@/Authentication/axios';









function UnAuthenticatedCartItems({ setLogin, login, isLoggedin }) {
    const [userCartItem, setUserCartItem]     = useState([]);
    const [loading, setLoading]               = useState(false);
    const [productDetails, setProductdetails] = useState([]);
    const [totalQuantity, setTotalQuantity]   = useState(0);  ///// Total Cart Quantity


     ///// Get cart items from localStorage
    ///// Fetch the product details from API
    ///// Store the details in localStorage
    useState(()=> {
        try{ 
            if (typeof window !== 'undefined') {
                const stored_products = localStorage.getItem('cart_items') || '[]';
                const cart_items      = JSON.parse(stored_products ? stored_products : '') || []

                const product_ids = cart_items.map(item => item.product_id)

                axiosInstance.post(`/api/ecom/v1/multiple/product`, {
                    products: product_ids

                }).then((res)=> {
                    // console.log(res);
                    if (res.status === 200) {
                        setProductdetails(res.data.products);
                        setLoading(false);
                    }
                }).catch((error)=> {
                    // console.log(error)
                })
            }

        } catch (error) {
            console.log('error', error)
        }
    }, []);

    
    ///// Set product details in Local storage
    useEffect(()=> {
        if (productDetails && productDetails.length > 0) {

            try {
                if (typeof window !== 'undefined') {
                    const stored_products = localStorage.getItem('cart_items') || []
                    const cart_items = JSON.parse(stored_products ? stored_products : '') || []
    
                    const updateProductDetails = productDetails.map((product)=> {
                        const matchingProduct = cart_items.find((item)=> Number(item.product_id) === product.id);
    
                        return {
                            ...product,
                            quantity: matchingProduct ? matchingProduct.quantity : 0
                        }
                    })
    
                    setUserCartItem(updateProductDetails ? updateProductDetails : []);
    
                    localStorage.setItem('ProductDetails', JSON.stringify(updateProductDetails ? updateProductDetails : []))
                }

            } catch (error) {
                console.log('error', error)
            }
        }
    }, [productDetails]);


    ///// Calculate Total Cart Quantity
    useEffect(()=> {
        
        if (productDetails && productDetails.length > 0) {
            // console.log('quantity', productDetails.quantity)

            const Quantity = productDetails.reduce((acc, item) => {
                return acc + (item.quantity || 0); 
            }, 0);

            setTotalQuantity(Quantity);
        }

    }, [productDetails]);
    


    ///// Remove Cart items
    const handleRemoveCartItem = (productID) => {
        try {
            if (typeof window !== 'undefined') {
                const storage_product = localStorage.getItem('cart_items') || '[]';
                const productDetails  = localStorage.getItem('ProductDetails') || '[]';

                const cart_items      = JSON.parse(storage_product ? storage_product : '') || [];
                const products        = JSON.parse(productDetails ? productDetails : '') || [];

    
                const updatedCart    = cart_items.filter(product => Number(product.product_id) !== productID);
                const updatedProduct = products.filter(product => Number(product.id) !== productID)
    
                localStorage.setItem('cart_items', JSON.stringify(updatedCart));
                localStorage.setItem('ProductDetails', JSON.stringify(updatedProduct));

                window.location.reload();
            }

        } catch {
            console.log('No data found');
        }
    };

    
    //// Update Product quantity
    const handleUpdateProductQuantity = (product, process, qty)=> {
        try{
            const newQuantity = (process === 'increment' ? qty + 1 : process === 'decrement' ? Math.max(qty - 1, 0) : 0);

            if (typeof window !== 'undefined') {
                const existingCart   = localStorage.getItem('cart_items') || [];
                const productDetails = localStorage.getItem('ProductDetails') || []

                const parse_cart    = JSON.parse(existingCart ? existingCart : '')
                const parse_product = JSON.parse(productDetails ? productDetails : '')

                const updatedCart = parse_cart.map((item)=> 
                    Number(item.product_id) === product ? {...item, quantity: newQuantity} : item
                )

                const filteredCart = updatedCart.filter((item) => item.quantity > 0);

                const updatedProductDetails = parse_product.map((item) => 
                    Number(item.id) === product ? {...item, quantity: newQuantity} : item
                );

                const filterProduct = updatedProductDetails.filter((item)=> item.quantity > 0)

                localStorage.setItem('cart_items', JSON.stringify(filteredCart));
                localStorage.setItem('ProductDetails', JSON.stringify(filterProduct));

                window.location.reload()
            }

        } catch (error) {
            console.log('error', error);
        }
    };
    

    
    return (
        <>
            <Box sx={{ p: { xs: 1, sm: 3, md: 10 } }}>
                {/* Header Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Famous Business ({totalQuantity})</Typography>
                </Box>

                {/* Address Section */}
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f3f6', p: 2, borderRadius: 1 }}>
                    <Typography><strong>Deliver to:</strong> New Delhi - 110068</Typography>
                    <Button variant="outlined">Change</Button>
                </Box>


                {loading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <Grid container spacing={2}>
                        {/* Product Section */}
                        <Grid size={{ xs: 12, md: 8 }}>

                            {userCartItem.map((item, index) => (

                                <Card sx={{ mb: 2 }} key={index}>
                                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={item?.picture} alt="Product" width={100} height={100} style={{ marginRight: 16 }} />

                                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>

                                            <Typography variant="h6">{item?.name}</Typography>

                                            <Typography color="text.secondary">Gold - Seller: TanviEnterprise</Typography>

                                            <Typography variant="body1">
                                                <span style={{ color: '#867979' }}>₹<del>{item?.discount_price}</del> </span>

                                                <b>₹{item?.price}</b> &nbsp;

                                                <span style={{ color: 'green' }}><b>({item?.percentage_off}% Off)</b></span>
                                            </Typography>

                                            <Typography color="success.main">Free Delivery by Tue Dec 3</Typography>
                                        </Box>
                                    </CardContent>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, ml: 2 }}>
                                        <ButtonGroup variant="contained" aria-label="Basic button group">

                                            {/* <Button onClick={()=> setProductCount(Math.max(productCount-1, 0))}> */}
                                            <Button
                                                onClick={() => {
                                                    handleUpdateProductQuantity(item.id, 'decrement', item.quantity);
                                                }}>
                                                <RemoveIcon fontSize="small" />
                                            </Button>

                                            {/* <Button>{productCount ? productCount[index] : 0}</Button> */}
                                            <Button>{item.quantity}</Button>

                                            {/* <Button onClick={()=> setProductCount(productCount + 1)}> */}
                                            <Button onClick={() => {
                                                handleUpdateProductQuantity(item.id, 'increment', item.quantity);
                                            }}>
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>

                                        <Button onClick={() => handleRemoveCartItem(item.id)}>
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
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ p: 2 }}>
                                <Typography variant="h6" mb={1}>PRICE DETAILS</Typography>
                                <Divider />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <Typography>Price (1 item)</Typography>
                                    {/* <Typography>₹{toalAmount ? toalAmount : 0}</Typography> */}
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                    <Typography>Discount</Typography>
                                    {/* <Typography color="success.main">−₹{discountPrice ? discountPrice : 0}</Typography> */}
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                    <Typography>Delivery Charges</Typography>
                                    <Typography color="success.main">Free</Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">Total Amount</Typography>
                                    <Typography variant="h6">
                                        {/* ₹{(toalAmount && discountPrice) ? (parseFloat(toalAmount).toFixed(2) - parseFloat(discountPrice).toFixed(2)) : 0} */}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => isLoggedin === false ? setLogin(true) : router.push('/checkout')}
                                >
                                    PLACE ORDER
                                </Button>
                            </Card>
                        </Grid>
                    </Grid>
                }

            </Box>

            <LoginForm visible={login} onClose={() => setLogin(false)} />

            {/* <Snackbar
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

        </Snackbar> */}
        </>
    );
};



export default UnAuthenticatedCartItems;