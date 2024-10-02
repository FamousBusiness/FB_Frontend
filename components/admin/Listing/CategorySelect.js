"use client";
import React, { useState, useEffect } from 'react';
import { Divider, Form, Select, Space } from 'antd';

// import AddnewCat from './AddNewlist';
import { get_all_categories } from '@/services/Admin/category';





const Category1 = ({ label, tooltip, required, size, category_id, setCategoryId }) => {
  const [items, setItems] = useState([]);
  // const [name, setName] = useState('');


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
    <Form.Item required={required} tooltip={tooltip} name='category' label={label && 'Category'}>
      <Select
        showSearch
        size={size}
        onChange={onNameChange}
        value={category_id}
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


export default Category1;