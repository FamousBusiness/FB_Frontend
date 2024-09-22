"use client"
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/utils/LandingPageModel';
import { WhatsAppOutlined } from '@ant-design/icons';
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

function Whatsapp({ whatsapp_number }) {
    const [url, setUrl] = useState(null);
    const { user } = useAuth()
    const [isLoggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        // Current URL
        const currentUrl = window.location.href;
        setUrl(currentUrl)
        // console.log('Current URL:', currentUrl);
    }, []);
    const text_initial = `Hi, I found your business on ${url}`
    const text = encodeURIComponent(text_initial)
    return (
        <>
            <Button size='large' onClick={user ? null : () => setLoggedIn(true)} className=' w-full' style={{ fontFamily: 'serif', color: 'black' }} target='_blank' type='default' href={user ? `https://wa.me/91${whatsapp_number}?text=${text}` : null} icon={<WhatsAppOutlined className='text-xl' style={{ color: 'green' }} />} >
                Whatsapp
            </Button>
            <LoginForm visible={isLoggedIn} onClose={() => setLoggedIn(false)} />
        </>

    )
}

export default Whatsapp
// user ? null : () => setLoggedIn(true)} className=' w-full align-middle' style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'black' }} target='_blank' type='default' href={user ? `https://web.whatsapp.com/send/?phone=91${whatsapp_number}?text=${text}` : null} icon={<WhatsAppOutlined className='text-xl' style={{ color: 'green' }} />} >
