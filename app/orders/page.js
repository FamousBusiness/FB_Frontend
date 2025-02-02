"use client";

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState, useEffect } from 'react';
import axiosInstance from '@/Authentication/axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Player } from "@lottiefiles/react-lottie-player";




///// All Business and Users Order
function AllOrders() {
    const [allBusinessOrders, setBusinessOrders] = useState([]);
    const [mediaURL, setMediaURL] = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 
        null
    );
    const [loading, setLoading] = useState(true);  //// Loading


    //// Get all the available orders of the 
    useEffect(()=> {
        axiosInstance.get(`/api/ecom/v1/all/business/orders`).then((res)=> {
            // console.log(res);
            if (res.status === 200) {
                setBusinessOrders(res.data.all_business_orders);
                setLoading(false)
            }

        }).catch((error)=> {

        })
    }, []);


    //// Convert Date time format
    const formatDate = (datetime)=> {
        const dateObj = new Date(datetime);

        const day   = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year  = dateObj.getFullYear();

        const hours   = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');

        const dateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        return dateTime
    };

    
    
    ///// Clicked on ANy oreder
    const handleClickOnOrder = (item)=> {
        window.location.href =`orders/details/?order_id=${item.id}`
    };
    
    
    //// Loading
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent:'center', mt:20 }}>
                <CircularProgress />
            </Box>
        );
    };

    
    ///// If not data found
    if (allBusinessOrders.length === 0) {
        return (
            <Player
                style={{
                width: "40%",
                marginTop: "-10px ",
                objectFit: "cover",
                padding: 5,
                }}
                src="/NoData/no_data.json"
                loop
                autoplay
            />
        );
    };
    
    
    
    

return (
<>
    {allBusinessOrders.map((item, index)=> {
        return (
            <Paper
                sx={{
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    mt:2,
                    m:2,
                    cursor:'pointer',
                    transition: 'all 0.3s ease', 
                    '&:hover': {
                        borderColor: '#1976d2', 
                        boxShadow: '0px 4px 10px rgba(25, 118, 210, 0.3)',
                        backgroundColor: '#f5f5f5', 
                    },
                }}
                elevation={3}
                key={index}
                onClick={()=> handleClickOnOrder(item)}
            >

            {/* Product Image */}
            <Box
                component="img"
                src={mediaURL ? `${mediaURL}${item?.product?.picture}` : item?.product?.picture}
                alt="Product"
                sx={{ width: 80, height: 80, borderRadius: '4px', marginRight: '16px' }}
            />

                {/* Product Details */}
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid size={{ xs:12, sm:5 }}>
                        <Typography sx={{fontSize:{xs:'14px', sm:'18px'}}}>
                            {item?.product?.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {item?.product?.description}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs:0, sm:3 }} sx={{display: {xs:'none', sm:'flex'}}}>
                        <Typography variant="h6" >
                            ₹{item?.product?.price}
                        </Typography>
                    </Grid>
                
                    <Grid size={{ xs:12, sm:4 }} textAlign={{ xs:'left', sm:'right' }}>
                        <Typography
                            variant="body2"
                            sx={{
                            color: 'green',
                            fontWeight: 'bold',
                            }}
                        >
                            {item?.is_delivered ? "Delivered on Jan 21, 2023" : 
                            (
                                item?.out_of_delivery ? 'Out of Delivery' : 
                                (
                                    item?.is_shipped ? 'Shipped' : 
                                    (
                                        item?.order_placed ? `Order Placed ON ${formatDate(item?.order_placed_at)}`  : ''
                                    )
                                )
                            )}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            
                            {item?.is_delivered ? "Your item has been delivered" : 
                            (
                                item?.out_of_delivery ? 'Out of Delivery' : 
                                (
                                    item?.is_shipped ? 'Shipped' : 
                                    (
                                        item?.order_placed ? `Order Placed`  : ''
                                    )
                                )
                            )}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Rate & Review Button */}
                {/* <Box>
                    <Button
                        startIcon={<StarIcon />}
                        size="small"
                        variant="text"
                        sx={{ color: '#1976d2', fontWeight: 'bold' }}
                    >
                        Rate & Review Product
                    </Button>
                </Box> */}
            </Paper>
        )
    })}
</>

    );
};


export default AllOrders;

