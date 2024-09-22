import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, DialogActions, DialogContent, DialogTitle, Modal, ModalDialog } from '@mui/joy';
import { Result } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

function PayNowModal({ open, onClose, amount, description, handleShow }) {
    const router = useRouter();

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog variant='outlined' layout="center">
                <DialogTitle>Checkout</DialogTitle>
                <DialogContent>
                    {amount ? (
                        <p>Amount: {amount}</p>
                    ) : (
                        <Result
                            icon={<ExclamationCircleOutlined />}
                            title="Please purchase the plan."
                        />
                    )}
                    {/* You can uncomment the following line if you want to display the description */}
                    {/* {description && <p>Description: {description}</p>} */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={amount ? handleShow : () => router.push('/plan')} variant='solid'>
                        {amount ? 'Pay Now' : 'Premium Plan'}
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}

export default PayNowModal;
