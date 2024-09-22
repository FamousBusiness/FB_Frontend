"use client";
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/utils/LandingPageModel';
import { Button } from 'antd'
import React, { useState } from 'react'
import Axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



const ServerMmode = process.env.NEXT_IS_DEVELOPMENT;
let apiURL = '';


if (ServerMmode === 'True') {
    apiURL = 'http://127.0.0.1:8000'
} else {
    apiURL = 'https://api.famousbusiness.in'
};


// Phonepe Payment
function HandlePayment({ id, amount }) {
    const { user, authTokens, userdata } = useAuth()
    const [login, setLogin] = useState(false);
    const router = useRouter()
    const [checkOut, setCheckOut] = useState(false);
    const [QrCode, setQrCode]     = useState('');
    const [showPaymentPage, setShowPaymentPage] = useState(false);
    const [disableButton, setDisableButton] = useState(false);



    const showRazorpay = async () => {
        if (checkOut) return;  // Prevent multiple clicks during payment processing
        setCheckOut(true);
        let bodyData = new FormData();

        bodyData.append("amount", amount);
        bodyData.append("premium_plan_id", id);

        setDisableButton(true);

        if (authTokens) {
            try {

                setCheckOut(false);
                const { data } = await Axios.post(`${apiURL}/premium-plan-api/premium-plan-payment/`, bodyData, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${Cookies.get("accessToken")}`
                    },
                });

                // console.log("API Response", data)
                const response_qr_code = data.QR_Code
                const merchant_id      = btoa(data.merchantUserId)

                var intenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);

                setQrCode(response_qr_code)
                Cookies.set('QrCode', response_qr_code, {expires: intenMinutes });  // Set the UPI value in Cookie
                Cookies.set('merchant_id', merchant_id, {expires: intenMinutes });  // Set the UPI value in Cookie
                setShowPaymentPage(true)

                router.push('/plan/phonepe/')
                
            }
            catch (error) {
                console.log(error);
                setDisableButton(false);
            }
        }
        else {
            setLogin(true);
        }
    };

    return (<>
        <Button disabled={disableButton} 
                onClick={showRazorpay} block  
                style={{background:'#3c89d0',color:'white'}} 
                size='large' 
                loading={checkOut}
                >
            Upgrade
        </Button>

        <LoginForm visible={login} onClose={() => setLogin(false)} />
    </>
    )
}

export default HandlePayment;
