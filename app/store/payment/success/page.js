'use client';


import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useRouter } from "next/navigation";









const PaymentSuccess = () => {
    const router = useRouter();


  return (
    <Card
      sx={{
        backgroundColor: "#1565C0",
        color: "white",
        textAlign: "center",
        // padding: "2rem",
        borderRadius: "16px",
        maxWidth:'50%',
        // height:'50vh',
        margin: "auto",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        mt:'10vh'
      }}
    >
      <CardContent>
        {/* Icon and Decorative Elements */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2} mt={5}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "1rem",
              display: "inline-block",
            }}
          >
            <CheckCircleOutlineIcon
              sx={{
                fontSize: 50,
                color: "#1565C0",
              }}
            />
          </Box>
        </Box>

        {/* Sparkles */}
        <Box display="flex" justifyContent="center" gap={1} mb={2}>
          <Box
            sx={{
              width: "8px",
              height: "8px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          ></Box>

          <Box
            sx={{
              width: "12px",
              height: "12px",
              backgroundColor: "gold",
              borderRadius: "50%",
            }}
          ></Box>

          <Box
            sx={{
              width: "10px",
              height: "10px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          ></Box>
        </Box>


        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
           Your Order has been placed successfully
        </Typography>

        <Button variant="contained" color="success" sx={{mt:2}} onClick={()=> router.push('/orders/')}>
            Go to My Orders
        </Button>

      </CardContent>
    </Card>
  );
};


export default PaymentSuccess;
