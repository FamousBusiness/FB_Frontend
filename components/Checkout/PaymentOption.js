import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';





function PaymentOption({setPaymentOption}) {

    const handleSelectChage = (e)=> {
        const { name, value } = e.target;
        setPaymentOption(value)
    };

   

    return (
        <>
            <FormControl sx={{ml:3}}>
                <FormLabel id="demo-radio-buttons-group-label" sx={{display:{xs:'none', sm:'flex'}}}>Payment Option</FormLabel>

                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={handleSelectChage}
                >
                    <FormControlLabel value="prepaid" control={<Radio />} label="UPI/Bank/Card" />
                    <FormControlLabel value="cod" control={<Radio />} label="COD" />

                </RadioGroup>
            </FormControl>
        </>
    );
};



export default PaymentOption;

