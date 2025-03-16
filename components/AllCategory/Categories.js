'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from '@mui/material/Tooltip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Fab from '@mui/material/Fab';
import { Typography } from '@mui/material';
import axiosInstance from '@/Authentication/axios';
import Image from 'next/image';





///// All Category Side bar
function AllCategories() {
    const [state, setState] = useState({
        top: false
    });
    const [storeCategories, setStoreCategories] = useState([]);
    const [categoryID, setCategoryID] = useState(0);

    
    ///// Redirect to Category wise product page
    const handleRedirectCategory = (id)=> {
        window.location.href =  `/category/?cat_id=${id}`
    };


    //// Fetch all store Categories when the page loads
    useEffect(()=> {
        axiosInstance.get(`/api/ecom/v1/all/store/categories`).then((res)=> {
            // console.log(res);
            if (res.status === 200) {
                setStoreCategories(res.data.results)
            }

        }).catch((error)=> {
            // console.log(error)
        });

    }, []);


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {storeCategories.map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton onClick={()=> handleRedirectCategory(item.id)}>
                        <ListItemIcon>
                        <Image
                            width={50}
                            height={50}
                            src={item?.image}
                            alt={'Image'}
                            style={{marginTop:15}}
                        />
                        </ListItemIcon>
                        <ListItemText primary={item?.type} />
                    </ListItemButton>
                </ListItem>
            ))}
          </List>

          <Divider />

        </Box>
      );


    return (
        <div>
            <React.Fragment>
                <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginRight: { xs: 2, md: 4 },
                      cursor: 'pointer',
                      position: 'relative',
                      height:'80px',
                    }}
                    onClick={()=> toggleDrawer('right', true)}
                  >
                    <Tooltip title='All Category'>
                        <Fab 
                          color="primary" 
                          aria-label="add" 
                          sx={{width:'70px', height:'60px', color:'#d3dfe3' }}
                          onClick={toggleDrawer('right', true)}
                          >
                            <MoreHorizIcon sx={{fontSize:'50px'}} />
                        </Fab>
                    </Tooltip>

                    <Typography variant="p" 
                      sx={{
                        position:'absolute', 
                        bottom:-3, 
                        textAlign:'center', 
                        fontSize: {xs:'10px', sm: '12px', md:'15px'},
                        width:'100%',
                        overflow:{xs:'hidden', sm:'hidden', md:'visible'},
                        whiteSpace:{xs: 'normal', sm:'normal', md:'nowrap'},
                      }}
                      >
                        All Category
                    </Typography>
                </Box>


                <Drawer
                    anchor='right'
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>

            </React.Fragment>
        </div>
    );
};


export default AllCategories;