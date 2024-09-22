"use client";
import { Col, Row, Skeleton } from 'antd'
import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import useSWR from 'swr'
import Image from 'next/image';

function FestivalSection() {
    const fetcher = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                // mode:'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept': 'application/json',
                },
            });
            const data = await response.json();
            // console.log("footer", JSON.stringify(data));
            return data.data;
        } catch (err) {
            console.log(err);
            return null; // Return null or handle the error as needed
        }
    };

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/footer-image/`, fetcher);

    if (!data) {
        return (
            <Row justify='space-between'>
                <Col span={6}><Skeleton.Avatar active shape='circle' size={200} /></Col>
                <Col span={10}><Skeleton paragraph={{ rows: 4 }} /></Col>
                <Col span={6}><Skeleton.Avatar active shape='circle' size={200} /></Col>
            </Row>
        );
    }

    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        <>
            {data && data.length > 0 ? (
                <Row justify='space-around' className=' bg-white' align='middle'>
                    <Col span={6}>
                        {/* <Player
                            style={{
                                height: '300px', width: '300px'
                            }} src={data[0].image} autoplay loop /> */}
                            <Image width={300} height={300} src={data[0].image} alt='first image' />
                    </Col>
                    <Col span={12}>
                        <div className=' flex flex-col justify-center items-center font-bold text-xl h-60 w-full'>
                            <div style={{ color: '#E91E63' }} className=' text-2xl text-center'>
                                {data[0].description}
                            </div>
                        </div>
                    </Col>
                    <Col span={5}>
                        {/* <Player style={{
                            height: '300px', width: '300px'
                        }} src={data[0].image2} autoplay loop /> */}
                        <Image width={300} height={300} src={data[0].image2} alt='first image' />
                    </Col>
                </Row>
            ) : (
                'No data'
            )}
        </>
    );
}

export default FestivalSection;
