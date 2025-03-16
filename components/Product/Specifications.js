'use client';

import { Box, Tabs, Tab, Typography, Divider } from '@mui/material';
import { useState } from 'react';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}



function Specifications() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Product Tabs">
        <Tab label="Product Description" />
        <Tab label="Specifications" />
      </Tabs>

      <Divider />

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" component="h2" gutterBottom>
          Product Description
        </Typography>
        
        <Typography variant="body2" component="div">
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
          This is the product description. It provides information about the features, benefits, and uses of the product.
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>

        <Typography variant="h6" component="h2" gutterBottom>
          Specifications
        </Typography>

        <Box sx={{ border: '1px solid black', p: 2 }}>
          <Typography variant="subtitle1" component="h3" gutterBottom>
            General
          </Typography>

          <Typography variant="body2" component="div">
            <strong>Sales Package:</strong> CP PLUS 4 Channel HD DVR 1080p 1Pcs, Outdoor Camera 2.4 MP 3Pcs, Indoor Camera 2.4 MP 1Pcs, 1 TB Hard Disk seagate or wd, Full combo set Security Camera (1 TB, 4 Channel) (TRUSTED PURCHASE FOR REYANSH ENTERPRISES)
          </Typography>

          <Typography variant="body2" component="div">
            <strong>Model Number:</strong> CP-UVR-0401E1-HC
          </Typography>

          <Typography variant="body2" component="div">
            <strong>Number of Channels:</strong> 4
          </Typography>

          <Typography variant="body2" component="div">
            <strong>Camera Type:</strong> HD 2.4 MP BNC
          </Typography>

          <Typography variant="body2" component="div">
            <strong>Video Output:</strong> HDMI/VGA
          </Typography>
        </Box>

      </TabPanel>
    </Box>
  );
};



export default Specifications;
