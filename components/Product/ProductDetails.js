'use client';

import React, { useEffect, useState } from 'react';
import {
  Box, Table, TableBody, TableRow, TableCell, Typography, Button, TextField,
  Chip, Stack, Divider, Paper
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axiosInstance from '@/Authentication/axios';
import EMIOffers from './EmiOffers';





function ProductDetails({productData}) {
    const [pincode, setPincode] = useState('');
    const handlePincodeChange = (e) => setPincode(e.target.value);
    const [pincodeError, setPinCodeError] = useState('');
    const [productID, setProductID]       = useState(0);
    const [pinSuccess, setPinSuccess]     = useState('');
    const [openEMIOffer, setEMIOffers]    = useState(false);


    
    ///// Picode Check
    const handleCheckPincode = ()=> {
        if (pincode) {
            axiosInstance.get(`/api/ecom/v1/product/availability/check/?product_id=${productID}&pincode=${pincode}`).then((res)=> {
                // console.log(res);

                if (res.status === 200) {
                    setPinCodeError('');
                    setPinSuccess('Product available')
                }
            }).catch((error)=> {
                // console.log(error);
                if (error.response.status === 404) {
                    setPinSuccess('')
                    setPinCodeError('Currently product is not available in this pincode')
                }

            })

        } else {
            setPinSuccess('')
            setPinCodeError('Please enter pincode')
        }
    };


    ///// Set Product Id when the page loads
    useEffect(()=> {
        if (productData) {
            setProductID(productData ? productData[0]?.id : 0);
        }
    }, [productData]);


  return (

<>
    <Box sx={{ 
      padding:4, 
      maxHeight:'100vh', 
      overflow:'auto',
      '&::-webkit-scrollbar': {
          display: 'none', 
        },
      scrollbarWidth: 'none', 
      }}>

        {productData.map((item, index)=> (
            <React.Fragment key={index}>

                <Typography variant="h6">
                    {item?.description}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip label={`${item?.rating || 1} ★`} color="success" size="small" />
                    <Typography variant="body2" color="textSecondary">
                        {item.reviews} Reviews
                    </Typography>
                </Stack>
        
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>₹{item.emi_amount}/month</Typography>

                <Typography variant="body2" color="textSecondary">
                    {item.emi_offers && item.emi_offers[0] && (
                        <>
                            {item.emi_offers[0]?.name}
                        </>
                    )}
                    <Button size="small" onClick={()=> setEMIOffers(true)}>Details</Button>
                </Typography>

                {item.is_available ?
                    <Typography variant="h6" color="green" sx={{ fontWeight: 'bold', mt: 1 }}>
                        In stock
                    </Typography>
                    :
                    <Typography variant="h6" color="red" sx={{ fontWeight: 'bold', mt: 1 }}>
                        Not In stock
                    </Typography>
                    }

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>₹{item.price}</Typography>
                        <Typography variant="body2" color="textSecondary">
                        <s>₹{item.discount_price}</s> {item.percentage_off}% off
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Available offers</Typography>

                        {item.offers.map((offer, index)=> (
                        <Stack direction="row" spacing={1} alignItems="center" key={index}>
                            <CheckCircleOutlineIcon color="success" />
                            <Typography variant="body2">{offer.name}</Typography>
                        </Stack>
                        ))}
                    </Box>
            
            <Divider sx={{ my: 2 }} />


            {/* Brand and Description */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle2" color="textSecondary">Brand Name: </Typography>
                <Typography variant="body2" color="primary">{item?.brand?.brand_name}</Typography>
            </Box>

            
            <h3 style={{marginTop:25}}>Product Description</h3>

            <Typography variant="body2" sx={{ mt: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',maxWidth: '650px' }}>
                {item?.description2} 
            </Typography>

            
            {/* Delivery Pincode Check */}
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon color="action" />
                    <TextField
                        label="Enter Pincode"
                        variant="outlined"
                        size="small"
                        value={pincode}
                        onChange={handlePincodeChange}
                        sx={{ maxWidth: 150 }}
                    />
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleCheckPincode}
                    >
                        Check
                </Button>
            </Box>
            
            {pincodeError && 
                <small style={{marginLeft:40, color:'red'}}>
                    {pincodeError}
                </small>
            }

            {pinSuccess && 
                <small style={{marginLeft:40, color:'green'}}>
                    {pinSuccess}
                </small>
            }


            {/* Seller Info */}
            <Paper elevation={0} sx={{ padding: 3, margin: 'auto', display:'flex', justifyContent:'flex-start' }}>
                <Typography variant="h6">
                    Seller 
                </Typography>

                <Button size="small" sx={{ml:1}}>Finite Solution</Button>
            </Paper>


            {/* Product Specifications */}
            <Paper elevation={0} sx={{ padding: 3, margin: 'auto' }}>
                <Typography variant="h6" sx={{ borderBottom: '1px solid #e0e0e0', pb: 1, mb: 2 }}>
                    Product Specifications
                </Typography>

                <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        General
                    </Typography>
                    
                    <Table>
                        <TableBody>

                        {item.specification.map((specification, index)=> (
                            <TableRow key={index}>
                                <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>{specification.name}</TableCell>
                                <TableCell sx={{ color: '#555' }}>{specification.value}</TableCell>
                            </TableRow>
                        ))}

                        </TableBody>
                    </Table>
                </Box>
            </Paper>

        </React.Fragment>
    ))}

  </Box>

    <EMIOffers 
       open={openEMIOffer}
       setOpen={setEMIOffers}
       productData={productData}
    />
</>
  );
};



export default ProductDetails;
