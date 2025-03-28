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



function EMIOffers({open, setOpen, productData}) {
    // const [open, setOpen] = React.useState(false);
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
                   <ul>
                    {productData.map((item, index)=> (
                        item.emi_offers &&
                            item.emi_offers.map((offer, index) => (
                                <li key={index}>{offer?.name}</li>
                            ))
                    ))}
                   </ul>
                </Box>
            </Modal>
      </div>
    );
};



export default EMIOffers;

