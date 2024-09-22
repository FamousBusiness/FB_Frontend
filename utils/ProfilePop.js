import Plan from '@/app/plan/components/Plan'
import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import LoginForm from './LandingPageModel'
import { Modal } from 'antd'
function ProfilePop({ id }) {
    const { user, userdata } = useAuth()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!user) {
            setTimeout(() => {
                setIsLoggedIn(true);
            }, 10000)
        } else {
            if (userdata && userdata.business && userdata.plan === false) {
                setOpen(true);
            } else {
                setOpen(false); // Or handle the condition accordingly
            }
        }

    }, [user, userdata, id]);

    useEffect(() => {
        if (!user) {
            let intervalId = setInterval(() => {
                if (!isLoggedIn) {
                    setIsLoggedIn(true);
                }
            }, 50000);

            return () => {
                clearInterval(intervalId); // Cleanup interval on unmount
            };
        }
    }, [isLoggedIn, user]);


    const handleClose = () => {
        setOpen(false)
    }

    const onClose = () => {
        setIsLoggedIn(false)

    }

    return (<>
        <Modal footer={null} wrapClassName="ant-modal-content" width='100%' centered onCancel={handleClose} open={open}>
            <Plan />
        </Modal>
        <LoginForm visible={isLoggedIn} onClose={onClose} />

    </>
    )
}

export default ProfilePop
