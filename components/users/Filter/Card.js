"use client";
import React from 'react';
import { Card, Col, Row, Space, Button, Carousel, Form, Input, Rate, Badge } from 'antd';
import { FaLocationDot } from 'react-icons/fa6';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { MdCall, MdVerified } from 'react-icons/md';
import { BiCategory, BiSolidBusiness } from 'react-icons/bi';
import Image from 'next/image';
import MultiNumber from './MultiNumber';
import Whatsapp from './Whatsapp';
import EnquiryFormModel from './EnquiryFormModal';
import MobileCard from '../home/VerifyBusinessNearMe/mobileCard';
import GetCategory from '@/utils/GetCategory';
import Enquiry1 from '../EnquiryForm/Enquiry1';
import { AspectRatio } from '@mui/joy';

function BusinessCard({ items, index, category }) {
    // const { user } = useAuth();
    const router = useRouter();
    const handleNext = () => {
        router.push(`/userprofile/${items.business_name}?z_id=${items.id}&Cate=${category}`)
    }
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <Row>
            {/* Desktop View  */}
            <Col xs={0} sm={0} md={0} lg={24} xl={24} xxl={24}>
                <Badge.Ribbon text="Authorized Dealer" className={` py-1 font-bold ${items.authorized ? 'visible' : 'hidden'}`}>
                    <Card className=' shadow-md w-full rounded-md relative' onClick={handleNext} hoverable >
                        <Row gutter={12} className=' mt-8'>
                            <Col span={4}>
                                <Carousel slidesToScroll={true} autoplay>
                                    {items.business_images && Array.isArray(items.business_images) && items.business_images.length > 0 ?
                                        items.business_images.map((item, index) => (
                                            item && item.image && Array.isArray(item.image) && item.image.length > 0 ? (
                                                item.image.map((imageItem, imageIndex) => (
                                                    <AspectRatio variant="outlined"
                                                        ratio="4/3" objectFit='contain' key={imageItem.id} minHeight="120px" maxHeight="200px">
                                                        <Image
                                                            fill
                                                            src={imageItem.image}
                                                            loading='lazy'
                                                            sizes='100%'
                                                            className=' object-contain'
                                                            alt={`business-${index}-${imageIndex}`}
                                                        />
                                                    </AspectRatio>
                                                ))
                                            ) : null
                                        ))
                                        :
                                        <AspectRatio variant="outlined"
                                            ratio="4/3" objectFit='contain' minHeight="120px" maxHeight="200px">
                                            <Image src={items.picture} alt='business' fill className=' object-contain' sizes='100%' />
                                        </AspectRatio>
                                    }

                                </Carousel>
                            </Col>
                            <Col span={20}>

                                <Row justify='start' align='middle' gutter={[12, 6]}>
                                    <Col span={24}>
                                        <Row gutter={6} justify='start' align='middle'>
                                            <Col>
                                                <BiSolidBusiness className=' text-2xl text-purple-600' />
                                            </Col>
                                            <Col>
                                                <div className=' text-3xl drop-shadow-md decoration-purple-50 text-green-700 font-serif font-semibold'>
                                                    {items.business_name && items.business_name.length > 28
                                                        ? `${items.business_name.slice(0, 28)}..`
                                                        : items.business_name || ''}
                                                </div>
                                            </Col>
                                            {/* verified condition */}
                                            <Col>
                                                {items.verified ? <MdVerified className=' text-blue-600 text-2xl' /> : null}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row justify='start' align='middle' gutter={8}>
                                            <Col>
                                                <Rate
                                                    style={{ color: '#FF5349', fontSize: '30px' }}
                                                    character="★"
                                                    defaultValue={4}
                                                    disabled />
                                            </Col>
                                            <Col>
                                                <p className='text-green-250 font-semibold'>{items.reviews} Ratings</p>
                                            </Col>
                                            {items.trusted && <Col className='relative'>
                                                <div className=' px-2 rounded-md w-full text-white font-bold text-lg text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.orange.600),theme(colors.fuchsia.600),theme(colors.orange.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                                                    Trusted
                                                </div>
                                            </Col>}

                                            {items.trending && <Col className='relative ml-4' >
                                                <div className=' px-2 rounded-md w-full text-white font-bold text-lg text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'>
                                                    Trending
                                                </div>
                                            </Col>}
                                           

                                        </Row>
                                    </Col>
                                    <Col span={23}>
                                        <Space size={5} align='center' direction='horizontal'>
                                            <BiCategory className=' text-2xl text-blue-600' />
                                            <div className=' text-base font-semibold'><GetCategory business={items} /></div></Space>
                                    </Col>
                                    <Col span={23} onClick={handleNext} >
                                        <div>
                                            <Space align='baseline' size={5} direction='horizontal'>
                                                <FaLocationDot className='text-xl text-red-500' />
                                                <div className=' text-lg font-semibold'>
                                                    {`${items.city || ''} ${items.pincode || ''}`}
                                                </div>
                                            </Space>
                                        </div>
                                    </Col>

                                    <Col span={24}>
                                        <Row justify='space-between' align='bottom'>
                                            <Col>
                                                <Row gutter={24} className=' mt-2'>
                                                    <Col onClick={stopPropagation} >
                                                        <MultiNumber mobileNumbers={items.mobile_numbers} default_Number={items.mobile_number} />
                                                    </Col>
                                                    <Col onClick={stopPropagation}>
                                                        <Whatsapp whatsapp_number={items.whatsapp_number} />
                                                    </Col>
                                                    <Col>
                                                        <div onClick={stopPropagation} className='flex flex-row justify-between '>
                                                            <EnquiryFormModel businessId={items} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className=' absolute w-1/3 bottom-2 right-0'>
                            <Row justify='end' gutter={10} align='middle'>
                                {items.industry_leader && <Col>
                                    <Image src='/profile/tags/Industry.png' alt='Industry Leader' width={70} height={70} />
                                </Col>}
                                {items.super && <Col>
                                    <Image src='/profile/tags/SupperSeller.png' alt='superseller' width={70} height={70} />
                                </Col>}
                                {items.premium && <Col>
                                    <Image src='/profile/tags/Premium.png' alt='superseller' width={70} height={70} />
                                </Col>}
                            </Row>
                            <div className=' flex  justify-end items-end'>
                                <Image src='/barcode/xyz.png' width={200} height={100} className=' w-full' alt='barcode' />
                            </div>

                            <div className=' py-1 px-2 text-center text-md max-w-fit rounded-md font-bold '>GSTIN: {items.GSTIN}</div>
                        </div>
                    </Card>
                </Badge.Ribbon>
            </Col>
            <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                <MobileCard items={items} />
                {index === 4 ? <div className=' p-2'>
                    {items.category && <Enquiry1 id={items.category} getRequire={`best business in  of ${category}`} />}
                </div> : null}
            </Col>
        </Row>
    );
}

export default BusinessCard;
