
import React from 'react';
import { Select } from 'antd';
const options = [
  {
    value: 'Mumbai',
  },
  {
    value: 'Delhi',
  },
  {
    value: 'Bangalore',
  },
  {
    value: 'Hyderabad',
  },
  {
    value: 'Chennai',
  },
  {
    value: 'Kolkata',
  },
  {
    value: 'Pune',
  },
  {
    value: 'Ahmedabad',
  },
  {
    value: 'Jaipur',
  },
  {
    value: 'Lucknow',
  },
  {
    value: 'Surat',
  },
  {
    value: 'Kanpur',
  },
  {
    value: 'Nagpur',
  },
  {
    value: 'Indore',
  },
  {
    value: 'Thane',
  },
  {
    value: 'Bhopal',
  },
  {
    value: 'Visakhapatnam',
  },
  {
    value: 'Patna',
  },
  {
    value: 'Vadodara',
  },
  {
    value: 'Ghaziabad',
  },

];

const FilterLoc = (handleSearch) => {
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    handleSearch(value);
  };
  return(
  <Select
    style={{
      width: '100%',
    }}
    
    bordered={false}
    placeholder="Location"
    onChange={handleChange}
    options={options}
  />
);}
export default FilterLoc;