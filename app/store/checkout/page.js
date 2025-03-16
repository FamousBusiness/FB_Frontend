"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Card, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axiosInstance from '@/Authentication/axios';
import CheckOutMobileView from '@/components/Checkout/MobileView';
import { useDataContext } from '../DataContext';
import OrderSummary from '@/components/Checkout/OrderSummary';
import AddressForm from '@/components/Checkout/Address';
import PaymentOption from '@/components/Checkout/PaymentOption';
// import { CheckOutshowRazorpay } from '@/Component/Checkout/RazorPay/payment';






const steps = [
    {
      label: 'DELEVERY ADDRESS',
    },
    {
      label: 'ORDER SUMMARY',
    },
    {
      label: 'PAYMENT OPTION',
    }
];


// const addresses = [
//     {
//       id: 1,
//       name: 'Ranjit Kumar Sahoo',
//       phone: '8249258412',
//       tag: 'HOME',
//       address: 'Amritnagar, Jagamara, Khandagiri, Jagamara near news7 office, Bhubaneswar, Odisha',
//       pincode: '751030',
//     },
//     {
//       id: 2,
//       name: 'Ranjit Kumar Sahoo',
//       phone: '8249258412',
//       tag: 'HOME',
//       address: 'Baliapanda vijay nagar, Puri, Near tourist police station, Puri, Odisha',
//       pincode: '752001',
//     },
// ];



const addressFromData = {
    name: "",
    mobile_number: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternate_number: "",
    address_type: ""
}




function CheckoutPage() {
    const theme           = useTheme();
    const { isLoggedin }  = useDataContext();

    const [activeStep, setActiveStep]              = React.useState(0);
    const [selectedAddress, setSelectedAddress]    = React.useState(0);  //// User Selected Address
    const [addNewAddress, setAddNewAddress]        = React.useState(true);  /// Open add new address
    const [addressFomrData, updateAddressFormData] = React.useState(addressFromData);
    const [addressError, setAdressError]           = React.useState('');
    const [disableButton, setDisableButton]        = React.useState(false); ///// Disable Button for Addess Button
    const [successMessage, setSuccessMessage]      = React.useState('');
    const [userAddressData, setUserAddressData]    = React.useState(''); ///// userAddressData
    const [addressLoading, setAddressLoading]      = React.useState(true);  //// 
    const [Unauthenticated, setUnAuthenticated]    = React.useState(false);
    const [orderData, SetOrderData]                = useState([]);  //// Order Summary Step Data
    const [orderLoading, setorderLoading]          = React.useState(true);
    const [totalAmount, setTotalAmount]            = useState(0);  //// Total Order Amount
    const [discountPrice, setDiscountPrice ]       = useState(0);  //// Discount Price
    const [paymentOption, setPaymentOption]        = useState(''); //// Payment Option
    const [disablePayButton, setDisablePayButton]  = useState(false);
    const [successURL, setSuccessURL]                   = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://localhost:3000' : 'https://store.famousbusiness.in');
    
    const maxSteps = steps.length;
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    
    const handleSelect = (id) => {
        setSelectedAddress(id);
    };
    
   
    ///// Razorpay Payment
    const handleClickPayment = ()=> {
        setDisablePayButton(true);
        const purchasedAmount = totalAmount 
            ? parseFloat(totalAmount) - (discountPrice ? parseFloat(discountPrice) : 0)
            : 0;

        const products = orderData.map((item)=> {
            return {
                'product_id': item.product,
                'quantity': item.quantity
            }
        })

        if (paymentOption === 'cod') {
            //// Raise payment Request
            axiosInstance.post(`/api/ecom/v1/ecom/cod/order/`, {
                amount: purchasedAmount,
                products: products,
                address_id: selectedAddress
    
            }).then((res)=> {
                // console.log(res);
    
                if (res.status === 201) {
                    window.location.href = `${successURL}/payment/success`
                    setDisablePayButton(false)
                }
            }).catch((error)=> {
                setDisablePayButton(false);
                
            })

        } else if (paymentOption === 'prepaid') {
            //// Raise payment Request
            axiosInstance.post(`/api/ecom/v1/razorpay/payment`, {
                amount: purchasedAmount,
                products: products,
                address_id: selectedAddress
    
            }).then((res)=> {
                // console.log(res);
    
                if (res.status === 200) {
                    const redirect_url = res.data.url
                    setDisablePayButton(false)
    
                    if (redirect_url) {
                        window.location.href = redirect_url
    
                    } else {
                        console.log('Url not found')
                    }
                }
            }).catch((error)=> {
                setDisablePayButton(false);

            })
        }
        // CheckOutshowRazorpay(totalAmount, 'Famous Business', 'api/ecom/v1/razorpay/payment', 'api/ecom/v1/razorpay/payment', products, selectedAddress);
    };
    
    
    ///// Open Add address 
    const handleSetAddress = ()=> {
        setAddNewAddress(!addNewAddress);
    };


    //// Deliver Here
    const handleClickDeliverHere = ()=> {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    
    //// Get all the carts item from local storage
    //// And Transfer into DB then remove from localStorage
    // React.useEffect(()=> {
    //     if (isLoggedin === true) {
    //         if (typeof window !== 'undefined'){
    //             const  storage_cart = localStorage.getItem('cart_items');

    //             if (storage_cart) {
    //                 const cartItems = JSON.parse(storage_cart);

    //                 const product_ids = cartItems.map(item => item.product_id)
    //                 const quantity    = cartItems.map(item => item.quantity)

    //                 axiosInstance.post(`/api/ecom/v1/update/cart/`, {
    //                     product: product_ids,
    //                     quantity: quantity

    //                 }).then((res)=> {
    //                     // console.log(res)
    //                     if (res.status === 200) {
    //                        localStorage.removeItem('cart_items')
    //                     }
    //                 })
    //             }
    //         }
    //     }
    // }, [isLoggedin]);

    
    ////// Get Address form data
    const handleChangeAddress = (e)=> {
        const { name, value } = e.target;

        if (name === 'name' && value.length > 50) {
            setAdressError('Too many characters in Name');

        } else if (name === 'mobile_number' && value.length > 10) {
            setAdressError('Mobile number must contain 10 digit number');

        } else if (name === 'pincode' && value.length > 8) {
            setAdressError('Invalid Pincode');

        } else if (name === 'locality' && value.length > 50) {
            setAdressError('Too many characters in Locality')

        } else if (name === 'address' && value.length > 150) {
            setAdressError('Too many characters in Address');

        } else if (name === 'city' && value.length > 30) {
            setAdressError('Invalid City');

        } else if (name === 'landmark' && value.length > 40) {
            setAdressError('Too many characters in Landmark');

        } else if (name === 'alternate_number' && value.length > 10) {
            setAdressError('Mobile number must contain 10 digit number');

        } else {
            setAdressError('');

            updateAddressFormData({...addressFomrData, 
                [name]: value
            })
        }
    };

    
    ////// Create New Address
    const handleSubmitAddressFormData = ()=> {
        if (addressFomrData.name.length > 50) {
            setAdressError('Too many characters in Name');

        } else if (addressFomrData.mobile_number.length > 10) {
            setAdressError('Mobile number must contain 10 digit number');

        } else if (addressFomrData.pincode.length > 8) {
            setAdressError('Invalid Pincode');

        } else if (addressFomrData.locality.length > 50) {
            setAdressError('Too many characters in Locality')

        } else if (addressFomrData.address.length > 150) {
            setAdressError('Too many characters in Address');

        } else if (addressFomrData.city.length > 30) {
            setAdressError('Invalid City');

        } else if (addressFomrData.landmark.length > 40) {
            setAdressError('Too many characters in Landmark');

        } else if (addressFomrData.alternate_number.length > 10) {
            setAdressError('Mobile number must contain 10 digit number');

        } else if (!addressFomrData.address_type) {
            setAdressError('Please select address type');

        } else {
            setAdressError('')
            setDisableButton(true)

            axiosInstance.post(`/api/ecom/v1/delivery/address/`, {
                name: addressFomrData.name,
                mobile_number: addressFomrData.mobile_number,
                pincode: addressFomrData.pincode,
                locality: addressFomrData.locality,
                address: addressFomrData.address,
                city: addressFomrData.city,
                state: addressFomrData.state,
                address_tye: addressFomrData.address_type,
                alternate_number: addressFomrData.alternate_number,
                landmark: addressFomrData.landmark

            }).then((res)=> {
                // console.log(res);
                setDisableButton(false)

                if (res.status === 200) {
                    setSuccessMessage('Address Created Successfully');
                }

            }).catch((error)=> {
                // console.log(error);
                setDisableButton(false)

            })
        }
    };

    
    ////// Fetch all the user Address
    React.useEffect(()=> {
        axiosInstance.get(`/api/ecom/v1/delivery/address/`).then((res)=> {
            // console.log(res);
            if (res.status === 200) {
                setUserAddressData(res.data.results);
                setAddressLoading(false);
            }
        }).catch((error)=> {
            // console.log(error);
            setAddressLoading(false);

            if (error.response.status === 401) {
                setUnAuthenticated(true);
            }
        });
    }, []);

    
    ///// Clicked on Cancel Button of Address
    const handleAddressCancelClicked = ()=> {
        setAddNewAddress(!addNewAddress);
    };


    //// Fetch all the Order Summary Data
    useEffect(()=> {
            axiosInstance.get(`/api/ecom/v1/checkout/`).then((res)=> {
                // console.log(res);
                if (res.status === 200) {
                    SetOrderData(res.data.data);
                    setorderLoading(false);
                    setTotalAmount(res.data.totalAmount)
                }
                
            }).catch((error)=> {
                // console.log(error);
                setorderLoading(false)
            })
    }, []);


    ////// Calculate Total Amount and Discount of the Order
    useEffect(()=> {

        if (orderData.length > 0) {
            // const Amount = orderData.reduce((acc, item)=> acc + (Number(item?.product_details?.price) * Number(item?.quantity)) || 0, 0);

            const discount = orderData.reduce(
                (accumulator, item)=> accumulator + (Number(item?.product_details?.discount_price) * Number(item?.quantity)) || 0,
                0 );

            setDiscountPrice(discount);
            // setTotalAmount(Amount);
        }
    }, [orderData]);
    

    ///// Not Authenticated
    if (Unauthenticated) {
        return (
            <p>Not Accessible</p>
        )
    };


return (
    <Grid container spacing={1}>
        <Grid size={{ xs:0, sm:12, md:9 }} sx={{ display: { xs: 'none', sm:'block'}}}>
            <Box sx={{  flexGrow: 1, p:3 }}>
                <Typography 
                    variant="h6" 
                    color="primary" 
                    gutterBottom 
                    sx={{ 
                        backgroundColor:'#4974a5', 
                        color:'white', 
                        p:1.8,
                        borderRadius:'10px',
                        fontSize:'1.3rem'
                        }}>
                    {steps[activeStep].label}
                </Typography>

                {/* <Box sx={{ height: 255, width: '100%', p: 2 }}>
                    {steps[activeStep].description}
                </Box> */}

            {/* Address Step */}
            {steps[activeStep].label === 'DELEVERY ADDRESS' && 
                <>
                    <AddressForm 
                        addressLoading={addressLoading}
                        userAddressData={userAddressData}
                        selectedAddress={selectedAddress}
                        handleSetAddress={handleSetAddress}
                        addNewAddress={addNewAddress}
                        handleChangeAddress={handleChangeAddress}
                        addressFomrData={addressFomrData}
                        handleSubmitAddressFormData={handleSubmitAddressFormData}
                        disableButton={disableButton}
                        handleAddressCancelClicked={handleAddressCancelClicked}
                        addressError={addressError}
                        successMessage={successMessage}
                        handleSelect={handleSelect}
                        handleClickDeliverHere={handleClickDeliverHere}
                    />
            </>
            }
            
            
            {/* Order Summary Step */}
            {steps[activeStep].label === 'ORDER SUMMARY' &&
               <OrderSummary 
                    orderData={orderData}
                    orderLoading={orderLoading}
               />
            }
            
            {steps[activeStep].label === 'PAYMENT OPTION' &&
               <PaymentOption 
                    setPaymentOption={setPaymentOption}
               />
            }
                
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        activeStep === maxSteps - 1 ? (
                            <Button size="small" onClick={handleClickPayment}>
                                Proceed To Pay
                            </Button>

                        ) : (
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                                >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        )
                }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </Grid>


        {/* Mobile View */}
        <Grid size={{ xs: 12 }} sx={{display: {xs:'block', sm:'none'}}}>
            <CheckOutMobileView 
               addressLoading={addressLoading}
               userAddressData={userAddressData}
               selectedAddress={selectedAddress}
               handleSetAddress={handleSetAddress}
               addNewAddress={addNewAddress}
               handleChangeAddress={handleChangeAddress}
               addressFomrData={addressFomrData}
               handleSubmitAddressFormData={handleSubmitAddressFormData}
               disableButton={disableButton}
               handleAddressCancelClicked={handleAddressCancelClicked}
               addressError={addressError}
               successMessage={successMessage}
               handleSelect={handleSelect}
               handleClickDeliverHere={handleClickDeliverHere}

               ///// Order Summary Data
               orderData={orderData}
               orderLoading={orderLoading}

               ///// Payment option
               setPaymentOption={setPaymentOption}
               paymentOption={paymentOption}
               totalAmount={totalAmount}
               discountPrice={discountPrice}
            />
        </Grid>

        {/* Price Section */}
        <Grid size={{ xs:12, sm:12, md:3 }}>
            <Card sx={{ p: 2, marginTop:3 }}>
                <Typography variant="h6" mb={1}>PRICE DETAILS</Typography>
                <Divider />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography>Price (1 item)</Typography>
                    <Typography>₹{totalAmount}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>Discount</Typography>
                    <Typography color="success.main">−₹{discountPrice}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>Delivery Charges</Typography>
                    <Typography color="success.main">Free</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Amount Payble</Typography>

                    <Typography variant="h6">
                        ₹{totalAmount  ? (parseFloat(totalAmount).toFixed(2) - (discountPrice ? parseFloat(discountPrice).toFixed(2) : 0)): 0}
                    </Typography>
                </Box>

                {/* <Button variant="contained" color="warning" fullWidth>PLACE ORDER</Button> */}
            </Card>
        </Grid>

    </Grid>


    );
};



export default CheckoutPage;


