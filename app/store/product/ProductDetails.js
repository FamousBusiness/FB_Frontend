'use client';

import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableRow, TableCell, Typography, Button, TextField,
  Chip, Stack, Divider, InputAdornment, Paper
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';





function ProductDetails({productData}) {
    const [pincode, setPincode] = useState('');
    const handlePincodeChange = (e) => setPincode(e.target.value);


  return (
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
                <Chip label={`${productData?.rating || 1} ★`} color="success" size="small" />
                <Typography variant="body2" color="textSecondary">
                    {item.reviews} Reviews
                </Typography>
            </Stack>
      
            <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>₹{item.emi_amount}/month</Typography>

            <Typography variant="body2" color="textSecondary">
                36 months EMI Plan with BOBCARD <Button size="small">Details</Button>
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
            <Typography variant="subtitle2" color="textSecondary">Brand Name:</Typography>
            <Typography variant="body2" color="primary">CP PLUS</Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',maxWidth: '650px' }}>
            {item.description2} 
          </Typography>
            <Button size="small">Know More</Button>

          {/* Delivery Pincode Check */}
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon color="action" />
                <TextField
                    label="Enter Pincode"
                    variant="outlined"
                    size="small"
                    value={pincode}
                    onChange={handlePincodeChange}
                    slotProps={{
                        input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                Check
                            </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ maxWidth: 200 }}
                />
            <Button variant="contained" color="error">Available</Button>
          </Box>


          <Paper elevation={0} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
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


          <Paper elevation={0} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h6" sx={{ borderBottom: '1px solid #e0e0e0', pb: 1, mb: 2 }}>
              Seller Info
            </Typography>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                General
              </Typography>
              <Table>
                <TableBody>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Sales Package</TableCell>
                    <TableCell sx={{ color: '#555' }}>1 CAMERA</TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </Box>
          </Paper>
    </React.Fragment>
  ))}

  </Box>
  );
};



export default ProductDetails;
