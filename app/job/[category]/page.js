"use client";
import React, { useState } from 'react';
import { Button, Card, Col, Divider, Drawer, Empty, Row, Space } from 'antd';
import SideFilter from '../Components/SideFilter';
import { FilterOutlined } from '@ant-design/icons';
import JobCard from '../Components/JobCard';
import { useParams, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { GetAllJobs } from '@/services/Admin/Jobs';

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

function Page() {
    const search = useSearchParams();
    const params = useParams();
    const id = search.get('job');
    console.log(search.get('job'), params.category);
    const [open, setOpen] = useState(false);
    const { data, error, isValidating: isLoading } = useSWR(`https://api.famousbusiness.in/job-api/category-wise-job/${id}/`, fetcher);
    const array = Array.from({ length: 18 }, (_, i) => i + 1); // An array with 18 elements

    const { Busines_Page_Jobs, brand_jobs } = data || {};
    // const combinedJobs = (brand_jobs || []).concat(Busines_Page_Jobs || []);

    return (
        <div className='p-2 sm:p-10 relative'>
            <div className="bg-white sm:invisible fixed top-0 p-2 flex justify-end items-end shadow-xl w-full right-4 z-50">
                <Button onClick={() => setOpen(true)} shape='circle' icon={<FilterOutlined />} />
            </div>
            <Row justify='center' gutter={[12, 12]} className='relative'>
                <Col md={16} lg={16} xxl={16} sm={22} xs={22} xl={16}>
                    <Row gutter={12}>
                        <Col sm={0} xs={0} xxl={8} md={8} lg={8} xl={8} className='relative'>
                            <div className='sticky top-4'>
                                <Card className='shadow-xl' bordered>
                                    <SideFilter />
                                </Card>
                            </div>
                        </Col>
                        <Col lg={16} md={16} xxl={16} sm={24} xs={24} xl={16}>
                            {/* business wise jobs  */}
                            <Row gutter={[0, 12]}>
                                {isLoading
                                    ? array.map((index) => (
                                        <Col key={index} span={24}>
                                            <Card className=' h-20' style={{ borderRadius: "20px" }} loading={isLoading} />
                                        </Col>
                                    ))
                                    : error || (!isLoading && (!Busines_Page_Jobs || Busines_Page_Jobs.length === 0))
                                        ? <Col span={24}><Empty description="No jobs available" /></Col>
                                        : Busines_Page_Jobs.map((job) => (
                                            <Col key={job.id} span={24}>
                                                <JobCard brand={false} className='shadow-xl' job={job} />
                                            </Col>
                                        ))}
                                {/* brand wise jobs */}
                                {isLoading
                                    ? array.map((index) => (
                                        <Col key={index} span={24}>
                                            <Card className=' h-20' style={{ borderRadius: "20px" }} loading={isLoading} />
                                        </Col>
                                    ))
                                    : error || (!isLoading && (!brand_jobs || brand_jobs.length === 0))
                                        ? null
                                        : brand_jobs.map((job) => (
                                            <Col key={job.id} span={24}>
                                                <JobCard brand={true} className='shadow-xl' job={job} />
                                            </Col>
                                        ))}
                            </Row>

                            {/* Map Business_Page_Jobs */}
                            {/* */}

                        </Col>
                    </Row>
                </Col>
            </Row>

            <Drawer
                title="Filter"
                closable={false}
                onClose={() => setOpen(false)}
                open={open}
            >
                <SideFilter />
            </Drawer>
        </div>
    );
}

export default Page;
