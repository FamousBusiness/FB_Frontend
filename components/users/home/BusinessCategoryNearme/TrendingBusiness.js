
"use client"
import React from 'react';
import { get_all_categories } from '@/services/Admin/category';
import { Col, Row, Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import AllCategory from './AllCategory';
import useSWR from 'swr';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
// import { EnvironmentMode } from '@/components/environment';




function TrendingBusiness() {
    const { locationState } = useGlobalState();

    // const apiUrl = environmentMode() // API URL
    
    const { data: categories, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/category/`, async (url) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data.data;
    }, {
        revalidateIfStale: true,
        revalidateOnMount: true,
        compare: (a, b) => {
            // Check if the data has changed
            return JSON.stringify(a) === JSON.stringify(b);
        },
    });


    // Handle loading state
    if (!categories && !error) {
        return <div>
            <Row justify='center'>
                <Col xl={23} lg={23} xxl={23} sm={0} md={0} xs={0}>
                    <Row gutter={[24, 24]}>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                        <Col span={4} className=' text-center '><Skeleton.Avatar shape='circle' active size={150} /></Col>
                    </Row>
                </Col>

                <Col xl={0} lg={0} xxl={0} sm={23} md={23} xs={23}>
                    <Row gutter={[24, 24]}>
                        <Col span={8} className=' text-center '><Skeleton.Avatar size={80} shape='square' active /></Col>
                        <Col span={8} className=' text-center '><Skeleton.Avatar size={80} shape='square' active /></Col>
                        <Col span={8} className=' text-center '><Skeleton.Avatar size={80} shape='square' active /></Col>
                        <Col span={8} className=' text-center '><Skeleton.Avatar size={80} shape='square' active /></Col>
                        <Col span={8} className=' text-center '><Skeleton.Avatar size={80} shape='square' active /></Col>
                        <Col span={8} className=' text-center '><Skeleton.Avatar size={80} shape='square' active /></Col>

                    </Row>

                </Col>
            </Row>
        </div>
    }

    // Handle error
    if (error) {
        return <div>Error loading data</div>;
    }
    const trendingCategories = categories.filter(c => c.trending === true);
    return (
        <Row gutter={[24, 24]}>
            {trendingCategories.slice(0, 11).map((item, index) => (
                <Col key={item.id} xs={0} sm={0} md={4} lg={4} xl={4} xxl={4}>
                    <Link
                        href={`/famous/[locationName]/[type]`}
                        as={`/famous/${locationState.city}/${item.type}?cat_id=${item.id}&cat_name=${item.type}`}
                    >
                        <div className=' flex flex-col justify-center items-center'>
                            <div className=' flex flex-col h-32 w-32 overflow-hidden  p-4 hover:shadow-2xl duration-100 bg-white hover:bg-green-500 rounded-full border border-1 items-center justify-center'>
                                <Image src={item.image} width={100} height={100} style={{ objectFit: 'contain', height: 'auto', width: 'auto' }} alt={item.type} />
                            </div>
                            <div className=' mt-2 text-center font-bold text-base'>{item.type}</div>
                        </div>
                    </Link>
                </Col>
            ))}


            {categories.length > 17 && <Col xs={0} sm={0} md={4} lg={4} xl={4} xxl={4}>
                <div className=' flex flex-col justify-center items-center'>
                    <AllCategory categories={categories} />
                    <div className=' mt-2 text-blue-600 font-bold text-center text-base'>All</div>
                </div>
            </Col>}

            {trendingCategories.slice(0, 6).map((item) =>
                <Col key={item.id} xs={8} sm={8} md={0} lg={0} xl={0} xxl={0}>
                    <Link
                        href={`/famous/[locationName]/[type]`}
                        as={`/famous/${locationState.city}/${item.type}?cat_id=${item.id}&cat_name=${item.type}`}
                    >
                        <div className=' w-full shadow-md border border-1 rounded-md flex flex-col justify-center items-center'>
                            <div className=' h-24 w-24 '>
                                <Image src={item.image} width={100} height={100} style={{ objectFit: 'fill', height: 'auto', width: 'auto' }} alt={item.type} />
                            </div>
                            <div style={{ fontSize: 12 }} className=' mt-0 bg-blue-600 w-full rounded-br-md rounded-bl-md text-white items-center text-center font-semibold'>{item.type.length > 12 ? item.type.substring(0, 12) : item.type}</div>
                        </div>
                    </Link>
                </Col>)}

            {categories.length > 6 && <Col xs={24} sm={24} md={0} lg={0} xl={0} xxl={0}>
                <Row justify='center'>
                    <Col span={8}><AllCategory categories={categories} /></Col>
                </Row>

            </Col>}

        </Row>
    );
}

export default TrendingBusiness;



