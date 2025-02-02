import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Carousel, Col, Collapse, Rate, Row, Flex, Space, Avatar, Tag, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BiSolidBusiness, BiCategory } from 'react-icons/bi'
import { BsHeadset } from 'react-icons/bs'
import { FaLocationDot, FaMapLocation, FaShare } from 'react-icons/fa6'
import { HiDocumentText } from 'react-icons/hi'
import { IoLogoWhatsapp } from 'react-icons/io'
import { IoShieldCheckmarkSharp } from 'react-icons/io5'
import { MdMail, MdVerified } from 'react-icons/md'
import { SiSpringsecurity } from 'react-icons/si'
import MultiNumber from '../Filter/MultiNumber'
import EnquiryFormModel from '../Filter/EnquiryFormModal'
import { useAuth } from '@/context/AuthContext'
import Like from '@/utils/Like'
import RatingReview from '@/utils/RatingReview';
import UserReview from './UserReview';
import { AiOutlineEdit } from 'react-icons/ai';
import AddProduct from './AddProduct';
import ModelProduct from './ModelProduct';
import GetCategory from '@/utils/GetCategory';
const { Text, Paragraph, Title } = Typography



function MobileView({ business, handleShareClick, categoryName, refresh, averageRating, brand }) {
    const { user, userdata } = useAuth()
    const router = useRouter()
    const [url, setUrl] = useState(null);
    const [collap, setCollap] = useState(true)
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    useEffect(() => {
        const currentUrl = window.location.href;
        setUrl(currentUrl)
    }, []);
    const text_initial = `Hi, I found your business on ${url}`
    const text = encodeURIComponent(text_initial)
    const isProfileOwner = (userdata && userdata.business === business.id) || (user && user.user_id === 1) || (user && user.user_id === 2);
    const premium = userdata && userdata.business === business.id
    const EditHandle = () => {
        router.push(`/edit/${business.business_name}?id=${business.id}`)
    }
    return (<div className=' dark:text-black'>
        <Row justify='center' align='middle' className=" bg-white" gutter={[0, 16]}>
            <Col xs={21} md={21} lg={0} xl={0} xxl={0} >
                <div className=' rounded-md w-full relative'>
                    <div className=' absolute z-10 top-0 right-0' >
                        <FaShare className=' h-12 w-12 p-3 border border-1 text-gray-500 hover:bg-slate-100' onClick={() => handleShareClick()} />
                        {isProfileOwner && !brand && <AiOutlineEdit className=' h-12 w-12 p-3 border border-1 text-gray-900 hover:bg-slate-100' onClick={EditHandle} />}
                    </div>
                    {business.business_images && Array.isArray(business.business_images) && business.business_images.length > 0 ? <Carousel slidesToScroll={true}>
                        {business.business_images.map((item, index) => (
                            item && item.image && Array.isArray(item.image) && item.image.length > 0 ? (
                                item.image.map((imageItem, imageIndex) => (
                                    <div key={imageIndex} className=' h-52 w-full relative'>
                                        <Image
                                            fill
                                            src={imageItem.image}
                                            loading='lazy'
                                            sizes='100%'
                                            className=' object-obtain'
                                            alt={`business-${index}-${imageIndex}`}
                                        />
                                    </div>
                                ))
                            ) : null
                        ))}
                    </Carousel> : business.picture && <Image fill src={business.picture} loading='lazy' sizes='100%' className=' object-contain' alt='business' /> || business.icons && <Image fill src={business.icons} loading='lazy' sizes='100%' className=' object-contain' alt='business' />}
                </div>
            </Col>

            <Col xs={22} md={22} sm={22} lg={0} xl={0} xxl={0} >
                <Row align='middle' justify='start' gutter={[10, 4]}>
                    <Col>
                        <BiSolidBusiness className=' text-purple-600 text-2xl' />
                    </Col>
                    <Col>
                        <div className=' text-xl font-bold'>
                            {business.business_name && business.business_name.length > 24
                                ? `${business.business_name.slice(0, 24)}`
                                : business.business_name || ''}
                        </div>
                    </Col>
                    {business.verified && <Col>
                        <MdVerified className=' text-blue-600 text-2xl' />
                    </Col>}

                    {business.trusted && <Col>
                        <div className=' px-2 py-1 rounded-md w-full text-white font-bold text-xs text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.orange.600),theme(colors.fuchsia.600),theme(colors.orange.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                            Trusted
                        </div>
                    </Col>}

                    {business.trending && <Col>
                        <div className=' px-2 py-1 rounded-md w-full text-white font-bold text-xs text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'>
                            Trending
                        </div>
                    </Col>}
                    <Col span={24}>
                        <Row justify='start' align='middle'>
                            {business.industry_leader && <Col span={5}>
                                <Image src='/profile/tags/Industry.png' alt='Industry Leader' width={70} height={70} />
                            </Col>}
                            {business.super && <Col span={5} className=' text-center'>
                                <Image src='/profile/tags/SupperSeller.png' alt='super' width={70} height={70} />
                            </Col>}
                            {business.premium && <Col span={5}>
                                <Image src='/profile/tags/Premium.png' alt='Industry Leader' width={70} height={70} />
                            </Col>}
                        </Row>
                    </Col>
                    <Col span={23}>
                        <Flex horizontal gap='small' >
                            <BiCategory className=' text-2xl font-semibold text-blue-600' />
                            <GetCategory business={business} />
                        </Flex>
                    </Col>
                    <Col span={23}>
                        <Row gutter={3}>
                            <Col><IoShieldCheckmarkSharp className=" text-2xl text-green-700" />  </Col>
                            <Col className=" text-black text-xl font-semibold">GSTIN:{business.GSTIN}</Col>
                        </Row>
                    </Col>
                    <Col span={22}>
                        <Text type='secondary' className='text-lg font-normal'>
                            {`${business.city || ''} ${business.pincode || ''}`}
                        </Text>
                    </Col>

                    <Col>
                        <Rate
                            style={{ color: '#FF5349', fontSize: '25px' }}
                            character="★"
                            defaultValue={4}
                            disabled />
                    </Col>
                    <Col>
                        {business.ReviewRatings && business.ReviewRatings.length} Ratings
                    </Col>
                    <Col className=' ml-16'>
                        <Like refresh={refresh} id={business.id} />
                    </Col>
                    <Col>
                        {business.like}
                    </Col>
                    <Col span={22}>
                        <Row>
                            <Col></Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col xs={22} md={22} lg={0} xl={0} xxl={0} sm={22}>
                <Row justify='space-between'>
                    <Col>
                        <Link href={`https://wa.me/91${business.whatsapp_number}?text=${text}`} className=' flex flex-col font-semibold items-center text-black' target='_blank'>
                            <IoLogoWhatsapp style={{ color: 'green' }} className=' text-4xl' />
                            WhatsApp
                        </Link>
                    </Col>
                    <Col>
                        <Link href={`mailto:${business.email}`} target='_blank' className=' flex flex-col font-semibold items-center text-black'>
                            <MdMail style={{ color: '#F05542' }} className=' text-4xl' />
                            E-Mail
                        </Link>
                    </Col>
                    <Col>
                        <Link href={`http://maps.google.com?q=${business.address}`} target='_blank' className=' flex flex-col font-semibold items-center text-black'>
                            <FaLocationDot style={{ color: 'green' }} className=' text-4xl' />
                            Map
                        </Link>
                    </Col>
                </Row>
            </Col>
            <Col xl={0} xs={24} sm={24} md={24} lg={0} xxl={0}>
                <div className=' bg-slate-200 h-3'></div>
            </Col>
            <Col xs={22} md={22} sm={22} lg={0} xl={0} xxl={0}>
                {/* Benefit  */}
                <p className=' text-xl font-bold'>Benefits</p>
            </Col>
            <Col xs={22} md={22} lg={0} xl={0} xxl={0}>
                <Carousel slidesToShow={3} centerPadding='30' dots={false} >
                    <div>
                        <div className=' m-2 rounded-lg border px-2 bg-orange-600 text-white border-1 py-2 '>
                            <Row align="middle" gutter={4}>
                                <Col>
                                    <HiDocumentText className=' text-xl text-white' />
                                </Col>
                                <Col>
                                    <div style={{ fontSize: 10 }}>GST Invoice</div>
                                    <div style={{ fontSize: 10 }}>Available</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <div className=' m-2 rounded-lg border text-white bg-green-600 px-2 border-1 py-2 '>
                            <Row align="middle" gutter={4}>
                                <Col>
                                    <SiSpringsecurity className=' text-xl' />
                                </Col>
                                <Col>
                                    <div style={{ fontSize: 10 }}>Secure </div>
                                    <div style={{ fontSize: 10 }}>Payments</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div>
                        <div className=' m-2 rounded-lg text-white bg-blue-700 border px-2 border-1 py-2'>
                            <Row align="middle" gutter={4}>
                                <Col>
                                    <BsHeadset className=' text-xl' />
                                </Col>
                                <Col>
                                    <div style={{ fontSize: 10 }}>365 Days</div>
                                    <div style={{ fontSize: 10 }}>Help Desk</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Carousel>
            </Col>
            <Col xl={0} xs={24} sm={24} md={24} lg={0} xxl={0}>
                <div className=' bg-slate-200 h-3'></div>
            </Col>
            <Col xs={22} md={22} sm={22} lg={0} xl={0} xxl={0}>
                <Row justify='space-between'>
                    <Col><div className=' text-xl font-bold'>Products & Services</div></Col>
                    <Col>{isProfileOwner && <AddProduct brand={brand} business={business} />}</Col>
                </Row>
            </Col>
            <Col xs={22} md={22} sm={22} lg={0} xl={0} xxl={0}>
                {business.products && <Carousel slidesToScroll={1} swipeToSlide={true} slidesToShow={2} centerMode centerPadding='10' dots={false} >
                    {array.map((index) =>
                        <div key={index} className=' p-2' >
                            <ModelProduct refresh={refresh} brand={brand} business={business} index={index} />
                        </div>)}
                </Carousel>}
            </Col>
            <Col xs={22} md={22} sm={22} lg={0} xl={0} xxl={0}>
                <hr />
            </Col>
            <Col xs={22} md={22} sm={22} lg={0} xl={0} xxl={0}>
                <p className=' text-xl font-bold'>About My Business</p>
            </Col>
            <Col xs={22} md={22} sm={22} lg={0} xl={0} xxl={0}>
                <div>{business.business_info}</div>
            </Col>
            <Col xs={22} md={22} sm={22} lg={0} xl={0} xxl={0}>
                <hr />
            </Col>
            <Col xs={22} md={22} sm={22} lg={0} xl={0} xxl={0}>
                <Row align='middle' gutter={12}>
                    <Col span={2}>
                        <FaMapLocation className=' text-lg' />
                    </Col>
                    <Col span={16} className=" overflow-hidden">
                        {business.address}
                    </Col>
                </Row>
            </Col>
            <Col xs={22} sm={22} md={22} lg={0} xl={0} xxl={0}>
                <hr />
            </Col>
            <Col xs={22} md={22} lg={0} xl={0} xxl={0}>
                <Row align='middle' gutter={12}>
                    <Col span={2}>
                        <ClockCircleOutlined className=' text-lg' />
                    </Col>
                    <Col span={22}>
                        <Collapse bordered={false} onChange={() => setCollap(!collap)} className=' w-full' ghost expandIconPosition='end' items={[
                            {
                                key: '1',
                                label: <div className=' font-bold text-base flex flex-row items-center text-blue-500'>Open Now: {collap ? <div className=' text-xs text-black items-center ml-1 uppercase'>{business.opening_time} - {business.closing_time}</div> : null}</div>,
                                children: <p className=' font-medium uppercase'>{business.opening_time} - {business.closing_time} </p>,
                            },]} />
                    </Col>
                </Row>
            </Col>

            <Col xs={24} md={24} lg={0} xl={0} xxl={0} className=' p-2 bg-green-50'>
                <Flex vertical gap='small'>
                    <hr />
                    <div className=' bg-slate-100 text-xl text-center font-bold dark:text-gray-800'>Director Information</div>
                    <hr />
                    <Space size={5} align='center' direction='horizontal'><Avatar size="large" icon={<UserOutlined />} />
                        <div className=' text-base font-semibold'>{business.director}</div></Space>
                    <div className=' text-base font-semibold'>Status: <Tag color="success">Active</Tag></div>
                    <div className=' text-base font-semibold'>DIN: {business.DIN}</div>
                    <div className=' text-base font-semibold'>CIN: {business.CIN_No}</div>
                    <div className=' text-base font-semibold'>RoC: {business.RoC}</div>
                    <div className=' text-base font-semibold'>Company No: {business.company_No}</div>
                </Flex>
            </Col>
            <Col xs={22} md={22} lg={0} xl={0} xxl={0}>
                <hr />
            </Col>
            <Col xs={10} md={10} lg={0} xl={0} xxl={0}>
                <p className=' text-xl font-bold'>Ratings</p>
            </Col>
            <Col xs={10} md={10} lg={0} xl={0} xxl={0}>
                <RatingReview size='25px' id={business.id} />
            </Col>

            <Col xs={22} md={22} lg={0} xl={0} xxl={0}>
                <hr />
            </Col>

            <Col xs={22} md={22} lg={0} xl={0} xxl={0}>
                <p className=' text-xl font-bold'>User Reviews</p>
            </Col>
            <Col xs={23} sm={23} md={23} lg={0} xl={0} xxl={0}>
                {business.ReviewRatings && business.ReviewRatings.length > 0 ? <UserReview data={business.ReviewRatings} /> : 'No revies'}
            </Col>
            <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                <Row justify='center' gutter={4} className=' fixed bottom-0 w-full z-10 py-1 px-2 bg-slate-200'>
                    <Col xs={12} sm={12} md={12} xl={0} xxl={0} lg={0}>
                        <MultiNumber mobileNumbers={business.mobile_numbers} default_Number={business.mobile_number} />
                    </Col>
                    <Col xs={12} sm={12} md={12} xl={0} xxl={0} lg={0}>
                        <EnquiryFormModel businessId={business} />
                    </Col>
                </Row>
            </Col>

        </Row>
    </div>

    )
}

export default MobileView
