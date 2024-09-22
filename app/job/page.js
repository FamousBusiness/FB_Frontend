"use client";
import { ArrowLeftOutlined, ArrowRightOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Player } from '@lottiefiles/react-lottie-player';
import { Row, Col, Badge, Card, Avatar, Space, Divider, Carousel, Flex, Spin, Empty, Input } from 'antd'
import Title from 'antd/es/typography/Title'
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react'
import useSWR from 'swr';
import { GetAllJobs } from '@/services/Admin/Jobs';
import CategoryWiseCon from './Components/CategoryWiseCon';
import JobCard from './Components/JobCard';
function Page() {
    const carouselRefOne = useRef();
    const carouselRefTwo = useRef();
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/job-api/all-job/`, GetAllJobs);
    if (!data) {
        return <div className=' flex justify-center min-h-screen items-center'>
            <Spin indicator={<LoadingOutlined spin className=' text-xl bg-white rounded-full shadow-md' />} />
        </div>
    }
    if (error) {
        return <div>Error to fetch data</div>
    }

    const handleNextOne = () => {
        carouselRefOne.current.next();
    };

    const handlePrevOne = () => {
        carouselRefOne.current.prev();
    };

    const handleNextTwo = () => {
        carouselRefTwo.current.next();
    };

    const handlePrevTwo = () => {
        carouselRefTwo.current.prev();
    };
    return (
        <div className=' sm:p-6 relative'>
            <Row className=' sm:p-10' justify='center' gutter={[12, 12]}>
                <Col span={23}>
                    <Row justify='center' gutter={12}>
                        <Col sm={0} xs={0} md={0} xxl={4} xl={4} lg={4}>
                            <Link href='job/employerdash' prefetch>
                                <div className="w-full border border-1 hover:bg-orange-400 hover:text-white duration-300 rounded-lg h-44 flex flex-col justify-center items-center ">
                                    <Image src='/jobs/employer.svg' width={200} height={200} alt='employer' />
                                    <div className=' flex flex-col items-center'>
                                        <div className=' text-lg font-bold hover:text-white'>Employer Dash</div>
                                    </div>

                                </div>
                            </Link>
                        </Col>
                        <Col sm={0} xs={0} md={0} xxl={16} xl={16} lg={16}>
                            <div className=' flex flex-col items-center bg-slate-100 rounded-lg  h-44 justify-center'>

                            </div>
                        </Col>

                        <Col sm={0} xs={0} md={0} xxl={4} xl={4} lg={4} >
                            <Link href='/job/employeedash' prefetch>
                                <div className="w-full border border-1 hover:bg-orange-400 hover:text-white duration-300 rounded-lg h-44 flex flex-col justify-center items-center ">
                                    <Image src='/jobs/employee.svg' width={180} height={180} alt='employer' />
                                    <div className=' flex flex-col items-center'>
                                        <div className=' text-lg font-bold hover:text-white'>Employee Dash</div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                {/* <Col span={23}>
                    <Row align='middle' justify='space-between' gutter={12}>
                        <Col xs={6} sm={8} md={6} lg={8} xl={4} >
                            <Link href='job/postjob'><div className=' py-2 w-full border border-1 h-16 items-center flex justify-center bg-indigo-500 text-white font-bold text-center rounded-xl duration-200 text-2Xl ' >Post Job</div></Link>
                        </Col>
                        <Col xs={12} sm={8} md={6} lg={8} xl={12} className='text-center'>
                            <Title level={2} >Choose a Job Type</Title>
                        </Col>
                        <Col xs={6} sm={8} md={6} lg={8} xl={4} >
                            <Link href='job/view'><div className=' py-2 w-full border border-1 h-16 items-center flex justify-center bg-indigo-500 text-white font-bold text-center rounded-xl duration-200 text-2Xl ' >View All Job</div></Link>
                        </Col>
                    </Row>
                </Col> */}
                {/* <Col span={24}>
                    <div className=' p-4 rounded-md bg-white shadow-gray-200 sticky z-10 duration-150 top-0 w-full'>
                        <FilterCom option={job_roles} />
                    </div>
                </Col> */}

                {/* <Col lg={6} xl={6} md={6} xxl={6} sm={0} xs={0}>
                    <Card ></Card>
                </Col> */}

                {/* Category */}
                <Col sm={22} xs={22} lg={20} xxl={20} md={20} xl={20}>
                    <CategoryWiseCon />
                </Col>
                {/* Categories */}


                {/* Middle part */}
                <Col sm={22} xs={22} lg={20} xxl={20} md={20} xl={20}>
                    <Row gutter={[0, 20]}>
                        {/* Listed Business Jobs */}
                        <Col span={24}>
                            <Card style={{ borderRadius: "20px" }} className=' sm:shadow-xl'>
                                <Row className=' mb-10' justify='space-between'>
                                    <Col>
                                        <p className=' sm:text-2xl'>Listed Business Jobs({data && data.Busines_Page_Jobs && `${data.Busines_Page_Jobs.length}`})</p>
                                    </Col>
                                    <Col>
                                        <Link href='/job/businessjobs'><p className=' sm:text-2xl'>View All</p></Link>
                                    </Col>
                                </Row>
                                <Row>
                                    {/* Desktop view  */}
                                    <Col xs={0} sm={0} lg={24} xl={24} md={24} xxl={24}>
                                        {data && data.Busines_Page_Jobs && data.Busines_Page_Jobs.length > 0 ? <div className=' relative  flex-row'>
                                            <div className=' absolute w-full top-1/2 left-0 z-10'>
                                                <Flex justify='space-between' align='center'>
                                                    <ArrowLeftOutlined onClick={handlePrevTwo} className=' bg-slate-100 rounded-full p-2 border border-1 cursor-pointer hover:-translate-x-1 duration-100 hover:shadow-md hover:bg-slate-200 ' />
                                                    <ArrowRightOutlined onClick={handleNextTwo} className=' bg-slate-100 rounded-full p-2 border border-1 cursor-pointer hover:translate-x-1 duration-100 hover:shadow-md hover:bg-slate-200 ' />
                                                </Flex>
                                            </div>
                                            <div>
                                                <Carousel ref={carouselRefTwo} infinite={false} swipeToSlide={true} dots={false} slidesToShow={data.Busines_Page_Jobs.length >= 3 ? 3 : data.Busines_Page_Jobs.length} >
                                                    {data.Busines_Page_Jobs.map((job, index) => {
                                                        return (
                                                            <div key={job.id} className=' p-2 text-white'>
                                                                <JobCard brand={false} className='shadow-lg min-w-full' job={job} />
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                        </div> : "no data"}
                                    </Col>
                                    {/* Mobile View */}
                                    <Col xs={24} sm={24} lg={0} xl={0} md={0} xxl={0}>
                                        {data && data.Busines_Page_Jobs && data.Busines_Page_Jobs.length > 0 ?
                                            <Carousel draggable dots={false} className=' ml-2' effect='scrollx' infinite={false} centerMode={false} touchThreshold={10} speed={500} swipeToSlide={true} slidesToScroll={1} slidesToShow={1.4}>
                                                {data.Busines_Page_Jobs.map((job, index) => {
                                                    return (
                                                        <div key={job.id} className=' p-2'>
                                                            <JobCard brand={false} job={job} />
                                                        </div>
                                                    )
                                                })}
                                            </Carousel> : "No data"}
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        {/* Listed Business Jobs */}
                    </Row>
                </Col>


                <Col sm={22} xs={22} lg={20} xxl={20} md={20} xl={20}>
                    <Row gutter={[0, 20]}>


                        {/* Listed Brands Jobs */}
                        {data && data.Brand_Job_Post && data.Brand_Job_Post.length > 0 ? <Col span={24}>
                            <Card style={{ borderRadius: "20px" }} className=' sm:shadow-xl'>
                                {/* <Row className=' mb-10' justify='space-between'>
                                    <Col>
                                        <p className=' sm:text-2xl'>Listed Business Jobs({Busines_Page_Jobs && `${Busines_Page_Jobs.length}`})</p>
                                    </Col>

                                    <Col>
                                        <Link href='/job/businessjobs'><p className=' sm:text-2xl'>View All</p></Link>
                                    </Col>
                                </Row> */}
                                <Row>
                                    {/* Desktop view  */}
                                    <Col xs={0} sm={0} lg={24} xl={24} md={24} xxl={24}>
                                        <div className=' relative  flex-row'>
                                            <div className=' absolute w-full top-1/2 left-0 z-10'>
                                                <Flex justify='space-between' align='center'>
                                                    <ArrowLeftOutlined onClick={handlePrevOne} className=' bg-slate-100 rounded-full p-2 border border-1 cursor-pointer hover:-translate-x-1 duration-100 hover:shadow-md hover:bg-slate-200 ' />
                                                    <ArrowRightOutlined onClick={handleNextOne} className=' bg-slate-100 rounded-full p-2 border border-1 cursor-pointer hover:translate-x-1 duration-100 hover:shadow-md hover:bg-slate-200 ' />
                                                </Flex>
                                            </div>
                                            <div>
                                                <Carousel ref={carouselRefTwo} infinite={true} swipeToSlide={false} dots={false} slidesToShow={data && data.Brand_Job_Post.length > 3 ? 4 : data.Brand_Job_Post.length} centerMode>
                                                    {data.Brand_Job_Post.map((job, index) => {
                                                        return (
                                                            <div key={job.id} className=' p-2 text-white'>
                                                                <JobCard brand={true} className='shadow-xl min-w-full' job={job} />
                                                            </div>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                        </div>
                                    </Col>
                                    {/* Mobile View */}
                                    <Col xs={24} sm={24} lg={0} xl={0} md={0} xxl={0}>
                                        {data.Brand_Job_Post && data.Brand_Job_Post.length > 0 ?
                                            <Carousel draggable dots={false} className=' ml-2' effect='scrollx' infinite={false} centerMode={false} touchThreshold={10} speed={500} swipeToSlide={true} slidesToScroll={1} slidesToShow={1.4}>
                                                {data.Brand_Job_Post.map((job, index) => {
                                                    return (
                                                        <div key={job.id} className=' p-2'>
                                                            <JobCard job={job} brand={true} />
                                                        </div>
                                                    )
                                                })}
                                            </Carousel> : "No data"}
                                    </Col>
                                </Row>
                            </Card>
                        </Col> : null}
                        {/* Listed Business Jobs */}
                    </Row>
                </Col>


            </Row>
        </div>
    )
}

export default Page