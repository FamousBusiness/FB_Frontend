import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { Card, Carousel, Col, Flex, Rate, Row, Space } from 'antd'
import React, { useRef } from 'react'
import { BiSolidBusiness } from 'react-icons/bi'
import { FaLocationDot, FaShare } from 'react-icons/fa6'
import { MdVerified } from 'react-icons/md'
import ProfileButtons from '../ProfilePage/ProfileButtons'
import { IoShieldCheckmark } from 'react-icons/io5'
import Enquiry from '../ProfilePage/Enquiry'
import Image from 'next/image'
import ProductModal from './ProductModel'
import AddProduct from './Addproduct'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

function BrandCard({ brand, handleShareClick }) {
    const { user, userdata } = useAuth()
    const carouselRefOne = useRef()
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const handleNextOne = () => {
        carouselRefOne.current.next();
    };
    const handlePrevOne = () => {
        carouselRefOne.current.prev();
    };

    const brandId = brand && brand.Brands ? brand.Brands.id : null;
    const isProfileOwner = user && (userdata && userdata.business === brandId) || (user && user.user_id === 1) || (user && user.user_id === 2);

    return (
        <Row gutter={[0, 12]}>
            <Col sm={0} xs={0} xl={24} xxl={24} lg={24} md={24}>
                <Row gutter={[8, 12]}>

                    <Col span={24}>
                        <Link href={`/brands/Branddeatails/[id]`} as={`/brands/Branddeatails/${brand.Brands.id}`}>
                            <Card style={{ borderRadius: '20px' }} className=' shadow-md'>
                                <Row justify='space-between' align='top' gutter={[12, 24]}>
                                    <Col span={22}>
                                        {/* Brands Fetch */}
                                    </Col>
                                    <Col span={6}>
                                        <div className=' relative w-52 h-52 p-2 rounded-full overflow-hidden border-blue-500 border border-1'>
                                            <Image src={brand.Brands.icons} fill sizes='100%' className=' p-2 object-contain' alt='brand' />
                                        </div>
                                    </Col>
                                    <Col span={18}>
                                        <Row justify='start' gutter={[12, 24]}>
                                            <Col span={23}>
                                                <Row justify='space-between' gutter={[12, 12]}>
                                                    <Col>
                                                        <Row gutter={2} align='middle'>
                                                            <Col>
                                                                <BiSolidBusiness className=' text-3xl  text-purple-600' />
                                                            </Col>
                                                            <Col><div className=' text-3xl drop-shadow-md decoration-purple-50 text-green-700 font-serif font-semibold'>
                                                                {brand.Brands.brand_name}
                                                            </div></Col>
                                                            <Col>
                                                                {brand.Brands.verified && <MdVerified className=' text-3xl text-indigo-600' />}
                                                            </Col>

                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col span={24}>
                                                <Space size={10}>
                                                    <Rate
                                                    style={{ color: '#FF5349', fontSize: '30px' }}
                                                    character="★"
                                                    defaultValue={4}
                                                    disabled />
                                                    <div className=' font-bold text-lg ' style={{ color: '#878787' }}>{brand.Brands.reviews} Ratings</div>
                                                </Space>
                                            </Col>

                                            <Col span={24}>
                                                <Row gutter={3}>
                                                    <Col><IoShieldCheckmark className=" text-3xl text-green-700" />  </Col>
                                                    <Col><div className=" text-black text-2xl font-semibold">GSTIN: {brand.Brands.GSTN}</div></Col>
                                                </Row>
                                            </Col>
                                            <Col span={24}><Space size={10} dir='horizontal'><div><FaLocationDot className=' text-sky-600 text-3xl' /></div>
                                                <p className=' text-slate-800 font-semibold font-sans text-lg'>
                                                </p>
                                            </Space>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row align='top' className=' mt-4 relative'>
                                    <Col span={20}>
                                        <div className=' h-full flex flex-col justify-end'>
                                            <div>
                                                <ProfileButtons websiteUrl={brand.Brands.web_url} whatsapp_number={brand.Brands.whatsapp_number} email={brand.Brands.email} number={brand.Brands.mobile_number} handleShareClick={handleShareClick} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={4} className=' relative'>
                                        <div className=' absolute bottom-0' >
                                            <div>
                                                <Enquiry />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            </Card>
                        </Link>
                    </Col>
                    <Col span={24}>
                        {/* Product & Services */}
                        <Row gutter={[8, 20]}>
                            <Col span={18}>
                                <Row justify='center' gutter={[0, 12]}>
                                    <Col span={24}>
                                        <Row justify='space-between'>
                                            <Col> <div className=' text-2xl font-bold'>OUR PRODUCT & SERVICES</div></Col>
                                            {isProfileOwner && <Col><AddProduct business={brand} /></Col>}
                                        </Row>
                                    </Col>
                                    {brand.Brand_Products && brand.Brand_Products.length > 0 && <Col span={23}>
                                        <Row gutter={12} align='middle'>
                                            <Col>
                                                <LeftCircleOutlined onClick={handlePrevOne} className=' text-3xl ' /></Col>
                                            <Col span={21}>
                                                <Carousel slidesToScroll={true} dots={false} ref={carouselRefOne} infinite={false} slidesToShow={5}>
                                                    {brand.Brand_Products.map((item, index) =>
                                                        <div key={item.id} className=' p-2' >
                                                            <ProductModal brand={brand} index={index} business={item} />
                                                        </div>)}
                                                </Carousel>
                                            </Col>
                                            <Col>
                                                <RightCircleOutlined onClick={handleNextOne} className=' text-3xl ' />
                                            </Col>
                                        </Row>
                                    </Col>}
                                </Row>
                            </Col>
                            <Col className=' h-full' span={6}>
                                <Card className=' h-60 shadow-md'>
                                    <Flex vertical gap='large'>
                                        <div className=' text-bold text-black text-2xl'>ADDRESS</div>
                                        <div className=' text-lg font-medium font-sans'>{brand.Brands.address}</div>
                                    </Flex>
                                </Card>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>

            <Col xs={24} sm={24} lg={0} md={0} xl={0} xxl={0}>
                <Link href={`/brands/Branddeatails/[id]`} as={`/brands/Branddeatails/${brand.Brands.id}`}>
                    <Card>
                        <Row justify='center' align='middle' className=" bg-white" gutter={[0, 16]}>
                            <Col span={21} >
                                <div className=' rounded-md  h-52 w-full relative'>
                                    <div className=' absolute z-10 top-0 right-0' >
                                        <FaShare className=' h-12 w-12 p-3 border border-1 text-gray-500 hover:bg-slate-100' onClick={() => handleShareClick()} />
                                    </div>
                                    <Image fill src={brand.Brands.icons} loading='lazy' sizes='100%' className=' object-contain' alt='business' />
                                </div>
                            </Col>

                            <Col span={22} >
                                <Row align='middle' justify='start' gutter={[10, 4]}>
                                    <Col>
                                        <BiSolidBusiness className=' text-purple-600 text-2xl' />
                                    </Col>
                                    <Col>
                                        <div className=' text-xl font-bold'>
                                            {brand.Brands.brand_name && brand.Brands.brand_name.length > 24
                                                ? `${brand.Brands.brand_name.slice(0, 24)}`
                                                : brand.Brands.brand_name || ''}
                                        </div>
                                    </Col>


                                    <Col >
                                        {brand.Brands.verified && <MdVerified className=' text-blue-600 text-2xl' />}
                                    </Col>

                                    <Col span={23}>
                                        <Row gutter={3}>
                                            <Col><IoShieldCheckmark className=" text-2xl text-green-700" />  </Col>
                                            <Col className=" text-black text-xl font-semibold">GSTIN:{brand.Brands.GSTN}</Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <p className='text-lg font-normal'>
                                            {brand.Brands.address && brand.Brands.address.length > 30
                                                ? `${brand.Brands.address.slice(0, 30)}...`
                                                : brand.Brands.address}
                                        </p>
                                    </Col>
                                    <Col>
                                        <Rate
                                            className=' text-orange-600 text-3xl'// Apply inline styles
                                            character="★"
                                            defaultValue={4}
                                            disabled />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Link>
            </Col>
        </Row>
    )
}

export default BrandCard
