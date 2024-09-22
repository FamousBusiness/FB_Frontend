import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { locations } from '@/data/data';

const CustomSelect = ({ mode, handlePinCodeChange}) => {
  const [sessionToken, setSessionToken] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Retrieve or generate session token
    const sessionToken = sessionStorage.getItem('sessionToken');
    if (!sessionToken) {
      const newSessionToken = generateSessionToken(); // Implement your function to generate a session token
      sessionStorage.setItem('sessionToken', newSessionToken);
      setSessionToken(newSessionToken);
    } else {
      setSessionToken(sessionToken);
    }
  }, []);

  const onChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const handleSearch = async (value) => {
    if (value.length >= 1) {
      try {
        console.log("sessionToken", sessionToken);
        const response = await axios.get(
          `https://api.mapbox.com/search/searchbox/v1/suggest?q=${value}&language=en&country=in&types=city&access_token=${process.env.NEXT_PUBLIC_GEO_API_KEY}&session_token=${sessionToken}`
        );
        const data = response.data;
        const cities = data.suggestions.map((feature) => ({
          value: feature.name,
          label: feature.name,
          all: feature.context
        }));
        setOptions(cities);
      } catch (error) {
        console.error('Error fetching data from Mapbox:', error);
      }
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const generateSessionToken = () => {
    // Generate a unique session token (you can implement as needed)
    return Math.random().toString(36).substr(2);
  };

  return (
    <Select
      showSearch
      placeholder="Select a city"
      mode={mode}gt5
      optionFilterProp="children"
      onChange={handlePinCodeChange?(value)=>handlePinCodeChange(value):onChange}
      onSearch={handleSearch}
      filterOption={filterOption}
      options={options.length > 0 ? options : locations.map((location) => ({
        value: location,
        label: location,
      }))}
    />
  );
};

export default CustomSelect;
