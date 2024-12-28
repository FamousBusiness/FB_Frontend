"use client"

import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/utils/LandingPageModel';




///// Product Checkout page
function Page() {
    const [productCount, setProductCount] = useState(0);
    // const { authTokens } = useAuth();
    const [login, setLogin] = useState(false);
    
    

return (

    <>
        <Box sx={{ p: 10 }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Famous Business (1)</Typography>
            </Box>

            {/* Address Section */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f3f6', p: 2, borderRadius: 1 }}>
                <Typography><strong>Deliver to:</strong> New Delhi - 110068</Typography>
                <Button variant="outlined">Change</Button>
            </Box>

            <Grid container spacing={2}>
            {/* Product Section */}
            <Grid size={{xs:12, md:8 }}>
                <Card sx={{ mb: 2 }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Replace with <Image> in Next.js */}
                        <img src="/trimmer.jpg" alt="Product" width={100} height={100} style={{ marginRight: 16 }} />
                        <Box>
                            <Typography variant="h6">Profiline Metal body retro hair cut trimmer</Typography>
                            <Typography color="text.secondary">Gold - Seller: TanviEnterprise</Typography>
                            <Typography variant="body1"><del>₹1,999</del> ₹399 (80% Off)</Typography>
                            <Typography color="success.main">Free Delivery by Tue Dec 3</Typography>
                        </Box>
                    </CardContent>

                    <Box sx={{display:'flex', justifyContent:'flex-start', mb:2, ml:2}}>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={()=> setProductCount(Math.max(productCount-1, 0))}>
                                <RemoveIcon fontSize="small" />
                            </Button>

                            <Button>{productCount}</Button>

                            <Button onClick={()=> setProductCount(productCount + 1)}>
                                <AddIcon fontSize="small" />
                            </Button>
                        </ButtonGroup>
                        
                        <Button>
                            Remove From Cart
                        </Button>
                    </Box>
                </Card>

                {/* Warranty Section */}
                {/* <Card>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h6">OneAssist Extended Warranty Plan</Typography>
                            <Typography variant="body2">1 Year - 36% Off</Typography>
                            <Typography>₹69 <del>₹109</del></Typography>
                        </Box>
                        <Button variant="contained" color="warning">Add Item</Button>
                    </CardContent>
                </Card> */}
            </Grid>

            {/* Price Details Section */}
            <Grid size={{xs:12, md:4}}>
                <Card sx={{ p: 2 }}>
                <Typography variant="h6" mb={1}>PRICE DETAILS</Typography>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography>Price (1 item)</Typography>
                    <Typography>₹1,999</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>Discount</Typography>
                    <Typography color="success.main">−₹1,600</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>Delivery Charges</Typography>
                    <Typography color="success.main">Free</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Total Amount</Typography>
                    <Typography variant="h6">₹399</Typography>

                </Box>
                    <Button variant="contained" color="warning" fullWidth>PLACE ORDER</Button>
                </Card>
            </Grid>
            </Grid>
        </Box>

        <LoginForm visible={login} onClose={() => setLogin(false)} />
    </>
    );
};



export default Page;