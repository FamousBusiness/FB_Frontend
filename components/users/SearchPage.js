"use client"
import React, { useState, useEffect } from 'react';
import { Card, Col, Flex, Row, Skeleton, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Banner from './home/leads/Banner';
import NextBreadcrumb from '../NextBreadcrum';
import BusinessCard from './Filter/Card';
import Enquiry1 from './EnquiryForm/Enquiry1';
import { get_product_by_category_id } from '@/services/Admin/products';
import SearchPageSkeleton from './SearchPageSkeleton';
import CategoryFilter from './Filter/FilterComponent';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';




function SearchPage({ CatName }) {
    const params = useParams();
    const { locationState } = useGlobalState()
    const { user, authTokens } = useAuth()
    const city = decodeURIComponent(params.item[0]);
    const category = decodeURIComponent(params.item[1]);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const City = locationState.city;
    const State = locationState.state;
    // const pincode = locationState.pincode;
    const [visibleItems, setVisibleItems] = useState(10);
    const [filters, setFilters] = useState({});
    const [filteredData, setFilteredData] = useState(null);
    const customSort = (a, b) => {
        // Check for 'authorized', 'verified', and 'trusted' properties in descending order
        if (a.authorized && !b.authorized) {
            return -1;
        } else if (!a.authorized && b.authorized) {
            return 1;
        } else if (a.verified && !b.verified) {
            return -1;
        } else if (!a.verified && b.verified) {
            return 1;
        } else if (a.trending && !b.trending) {
            return -1;
        } else if (!a.trending && b.trending) {
            return 1;
        } else if (a.trusted && !b.trusted) {
            return -1;
        } else if (!a.trusted && b.trusted) {
            return 1;
        } else {
            return 0;
        }
    };

    const fetchMoreData = () => {
        // Increase the number of visible items by 10
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log('page', page);
                const response = await get_product_by_category_id(CatName, City, page);
                setData(response.results);
                setCount(response.count);
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, [CatName, City, page]);


    useEffect(() => {
        if (visibleItems === 100) {
            setPage((prev) => prev + 1);
        }

    }, [visibleItems])

    useEffect(() => {
        if (data) {
            // Apply filters here to the 'data' state
            let filteredData = data.category_wise_business;

            if (filters.trending) {
                filteredData = filteredData.filter((item) => item.trending === true);
            }

            if (filters.authorized) {
                filteredData = filteredData.filter((item) => item.authorized === true);
            }
            // Apply filter for 'topRated'
            if (filters.pincode) {
                filteredData = filteredData.filter(
                    (item) => item.pincode === filters.pincode
                );
            }

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
            filteredData.sort(customSort);

            setFilteredData(filteredData);
        }
    }, [data, filters]);

    const handleFilterChange = (newFilters) => {
        // console.log(newFilters);
        setFilters(newFilters);
    };

    if (error) {
        return <div className='min-h-screen'>Error during data fetch</div>;
    }

    if (!data) {
        return <div><SearchPageSkeleton /></div>;
    }
    return (
        <Row justify='center' gutter={[12, { xs: 8, sm: 8, md: 10, lg: 12, xl: 24, xxl: 24 }]} >
            <Col sm={24} xs={24} md={24} lg={23} xl={23} xxl={23}>
                {data.category_wise_banner && data.category_wise_banner.length > 0 || data.side_images && data.side_images.length > 0 ? <Banner side={data.side_images} banner={data.category_wise_banner} /> : null}
            </Col>

            <Col sm={0} xs={0} md={0} lg={23} xl={23} xxl={23}>
                <Row  gutter={7} align='middle'>
                    <Col >
                        <NextBreadcrumb separator=">" capitalizeLinks={true} />
                    </Col>
                    <Col className=' font-semibold pb-1'>
                        &gt;{count}
                    </Col>
                </Row>
            </Col>

            <Col span={23}>
                <p className=" xl:text-2xl sm:text-lg md:text-xl font-semibold ">Verified {category} in {city}</p>
            </Col>

            <Col sm={0} xs={0} md={0} lg={23} xl={23} xxl={23} >
                <div>
                    <CategoryFilter onFilterChange={handleFilterChange} />
                </div>
            </Col>

            <Col span={24}>
                <Row gutter={12} justify='space-between'>
                    <Col sm={24} xs={24} md={18} lg={18} xl={18} xxl={18} className=' overflow-hidden'>
                        <InfiniteScroll
                            dataLength={visibleItems}
                            next={fetchMoreData}
                            hasMore={filteredData && visibleItems < filteredData.length}
                            loader={
                                <Card>
                                    <Row gutter={[12, 12]}>
                                        <Col span={7}>
                                            <Skeleton.Avatar shape='square' size={150} active />
                                        </Col>
                                        <Col span={17}>
                                            <Flex justify='space-between' vertical gap={6}>
                                                <Skeleton paragraph={{
                                                    rows: 2
                                                }} />
                                                <Row justify='space-between' align='middle'>
                                                    <Col span={7}>
                                                        <Skeleton.Button block active />
                                                    </Col>
                                                    <Col span={7}>
                                                        <Skeleton.Button block active />
                                                    </Col>
                                                    <Col span={7}>
                                                        <Skeleton.Button block active />
                                                    </Col>
                                                    <Col span={7}>
                                                        <Skeleton.Button block active />
                                                    </Col>
                                                </Row>
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Card>
                            }>

                            <Row justify='center' className=' p-1' gutter={[0, { xs: 8, sm: 8, md: 24, lg: 24, xl: 24, xxl: 24 }]}>
                                {filteredData && Array.isArray(filteredData) && filteredData.slice(0, visibleItems).map((item, index) => (
                                    <Col span={24} key={item.id}>
                                        <BusinessCard items={item} index={index} category={category} />
                                    </Col>
                                ))}
                            </Row>
                        </InfiniteScroll>
                    </Col>

                    <Col sm={0} xs={0} md={0} lg={6} xl={6} xxl={6} >
                        <div className=' w-full sticky top-28'>
                            <Enquiry1 getRequire={`Verified ${category} in ${city}`} />
                        </div>
                    </Col>
                    
                </Row>
            </Col>
        </Row>

    );
}

export default SearchPage;
