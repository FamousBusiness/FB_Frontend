import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axiosInstance from '@/Authentication/axios';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



function UpdateOrderStatus({open, setOpen, order_id}) {
    const handleClose = () => setOpen(false);
    const [orderstatus, setOrderStatus] = React.useState('');
    const [error, setError] = React.useState('');


    const handleChange = (event) => {
        setOrderStatus(event.target.value);
    };

    
    ///// Call API to update order status
    const handleUpdateOrderStatus = ()=>  {
        axiosInstance.put(`/api/ecom/v1/updare/order/status/`, {
            status: orderstatus,
            order_id: order_id,

        }).then((res)=> {
            // console.log(res)
            if (res.status === 200) {
                setError('')
                handleClose()
                window.location.reload()
            }

        }).catch((error)=> {
            // console.log(error)
            if (error.response.data.message === 'Unable to change the status') {
                setError('Unable to change the status')
            } else {
                setError('')
            }
        })
    };


    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:3}}>
                        Update Order Status
                    </Typography>
                    
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                id="demo-simple-select"
                                value={orderstatus}
                                label="Status"
                                onChange={handleChange}
                            >
                                <MenuItem value='Order Confirmed'>Order Confirmed</MenuItem>
                                <MenuItem value="Shipped">Shipped</MenuItem>
                                <MenuItem value='Out of Delivery'>Out of Delivery</MenuItem>
                                <MenuItem value='Delivered'>Delivered</MenuItem>
                                <MenuItem value='Return Shipped'>Return Shipped</MenuItem>
                                <MenuItem value='Returned'>Returned</MenuItem>
                                <MenuItem value='Cancelled'>Cancelled</MenuItem>
                                <MenuItem value='Refund Initiated'>Refund Initiated</MenuItem>
                                <MenuItem value='Refunded'>Refunded</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{display:'flex', justifyContent:'center', mt:3}}>
                        <Button variant='contained' onClick={handleUpdateOrderStatus}>Update</Button>
                    </Box>

                    {error && 
                      <div style={{display:'flex', justifyContent:'center'}}>
                            <p style={{color:'red'}}>{error}</p>
                       </div>
                    }
                </Box>
            </Modal>
      </div>

    );
};


export default UpdateOrderStatus;