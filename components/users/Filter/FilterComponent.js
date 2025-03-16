"use client";
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Select } from 'antd';
import { FireFilled, StarFilled, TagFilled } from '@ant-design/icons';
import { SiTrustpilot } from 'react-icons/si';
import { MdVerified } from 'react-icons/md';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import axios from 'axios';



function CategoryFilter({ onFilterChange }) {
  const [options, setOptions] = useState([])
  const { locationState } = useGlobalState()
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedTopRated, setSelectedTopRated] = useState(false);
  const [selectedVerified, setSelectedVerified] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState(null);
  const [selectedTrusted, setSelectedTrusted] = useState(false);
  const [trending, setTrending] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const handleFilterChange = () => {
    const filters = {
      pincode: selectedSort,
      topRated: selectedTopRated,
      verified: selectedVerified,
      ratings: selectedRatings,
      trusted: selectedTrusted,
      authorized: authorized,
      trending: trending
    };
    onFilterChange(filters);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.postalpincode.in/postoffice/${locationState.city}`);
        const data = response.data;
        // console.log(data);
        if (data && data.length > 0 && data[0].Status === 'Success') {
          // console.log(data);
          setOptions(data[0].PostOffice);
        }

      }
      catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [locationState])

  return (
    <>
      <Row align='middle' className='mb-2' gutter={12}>
        <Col span={3}>
          {options.length > 0 && ( // Add conditional rendering here
            <Select
              placeholder='Sort By Pincode'
              size='large'
              value={selectedSort}
              onChange={(value) => {
                setSelectedSort(value);
                handleFilterChange();
              }}
              style={{ width: '100%' }}
              showSearch={true}
            >
              {options.map((item) => (
                <Select.Option key={item.id} value={item.Pincode}>
                  {item.Pincode}
                </Select.Option>
              ))}
            </Select>
          )}
        </Col>

        <Col>
          <Button
            danger={trending}
            icon={<FireFilled />}
            className={`w-full bg-slate-300 ${trending ? 'bg-primary-500' : ''}`}
            type='default'
            size='large'
            onClick={() => {
              setTrending(!trending);
              handleFilterChange();
            }}
          >
            Trending
          </Button>
        </Col>

        <Col>
          <Button
            danger={selectedTopRated}
            className={`w-full bg-slate-300 ${selectedTopRated ? 'bg-primary-500' : ''}`}
            icon={<StarFilled />}
            type='default'
            size='large'
            onClick={() => {
              setSelectedTopRated(!selectedTopRated);
              handleFilterChange();
            }}
          >
            Top Rated
          </Button>
        </Col>

        <Col>
          <Button
            danger={selectedVerified}
            icon={<MdVerified />}
            className={`w-full bg-slate-300 ${selectedVerified ? 'bg-primary-500' : ''}`}
            type='default'
            size='large'
            onClick={() => {
              setSelectedVerified(!selectedVerified);
              handleFilterChange();
            }}
          >
            Verified
          </Button>
        </Col>

        <Col span={2}>
          <Select
            placeholder='Ratings'
            size='large'
            value={selectedRatings}
            onChange={(value) => {
              setSelectedRatings(value);
              handleFilterChange();
            }}
            style={{ width: '100%' }}
          >
            <Select.Option value='3.5'>3.5</Select.Option>
            <Select.Option value='4.0'>4.0</Select.Option>
          </Select>
        </Col>

        <Col>
          <Button
            danger={selectedTrusted}
            icon={<TagFilled />}
            className={`w-full bg-slate-300 ${selectedTrusted ? 'bg-primary-500' : ''}`}
            type='default'
            size='large'
            onClick={() => {
              setSelectedTrusted(!selectedTrusted);
              handleFilterChange();
            }}
          >
            Trusted
          </Button>
        </Col>

        <Col>
          <Button
            danger={authorized}
            icon={<SiTrustpilot />}
            className={`w-full bg-slate-300 ${authorized ? 'bg-primary-500' : ''}`}
            type='default'
            size='large'
            onClick={() => {
              setAuthorized(!authorized);
              handleFilterChange();
            }}
          >
            Authorized
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default CategoryFilter;
