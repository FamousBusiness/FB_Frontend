import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  Stack,
  Divider,
  InputAdornment,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';



export default function ProductDetails() {
    const [pincode, setPincode] = useState('');

    const handlePincodeChange = (e) => setPincode(e.target.value);

  return (
    <Box sx={{ padding: 2, height:{} }}>
 
        <Typography variant="h6">
            Noise Icon 4 with Stunning 1.96&apos;&apos; AMOLED Display, Metallic Finish, BT Calling Smartwatch  (Jet Black Strap, Regular)
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
            <Chip label="3.9 ★" color="success" size="small" />
            <Typography variant="body2" color="textSecondary">
                1,665 Ratings & 185 Reviews
            </Typography>
        </Stack>
   
        <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>₹331/month</Typography>

        <Typography variant="body2" color="textSecondary">
            36 months EMI Plan with BOBCARD <Button size="small">Details</Button>
        </Typography>

        <Typography variant="h6" color="green" sx={{ fontWeight: 'bold', mt: 1 }}>
            In stock
        </Typography>


        <Box sx={{ mt: 2 }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>₹9,400</Typography>
            <Typography variant="body2" color="textSecondary">
            <s>₹17,899</s> 47% off
            </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Available offers</Typography>

            <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircleOutlineIcon color="success" />
                <Typography variant="body2">10% off on ICICI Bank Cards</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircleOutlineIcon color="success" />
                <Typography variant="body2">5% Cashback on Axis Bank Cards</Typography>
            </Stack>
            {/* Add more offers here */}
        </Box>

      <Divider sx={{ my: 2 }} />

      {/* Brand and Description */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle2" color="textSecondary">Brand Name:</Typography>
        <Typography variant="body2" color="primary">CP PLUS</Typography>
      </Box>

      <Typography variant="body2" sx={{ mt: 1 }}>
        CAMERA & DVR HAVE 2 YEAR WARRANTY HARD DISK HAVE 1 YEAR POWER SUPPLY HAVE 1 YEAR. 
        <Button size="small">Know More</Button>
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
        <Button variant="contained" color="error">Deliver in 5 hrs</Button>
      </Box>
    </Box>
  );
}
