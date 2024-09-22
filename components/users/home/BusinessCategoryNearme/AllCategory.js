


"use client"
import React, { useState } from 'react';
import { Drawer, Row, Col, Input } from 'antd';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import { Player } from '@lottiefiles/react-lottie-player';
import { RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const AllCategory = ({ categories }) => {
    const { locationState } = useGlobalState();
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (input) => {
        setSearchInput(input);
    };

    const filteredCategories = categories.filter((item) =>
        item.type.toLowerCase().includes(searchInput.toLowerCase())
    );

    const b2bCategories = filteredCategories.filter(item => item.B2B2C === "B2B");
    const b2cCategories = filteredCategories.filter(item => item.B2B2C === "B2C");

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Row>
                <Col xs={0} md={0} sm={0} lg={24} xl={24} xxl={24}>
                    <div onClick={showDrawer} className=' flex flex-col bg-slate-100 h-14 w-14 lg:h-32 lg:w-32 xl:h-32 xl:w-32 sm:h-10 sm:w-10 p-2 hover:shadow-2xl duration-100 hover:bg-green-500 rounded-full border border-1 items-center justify-center'>
                        <Player src='/CategoryNearMe/More.json' hover={true} style={{ objectFit: 'fill', height: 'auto', width: 'auto' }} />
                    </div>
                </Col>
                <Col xs={24} md={24} sm={24} lg={0} xl={0} xxl={0}>
                    <Row justify='center' onClick={showDrawer} className=' py-1 text-center bg-blue-500 text-white rounded-full'>
                        <Col>More</Col><Col><RightOutlined /></Col>
                    </Row>
                </Col>
            </Row>

            <Drawer size='large' title="All Category" placement="right" width='80%' onClose={onClose} open={open}>
                <Row justify='space-between' gutter={[0, 12]}>
                    <Col span={24}>
                        <Row justify='end'>
                            <Col sm={22} xs={22} xxl={12} lg={12} xl={12}>
                                <Input.Search
                                    type='primary'
                                    size='large'
                                    placeholder="Search categories..."
                                    onChange={(e) => handleSearch(e.target.value)}
                                    value={searchInput}
                                    style={{ marginBottom: '16px' }}
                                />
                            </Col>
                        </Row>
                    </Col>

                    {/* Section for B2C categories */}
                    <Col span={24}>
                        <Row align='middle' justify='space-between' gutter={[0, 12]}>
                            <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                                <h2 className=' text-2xl py-2 font-semibold text-green-600 drop-shadow-lg'>India leading B2C Supply Chain</h2>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                                <h2 className=' text-base py-2 font-semibold text-green-600 drop-shadow-lg'>India leading B2C Supply Chain</h2>
                            </Col>
                            <Col span={24}>
                                <hr className=' mb-2 ' />
                            </Col>
                            {b2cCategories.map((item) => (
                                <Col xl={8} xxl={8} lg={8} sm={22} md={22} xs={22} key={item.id}>
                                    <Link
                                        href={`/famous/[locationName]/[type]`}
                                        as={`/famous/${locationState.city}/${item.type}?cat_id=${item.id}&cat_name=${item.type}`}
                                    >
                                        <Row justify='start' align='middle' gutter={[{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 }, 0]}>
                                            <Col>
                                                <div className='relative border p-1 border-1 overflow-hidden h-14 w-14 rounded-full '>
                                                    <Image
                                                        src={item.image}
                                                        fill
                                                        sizes='100%'
                                                        className='object-contain '
                                                        alt={item.type}
                                                    />
                                                </div>
                                            </Col>
                                            <Col className=' hover:translate-x-1 duration-75 text-gray-600 font-semibold'>{item.type}</Col>
                                        </Row>

                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Section for B2B categories */}
                    <Col span={24}>

                        <Row align='middle' gutter={[0, 12]} justify='space-between'>
                            <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                                <h2 className=' text-2xl py-2 font-semibold text-green-600 drop-shadow-lg'>India leading B2B Supply Chain</h2>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                                <h2 className=' text-base py-2 font-semibold text-green-600 drop-shadow-lg'>India leading B2B Supply Chain</h2>
                            </Col>
                            <Col span={24}>
                                <hr className=' mb-2 ' />
                            </Col>

                            {b2bCategories.map((item) => (
                                <Col xl={8} xxl={8} lg={8} sm={22} md={22} xs={22} key={item.id}>
                                    <Link
                                        href={`/famous/[locationName]/[type]`}
                                        as={`/famous/${locationState.city}/${item.type}?cat_id=${item.id}&cat_name=${item.type}`}
                                    >
                                        <Row justify='start' align='middle' gutter={[{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 }, 0]}>
                                            <Col>
                                                <div className='relative overflow-hidden p-1 h-14 w-14 border border-1 rounded-full '>
                                                    <Image
                                                        src={item.image}
                                                        fill
                                                        sizes='100%'
                                                        className='object-contain '
                                                        alt={item.type}
                                                    />
                                                </div>
                                            </Col>
                                            <Col className=' hover:translate-x-1 duration-75 text-gray-600 font-semibold'>{item.type}</Col>
                                        </Row>

                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Col>


                </Row>
            </Drawer>
        </>
    );
};

export default AllCategory;
