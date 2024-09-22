"use client";
import React, { useState } from 'react';
import { Checkbox, Select, Divider, Row, Col } from 'antd';
import Categories from './FilterCom';
import { locations } from '@/data/data';

const { Option } = Select;

function SideFilter({
  selectedJobTypes,
  setSelectedJobTypes,
  selectedLocations,
  setSelectedLocations,
  setSelectedCategories,
}) {
  const [location, setLocation] = useState(locations)
  const jobTypes = ['Full Time Jobs', 'Part Time Jobs', 'Work From Home', 'Internships', 'Work Abroad'];

  const handleJobTypeChange = (checkedValues) => {
    setSelectedJobTypes(checkedValues);
    // Perform filtering based on selected job types
  };

  const handleLocationChange = (selectedValues) => {
    setSelectedLocations(selectedValues);
    // Perform filtering based on selected locations
  };

  const handleCategoryChange = (selectedValues) => {
    setSelectedCategories(selectedValues);
    // Perform filtering based on selected categories
  };

  return (
    <>
      <div>
        <p className='text-base'>Job Types</p>
        <Checkbox.Group onChange={handleJobTypeChange} value={selectedJobTypes}>
          <Row gutter={[0, 12]}>
            {jobTypes.map((jobType) => (
              <Col span={24} key={jobType}>
                <Checkbox value={jobType}>{jobType}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>

      <Divider />
      <div>
        <p className='text-base'>Locations</p>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select locations"
          onChange={handleLocationChange}
          value={selectedLocations}
        >
          {location.map((location) => (
            <Option key={location} value={location}>
              {location}
            </Option>
          ))}
        </Select>
      </div>

      <Divider />

      <div>
        <p className='text-base'>Categories</p>
        <Categories handleCategoryChange={handleCategoryChange} />
      </div>
    </>
  );
}

export default SideFilter;
