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
    const BreadcrumbSchemaData = {
        ...(business.brad_crumb_schema_item_list && {
            "@context": "http://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": business.brad_crumb_schema_item_list?.map((item)=> ({
                        "@type": item?.type,
                        "position": item.id,
                        "item": {
                            "@id": item?.item_id,
                            "name": item?.item_name
                        }
                    }))
                }
            ]
        })
    }

    const LocalBusinessSchema = {
        "@context": "http://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "name": `${business.business_name}`,
                "mobileNumber": "+91XXXXXXXXXX",
                "whatsappNumber": "+91XXXXXXXXXX",
                "email": `${business?.email}`,
                "category": `${business?.category?.type}`,
                "state": `${business?.state}`,
                "city": `${business?.city}`,
                "pincode": `${business?.pincode}`,
                "locality": `${business?.locality}`,
                "address": `${business?.address}`,
                "website": `${business?.website_url}`,
                "gstNumber": "24XXXXXXXXXX",
                "cinNumber": "UXXXXXXXXXX",
                "dinNumber": "XXXXXXXXXX",
                "companyNumber": "XXXXXXXXXX",
                "roc": "XXXXXXXXXX",
                "director": `${business?.director}`,
                "about": `${business?.business_info}`,
                "establishmentYear": `${business?.established_on}`,
                "productAndService": [`${business?.products.map((item)=> (
                    item.name
                ))}`],
                // "priceRange": "₹2,000 - ₹50,000",
                "paymentAccepted": ["UPI", "Credit Card", "Net Banking", "COD"],

                // "serviceArea": {
                //   "@type": "GeoShape",
                //   "circle": "28.347471, 77.319557 20km"
                // },

                // "hasOfferCatalog": {
                //   "@type": "OfferCatalog",
                //   "name": "CCTV Product Catalog",
                //   "itemListElement": [
                //     {
                //       "@type": "Offer",
                //       "name": "Hikvision 2MP CCTV Camera",
                //       "price": "₹3,999",
                //       "priceCurrency": "INR",
                //       "url": "https://www.famousbusiness.in/products/hikvision-2mp"
                //     },
                //     {
                //       "@type": "Offer",
                //       "name": "CP Plus 4 Channel DVR",
                //       "price": "₹5,500",
                //       "priceCurrency": "INR",
                //       "url": "https://www.famousbusiness.in/products/cp-plus-dvr"
                //     }
                //   ]
                // },

                "profilePic": `${business?.picture}`,
                "verified": business?.verified,
                "trusted": business?.trusted,
                "trending": business?.trending,
                "likes": business?.like,

                ...(business.local_schema_reviews && {
                    "reviews": business.local_schema_reviews.map((review) => ({
                      "@type": "Review",
                      "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": review?.reviewRatingValue,
                        "bestRating": review?.bestRating,
                        "worstRating": review?.worstRating
                      },
                      "author": {
                        "@type": "Person",
                        "name": review?.author?.name
                      },
                      "reviewCount": review?.reviewCount
                    }))
                  }),

                "searchKeywords": business?.local_schema_search_keyword.map((item)=> (item?.keyword_name)),

                "openingTime": business?.opening_time,
                "closingTime": business?.closing_time,
                "natureOfBusiness": business?.nature,
                "annualTurnover": business?.turn_over,
                "numberOfEmployees": business?.employee_count,
                "authorizedDealer": business?.authorized,
                "industryLeader": business?.industry_leader,
                "sponsorListings": business?.sponsor,
                "superSeller": business?.super,
                "premiumSeller": business?.premium,

                "sameAs": business?.local_schema_same_as.map((item)=> (item?.url)),

                // "url": "https://www.famousbusiness.in/Faridabad/Hivision-123",

                "image": business?.business_images?.flatMap(item => item.image.map(image => image.image)),

                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "28.347471",
                  "longitude": "77.319557"
                },

                ...(business.local_schema_aggregrate_rating && {
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": business?.local_schema_aggregrate_rating?.ratingValue,
                        "ratingCount": business?.local_schema_aggregrate_rating?.ratingCount,
                        "bestRating": business?.local_schema_aggregrate_rating?.bestRating,
                        "worstRating": business?.local_schema_aggregrate_rating?.worstRating
                    }
                }),

                ...(business.local_schema_video && {
                    "video": {
                        "@type": "VideoObject",
                        "interactionStatistic": business.local_schema_video?.interactionStatistic.map((item)=> ({
                            "@type": "InteractionCounter",
                            "interactionType": item?.interactionType,
                            "userInteractionCount": item?.userInteractionCount
                        })),

                        "name": business.local_schema_video?.name,
                        "description": business.local_schema_video?.description,
                        "thumbnailUrl": business.local_schema_video?.thumbnailUrl,
                        "contentUrl": business.local_schema_video?.contentUrl,
                        "embedUrl": business.local_schema_video?.embedUrl,
                        "uploadDate": business.local_schema_video?.uploadDate
                    }
                }),

                ...(business.local_schema_facebook_video && {
                    "facebookVideo": {
                        "@type": "VideoObject",
                        "name": business.local_schema_facebook_video?.name,
                        "description": business.local_schema_facebook_video?.description,
                        "embedUrl": business.local_schema_facebook_video?.embedUrl,
                        "thumbnailUrl": business.local_schema_facebook_video?.thumbnailUrl,
                        "uploadDate": business.local_schema_facebook_video?.uploadDate,
                        "interactionStatistic": business.local_schema_facebook_video?.interactionStatistic.map((item)=> ({
                            "@type": "InteractionCounter",
                            "interactionType": item?.interactionType,
                            "userInteractionCount": item?.userInteractionCount
                        })),
                        "publisher": {
                            "@type": "Organization",
                            "name": business.local_schema_facebook_video?.publisher_name,
                            "logo": {
                                "@type": "ImageObject",
                                "url": business.local_schema_facebook_video?.publisher_logo
                            }
                        }
                    }
                }),

                ...(business.local_schema_insta_video && {
                    "instagramVideo": {
                        "@type": "VideoObject",
                        "name": business.local_schema_insta_video?.name,
                        "description": business.local_schema_insta_video?.description,
                        "embedUrl": business.local_schema_insta_video?.embedUrl,
                        "thumbnailUrl": business.local_schema_insta_video?.thumbnailUrl,
                        "uploadDate": business.local_schema_insta_video?.uploadDate,
                        "interactionStatistic": business.local_schema_insta_video?.interactionStatistic.map((item)=> ({
                            "@type": "InteractionCounter",
                            "interactionType": item?.interactionType,
                            "userInteractionCount": item?.userInteractionCount
                        })),
                        "publisher": {
                            "@type": "Organization",
                            "name": business.local_schema_insta_video?.publisher_name,
                            "logo": {
                                "@type": "ImageObject",
                                "url": business.local_schema_insta_video?.publisher_logo
                            }
                        }
                    }
                }),

              }
        ]
    }

    const FAQPageSchemaData = {
         ...(business.faq_schema_mainEntity && {
                "@context": "http://schema.org",
                "@type": "FAQPage",
                "mainEntity": business.faq_schema_mainEntity?.map((item) => ({
                    "@type": "Question",
                    "name": item?.name,  
                    "acceptedAnswer": {
                        "@type": item?.acceptedAnswer_type,
                        "text": item?.acceptedAnswer_text 
                    }
                }))
            }),
    }

    const ArticleSchemaData = {
            ...(business.article_schema && {
                "@context": "http://schema.org",
                "@type": "Article",
                "headline": business.article_schema?.headline,
                "author": {
                    "@type": "Person",
                    "name": business.article_schema?.author?.name
                },
                "publisher": {
                    "@type": "Organization",
                    "name": business.article_schema?.publisher_name,
                    "logo": {
                        "@type": "ImageObject",
                        "url": business.article_schema?.publisher_logo
                        }
                },
                "datePublished": business.article_schema?.datePublished,
                "dateModified": business.article_schema?.dateModified,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": business.article_schema?.mainEntityOfPage_id
                },
                "image": business.article_schema?.image,
                "articleBody": business.article_schema?.articleBody
            })
        }

    const { user, userdata }  = useAuth()
    const [collap, setCollap] = useState(true)
    const router        = useRouter()
    const [url, setUrl] = useState(null);
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    useEffect(() => {
        const currentUrl = window.location.href;
        setUrl(currentUrl)
    }, []);

    const text_initial   = `Hi, I found your business on ${url}`
    const text           = encodeURIComponent(text_initial)
    const isProfileOwner = (userdata && userdata.business === business.id) || (user && user.user_id === 1) || (user && user.user_id === 2);
    const premium        = userdata && userdata.business === business.id

    const EditHandle = () => {
        router.push(`/edit/${business.business_name}?id=${business.id}`)
    }



return (
    <>
    <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbSchemaData) }}
        />

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(LocalBusinessSchema) }}
        />
        
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQPageSchemaData) }}
        />

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ArticleSchemaData) }}
        />
        
    <div className='dark:text-black'>
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
    </>
    )
}

export default MobileView
