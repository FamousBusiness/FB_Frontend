import { useState, useRef } from 'react';
import { Box, ImageList, ImageListItem, Paper, Button, useTheme, useMediaQuery, IconButton } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const images = [
  '/store/realme_P1.jpg', // Replace with actual image URLs or paths
  '/store/realme_P1.jpg',
  '/store/Vivo_T2_pro.webp',
  '/store/women_shoes.webp',
  '/store/Vivo_T2_pro.webp',
  '/store/kurts_sets.AVIF',
  '/store/heels.webp',
];



export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const imageListRef = useRef(null);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };




return (
  <Paper sx={{display:'flex', flexDirection:'row', alignItems:'flex-start', padding:6, height:{xs:'420px', sm:'600px'}}} elevation={1}>

      <Box sx={{overflowY:'auto', maxHeight:{xs:'330px', sm:'450px'}, width: { xs: '60px', sm:'90px' }, mt: { xs: 1}, mr:2}}>
        <ImageList cols={1} gap={8}>

            {images.map((image, index) => (
            <ImageListItem key={index} onClick={() => handleImageClick(image)}>
                <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
                style={{ cursor: 'pointer', borderRadius: '5px' }}
                />
            </ImageListItem>
            ))}
        </ImageList>
      </Box>

      {/* Large Image View */}
      <Box flex="1" sx={{display:'flex', flexDirection:'column', alignItems:'center', width: '100%', justifyContent:'space-between'}}>
        <Box
          component="img"
          src={selectedImage}
          alt="Selected"
          sx={{
            maxHeight: {xs:'300px', sm:'400px'},
            objectFit: 'contain',
            borderRadius: '8px',
            alignSelf: 'center',
            height:{xs:'400px', sm:'545px'}
          }}
        />

        {/* Buttons for Buy COD and Pay with EMI */}
        <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
          <Button variant="contained" color="primary" fullWidth style={{ marginRight: '5px' }} startIcon={<ShoppingCartIcon />}>
            Cart
          </Button>

          <Button variant="contained" color="warning" fullWidth style={{ marginRight: '8px' }}>
            BUY ON EMI
          </Button>

          <Button 
            variant="outlined" 
            color="primary" 
            fullWidth 
            startIcon={<FlashOnIcon />}
            sx={{p: {xs:0, sm:0, md:1.5}}}
            >
            BUY NOW
          </Button>
        </Box>
      </Box>
  </Paper>

  );
}
