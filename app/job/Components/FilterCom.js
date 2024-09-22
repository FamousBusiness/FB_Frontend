"use client"
import { Col, Row, Select, Skeleton } from 'antd';
import React from 'react';
import useSWR from 'swr';

const fetcher = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
        })
        if (res.ok) {
            const data = await res.json();
            return data.data
        }
        else {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
    }
    catch (err) {
        console.error(err);
    }
}

function Categories({ handleCategoryChange }) {
    // Check if 'option' is defined and an array before mapping

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/job-api/all-job-category/`, fetcher)
    if (!data) {
        return <Skeleton.Input size='large' block active />
    }

    if (error) {
        return <>Error</>
    }

    const options = Array.isArray(data)
        ? data.map((role, index) => ({
            label: role.name,
            value: role.id, // You might want to use a unique identifier as the value
        }))
        : [];

    const handleselect = (values) => {
        console.log(values)
        handleCategoryChange(values)
    }

    return (
        <Select onChange={handleselect} className=' w-full' options={options} placeholder="Category" />
    );
}

export default Categories;
