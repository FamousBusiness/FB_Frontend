import { Avatar, Badge, Card, Carousel, Col, Flex, Rate, Row, Space, Tag, Typography } from 'antd'
import React, { useRef } from 'react'
import ProfileButtons from './ProfileButtons'
import Like from '@/utils/Like'
import { FaLocationDot } from 'react-icons/fa6'
import { BiCategory, BiSolidBusiness } from 'react-icons/bi'
import { IoShieldCheckmark } from 'react-icons/io5'
import { AiFillEdit } from 'react-icons/ai'
import { MdVerified } from 'react-icons/md'
import NextBreadcrumb from '@/components/NextBreadcrum'
import NewSlider from './NewSlider'
import { useAuth } from '@/context/AuthContext'
import RatingReview from '@/utils/RatingReview'
import Enquiry1 from '../EnquiryForm/Enquiry1'
import Image from 'next/image'
import { ClockCircleOutlined, LeftCircleTwoTone, RightCircleTwoTone, UserOutlined } from '@ant-design/icons'
import { HiDocument } from 'react-icons/hi'
import { BsHeadset } from 'react-icons/bs'
import UserReview from './UserReview'
import { useRouter } from 'next/navigation'
import FestivalSection from './FestivalSection'
import AddProduct from './AddProduct'
import { RiSecurePaymentFill } from 'react-icons/ri'
import ModelProduct from './ModelProduct'
import GetCategory from '@/utils/GetCategory'
import { useGlobalState } from '@/services/LocationDetector/GlobalState'
import Enquiry from './Enquiry'
function DesktopView({ business, handleShareClick, categoryName, refresh, averageRating, brand }) {
    const carouselRefOne = useRef()
    const { user, userdata } = useAuth()
    const router = useRouter()
    const { locationState } = useGlobalState()
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const isProfileOwner = (userdata && userdata.business === business.id) || (user && user.user_id === 1) || (user && user.user_id === 2);
    const handleNextOne = () => {
        carouselRefOne.current.next();
    };
    const handlePrevOne = () => {
        carouselRefOne.current.prev();
    };

    const EditHandle = () => {
        router.push(`/edit/${business.business_name}?id=${business.id}`)
    }

    return (

        <Row justify='space-between' className=' px-4' gutter={[12, 12]} >
            <Col span={24}>
                <NextBreadcrumb separator='>' capitalizeLinks={true} />
            </Col>
            <Col span={24}>
                <Card className=' shadow-md'>
                    <Row justify='space-between' align='top' gutter={[12, 24]}>
                        <Col span={22}>
                            {/* Brands Fetch */}
                        </Col>
                        <Col span={8}>
                            {business.business_images && <div className=' border border-1 relative overflow-hidden '>
                                {business.business_images.length > 0 && <NewSlider img={business.business_images[0].image} />}
                            </div>}
                            {business.icons && <div className=' h-80 flex items-center justify-center relative overflow-hidden p-2'>
                                <Image src={business.icons} alt='brandsIcon' fill sizes='100%' className=' object-contain' />
                            </div>}
                        </Col>
                        <Col span={16}>
                            <Row justify='start' gutter={[12, 24]}>
                                <Col span={23}>
                                    <Row justify='space-between' gutter={[12, 12]}>
                                        <Col>
                                            <Row gutter={5} align='middle'>
                                                <Col>
                                                    <BiSolidBusiness className=' text-3xl  text-purple-600' />
                                                </Col>
                                                <Col>
                                                    <div className=' text-3xl drop-shadow-md decoration-purple-50 text-green-700 font-serif font-semibold'>
                                                        {business.business_name}
                                                    </div>
                                                </Col>
                                                {business.verified && <Col>
                                                    <MdVerified className=' text-3xl text-indigo-600' />
                                                </Col>}
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Space size={10} direction=' horizontal'>
                                                {isProfileOwner && !brand && <AiFillEdit onClick={EditHandle} className=' text-blue-800 hover:bg-slate-200 rounded-full p-1 cursor-pointer text-3xl ' />}
                                            </Space>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row justify='start' align='middle' gutter={5}>
                                        <Col>
                                            <Space size={10}>
                                                <Rate
                                                    style={{ color: '#FF5349', fontSize: '30px' }}
                                                    character="★"
                                                    defaultValue={4}
                                                    disabled />
                                                <div className=' font-bold text-lg ' style={{ color: '#878787' }}>{business.ReviewRatings && business.ReviewRatings.length} Ratings</div>
                                            </Space>
                                        </Col>
                                        {business.trusted && <Col>
                                            <div className=' px-2 rounded-md w-full text-white font-bold text-lg text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.orange.600),theme(colors.fuchsia.600),theme(colors.orange.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                                                Trusted
                                            </div>
                                        </Col>}
                                        {business.trending && <Col>
                                            <div className='px-2 rounded-md w-full text-white font-bold text-lg text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'>
                                                Trending
                                            </div>
                                        </Col>}
                                        {business.super && <Col className=' text-center'>
                                            <Image src='/profile/tags/SupperSeller.png' alt='superseller' width={70} height={70} />
                                        </Col>}
                                        {business.premium && <Col>
                                            <Image src='/profile/tags/Premium.png' alt='premium' width={70} height={70} />
                                        </Col>}
                                        {business.industry_leader && <Col>
                                            <Image src='/profile/tags/Industry.png' alt='Industry Leader' width={70} height={70} />
                                        </Col>}
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={3}>
                                        <Col><IoShieldCheckmark className=" text-3xl text-green-700" /></Col>
                                        <Col><div className=" text-black text-2xl font-semibold">GSTIN:{business.GSTIN}</div></Col>
                                    </Row>
                                </Col>
                                {Array.isArray(business.category) && business.category.length >= 0 ? null : <Col>
                                    <BiCategory className=' text-3xl text-blue-600' />
                                </Col>}
                                {Array.isArray(business.category) && business.category.length > 0 ? null : (
                                    <div className='text-lg text-slate-800 font-semibold font-sans'>
                                        <GetCategory business={business} />
                                    </div>
                                )}
                                <Col span={24}><Space size={10} dir='horizontal'><div><FaLocationDot className=' text-sky-600 text-3xl' /></div>
                                    <p className=' text-slate-800 font-semibold font-sans text-lg'>
                                        {business.city} {business.state} {business.pincode}
                                    </p></Space>
                                </Col>
                                <Col span={23}>
                                    <Space align='center' size={10} direction=' horizontal'>
                                        <Like refresh={refresh} id={business.id} />
                                        <p>{business.like}</p>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row align='top' className=' mt-4 relative'>
                        <Col span={20}>
                            <div className=' h-full flex flex-col justify-end'>
                                <div>
                                    <ProfileButtons handleShareClick={handleShareClick} websiteUrl={business.website_url} whatsapp_number={business.whatsapp_number} email={business.email} numbers={business.mobile_numbers} number={business.mobile_number} />
                                </div>
                            </div>
                        </Col>
                        {!isProfileOwner && <Col span={4} className=' relative'>
                            <div className=' absolute bottom-0' >
                                <div>
                                    <Enquiry business={business} />
                                </div>
                            </div>
                        </Col>}
                    </Row>
                </Card>
            </Col>
            <Col span={24}>
                {/* Product & Services */}
                <Row gutter={[8, 20]}>
                    <Col span={18}>
                        <Row justify='center' gutter={[0, 12]}>
                            <Col span={24}>
                                <Row justify='space-between'>
                                    <Col> <div className=' text-2xl font-bold'>OUR PRODUCT & SERVICES</div></Col>
                                    {isProfileOwner && <Col><AddProduct brand={brand} business={business} /></Col>}
                                </Row>
                            </Col>
                            <Col span={23}>
                                <Row gutter={12} align='middle'>
                                    <Col><LeftCircleTwoTone onClick={handlePrevOne} className=' text-3xl ' /></Col>
                                    <Col span={21}>
                                        <Carousel slidesToScroll={true} dots={false} ref={carouselRefOne} infinite={false} slidesToShow={5} >
                                            {array.map((index) =>
                                                <div key={index} className=' p-2' >
                                                    <ModelProduct brand={brand} index={index} refresh={refresh} business={business} />
                                                </div>)}
                                        </Carousel>
                                    </Col>
                                    <Col ><RightCircleTwoTone onClick={handleNextOne} className=' text-3xl ' /></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className=' h-full' span={6}>
                        <Card className=' h-60 shadow-md'>
                            <Flex vertical gap='large'>
                                <div className=' text-bold text-black text-2xl'>ADDRESS</div>
                                <div className=' text-lg font-medium font-sans'>{business.address}</div>
                            </Flex>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span={18} >
                <div className='p-4 py-6 w-full h-full bg-white  border-2 rounded-lg' >
                    <Row justify='center' gutter={[0, 12]}>
                        <Col span={24}>
                            <p className=' text-2xl font-bold'>BENEFITS</p>
                        </Col>
                        <Col span={24}>
                            <Carousel slidesToShow={3} centerPadding='30' dots={false} >
                                <div>
                                    <div className=' m-1 rounded-lg border px-1 bg-orange-600 text-white border-1 py-4 '>
                                        <Row justify="center" align="middle" gutter={4}>
                                            <Col>
                                                <HiDocument className=' text-2xl text-white' />
                                            </Col>
                                            <Col >
                                                <div className=' text-xl font-medium' >GST Invoice Available</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div>
                                    <div className=' m-1 rounded-lg border text-white bg-green-600 px-1 border-1 py-4 '>
                                        <Row justify="center" align="middle" gutter={4}>
                                            <Col>
                                                <RiSecurePaymentFill className=' text-3xl' />
                                            </Col>
                                            <Col>
                                                <div className=' text-xl font-medium'>Secure Payments</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div>
                                    <div className=' m-1 rounded-lg text-white bg-blue-700 border px-1 border-1 py-4'>
                                        <Row justify="center" align="middle" gutter={4}>
                                            <Col>
                                                <BsHeadset className=' text-2xl' />
                                            </Col>
                                            <Col >
                                                <div className=' text-xl font-medium' >365 Days Help Desk</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Carousel>
                        </Col>
                        <Col span={24}>
                            <Space direction='horizontal' value={5}>
                                <ClockCircleOutlined className=' text-xl' /> <span className=' text-xl dark:text-gray-600'>Opening Time</span>:
                                <Typography.Text type='secondary' className=' uppercase'> {business.opening_time} - {business.closing_time}</Typography.Text>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <div >
                                <p className=' text-2xl font-bold py-2'>ABOUT MY BUSINESS</p>
                            </div>
                            <div>
                                <p>{business.business_info}</p>
                            </div>
                        </Col>
                        <Col span={24}>
                            {/* Data  */}
                            <Row align='middle' gutter={[0, 12]} justify='space-around' >
                                <Col span={24}>
                                    <Row justify='space-around' align='middle'>
                                        <Col>
                                            <div className=' flex flex-col bg-green-100 shadow-md h-32 w-32 overflow-hidden  p-4  duration-100  rounded-full border border-1 items-center justify-center'>
                                                <Image src='/profile/business-team-working-to-save-planet (1).svg' width={100} height={100} style={{ objectFit: 'contain', height: 'auto', width: 'auto' }} alt='jus' />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className=' flex flex-col bg-green-100 shadow-md h-32 w-32 overflow-hidden  p-4 duration-100  rounded-full border border-1 items-center justify-center'>
                                                <Image src='/profile/join-new-coworker.svg' width={100} height={100} style={{ objectFit: 'contain', height: 'auto', width: 'auto' }} alt='jus' />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className=' flex flex-col bg-green-100 shadow-md h-32 w-32 overflow-hidden  p-4 duration-100  rounded-full border border-1 items-center justify-center'>
                                                <Image src='/profile/address.svg' width={100} height={100} style={{ objectFit: 'contain', height: 'auto', width: 'auto' }} alt='real' />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className=' flex flex-col bg-green-100 shadow-md h-32 w-32 overflow-hidden  p-4 duration-100  rounded-full border border-1 items-center justify-center'>
                                                <Image src='/profile/indian-investment-opportunity.svg' width={100} height={100} style={{ objectFit: 'contain', height: 'auto', width: 'auto' }} alt='real' />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} >
                            <Row justify='space-around' align='middle'>
                                <Col>
                                    <Flex vertical justify='center' align='center'>
                                        <div className=" font-bold text-gray-700">NATURE OF BUSINESS</div>
                                        <div className=" font-semibold">{business.nature}</div>
                                        {/* <div>Total</div> */}
                                    </Flex>
                                </Col>
                                <Col>
                                    <Flex vertical justify='center' align='center'>
                                        <div className=" font-bold text-gray-700">TOTAL NUMBER OF EMPLOYEES </div>
                                        <div className=" font-semibold">{business.employee_count}</div>
                                        {/* <div>Total</div> */}
                                    </Flex>
                                </Col>
                                <Col>
                                    <Flex vertical justify='center' align='center'>
                                        <div className=" font-bold text-gray-700">YEAR OF ESTABLISHMENT</div>
                                        <div className=" font-semibold">{business.established_on}</div>
                                        {/* <div>Total</div> */}
                                    </Flex>
                                </Col>
                                <Col>
                                    <Flex vertical justify='center' align='center'>
                                        <div className=" font-bold text-gray-700">ANNUAL TURNOVER</div>
                                        <div className=" font-semibold">₹ {business.turn_over}</div>
                                        {/* <div>Total</div> */}
                                    </Flex>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Col>
            {/* Enquiry Form */}
            <Col span={6} >
                {business.category && <Enquiry1 id={business.category} getRequire={`best deal in ${categoryName} in ${locationState.city}`} />}
            </Col>
            <Col span={18}>
                <FestivalSection />
                <div className='px-8'>
                    <div className=' my-4' >
                        <p className=' text-2xl  px-2 font-bold py-2'>REVIEW & RATINGS:</p>
                    </div>
                    <div className=' flex flex-row justify-between items-center'>
                        <div className=' flex flex-row justify-between items-center'>
                            <div className=' py-2 px-3 bg-green-700 text-center rounded-xl text-2xl text-white font-bold'>4.4</div>
                            <div className=' flex flex-col mx-2 justify-center items-center'>
                                <div className=' text-2xl text-black font-black'>
                                    {business.reviews} Ratings
                                </div>
                            </div>
                        </div>
                        <div className=' flex flex-col justify-between'>
                            <div className=' text-xl font-extrabold py-2 '>Start your Review</div>
                            <RatingReview size={'40px'} id={business.id} />
                        </div>
                    </div>
                </div>
            </Col>
            <Col span={6}>
                <Card style={
                    { backgroundColor: "#2e7f25" }
                } className=' h-full shadow-lg font-sans text-white' bordered >
                    <Flex vertical gap='small'>
                        <hr />
                        <div className=' text-xl text-center font-bold text-white'>Director Information</div>
                        <hr />
                        <Space size={5} align='center' direction='horizontal'><Avatar size="large" icon={<UserOutlined />} />
                            <div className=' text-base dark:text-white text-white font-semibold'>{business.director}</div></Space>
                        <div className=' text-base dark:text-white text-white font-semibold'>Status: <Tag color="success">Active</Tag></div>
                        <div className=' text-base dark:text-white text-white font-semibold'>DIN: {business.DIN}</div>
                        <div className=' text-base dark:text-white text-white font-semibold'>CIN: {business.CIN_No}</div>
                        <div className=' text-base dark:text-white text-white font-semibold'>RoC: {business.RoC}</div>
                        <div className=' text-base dark:text-white text-white font-semibold'>Company No: {business.company_No}</div>
                    </Flex>
                </Card>
            </Col>
            {/* Similar business Near me */}
            <Col span={24} className=' bg-white p-2 rounded-md mb-3'>
                {business.ReviewRatings && <UserReview data={business.ReviewRatings} />}
            </Col>
        </Row>

    )
}

export default DesktopView
