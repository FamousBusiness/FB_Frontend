"use client";

import React from 'react';
import { Box, Typography, Button, Divider, Rating, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Grid from '@mui/material/Grid2';
import { useState, useEffect } from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ForumIcon from '@mui/icons-material/Forum';
import Paper from '@mui/material/Paper';
import DescriptionIcon from '@mui/icons-material/Description';
import Image from 'next/image';
import axiosInstance from '@/Authentication/axios';
import { Progress } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import UpdateOrderStatus from './UpdateOrderStatus';
import BorderLinearProgress from './LinearProgressBar';




const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
}




function OrderDetails() {
    const [progressBar, setProgressbar] = useState(0);
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');
    const [isRefunded, setIsRefunded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openOrderStatus, setOpenOrderStatus] = useState(false);

    const search_params = new URLSearchParams(window.location.search);
    const order_id = search_params.get('order_id') || '';



    //// Fetch order Detail of the order ID
    useEffect(() => {
        const search_param = new URLSearchParams(window.location.search);
        const order_ID = search_param.get('order_id') || '';

        if (order_ID) {
            axiosInstance.get(`/api/ecom/v1/order/detail/?order_id=${order_ID}`).then((res) => {
                // console.log(res);

                if (res.status === 200) {
                    setOrderDetail(res.data.order_detail);
                    setLoading(false);
                }
            }).catch((error) => {
                // console.log(error);

                if (error.response.status === 404) {
                    setLoading(false);
                    setOrderDetail([]);

                } else if (error.response.data.message === 'Unable to get user order') {
                    setLoading(false)
                    setOrderDetail([])
                } else {
                    setLoading(false)
                    setOrderDetail([])
                }

            })
        }

    }, []);


    ///// Set Progress Bar
    useEffect(() => {
        if (orderDetail) {
            setOrderStatus(orderDetail.status)
        }
    }, [orderDetail]);


    //// Set Progressbar According to Order Status
    useEffect(() => {
        if (orderStatus) {
            if (orderStatus === 'Order Placed') {
                setProgressbar(2);

            } else if (orderStatus === 'Order Confirmed') {
                setProgressbar(25);

            } else if (orderStatus === 'Shipped') {
                setProgressbar(48);

            } else if (orderStatus === 'Out of Delivery') {
                setProgressbar(70);

            } else if (orderStatus === 'Delivered') {
                setProgressbar(100);

            } else if (orderStatus === 'Refund Initiated') {
                setProgressbar(20);
                setIsRefunded(true)

            } else if (orderStatus === 'Refunded') {
                setProgressbar(100);
                setIsRefunded(true);

            } else {
                setProgressbar(0)
            }
        }
    }, [orderStatus]);



    //// Loading
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '30vh' }}>
                <CircularProgress />
            </Box>
        )
    };


    ///// Order ID not found
    if (!order_id) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}>
                <p>Not able to get order Detail</p>
            </Box>
        );
    };



    return (
        <>
            <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', display: { xs: 'none', sm: 'block' } }}>
                {/* Delivery and Actions */}
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                    {/* Delivery Address */}
                    <Grid size={{ xs: 12, sm: 8 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Delivery Address
                        </Typography>

                        <Typography variant="body1">{orderDetail?.user?.name}</Typography>

                        <Typography variant="body2" color="text.secondary">
                            {/* Banjara hills road no.10, near masjid A.K tower, room no.204 Banjara
                            hills road no.10, Resham bagh, Near tawakal tower HYDERABAD - 500034,
                            Telangana */}
                            {orderDetail?.address?.address}, {orderDetail.address?.locality}, {orderDetail?.address?.landmark}, {orderDetail?.address?.city} - {orderDetail?.address?.pincode}, {orderDetail?.address?.state}
                        </Typography>

                        <Typography variant="body2" fontWeight="bold" sx={{ marginTop: 1 }}>
                            Phone number
                        </Typography>

                        <Typography variant="body2">
                            {orderDetail?.address?.mobile_number}, {orderDetail?.address?.alternate_number}
                        </Typography>
                    </Grid>

                    {/* More Actions */}
                    <Grid size={{ xs: 12, sm: 4 }} textAlign={{ xs: 'left', sm: 'right' }}>
                        <Typography variant="h6" fontWeight="bold">
                            More actions
                        </Typography>

                        <Button
                            variant="outlined"
                            startIcon={<FileDownloadIcon />}
                            sx={{ marginTop: 1 }}
                        >
                            Download Invoice
                        </Button>
                    </Grid>
                </Grid>

                <Divider sx={{ marginBottom: 2 }} />

                {/* Product and Order Details */}
                <Box
                    sx={{
                        padding: 2,
                        borderRadius: 2,
                        backgroundColor: '#fff',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        position: 'relative'
                    }}
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                        onClick={() => setOpenOrderStatus(true)}
                    >
                        <EditIcon color='primary' />
                    </IconButton>


                    <Grid container spacing={2}>
                        {/* Product Image */}

                        {/* Product Details */}
                        <Grid size={{ xs: 12, sm: 7 }}>
                            <Typography variant="body1" fontWeight="bold">
                                {orderDetail?.product?.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {orderDetail?.product?.description}
                            </Typography>

                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                sx={{ marginTop: 1 }}
                            >
                                ₹{orderDetail?.product?.price} &nbsp;{' '}
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="green"
                                    fontWeight="bold"
                                >
                                    4 Offers Applied
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>


                    {/* Order Progress */}
                    <Box sx={{ marginTop: 3 }}>
                        <Grid container alignItems="center">
                            <Grid size={{ xs: 2 }} textAlign="center">
                                <p>Image</p>
                            </Grid>

                            {!isRefunded &&
                                <>
                                    <Grid size={{ xs: 2 }} textAlign="center">
                                        <Typography variant="body2" fontWeight="bold" color={orderDetail?.order_placed ? 'green' : 'blue'}>
                                            Order Placed
                                        </Typography>
                                        <Typography variant="caption">{formatDate(orderDetail?.order_placed_at)}</Typography>
                                    </Grid>

                                    <Grid size={{ xs: 2 }} textAlign="center">
                                        <Typography variant="body2" fontWeight="bold" color={orderDetail?.order_confirmed ? 'green' : 'blue'}>
                                            Order Confirmed
                                        </Typography>
                                        <Typography variant="caption">{formatDate(orderDetail?.order_confirmed_at)}</Typography>
                                    </Grid>

                                    <Grid size={{ xs: 2 }} textAlign="center">
                                        <Typography variant="body2" fontWeight="bold" color={orderDetail?.is_shipped ? 'green' : 'blue'}>
                                            Shipped
                                        </Typography>
                                        <Typography variant="caption">{formatDate(orderDetail?.shipped_at)}</Typography>
                                    </Grid>

                                    <Grid size={{ xs: 2 }} textAlign="center">
                                        <Typography variant="body2" fontWeight="bold" color={orderDetail?.out_of_delivery ? 'green' : 'blue'}>
                                            Out for delivery
                                        </Typography>
                                        <Typography variant="caption">{formatDate(orderDetail?.out_of_delivery_at)}</Typography>
                                    </Grid>

                                    <Grid size={{ xs: 2 }} textAlign="center">
                                        <Typography variant="body2" fontWeight="bold" color={orderDetail?.is_delivered ? 'green' : 'blue'}>
                                            Delivered
                                        </Typography>

                                        <Typography variant="caption">{formatDate(orderDetail?.delivered_at)}</Typography>
                                    </Grid>
                                </>
                            }

                            {isRefunded &&
                                <>
                                    <Grid size={{ xs: 5 }} textAlign="center">
                                        <Typography variant="body2" fontWeight="bold" color="green">
                                            Refund Initiated
                                        </Typography>
                                        <Typography variant="caption">Fri, 20th Jan</Typography>
                                    </Grid>

                                    <Grid size={{ xs: 5 }} textAlign="center">
                                        <Typography variant="body2" fontWeight="bold" color="green">
                                            Refunded
                                        </Typography>
                                        <Typography variant="caption">Fri, 20th Jan</Typography>
                                    </Grid>
                                </>
                            }

                            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                                <Grid container alignItems='center'>
                                    <Grid size={{ xs: 3 }} />

                                    <Grid size={{ xs: 9 }}>
                                        <BorderLinearProgress variant="determinate" value={50} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {orderDetail.is_delivered &&
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant="body2" textAlign="center" sx={{ marginTop: 1, color: 'green' }}>
                                    Your item has been delivered
                                </Typography>
                            </Box>
                        }

                    </Box>
                </Box>
            </Box>



            {/* Mobile View for Order Detail */}
            <Box
                sx={{
                    p: 2,
                    boxShadow: 1,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    position: 'relative',
                    margin: "0 auto",
                    display: { xs: 'block', sm: 'none' }
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                    onClick={() => setOpenOrderStatus(true)}
                >
                    <EditIcon color='primary' />
                </IconButton>


                {/* Order ID */}
                <Typography variant="caption" color="textSecondary">
                    Order ID - {orderDetail?.order_id}
                </Typography>

                {/* Product Details */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {/* Product Image */}
                    <Grid size={{ xs: 4 }}>
                        <Image
                            src={orderDetail?.product?.picture}
                            alt="Product"
                            style={{ width: "100%", borderRadius: 4 }}
                            width={100}
                            height={100}
                        />
                    </Grid>

                    {/* Product Information */}
                    <Grid size={{ xs: 8 }}>
                        <Typography variant="body1" fontWeight="bold">
                            {orderDetail?.product?.name}
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                            {orderDetail?.product?.description}
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                            Buyer - {orderDetail?.user?.name}
                        </Typography>

                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                            ₹{orderDetail?.product?.price}{" "}
                            <Typography
                                variant="caption"
                                component="span"
                                color="green"
                                fontWeight="bold"
                            >
                                4 offers
                            </Typography>

                        </Typography>
                    </Grid>
                </Grid>

                {/* Status Section */}
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={1}>

                        {orderDetail?.order_placed &&
                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <CheckCircleIcon fontSize="small" color="success" />

                                <Typography variant="body2" fontWeight="bold" color="green" sx={{ ml: 1 }}>
                                    Order Placed, {formatDate(orderDetail?.order_placed_at)}
                                </Typography>
                            </Grid>
                        }

                        {orderDetail?.is_shipped &&
                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <CheckCircleIcon fontSize="small" color="success" />

                                <Typography variant="body2" fontWeight="bold" color="green">
                                    Order Confirmed, {formatDate(orderDetail?.shipped_at)}
                                </Typography>
                            </Grid>
                        }

                        {orderDetail?.out_of_delivery &&
                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <CheckCircleIcon fontSize="small" color="success" />

                                <Typography variant="body2" fontWeight="bold" color="green">
                                    Out of Delivery, {formatDate(orderDetail?.out_of_delivery_at)}
                                </Typography>
                            </Grid>
                        }

                        {orderDetail?.is_delivered &&
                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <CheckCircleIcon fontSize="small" color="success" />

                                <Typography variant="body2" fontWeight="bold" color="green">
                                    Delivered ON, {formatDate(orderDetail?.delivered_at)}
                                </Typography>
                            </Grid>
                        }

                    </Grid>

                    <Button size="small" sx={{ mt: 1 }} variant="text">
                        See All Updates
                    </Button>
                </Box>

                {/* Rating Section */}
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                    <Rating value={4} readOnly size="small" />
                    <Button
                        size="small"
                        variant="text"
                        sx={{ ml: 2 }}
                    >
                        Add Review
                    </Button>
                </Box>

                {/* Chat and Invoice Section */}
                <Paper sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} elevation={3}>
                    <Button startIcon={<ForumIcon />}>
                        Chat With Us
                    </Button>
                </Paper>

                <Paper elevation={3} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Button
                        size="small"
                        fullWidth
                        startIcon={<DescriptionIcon />}
                    >
                        Download Invoice
                    </Button>
                </Paper>

                <Paper elevation={3} sx={{ p: 2, mt: 2, gap: 2 }}>
                    <Typography variant='h6'>{orderDetail?.user?.name}</Typography>

                    <Typography variant='p'>
                        {orderDetail?.address?.address}, {orderDetail.address?.locality}, {orderDetail?.address?.landmark}, {orderDetail?.address?.city} - {orderDetail?.address?.pincode}, {orderDetail?.address?.state}
                    </Typography><br />

                    <Typography variant='p' sx={{ mt: 2 }}>
                        Phone Number - {orderDetail?.address?.mobile_number}, {orderDetail?.address?.alternate_number}
                    </Typography>
                </Paper>

                <Paper elevation={3} sx={{ mt: 2, p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>List Price</Typography>
                        <Typography>₹{orderDetail?.product?.price}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Selling Price</Typography>
                        <Typography>₹{orderDetail?.product?.discount_price}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Delivery Charge</Typography>
                        <Typography>₹0</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Total Amount</Typography>
                        <Typography>
                            ₹{parseFloat(orderDetail?.product?.price) - parseFloat(orderDetail?.product?.discount_price)}
                        </Typography>
                    </Box>
                </Paper>

            </Box>

            <UpdateOrderStatus
                open={openOrderStatus}
                setOpen={setOpenOrderStatus}
                order_id={orderDetail?.id}
            />
        </>
    );
};



export default OrderDetails;

