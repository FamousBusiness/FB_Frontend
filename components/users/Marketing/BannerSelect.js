import React, { useState } from 'react';
import { Select, Checkbox } from 'antd';

const { Option } = Select;

const BannerSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const options = [
    {
      value: 'ctbanner',
      label: 'Category Banner',
    },
    {
      value: 'marketing',
      label: 'Marketing Page',
    },
    {
      value: 'h2banner1',
      label: 'Home Page B1',
    },
    {
      value: 'h2banner2',
      label: 'Home Page B2',
    },
    {
      value: 'leadsB',
      label: 'Leads Page Banner',
    },
    {
      value: 'jobB',
      label: 'Job Page Banner',
    },
    {
      value: 'tenderB',
      label: 'Tender Page Banner',
    },
  ];

  const handleSelectChange = (selected) => {
    console.log(selected);
    setSelectedOptions(selected);
    setSelectAll(selected.length === options.length);
  };

  const handleCheckAllChange = (e) => {
    const newSelectedOptions = e.target.checked ? options.map((option) => option.value) : [];
    setSelectedOptions(newSelectedOptions);
    setSelectAll(e.target.checked);
  };

  return (
    <div>
      <Select
        size="large"
        className="w-full"
        placeholder="Select Banner Page"
        mode="multiple"
        value={selectedOptions}
        onChange={handleSelectChange}
        optionFilterProp="children"
      >
        <Option >
          <Checkbox
            indeterminate={!selectAll && selectedOptions.length > 0}
            onChange={handleCheckAllChange}
            checked={selectAll}
          >
            Check all
          </Checkbox>
        </Option>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            <Checkbox checked={selectedOptions.includes(option.value)} />
            {option.label}
          </Option>
        ))}
      </Select>

    </div>
  );
};

export default BannerSelect;
