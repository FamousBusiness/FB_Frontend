import { useAuth } from '@/context/AuthContext'
import LoginForm from '@/utils/LandingPageModel'
import { Button, notification } from 'antd'
import Cookies from 'js-cookie'
import React, { useState } from 'react'

function TrialPlan({ premium }) {
    const [open, setOpen] = useState(false)
    const { authTokens } = useAuth()
    const [loading, setLoading] = useState(false)


    const handleTrial = async () => {
        try {
            if (!authTokens) {
                setOpen(true);
            } else {
                setLoading(true);
                const res = await fetch('https://api.famousbusiness.in/premium-plan-api/trial-plan-activation/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get("accessToken")}`
                    },
                    body: JSON.stringify({
                        premium_plan_id: premium
                    })
                });
    
                setLoading(false);
    
                if (res.ok) {
                    const data = await res.json(); // Make sure to await the json() method
                    notification.success({
                        message: data.msg,
                        placement: 'topRight',
                        duration: 3000
                    });
                } else {
                    const errorData = await res.json(); // You can handle error response here
                    notification.error({
                        message: errorData.msg || 'Activation request has failed',
                        description: 'Please try again later',
                        placement: 'topLeft'
                    });
                }
            }
        } catch (error) {
            console.error('Error handling trial:', error);
            notification.error({
                message: 'Something went wrong',
                placement: 'topLeft'
            });
        }
    };
    
    return (
        <>
            <Button loading={loading} onClick={handleTrial} block  style={{background:'#3c89d0',color:'white'}} size='large'>
                Activate Free Trial
            </Button>
            <LoginForm visible={open} onClose={() => setOpen(false)} />
        </>
    )
}

export default TrialPlan