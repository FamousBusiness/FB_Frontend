import React, { useRef, useState } from 'react';
import { Avatar, Button, Card, Carousel, Col, Drawer, Empty, Flex, Row, Skeleton, Typography } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import useSWR from 'swr';
import { GetAllJobs } from '@/services/Admin/Jobs';
const { Paragraph } = Typography; Typography

function CategoryWiseCon({ style }) {
    const [open, setOpen] = useState(false);
    const carouselRefOne = useRef();
    const { data, error, isValidating } = useSWR('https://api.famousbusiness.in/job-api/all-job-category/', GetAllJobs);
    if (error) {
        return <div>Error</div>;
    }
    const renderJobCategories = (isLoading, size) => {
        const array = Array.from({ length: 12 }, (_, i) => i + 1); // An array with 12 elements

        if (isLoading) {
            return array.map((index) => (
                <div key={index} className='p-2'>
                    <Card style={{ borderRadius: '20px', borderWidth: 1, borderColor: 'gray' }} hoverable bordered>
                        <Flex justify='center' align='center' vertical gap={5}>
                            <Skeleton.Avatar active shape='circle' />
                            <Skeleton paragraph={{ rows: 1 }} active />
                        </Flex>
                    </Card>
                </div>
            ));
        }

        if (!data || data.length === 0) {
            return <Empty description="No job categories available" />;
        }

        return data.slice(0, 10).map((item) => (
            <div key={item.id} className='p-2'>
                <Link href={`/job/[category]`} as={`/job/${item.name}?job=${item.id}`}>
                    <Card style={{ borderRadius: '20px' }} hoverable bordered={true}>
                        <Flex justify='center' align='center' vertical gap={5}>
                            <Avatar src={item.image} icon={<UserOutlined />} size={size} />
                            <Paragraph ellipsis={{ rows: 1 }}>{item.name}</Paragraph>
                        </Flex>
                    </Card>
                </Link>
            </div>
        ));
    };
    const handleNextOne = () => {
        carouselRefOne.current.next();
    };

    const handlePrevOne = () => {
        carouselRefOne.current.prev();
    };

    return (
        <>
            <Card style={{ borderRadius: '20px' }} className={style} bordered>
                <Row className='mb-10' justify='space-between'>
                    <Col>
                        <p className='sm:text-2xl'>Jobs Categories({data && `${data.length}`})</p>
                    </Col>
                    <Col>
                        <Button onClick={() => setOpen(true)} type='link'><p className='sm:text-2xl'>View All</p></Button>
                    </Col>
                </Row>

                <Col xl={24} md={24} xxl={24} sm={0} xs={0} lg={24}>
                    <div className=' relative'>
                        <div className=' absolute w-full top-1/2 left-0 z-10'>
                            <Flex justify='space-between' align='center'>
                                <ArrowLeftOutlined onClick={handlePrevOne} className=' bg-slate-100 backdrop-filter  rounded-full p-2 border border-1 cursor-pointer hover:-translate-x-1 duration-100 hover:shadow-md hover:bg-slate-200 ' />
                                <ArrowRightOutlined onClick={handleNextOne} className=' bg-slate-100 backdrop-filter  rounded-full p-2 border border-1 cursor-pointer hover:translate-x-1 duration-100 hover:shadow-md hover:bg-slate-200 ' />
                            </Flex>
                        </div>
                        <Carousel ref={carouselRefOne} infinite swipeToSlide dots={false} slidesToShow={5} centerMode centerPadding='30px'>
                            {renderJobCategories(isValidating, 100)}
                        </Carousel>
                    </div>
                </Col>
                <Col xl={0} md={0} xxl={0} sm={24} xs={24} lg={0}>
                    <Carousel draggable dots={false} className='ml-2' effect='scrollx' infinite={false} centerMode={false} touchThreshold={10} speed={500} swipeToSlide={true} slidesToScroll={1} slidesToShow={2.4}>
                        {renderJobCategories(isValidating, 50)}
                    </Carousel>
                </Col>
            </Card>

            <Drawer open={open} title="All Categories" closable={true} onClose={() => setOpen(false)}>
                {data && data.length > 0 &&
                    <Row justify='space-around' align='middle' gutter={[0, 12]}>
                        {data.map((item) => (
                            <Col span={22} key={item.id}>
                                <Link href={`/job/[category]`} as={`/job/${item.name}?job=${item.id}`}>
                                    <Flex align='center' gap={5}>
                                        <Avatar src={item.image} icon={<UserOutlined />} size={50} />
                                        <Paragraph ellipsis={{ rows: 1 }}>{item.name}</Paragraph>
                                    </Flex>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                }
                {!data || data.length === 0 && <Empty description="No job categories available" />}
            </Drawer>
        </>
    );
}

export default CategoryWiseCon;
