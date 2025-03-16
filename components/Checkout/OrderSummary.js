"use client";


import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';





///// All the available cart items
function OrderSummary({orderLoading, orderData}) {
    
    //// If Loading 
    if (orderLoading) {
        return (
            <Box sx={{ display:'flex', justifyContent:'center' }}>
                <CircularProgress />
            </Box>

        );
    };

    return (
        <Grid container>
            <Grid size={{ xs:12 }}>
                {orderData.map((item, index)=> (
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
                                <Button disableElevation >Quantity - {item.quantity}</Button>
                            </ButtonGroup>
                        </Box>
                    </Card>
                ))}
            </Grid>
        </Grid>
    );
};



export default OrderSummary;