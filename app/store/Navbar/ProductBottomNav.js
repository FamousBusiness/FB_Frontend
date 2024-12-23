import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import { useTheme, useMediaQuery  } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import { useEffect, useState } from 'react';




//// Mobile view of Product Bottom Navbar
export default function BottomProductNav(productData=[]) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [addedToCart, setAddedToCart]     = useState(false);
    const [productDetail, setProductDetail] = useState(0);
    const [productID, setProductID]         = useState(0);
    const [storageProduct, setStorageProduct] = useState(() => {
        // Initialize state with data from localStorage
        if (typeof window !== 'undefined') {
          const storedProducts = localStorage.getItem('cart_products');
          return storedProducts ? JSON.parse(storedProducts) : [];
        }
        return [];
    });  



    /// Set product id if productdata is availabel
    useEffect(()=> {
        if (productData.length > 0) {  
            setProductID(productData[0].id);
        }
    }, [productData]);

    

    ///// Clicked on Add to cart buttons
    const handleClickCart = ()=> {
        setAddedToCart(true);
        setProductDetail(productData);
        const newProduct = { id: productID };
        const isExistingProduct = storageProduct.some((product) => product.id === productID);

        if (!isExistingProduct) {
        setStorageProduct((prev) => [...prev, newProduct]); // Add the new product to the existing array
        } else {
        // console.log('Product is already in the cart');
        }
    };


    ///// Store the cart product in Local storage
    useEffect(()=> {
        if (storageProduct) {
            if (typeof window !== 'undefined' && storageProduct.length > 0) {
                localStorage.setItem('cart_products', JSON.stringify(storageProduct))
        }}
    }, [storageProduct]);


return (
        isSmallScreen && (
        <ButtonGroup
            buttonFlex={1}
            aria-label="flex button group"
            spacing='0.2rem'
            sx={{
                position:'fixed',
                bottom:0,
                left:0,
                right:0,
                boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
                zIndex: 1200, 
                display: 'flex',
                justifyContent: 'center', 
                p: 2,
                width: '100%',
                maxWidth: '100%',
                overflow: 'auto',
                resize: 'horizontal',
                backgroundColor:'#ffff'
            }}
        >

            {addedToCart ? (
                <IconButton sx={{p:1}}>
                    <Badge badgeContent={1} color="primary">
                        <AddShoppingCartIcon sx={{fontSize:'40px'}}/>
                    </Badge>
                </IconButton>

            ) : (
                <IconButton sx={{p:1}} onClick={handleClickCart}>
                    <AddShoppingCartIcon sx={{fontSize:'40px'}}/>
                </IconButton>
            )}
            

            <Button>
                Pay with EMI <br/>
                From 2,000/m
            </Button>

            <Button sx={{backgroundColor:'black', color:'white'}}>
                Buy Now
            </Button>

    </ButtonGroup>

    ));
};