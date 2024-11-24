import { useState, useEffect } from 'react';
import { Box, ImageList, ImageListItem, Paper, Button, useTheme, useMediaQuery, Stack } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';





export default function ImageGallery({Images = []}) {
  const [selectedImage, setSelectedImage] = useState('');
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Update selectedImage when Images change or on initial load
  useEffect(() => {
    if (Images.length > 0) {
      setSelectedImage(Images[0].image); // Set first image as default
    }
  }, [Images]); 




return (
  <Paper sx={{display:'flex', flexDirection:'row', alignItems:'flex-start', padding:5, height:{xs:'420px', sm:'520px'}}} elevation={0}>

      <Box sx={{
            overflowY:'auto', 
            maxHeight:{xs:'330px', sm:'450px'}, 
            width: { xs: '60px', sm:'90px' }, 
            mt: { xs: 1}, 
            mr:2,
            '&::-webkit-scrollbar': {
              display: 'none', 
            },
            scrollbarWidth: 'none', 
          }}
            >
        <ImageList cols={1} gap={8}>
          {Images && 
            Images.map((item, index) => (
            <ImageListItem key={index} onClick={() => handleImageClick(item.image)}>
                <Image
                  src={item.image}
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                  style={{ cursor: 'pointer', borderRadius: '5px' }}
                  width={200}
                  height={200}
                />
            </ImageListItem>
            ))
          }
        </ImageList>
      </Box>

      {/* Large Image View */}
      <Box flex="1" sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
        <Box
          component="img"
          src={selectedImage ? selectedImage : '/store/blank_image.jpeg'}
          alt="Selected"
          sx={{
            maxHeight: {xs:'300px', sm:'400px'},
            objectFit: 'contain',
            borderRadius: '8px',
            alignSelf: 'center',
            height:{xs:'500px', sm:'100%'},
            width:'100%'
          }}
        />

        {/* Buttons for Buy COD and Pay with EMI */}
        <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
            {isXs ? (
            <>
            
            </>
          ) : (
            <>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                >
                  Cart
                </Button>

                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  sx={{ml:2, mr:2}}
                >
                  BUY ON EMI
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<FlashOnIcon />}
                  sx={{ p: { xs: 0, sm: 0, mb:2 } }}
                >
                  BUY NOW
                </Button>
            </>
          )}

        </Box>
      </Box>
    </Paper>

  );
}
