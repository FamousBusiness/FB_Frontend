"use client";

import { Row, Col, Divider, Button, Form, Input, Avatar, Card, Space, Skeleton } from "antd";
import EmployerCard from "./EmployerCard";
import { PiSuitcaseSimple } from "react-icons/pi";
import { IoLocation } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import ApplyForm from "./ApplyForm";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";


const fetcher = async (url) => {
    try {
        const res = await fetch(url, {
            method: "GET",
        })
        if (res.ok) {
            const data = await res.json();
            return data.data;
        }
        else {
            throw new Error("Couldn't fetch");
        }

    } catch (err) {
        console.error(err);

    }
}

export default function Index() {
    const search = useSearchParams()
    const jobId = search.get('job')
    const companyName = decodeURIComponent(search.get('company'))
    const ckeck = search.get('var');

    const { data, error, isValidating } = useSWR(`https://api.famousbusiness.in/job-api/job-details/?job=${jobId}&company=${companyName}`, fetcher)


    return (<div className=" p-3 sm:p-10">
        <Row justify='center' gutter={[0, 24]}>
            <Col xs={23} sm={23} md={22} lg={22} xl={22} xxl={22}>
                <EmployerCard error={error} data={data} isLoading={isValidating} />
            </Col>
            <Col xs={23} sm={23} md={22} lg={22} xl={22} xxl={22} >
                <Card className=" shadow-lg w-full">
                    <Row >
                        <Col sm={24} xs={24} lg={14} xl={14}>
                            {/* <NextBreadcrumb separator=">" capitalizeLinks={true}/> */}

                            <Row gutter={[0, 24]}>
                                <Col span={23}>
                                    <div className=" text-2xl font-bold font-sans">Job Title</div>
                                </Col>
                                <Col span={22}>
                                    <hr />
                                </Col>
                                <Col span={23}>
                                    <Row gutter={[0, 12]}>
                                        <Col span={22}>
                                            <Space direction='horizontal' align='center' size={4}>
                                                <ImProfile className=' text-blue-400 text-3xl' />
                                                {isValidating ? <Skeleton.Input style={{ width: '80px' }} active /> : data.business_page_jobs[0].position}
                                                <Divider type='vertical' />
                                            </Space>
                                        </Col>
                                        <Col span={22}>
                                            <Space direction='horizontal' align='center' size={4}>
                                                <PiSuitcaseSimple className=' text-blue-500 text-3xl' />  {isValidating ? <Skeleton.Input style={{ width: '80px' }} active /> : data.business_page_jobs[0].experience}
                                                <Divider type='vertical' />
                                                {isValidating ? <Skeleton.Input style={{ width: '80px' }} active /> : data.business_page_jobs[0].salary}
                                            </Space>
                                        </Col>
                                        <Col span={22}>
                                            <Space direction='horizontal' align='center' size={4}>
                                                <IoLocation className='text-3xl text-red-500' />  {isValidating ? <Skeleton.Input style={{ width: '80px' }} active /> : data.business_page_jobs[0].location}
                                            </Space>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={11}>
                                    <Row gutter={[12, 24]} style={{ borderRightWidth: .5, borderColor: 'grey' }}>
                                        <Col span={24}>
                                            <Row gutter={12}>
                                                <Col>
                                                    <p className=" text-xl font-bold"></p>
                                                </Col>
                                                <Col>
                                                    <p className=" text-xl "></p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                {/* Description */}
                                <Col span={23}>
                                    <Row gutter={[12, 24]}>
                                        <Col span={24}>
                                            <div className=" text-2xl font-bold font-sans my-4">Description</div>
                                            <hr />
                                        </Col>
                                        <Col span={23}>
                                            <p className=" text-lg text-slate-500">
                                                {isValidating ? <Skeleton active /> : data.business_page_jobs[0].description}
                                            </p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={24} xs={24} xxl={10} lg={10} xl={10} >
                            <div style={{ background: "rgb(40,200,96)" }} className=" rounded-lg w-full p-6 sticky top-28  border border-1">
                                <Row justify='center' gutter={[0, 12]}>
                                    <Col span={24}>
                                        <div className=" flex flex-col items-center">
                                            <div className=" text-3xl font-extrabold text-white text-center">
                                                Apply For Job
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={23}>
                                        <ApplyForm check={ckeck} jobid={jobId} data={data} isLoading={isValidating} />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>

    )
}