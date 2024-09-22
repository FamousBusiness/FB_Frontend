"use client"
import React, { useState, useEffect } from 'react';
import { Col, Result, Row, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchPageSkeleton from '../SearchPageSkeleton';
import NextBreadcrumb from '@/components/NextBreadcrum';
import CategoryFilter from '../Filter/FilterComponent';
import BusinessCard from '../Filter/Card';
import Enquiry1 from '../EnquiryForm/Enquiry1';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';


function Anything({ slug }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [visibleItems, setVisibleItems] = useState(10);
    const [filters, setFilters] = useState({});
    const [filteredData, setFilteredData] = useState(null);
    const {locationState}=useGlobalState()
    const fetchMoreData = () => {
        // Increase the number of visible items by 10
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/page-search/${slug}/?city=${locationState.city}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    // If the response is not successful, throw an error
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                // console.log("SearchAny", data);
                setData(data.results.data);
            } catch (error) {
                // Handle errors here
                setError(error.message);
                // You can perform additional error handling/logging as needed
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [slug, locationState.city]);


    useEffect(() => {
        if (data) {
            // Apply filters here to the 'data' state
            let filteredData = data.business_data;

            // // Apply filter for 'sort'
            // if (filters.sort) {
            //     // Apply sorting logic
            //     // Example: Sort by 'name' field in ascending order
            //     filteredData = filteredData.sort((a, b) =>
            //         a.name.localeCompare(b.name)
            //     );
            // }

            if (filters.trending) {
                filteredData = filteredData.filter((item) => item.trending === true);
            }

            if (filters.authorized) {
                filteredData = filteredData.filter((item) => item.authorized === true);
            }
            // Apply filter for 'topRated'
            // if (filters.topRated) {
            //     filteredData = filteredData.filter(
            //         (item) => item.isTopRated === true
            //     );
            // }

            // Apply filter for 'verified'
            if (filters.verified) {
                filteredData = filteredData.filter(
                    (item) => item.verified === true
                );
            }

            // Apply filter for 'ratings'
            if (filters.ratings) {
                filteredData = filteredData.filter(
                    (item) => item.rating >= filters.ratings
                );
            }

            // Apply filter for 'trusted'
            if (filters.trusted) {
                filteredData = filteredData.filter(
                    (item) => item.trusted === true
                );
            }

            // Set the filtered data to a new state variable or update 'data' with filtered results
            // For instance, if you have a separate state variable for filtered data:
            setFilteredData(filteredData);
        }
    }, [data, filters]);



    const handleFilterChange = (newFilters) => {
        // console.log(newFilters);
        setFilters(newFilters);
    };

    if (error) {
        return <div className='min-h-screen'>
            <Result status='error' >
            </Result>
        </div>;
    }
    if (!data) {
        return <div><SearchPageSkeleton /></div>;
    }
    return (
        <Row justify='center' gutter={[12, { xs: 8, sm: 8, md: 10, lg: 12, xl: 24, xxl: 24 }]} >
            <Col sm={0} xs={0} md={0} lg={23} xl={23} xxl={23}>
                <Row gutter={7} align='middle'>
                    <Col>
                        <NextBreadcrumb separator=">" capitalizeLinks={true} />
                    </Col>
                    <Col className=' font-semibold pb-1'>
                        {data.business_data && data.business_data.length > 0 ? `>${data.business_data.length}+` : null}
                    </Col>
                </Row>
            </Col>
            <Col span={23}>
                {/* <p className=" xl:text-2xl sm:text-lg md:text-xl font-semibold "> {slug}</p> */}
            </Col>
            <Col sm={0} xs={0} md={0} lg={23} xl={23} xxl={23} >
                <div>
                    <CategoryFilter onFilterChange={handleFilterChange} />
                </div>
            </Col>
            <Col span={24}>
                <Row gutter={12} justify='space-between'>
                    <Col sm={24} xs={24} md={24} lg={18} xl={18} xxl={18} className=' overflow-hidden'>
                        <InfiniteScroll
                            dataLength={visibleItems}
                            next={fetchMoreData}
                            hasMore={data && filteredData && visibleItems < filteredData.length}
                            loader={
                                <Skeleton
                                    avatar={{ size: 'large', shape: 'square' }}
                                    paragraph={{
                                        rows: 3,
                                    }}
                                    active
                                />
                            }
                        >
                            <Row justify='center' className=' p-2' gutter={[0, { xs: 4, sm: 4, md: 4, lg: 24, xl: 24, xxl: 24 }]}>
                                {data && filteredData && Array.isArray(filteredData) && filteredData.slice(0, visibleItems).map((item, index) => (
                                    <Col span={24} key={item.id}>
                                        <BusinessCard items={item} index={index} />
                                    </Col>
                                ))}
                            </Row>
                        </InfiniteScroll>
                    </Col>
                    <Col sm={0} xs={0} md={0} lg={6} xl={6} xxl={6} >
                        <div className=' w-full sticky top-28'>
                            <Enquiry1 />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>

    );
}

export default Anything;
