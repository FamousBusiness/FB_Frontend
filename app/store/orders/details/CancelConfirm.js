import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



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




export default function CancelConfirmModal({open, setOpen}) {
    const handleClose = () => setOpen(false);


  return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cancel Order
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure, You want to cancel the order
                    </Typography>

                    <Box sx={{display:'flex', justifyContent:'space-evenly', mt:3}}>
                        <Button variant="contained" color='error'>Yes</Button>
                        <Button variant="contained" color='primary' onClick={handleClose}>No</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
  );
}
