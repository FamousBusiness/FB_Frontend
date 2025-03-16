import * as React from 'react';
import { Box, Typography, Button, Card, Radio } from "@mui/material";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CircularProgress from '@mui/material/CircularProgress';






function CheckoutMobileAdressStep(props) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    

    const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onKeyDown={toggleDrawer(anchor, false)}
        >
            {props.addressLoading ? 
                <Box sx={{ display:'flex', justifyContent:'center' }}>
                    <CircularProgress />
                </Box>
            :

            props.userAddressData.map((address) => ((
                <Card
                    key={address.id}
                    sx={{
                        mb: 2,
                        p: 2,
                        border: props.selectedAddress === address.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        backgroundColor: props.selectedAddress === address.id ? '#e3f2fd' : '#fff',
                    }}
                >
                    
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Radio
                                checked={props.selectedAddress === address.id}
                                onChange={() => props.handleSelect(address.id)}
                                color="primary"
                            />
                            <Box sx={{ display:'flex', justifyContent:'center', gap:1 }}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize:'12px'}}>
                                    {address?.name}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        px: 1,
                                        py: 0.25,
                                        border: '1px solid',
                                        borderRadius: 1,
                                        borderColor: '#1976d2',
                                        color: '#1976d2',
                                        fontWeight: 'bold',
                                        mr: 1,
                                        fontSize:'10px'
                                    }}
                                >
                                    {address?.address_tye}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {address?.locality}, {address?.address}
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {address?.city}, {address?.state} - {address?.pincode}
                    </Typography>

                    {props.selectedAddress === address.id && (
                        <Button
                            variant="contained"
                            color="warning"
                            sx={{ mt:1, p:1 }}
                            onClick={()=> {props.handleClickDeliverHere(); toggleDrawer('bottom', false); }}
                        >
                            DELIVER HERE
                        </Button>
                    )}
                </Card>
             )))}

        </Box>
      );
    

return (
    <>
        <Box 
            sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f1f3f6', p: 2, borderRadius: 1 }}
        >
            <Typography><strong>Deliver to: </strong>  
               {props.userAddressData[props.selectedAddress]?.city}, {props.userAddressData[props.selectedAddress]?.pincode}
            </Typography>

            <Button 
                variant="outlined" 
                onClick={toggleDrawer('bottom', true)}
                >
                Change
            </Button>
        </Box>

        <div>
            <React.Fragment>
                {/* <Button onClick={toggleDrawer('bottom', true)}>bottom</Button> */}
                <SwipeableDrawer
                    anchor='bottom'
                    open={state['bottom']}
                    onClose={toggleDrawer('bottom', false)}
                    onOpen={toggleDrawer('bottom', true)}
                >
                    {list('bottom')}
                </SwipeableDrawer>

            </React.Fragment>
        </div>

    </>
    );
};


export default CheckoutMobileAdressStep;




// {props.addressLoading ? 
//     <Box sx={{ display:'flex', justifyContent:'center' }}>
//         <CircularProgress />
//     </Box>
// :
// props.userAddressData.map((address) => (
//     <Card
//     key={address.id}
//     sx={{
//         mb: 2,
//         p: 2,
//         border: props.selectedAddress === address.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
//         backgroundColor: props.selectedAddress === address.id ? '#e3f2fd' : '#fff',
//     }}
//     >
//     <Box display="flex" alignItems="center" justifyContent="space-between">
//         <Box display="flex" alignItems="center">
//             <Radio
//                 checked={props.selectedAddress === address.id}
//                 onChange={() => props.handleSelect(address.id)}
//                 color="primary"
//             />

//             <Box sx={{ display:'flex', justifyContent:'center', gap:1 }}>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                     {address?.name}
//                 </Typography>

//                 <Typography
//                     variant="caption"
//                     sx={{
//                         px: 1,
//                         py: 0.25,
//                         border: '1px solid',
//                         borderRadius: 1,
//                         borderColor: '#1976d2',
//                         color: '#1976d2',
//                         fontWeight: 'bold',
//                         mr: 1,
//                     }}
//                 >
//                 {address?.address_tye}
//                 </Typography>

//                 <Typography variant="body2">{address?.mobile_number}</Typography>
//             </Box>
//         </Box>

//         <Typography
//             variant="body2"
//             color="primary"
//             sx={{ cursor: 'pointer', textDecoration: 'underline' }}
//             >
//             EDIT
//         </Typography>
//     </Box>

//     <Typography variant="body2" sx={{ mt: 1 }}>
//         {address?.locality}, {address?.address}
//     </Typography>

//     <Typography variant="body2" sx={{ mt: 1 }}>
//         {address?.city}, {address?.state} - {address?.pincode}
//     </Typography>

//     {props.selectedAddress === address.id && (
//         <Button
//             variant="contained"
//             color="warning"
//             sx={{ mt:2, p:2 }}
//             onClick={props.handleClickDeliverHere}
//         >
//             DELIVER HERE
//         </Button>
//     )}
// </Card>
// ))}