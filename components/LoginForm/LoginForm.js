import React from 'react';
import { Button, Form, Row, Col, Divider } from 'antd';
import Modal from '@mui/joy/Modal';
import { ModalClose, ModalDialog } from '@mui/joy';
import { useState, useEffect } from 'react';
import LoginWithOTP from './LoginOTP';
import LoginWithPassword from './LoginPassword';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';






const LoginForm = ({ visible, onClose, onCloseCount, pathname }) => {
    const [startOTPLogin, setStartOTPLogin]           = useState(false);
    const [startPassWordLogin, setStartPasswordLogin] = useState(false);
    const [vanishButton, setVanishButton]             = useState(true);
    const [showBackButton, setShowBackButton]         = useState(false);

    
    ////// Start Login with OTP Process
    const handleStartOTPLogin = ()=> {
        setStartOTPLogin(true);
        setStartPasswordLogin(false);
        setVanishButton(false);
        setShowBackButton(true);
    };

  
    /// Start Login with password 
    const handleStartPasswordLogin = ()=> {
        setStartPasswordLogin(true);
        setVanishButton(false);
        setStartOTPLogin(false);
        setShowBackButton(true);
    };

    
    //////// Back to main page
    const handleBack = ()=> {
        if (startOTPLogin) {
            setShowBackButton(false);
            setStartOTPLogin(false);
            setStartPasswordLogin(false);
            setVanishButton(true);

        } else if (startPassWordLogin) {
            setShowBackButton(false);
            setStartOTPLogin(false);
            setStartPasswordLogin(false);
            setVanishButton(true);
        } 
    };


    return (
        <Modal open={visible} onClose={onClose}>
            <ModalDialog
                size='lg'
                aria-labelledby="nested-modal-title"
                aria-describedby="nested-modal-description"
                sx={(theme) => ({
                    [theme.breakpoints.only('xs')]: {
                        top: 'unset',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 0,
                        transform: 'none',
                        maxWidth: 'unset',
                    },
                })}
            >
                <ModalClose />

              
                <Grid container spacing={2}>
                    <Grid size={{ xs:12 }}>
                        {showBackButton && 
                            <IconButton onClick={()=> handleBack()}>
                                <KeyboardBackspaceIcon />
                            </IconButton>
                        }
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <p style={{
                            fontSize: "1rem",
                            marginLeft: "0.5rem", 
                            fontWeight: "bold",
                        }}>
                            <span style={{ color: "#2563EB" }}>Famous </span>
                            <span style={{ color: "#047857" }}>Business</span>
                        </p>

                        <p style={{
                            marginLeft: "0.5rem",
                            marginTop: "0.5rem",
                            fontSize: "1rem", 
                            fontWeight: 600,
                            color: "#1F2937",
                        }}
                        >Sign In to get The Best Deals & Offers </p>
                    </Grid>

            {vanishButton && 
                <>
                    <Grid size={{ xs: 12}}>
                        <div className=' p-4 sm:p-8'>
                        <Form className="login-form" layout='vertical'>
                            <Form.Item>
                                <Button 
                                    block 
                                    size='large' 
                                    style={{ width: '100%', background: '#3c89d0',color:'white' }} 
                                    className="login-form-button"
                                    onClick={()=> handleStartPasswordLogin()}
                                    >
                                    Login With Password
                                </Button>
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    block size='large' 
                                    style={{ width: '100%', background: '#3c89d0',color:'white' }} 
                                    className="login-form-button"
                                    onClick={()=> handleStartOTPLogin()}
                                    >
                                    Login With OTP
                                </Button>
                            </Form.Item>
                        </Form>
                        <Divider />

                        </div>
                    </Grid>
                </>
            }    
        </Grid>


        {startOTPLogin && 
            <LoginWithOTP 
                onClose={onClose}
            />
        }
        
        
        {startPassWordLogin && 
            <LoginWithPassword 
                onClose={onClose}
                pathname={pathname}
            />
        }
            
        </ModalDialog>
    </Modal>


    );
};


export default LoginForm;
