"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, Radio, TextField, MenuItem, RadioGroup,FormControlLabel, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import MyLocationIcon from '@mui/icons-material/MyLocation';







function AddressForm({ addressLoading, userAddressData, selectedAddress, handleSetAddress, addNewAddress, handleChangeAddress,
    addressFomrData, handleSubmitAddressFormData, disableButton, handleAddressCancelClicked, addressError, successMessage, handleSelect,
    handleClickDeliverHere 
 }) {

    return (
        <>
            {addressLoading ? 
                <Box sx={{ display:'flex', justifyContent:'center' }}>
                    <CircularProgress />
                </Box>
            :
            userAddressData.map((address) => (
                <Card
                key={address.id}
                sx={{
                    mb: 2,
                    p: 2,
                    border: selectedAddress === address.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    backgroundColor: selectedAddress === address.id ? '#e3f2fd' : '#fff',
                }}
                >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Radio
                            checked={selectedAddress === address.id}
                            onChange={() => handleSelect(address.id)}
                            color="primary"
                        />

                        <Box sx={{ display:'flex', justifyContent:'center', gap:1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
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
                                }}
                            >
                            {address?.address_tye}
                            </Typography>

                            <Typography variant="body2">{address?.mobile_number}</Typography>
                        </Box>
                    </Box>

                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                        >
                        EDIT
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    {address?.locality}, {address?.address}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    {address?.city}, {address?.state} - {address?.pincode}
                </Typography>

                {selectedAddress === address.id && (
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ mt:2, p:2 }}
                        onClick={handleClickDeliverHere}
                    >
                        DELIVER HERE
                    </Button>
                )}
            </Card>
        ))}

        <Card 
            onClick={()=> {handleSetAddress(); }}
            sx={{ 
                p:3, 
                border:'1px solid #e0e0e0', 
                display:'flex', 
                justifyContent:'flex-start', 
                cursor:'pointer'
                }}>
            <AddIcon sx={{color:'#0096FF'}} /> 
            <p style={{marginTop:3, paddingLeft:4, color:'#0096FF'}}>Add New Address</p>
        </Card>

        {!addNewAddress && 
            <Box
            sx={{
                width:'100%',
                margin: "auto",
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
            }}
            >

                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    ADD A NEW ADDRESS
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<MyLocationIcon />}
                    sx={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        marginBottom: 2,
                        textTransform: "none",
                    }}
                >
                    Use my current location
                </Button>

                <Grid container spacing={2}>
                    <Grid size={{xs:12, sm:6 }}>
                        <TextField 
                            fullWidth 
                            label="Name" 
                            variant="outlined" 
                            name='name'
                            value={addressFomrData.name}
                            onChange={handleChangeAddress}
                            />
                    </Grid>

                    <Grid size={{ xs:12, sm:6 }}>
                        <TextField 
                            fullWidth 
                            label="10-digit mobile number" variant="outlined" 
                            name='mobile_number'
                            value={addressFomrData.mobile_number}
                            onChange={handleChangeAddress}
                            />
                    </Grid>

                    <Grid size={{ xs:12, sm: 6 }}>
                        <TextField 
                            fullWidth 
                            label="Pincode" 
                            variant="outlined" 
                            name='pincode'
                            value={addressFomrData.pincode}
                            onChange={handleChangeAddress}
                            />
                    </Grid>

                    <Grid size={{ xs:12, sm:6 }}>
                        <TextField 
                            fullWidth 
                            label="Locality" 
                            variant="outlined" 
                            name='locality'
                            value={addressFomrData.locality}
                            onChange={handleChangeAddress}
                            />
                    </Grid>

                    <Grid size={{ xs:12 }}>
                        <Textarea 
                            name="address" 
                            placeholder="Address (Address and Street)" 
                            variant="outlined" 
                            minRows={5}
                            value={addressFomrData.address}
                            onChange={handleChangeAddress}
                        />
                    </Grid>
                        
                    <Grid size={{ xs:12, sm:6 }}>
                        <TextField 
                            fullWidth 
                            label="City/District/Town" variant="outlined" 
                            name='city'
                            value={addressFomrData.city}
                            onChange={handleChangeAddress}
                            />
                    </Grid>
                    
                    <Grid size={{ xs:12, sm:6 }}>
                        <FormControl sx={{ m: 0 }} fullWidth>
                            <InputLabel id="state">State</InputLabel>
                            <Select
                                id="state"
                                name='state'
                                value={addressFomrData.state}
                                label="State"
                                onChange={(e)=> handleChangeAddress(e)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Andaman & Nicobar Islands">Andaman & Nicobar Islands</MenuItem>
                                <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                                <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                                <MenuItem value="Assam">Assam</MenuItem>
                                <MenuItem value="Bihar">Bihar</MenuItem>
                                <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                                <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                                <MenuItem value="Delhi">Delhi</MenuItem>
                                <MenuItem value="Goa">Goa</MenuItem>
                                <MenuItem value="Gujarat">Gujarat</MenuItem>
                                <MenuItem value="Haryana">Haryana</MenuItem>
                                <MenuItem value="Jammu & Kashmir">Jammu & Kashmir</MenuItem>
                                <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                                <MenuItem value="Karnataka">Karnataka</MenuItem>
                                <MenuItem value="Kerala">Kerala</MenuItem>
                                <MenuItem value="Ladakh">Ladakh</MenuItem>
                                <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                                <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                                <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                                <MenuItem value="Manipur">Manipur</MenuItem>
                                <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                                <MenuItem value="Mizoram">Mizoram</MenuItem>
                                <MenuItem value="Nagaland">Nagaland</MenuItem>
                                <MenuItem value="Odisha">Odisha</MenuItem>
                                <MenuItem value="Puducherry">Puducherry</MenuItem>
                                <MenuItem value="Punjab">Punjab</MenuItem>
                                <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                                <MenuItem value="Sikkim">Sikkim</MenuItem>
                                <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                <MenuItem value="Telangana">Telangana</MenuItem>
                                <MenuItem value="Tripura">Tripura</MenuItem>
                                <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                                <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                                <MenuItem value="West Bengal">West Bengal</MenuItem>
                            </Select>
                            <FormHelperText>{addressFomrData.state}</FormHelperText>
                        </FormControl>
                    </Grid>
                        
                    <Grid size={{ xs:12, sm:6 }}>
                        <TextField 
                            fullWidth 
                            label="Landmark (Optional)" variant="outlined"
                            name='landmark' 
                            value={addressFomrData.landmark}
                            onChange={handleChangeAddress}
                            />
                    </Grid>

                    <Grid size={{ xs:12, sm:6 }}>
                        <TextField
                            fullWidth
                            label="Alternate Phone (Optional)"
                            variant="outlined"
                            name='alternate_number'
                            value={addressFomrData.alternate_number}
                            onChange={handleChangeAddress}
                        />
                    </Grid>
                </Grid>

                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                    Address Type
                </Typography>

                <RadioGroup 
                    row 
                    name='address_type' 
                    onChange={handleChangeAddress}
                    >
                    <FormControlLabel
                        value="HOME"
                        control={<Radio />}
                        label="Home (All day delivery)"
                        />

                    <FormControlLabel
                        value="WORK"
                        control={<Radio />}
                        label="Work (Delivery between 10 AM - 5 PM)"
                        />
                </RadioGroup>
                    
                <Box
                    sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 3,
                    }}
                >
                    <Button 
                        variant="contained" 
                        color="warning"
                        onClick={handleSubmitAddressFormData}
                        disabled={disableButton}
                        >
                        Save and Deliver Here
                    </Button>

                    <Button 
                        variant="text" 
                        color="error"
                        onClick={handleAddressCancelClicked}
                        >
                        Cancel
                    </Button>
                </Box>

                <p style={{ color:'red' }}>{addressError && addressError}</p>

                <p style={{ color:'green' }}>{successMessage && successMessage}</p>
            </Box>
    }
    </>
    );
};



export default AddressForm;

