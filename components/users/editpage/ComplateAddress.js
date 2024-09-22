import React, { useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { IoLocationOutline } from 'react-icons/io5';
import { locations } from '@/data/data';
import CustomSelect from '@/components/Custom/SelectCustom';

const AddressForm = ({handlePinCodeChange}) => {
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
          <CustomSelect handlePinCodeChange={handlePinCodeChange} mode={''}/>
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
