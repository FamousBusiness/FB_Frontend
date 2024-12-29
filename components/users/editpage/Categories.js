"use client";

import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';
import { get_all_categories } from '@/services/Admin/category';





const FetchCategories = ({ label, required }) => {
  const [items, setItems] = useState([]);
  const [categoryID, setCategoryId] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_all_categories();
        setItems(response.data);

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []); // Run only on component mount


  const onNameChange = (value) => {
    setCategoryId(value);
  };




  return (
    <Form.Item required={required} tooltip='Category' name='category' label={label && 'Category'}>
      <Select
        showSearch
        onChange={onNameChange}
        value={categoryID}
        style={{
          width: "100%",
        }}
        placeholder="Select category"
        filterOption={(input, option) =>
          option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        options={items.map((item) => ({
          label: item.type,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
};


export default FetchCategories;