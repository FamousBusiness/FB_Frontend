import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Col, Row, Select } from 'antd';
import axios from 'axios';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import { MdMyLocation } from 'react-icons/md';
import { useMapboxLocation } from '@/lib/location';




const LocAuto = () => {
  const { updateLiveLocation, locationState, handleButtonClick, updateCallCount, LocationCity } = useGlobalState(); // Access liveLocation from context

  const [options, setOptions] = useState([
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'New Delhi', label: 'New Delhi' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Kolkata', label: 'Kolkata' },
        { value: 'Hyderabad', label: 'Hyderabad' },
        { value: 'Pune', label: 'Pune' },
        { value: 'Jaipur', label: 'Jaipur' },
        { value: 'Surat', label: 'Surat' },
        { value: 'Lucknow', label: 'Lucknow' },
        { value: 'Ahmedabad', label: 'Ahmedabad' },
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Kanpur', label: 'Kanpur' },
        { value: 'Agra', label: 'Agra' },
        { value: 'Amritsar', label: 'Amritsar' },
        { value: 'Ghaziabad', label: 'Ghaziabad' },
        { value: 'Chandigarh', label: 'Chandigarh' },
        { value: 'Patna', label: 'Patna' },
        { value: 'Thiruvananthapuram', label: 'Thiruvananthapuram' }
  ]);

  const [defaultOptions, setDefaultOptions] = useState('');
  const [sessionToken, setSessionToken] = useState(null);


  const handleSearch = async (value) => {
    if (value.length >= 1) {
      try {
        // console.log("sessionToken", sessionToken);
        const response = await axios.get(
          `https://api.mapbox.com/search/searchbox/v1/suggest?q=${value}&language=en&country=in&types=city&access_token=${process.env.NEXT_PUBLIC_GEO_API_KEY}&session_token=${sessionToken}`
        );
        const data = response.data;
        // console.log('data', data)
        updateCallCount()

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

  const handleSelect = (value, option) => {
    // Update live location in the context when a location is selected
    updateLiveLocation({
      city: option.label,
      state: option.all?.region?.name,
    }); // Assuming 'city' is the key for the location
    console.log("new global location selected", locationState);
  };


  useEffect(() => {
    if (LocationCity) {
      setDefaultOptions(LocationCity)

    } else if (locationState.city) {
      setDefaultOptions(locationState.city);
    }
  }, [locationState.city, LocationCity])


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


  const generateSessionToken = () => {
    // Generate a unique session token (you can implement as needed)
    return Math.random().toString(36).substr(2);
  };

  // console.log('LocationCity', LocationCity)

  return (
    <Row>
      <Col xl={24} xxl={24} lg={24} xs={0} sm={0} md={0}>
        <AutoComplete
          showSearch
          backfill={true}
          allowClear
          style={{ width: '100%',borderRadius:'10px' }}
          value={defaultOptions}
          onChange={(value) => setDefaultOptions(value)}
          size='large'
          options={options}
          placeholder='New Delhi'
          className='shadow-md'
          filterOption={false}
          dropdownRender={(menu) => (<div><Button icon={<MdMyLocation />} className=' mb-1' block onClick={handleButtonClick} >
            detect location
          </Button>
            {menu}
          </div>)}
          onSearch={handleSearch}
          onSelect={handleSelect}
        >
        </AutoComplete>
      </Col>

      <Col xl={0} xxl={0} lg={0} xs={24} sm={24} md={24}>
        <Select
          showSearch
          className='w-full shadow-md'
          allowClear
          value={defaultOptions}
          onChange={(value) => setDefaultOptions(value)}
          size='middle'
          options={options}
          placeholder='New Delhi'
          filterOption={true}
          dropdownRender={(menu) => (<div><Button icon={<MdMyLocation />} className=' mb-1' block onClick={() => handleButtonClick()} >
            Detect
          </Button>
            {menu}
          </div>)}
          onSearch={handleSearch}
          onSelect={handleSelect}
        >
        </Select>
      </Col>
    </Row>

  );
};

export default LocAuto;
