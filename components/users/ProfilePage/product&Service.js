// Import necessary modules and components
import { get_brands_by_id } from '@/services/Admin/products';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Row, Col, Skeleton } from 'antd';
import React, { useRef } from 'react';
import useSWR from 'swr';

// Function to fetch brand logos by ID
const fetchBrandsLogo = async (brandId) => {
  try {
    if (!brandId) {
      throw new Error('Invalid brand ID');
    }

    const response = await get_brands_by_id(brandId);

    // Assuming 'response.data' contains the array of brands
    console.log("brands", response.data);

    // Check if the response is in the expected format
    if (!response || !Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching brand logos:', error.message);
    throw error; // Rethrow the error to be caught by useSWR
  }
};

// Component for rendering brand logos
function ProductService({ brand_id }) {
  const carouselRefOne = useRef();

  // Fetch data using SWR
  const { data, error } = useSWR(brand_id, fetchBrandsLogo);

  // Handle loading state
  if (!data) {
    return (
      <Row justify='space-between'>
        <Col xs={0} sm={0} md={0} xl={24} lg={24} xxl={24}>
          <Row justify='space-between'>
            {[...Array(4)].map((_, index) => (
              <Col key={index} span={4}>
                <Skeleton.Input active style={{ height: '140px' }} className='w-full'></Skeleton.Input>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} xl={0} xxl={0} lg={0}>
          <Skeleton.Input active style={{ height: '140px' }} className='w-full'></Skeleton.Input>
        </Col>
      </Row>
    );
  }

  // Handle fetch error
  if (error) {
    return <div>Error in Fetching Data</div>;
  }

  return (
    <Row>
      <Col xs={0} sm={0} md={0} xl={24} lg={24} xxl={24}>
        <div className='relative'>
          {/* Next and previous buttons */}
          <div onClick={() => carouselRefOne.current.next()} className='hover:bg-neutral-400 cursor-pointer absolute border-1 z-10 right-0 top-28 py-3 bg-slate-100'>
            <RightOutlined className='text-2xl' />
          </div>
          <div onClick={() => carouselRefOne.current.prev()} className='hover:bg-neutral-400 cursor-pointer absolute border-1 z-10 left-0 top-28 py-3 bg-slate-100'>
            <LeftOutlined className='text-2xl' />
          </div>

          {/* Carousel component for larger screens */}
          <Carousel dots={false} slidesToShow={7} ref={carouselRefOne}>
            {data.map((brand, index) => (
              <div key={index} className='p-2'>
                <div className='relative rounded-md border border-1'>
                  <div className='static top-0 left-0 rounded-t-md bg-white w-full text-center items-center flex justify-center h-12'>brands</div>
                  <div className='h-32 relative bg-slate-50'></div>
                  <div className='static bottom-0 left-0 rounded-b-md bg-white w-full text-center items-center flex justify-center h-12'>name</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} xl={0} xxl={0} lg={0}>
        {/* Carousel component for smaller screens */}
        <Carousel dots={false} slidesToShow={1} slidesToScroll={3} ref={carouselRefOne}>
          {data.map((brand, index) => (
            <div key={index} className='p-2'>
              <div className='relative rounded-md border border-1'>
                <div className='static top-0 left-0 rounded-t-md bg-white w-full text-center items-center flex justify-center h-10'>brands</div>
                <div className='h-24 relative bg-slate-50'></div>
                <div className='static bottom-0 left-0 rounded-b-md bg-white w-full text-center items-center flex justify-center h-10'>name</div>
              </div>
            </div>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
}

export default ProductService;
