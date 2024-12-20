"use client";

import React, { useState } from "react";
import { Box, Typography, CardContent, Card, Button  } from "@mui/material";
import HomeLeadFormModal from "./FormModal";






////// Lead Form Tag Card
export default function LeadFormTagCard({item}) {
    const [mediaUrl, setMediaUrl] = useState(process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? true : false);
    const [open, setOpen] = useState(false)
    

    return (
        <>
            <Card
                style={{
                    borderRadius: "20px",
                    borderWidth: 0.5,
                    borderColor: "slategray",
                }}
                className=" w-full"
                // hoverable
                >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '250px',
                        backgroundImage: `url(${mediaUrl ? 'http://127.0.0.1:8000/' + item?.background_img : item?.background_img || 'default image'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src={mediaUrl ? 'http://127.0.0.1:8000/' + item?.logo : item?.logo || 'default image'}
                        alt="Icon"
                        sx={{
                            position: 'absolute',
                            top: '95%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '50px', sm: '60px', md: '80px' },
                            height: { xs: '50px', sm: '60px', md: '80px' },
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            padding: '8px',
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                    <Typography variant="p" gutterBottom>
                        Famous Business
                    </Typography>
                </Box>

                <CardContent sx={{ textAlign: 'center', backgroundColor: '#ffffff', mt: 0 }}>
                    <Typography variant="h5" gutterBottom>
                        <b>{item?.headline || 'No Headline'}</b>
                    </Typography>

                    <Button color="primary"  fullWidth variant="contained" onClick={()=> setOpen(true)}>
                        Enquire Now
                    </Button>
                </CardContent>
            </Card>

            
            {open && 
                <HomeLeadFormModal setOpen={setOpen} open={open} item={item} />
            }

        </>
    );
};