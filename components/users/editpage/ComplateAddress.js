import React, { useState, useEffect } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { IoLocationOutline } from 'react-icons/io5';
import { locations } from '@/data/data';
// import CustomSelect from '@/components/Custom/SelectCustom';





const AddressForm = ({handlePinCodeChange}) => {
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


    const handleSearch = async (value) => {
      if (value.length >= 1) {
        try {
          // console.log("sessionToken", sessionToken);
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
    <Row gutter={12}>
      <Col sm={24} xs={24} md={24} xxl={18} xl={18} lg={18}>
        <Form.Item name="address" label="Address">
          <Input placeholder='Enter Your Address' addonBefore={<IoLocationOutline />} />
        </Form.Item>
      </Col>

      <Col sm={12} xs={12} md={12} xxl={6} xl={6} lg={6}>
        <Form.Item  label="PIN Code" name="pincode">
          <Input
            placeholder="110002"
            // onChange={(e) => handlePinCodeChange(e.target.value)}
            maxLength={6}
          />
        </Form.Item>
      </Col>
      
      <Col sm={12} xs={12} md={6} xxl={6} xl={6} lg={6}>
          <Form.Item
            name="city"
            label="City"
            // rules={[{ required: true, message: 'Please select a city' }]}
            >
              <Select
                showSearch
                placeholder="Select a city"
                optionFilterProp="children"
                onSearch={handleSearch}
                filterOption={filterOption}
                options={options.length > 0 ? options : locations.map((location) => ({
                  value: location,
                  label: location,
                }))}
              />
          </Form.Item>
      </Col>

      <Col sm={12} xs={12} md={6} xxl={6} xl={6} lg={6}>
        <Form.Item label="State" name="state">
          <Input placeholder="State"  />
        </Form.Item>
      </Col>

      <Col sm={12} xs={12} md={6} xxl={6} xl={6} lg={6}>
        <Form.Item label="Locality" name="locality">
          <Input placeholder="locality"  />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AddressForm;
