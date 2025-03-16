"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from "next/navigation";
import { useAuth } from "@/Authentication/auth";
import { Button } from "@mui/joy";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDataContext } from "@/app/store/DataContext";
import { useState, useEffect } from "react";
import axiosInstance from "@/Authentication/axios";
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LoginForm from "../LoginForm/LoginForm";




const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));




const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));




const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
        width: "20ch",
        },
    },
}));






//////// Store Top Navbar ///////////
export default function StoreTopNavbar() {
    const router                          = useRouter();
    const { logoutUser, isAuthenticated } = useAuth();
    const { isLoggedin }                  = useDataContext();

    const [anchorEl, setAnchorEl]         = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [login, setLogin]               = React.useState(false);
    const isMenuOpen                      = Boolean(anchorEl);
    const isMobileMenuOpen                = Boolean(mobileMoreAnchorEl);
    const [walletURL, setWalletURL]       = useState(
        process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://localhost:5173' : 'https://wallet.famousbusiness.in'
    );
    const [openLoginForm, setOpenLoginForm] = useState(false);   //// Open login Form

    
    ///// Profile Menu
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

     
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    
    ///// Redirect to Wallet method
    const handleRedirectWallet = ()=> {
        let accessToken = '';

        if (typeof window !== 'undefined') {
            accessToken = localStorage.getItem('accessToken');

            window.location.href = `${walletURL}/?token=${accessToken}`;
        }
    };


    ///// Check user is Logged In or not
    React.useEffect(()=> {
        const checkAuth = async () => {
            try {
                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('accessToken');

                    if (token) {
                        const auth = await isAuthenticated(token);
                        setLogin(true);
                    } else {
                        setLogin(false);
                    }
                }
            } catch (error) {
                // console.error('Error checking authentication:', error);
                setLogin(false);
            }
        };
    
        checkAuth();
    }, [isAuthenticated]);
    

    //// Fetch all the Cart quantity
    useEffect(()=> {
        ///// For Logged in user
        if (isLoggedin) {
            axiosInstance.get(`/api/ecom/v1/total/cart/quantity`).then((res)=> {
                // console.log(res.data.quantity);
                if (res.status === 200) {
                    setCartQuantity(res.data.quantity)
                }

            }).catch((error)=> {
                console.log(error);
            })
    
        } else {
            //// For Unauthenticated user
            try {
                if (typeof window !== 'undefined') {
                    const storedProducts = localStorage.getItem('cart_items') || '[]';

                    const cartItems = JSON.parse(storedProducts ? storedProducts : '') || [];

                    const sumQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

                    setCartQuantity(sumQuantity)
                }

            } catch (error) {
                console.log('error', error);
            }
        }  
    }, [isLoggedin]);

    

    ///// Close menu and Logout the user as well
    const handleMenuClose = async (operation) => {
        setAnchorEl(null);
        handleMobileMenuClose();

        if (operation === 'logout') {
           await logoutUser();

        } else if (operation === 'orders') {
            router.push('/orders')
        }
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";


    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            {login && 
               <MenuItem onClick={()=> handleMenuClose('logout')}>Logout</MenuItem>
            }
            <MenuItem onClick={()=> handleMenuClose('orders')}>My Orders</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";

    //// Mobile View
    const renderMobileMenu = (
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        >
            {!login && 
                <MenuItem>
                    <IconButton size="large" aria-label="login" color="inherit" onClick={()=> setOpenLoginForm(true)}>
                        <LockOpenIcon />
                    </IconButton>
                        <p>Login</p>
                </MenuItem>
            }

            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <AccountBalanceWalletIcon />
                </IconButton>
                    <p>My Wallet</p>
            </MenuItem>

            <MenuItem>
                <IconButton 
                    size="large" 
                    aria-label="show 4 new mails" 
                    color="inherit"
                    onClick={()=> router.push('/orders')}
                    >
                    <ShoppingBagIcon />
                </IconButton>
                    <p>My Orders</p>
            </MenuItem>

            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={()=> router.push('/cart')}
                    >
                    <Badge badgeContent={cartQuantity ? cartQuantity : 0} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>

            {login && 
                <MenuItem onClick={()=> handleMenuClose('logout')}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <LogoutIcon />
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            }
            
        </Menu>
    );
// Mobile View End

    
    return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: "none", sm: "block" } }}
                        >
                        <a href="/"><b>Famous Business</b></a>
                    </Typography>
                    
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>

                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: "none", md: "flex" } }}> 

                            {!login && 
                                <Button variant="solid" sx={{color:'white'}} onClick={()=> setOpenLoginForm(true)}>
                                    Login
                                </Button>
                            }

                            <Tooltip title="Wallet"> 
                                <IconButton
                                    size="large"
                                    aria-label="show 4 new mails"
                                    color="inherit"
                                    onClick={handleRedirectWallet}
                                >
                                    <AccountBalanceWalletIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Cart">
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    onClick={()=> router.push('/cart')}
                                >
                                    <Badge badgeContent={cartQuantity ? cartQuantity : 0} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Profile">
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>


        {/* Login Form */}
        {openLoginForm && 
             <LoginForm 
                visible={openLoginForm}
                onClose={()=> setOpenLoginForm(false)}
             />
        }
      
    </>
  );
}
