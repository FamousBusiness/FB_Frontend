import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckoutMobileAdressStep from './MobileAddress';
import CheckoutMobileOrderSummaryStep from './MobileOrderSummary';
import CheckoutMobilePayment from './MobilePayment';
import PaymentOption from './PaymentOption';



const steps = ['Address', 'Order Summary', 'Payment'];




//// Mobile View for Checkout page
function CheckOutMobileView(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [error, setError]     = React.useState('');
    const [disablePayButton, setDisablePayButton] = React.useState(false);


    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;

        if (!props.selectedAddress) {
            setError('Please select address');

        } else {
            setError('');

            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }
    
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    ////// Handle Payment
    const handleClickPayment = ()=> {
        setDisablePayButton(true);

        if (!props.selectedAddress) {
            setError('Please select address')

        } else {

            const purchasedAmount = props.totalAmount 
                ? parseFloat(props.totalAmount) - (props.discountPrice ? parseFloat(props.discountPrice) : 0)
                : 0;
    
            const products = props.orderData.map((item)=> {
                return {
                    'product_id': item.product,
                    'quantity': item.quantity
                }
            })
    
            if (props.paymentOption === 'cod') {
                //// Raise payment Request
                axiosInstance.post(`/api/ecom/v1/ecom/cod/order/`, {
                    amount: purchasedAmount,
                    products: products,
                    address_id: props.selectedAddress
        
                }).then((res)=> {
                    // console.log(res);
        
                    if (res.status === 201) {
                        window.location.href = `${successURL}/payment/success`
                        setDisablePayButton(false)
                    }
                }).catch((error)=> {
                    setDisablePayButton(false);
                    
                })
    
            } else if (props.paymentOption === 'prepaid') {
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
        }
        // CheckOutshowRazorpay(totalAmount, 'Famous Business', 'api/ecom/v1/razorpay/payment', 'api/ecom/v1/razorpay/payment', products, selectedAddress);
    };



    return (
        <Box sx={{ width: '100%', marginTop:3, p:1 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                if (isStepOptional(index)) {
                    labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                    );
                }

                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }

                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>

            {activeStep === steps.length ? (

                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, color:'green' }}>
                         Your Order has been placed successFully
                    </Typography>
                </React.Fragment>

            ) : (
                <React.Fragment>
                    {/* Address Step */}
                    {activeStep === 0 &&
                       <CheckoutMobileAdressStep 
                            addressLoading={props.addressLoading}
                            userAddressData={props.userAddressData}
                            selectedAddress={props.selectedAddress}
                            handleSetAddress={props.handleSetAddress}
                            addNewAddress={props.addNewAddress}
                            handleChangeAddress={props.handleChangeAddress}
                            addressFomrData={props.addressFomrData}
                            handleSubmitAddressFormData={props.handleSubmitAddressFormData}
                            disableButton={props.disableButton}
                            handleAddressCancelClicked={props.handleAddressCancelClicked}
                            addressError={props.addressError}
                            successMessage={props.successMessage}
                            handleSelect={props.handleSelect}
                            handleClickDeliverHere={props.handleClickDeliverHere}
                       />
                    }
                    

                    {/* Order Summary Step */}
                    {activeStep === 1 &&
                       <CheckoutMobileOrderSummaryStep 
                            orderData={props.orderData}
                            orderLoading={props.orderLoading}
                       />
                    }


                    {/* Payment Step */}
                    {activeStep === 2 &&
                       <PaymentOption 
                            setPaymentOption={props.setPaymentOption}
                       />
                    }


                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        >
                            Back
                        </Button>

                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Procced to Pay' : 'Next'}
                        </Button>
                    </Box>

                    {error && 
                       <p style={{display:'flex', justifyContent:'center', color:'red'}}>{error}</p>
                    }
                </React.Fragment>
            )}
        </Box>
    );
};



export default CheckOutMobileView;

