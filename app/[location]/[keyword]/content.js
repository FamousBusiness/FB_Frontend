"use client";

// import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "@/Authentication/axios";
import { useGlobalState } from "@/services/LocationDetector/GlobalState";
import { useMapboxLocation } from "@/lib/location";
import { Card, Col, Flex, Row, Skeleton, Typography, Modal, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { useSchema } from "@/context/SchemaContext";
// import Banner from "@/components/users/home/leads/Banner";
import NextBreadcrumb from "@/components/NextBreadcrum";
import SearchKeyBusinessCard from "./BusinessCard";
import KeywordFooter from "./Footer";
// import Enquiry1 from "@/components/users/EnquiryForm/Enquiry1";
// import CategoryFilter from "@/components/users/Filter/FilterComponent";
// import Head from "next/head";




// const generateBreadCrumbSchema = (location, keyword) => {
//     return {
//         "@context": "https://schema.org",
//         "@graph": [
//             {
//                 "@type": "BreadcrumbList",
//                 "itemListElement": [
//                     {
//                         "@type": "ListItem",
//                         "position": 1,
//                         "item": {
//                             "@id": "https://www.famousbusiness.in",
//                             "name": "Home"
//                         }
//                     },
//                     {
//                         "@type": "ListItem",
//                         "position": 2,
//                         "item": {
//                             "@id": `https://www.famousbusiness.in/${location}`,
//                             "name": location.replace(/-/g, " ") 
//                         }
//                     },
//                     {
//                         "@type": "ListItem",
//                         "position": 3,
//                         "item": {
//                             "@id": `https://www.famousbusiness.in/${location}/${keyword}`,
//                             "name": keyword.replace(/-/g, " ")
//                         }
//                     }
//                 ]
//             }
//         ]
//     };
// };

// const generateItemListSchema =(businessData, itemListSchemaName)=> {

//     return {
//         "@context": "https://schema.org",
//         "@graph": [
//             {
//                 "@type": "ItemList",
//                 "name": itemListSchemaName,
//                 "itemListElement": businessData.map((item, index)=> ({
//                     "@type": "ListItem",
//                     "position": index + 1,
//                     "item": {
//                         "@type": "LocalBusiness",
//                         "name": item?.business_page?.business_name,
//                         "url": `https://www.famousbusiness.in/userprofile/${item?.business_page?.business_name}/?z_id=${item?.business_page?.id}&Cate=${item?.business_page?.category?.type}`,
//                         "telephone": item?.business_page?.mobile_number,
//                         "address": {
//                             "@type": "PostalAddress",
//                             "streetAddress": item?.business_page?.address,
//                             "addressLocality": item?.business_page?.locality,
//                             "addressRegion": item?.business_page?.state,
//                             "postalCode": item?.business_page?.pincode,
//                             "addressCountry": "IN"
//                       },
//                       "geo": {
//                         "@type": "GeoCoordinates",
//                         "latitude": item?.business_page?.latitude,
//                         "longitude": item?.business_page?.longitude
//                       },
//                     //   "openingHours": "Mo-Sa 09:00-18:00",
//                       "serviceArea": {
//                         "@type": "Place",
//                         "name": item?.business_page?.city
//                       },
//                       "aggregateRating": {
//                         "@type": "AggregateRating",
//                         "ratingValue": item?.business_page?.rating,
//                         "ratingCount": item?.business_page?.reviews
//                       },
//                     },
//                     // "video": {
//                     //     "@type": "VideoObject",
//                     //     "name": "Sania CCTV Bazar Overview",
//                     //     "description": "Watch this video to learn more about Sania CCTV Bazar and the CCTV solutions they offer.",
//                     //     "thumbnailUrl": "https://example.com/sania-thumbnail.jpg",
//                     //     "uploadDate": "2025-03-03T12:00:00+00:00",
//                     //     "duration": "PT2M",
//                     //     "contentUrl": "https://www.youtube.com/watch?v=VIDEO_ID_1",
//                     //     "embedUrl": "https://www.youtube.com/embed/VIDEO_ID_1",
//                     //     "publisher": {
//                     //       "@type": "Organization",
//                     //       "name": "Sania CCTV Bazar",
//                     //       "logo": {
//                     //         "@type": "ImageObject",
//                     //         "url": "https://example.com/logo.jpg"
                           
//                     //       }
//                     //     }
//                     //   }
//                 }))
//               }
//         ]
//     }
// }

// const generateFaqSchema = (FaqSchemaData = []) => {
//     return {
//        "@context": "https://schema.org",
//        "@graph": [
//            {
//             "@type": "FAQPage",
//             "mainEntity": Array.isArray(FaqSchemaData) ? FaqSchemaData.map((item) => ({
//                 "@type": "Question",
//                 "name": item?.question_name,
//                 "acceptedAnswer": {
//                     "@type": item?.acceptedAnswer_type,
//                     "text": item?.acceptedAnswer_text
//                 }
//             })) : []
//            }
//        ]
//     };
// };

// const generateArticleSchema = (articleSchemaData)=> {
//     return {
//         "@context": "https://schema.org",
//         "@graph": [
//             {
//                 "@type": "Article",
//                 "headline": articleSchemaData?.headline,
//                 "articleBody": articleSchemaData?.articleBody,
//                 "author": {
//                   "@type": "Person",
//                   "name": "Admin Famous-Business"
//                 },
//                 "publisher": {
//                   "@type": "Organization",
//                   "name": articleSchemaData?.publisher_name,
//                   "logo": {
//                     "@type": "ImageObject",
//                     "url": articleSchemaData?.publisher_logo
//                   }
//                 },
//                 "datePublished": articleSchemaData?.datePublished,
//                 "image": articleSchemaData?.image,
//                 "mainEntityOfPage": {
//                   "@type": "WebPage",
//                   "@id": articleSchemaData?.mainEntityOfPage_id
//                 }
//             }
//         ]
//     }
// }


export default function KeywordPage({ params }) {
    const {location, keyword} = params;
    const { setLocationCity } = useGlobalState();
    const { locationOptions } = useMapboxLocation(location);
    const [businessData, setBusinessData] = useState([]);
    const [count, setCount] = useState(0);  //// Pagination Count
    const [noDataFound, setNoDataFound]   = useState(false);
    const [linkTag, setLinkTag] = useState([]);
    const [bodyTag, setBodyTag] = useState('');
    // const [filters, setFilters] = useState({});
    // const [metaTag, setMetaTag] = useState([]);
    // const [titleTag, setTitletag] = useState('');
    // const [itemListSchemaName, setItemListSchemaName] = useState('');
    // const [FaqSchemaData, setFaqSchemaData] = useState([]);
    // const [articleSchemaData, setArticleSchemaData] = useState({});
    const [visibleItems, setVisibleItems] = useState(10);
    const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? "http://127.0.0.1:8000" : 'https://api.famousbusiness.in'

    // Antd Modal section
    //////////////////////////
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCount, setShowCount] = useState(0);
    const secondTimerRef = useRef(null);
    const [mobile, setMobile] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // First modal appearance after 8 seconds
        const firstTimer = setTimeout(() => {
          setIsModalOpen(true);
          setShowCount(1);
        }, 8000);
    
        return () => clearTimeout(firstTimer);
      }, []);
    
      const handleClose = () => {
        setIsModalOpen(false);
    
        // If this was the first modal close, schedule the second appearance
        if (showCount === 1 && !isSubmitted) {
          secondTimerRef.current = setTimeout(() => {
            setIsModalOpen(true);
            setShowCount(2);
          }, 20000); // 20 seconds after first close
        }
      };
    
      useEffect(() => {
        return () => {
          if (secondTimerRef.current) {
            clearTimeout(secondTimerRef.current);
          }
        };
      }, []);

      const handleSubmit = async ()=> {
        if (!name  || !mobile || !location || !keyword) {
            message.warning('Please fill in all the fields.');
            return
        };

        const cleanLocation = location.replaceAll('-', ' ').trim();
        const cleanKeyword = keyword.replaceAll('-', ' ').trim();

        const payload = {
            mobile_number: mobile,
            name: name,
            city: cleanLocation,
            keyword: cleanKeyword,
        };

        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/lead-api/create/search/keyword/lead/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });
      
            const data = await response.json();
      
            if (response.status == 201) {
              message.success('Lead submitted successfully!');
              handleClose();
              setName('');
              setMobile('');
              setCity('');
              setIsSubmitted(true)

            } else {
              message.error(data.error || 'Failed to submit lead.');
            }
          } catch (error) {
            message.error('Something went wrong!');
          } finally {
            setLoading(false);
          }
      }

    ///////////////////

    const formattedLocation = location.replace(/-/g, ' ');
    const formattedKeyword  = keyword.replace(/-/g, ' ');

    // Generate schema dynamically
    // const breadCrumbSchema = generateBreadCrumbSchema(location, keyword);
    // const itemListSchema   = generateItemListSchema(businessData, itemListSchemaName)
    // const FaqSchema        = generateFaqSchema(FaqSchemaData ? FaqSchemaData : [])
    // const ArticleSchema    = generateArticleSchema(articleSchemaData)


    /// Set the location according to the path
    useEffect(()=> {
        if (locationOptions?.length > 0 && locationOptions[0]?.value) {
            setLocationCity(locationOptions[0]?.value)

        } else {
            setLocationCity('New Delhi')
            // window.location.href = '/'
        }
    }, [locationOptions, setLocationCity]);


    useEffect(()=> {
        if (keyword && location) {
            
            const params = new URLSearchParams({
                city: formattedLocation,
                keyword: formattedKeyword
            })

            axiosInstance.get(`${apiUrl}/api/listings/search/keyword/business/?${params.toString()}`).then((res)=> {
                // console.log('res', res)
                if (res.status === 200) {
                    setBusinessData(res.data.results.business_data)
                    setCount(res.data.count)
                    // setItemListSchemaName(res.data.results.item_list_schema_name)
                    // setFaqSchemaData(res.data.results.faq_schema)
                    // setArticleSchemaData(res.data.results.article_schema)
                    setBodyTag(res.data.results.body_tag)
                    setLinkTag(res.data.results.link_tag)
                }

            }).catch((error)=> {
                // console.log('error', error)

                if (error.response.status === 404) {
                    setNoDataFound(true)
                }
            })
        }
    }, [location, keyword, apiUrl, formattedLocation, formattedKeyword])


    // const handleFilterChange = (newFilters) => {
    //     // console.log(newFilters);
    //     setFilters(newFilters);
    // };

    const fetchMoreData = () => {
        // Increase the number of visible items by 10
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    };


    return (
<>


        <Row justify='center' gutter={[12, { xs: 8, sm: 8, md: 10, lg: 12, xl: 24, xxl: 24 }]} >

            <Col sm={0} xs={0} md={0} lg={23} xl={23} xxl={23}>
                <Row  gutter={7} align='middle'>
                    <Col >
                        <NextBreadcrumb separator=">" capitalizeLinks={true} />
                    </Col>
                    
                    <Col className='font-semibold pb-1'>
                        &gt;{count}
                    </Col>
                </Row>
            </Col>

            <Col span={23}>
                <p className="xl:text-3xl sm:text-lg md:text-xl font-semibold">{bodyTag ? bodyTag : ''}</p>
            </Col>

            {/* <Col sm={0} xs={0} md={0} lg={23} xl={23} xxl={23} >
                <div>
                    <CategoryFilter onFilterChange={handleFilterChange} />
                </div>
            </Col> */}

            <Col span={24}>
                <Row gutter={12} justify='space-around'>
                    {/* <Col sm={24} xs={24} md={18} lg={18} xl={18} xxl={18} className=' overflow-hidden'> */}
                    <Col sm={24} xs={24} md={23} className='overflow-hidden'>
                        <InfiniteScroll
                            dataLength={visibleItems}
                            next={fetchMoreData}
                            hasMore={businessData && visibleItems < businessData.length}
                            loader={
                                <Card>
                                    <Row gutter={[12, 12]}>
                                        <Col span={7}>
                                            <Skeleton.Avatar shape='square' size={150} active />
                                        </Col>

                                        <Col span={17}>
                                            <Flex justify='space-between' vertical gap={6}>
                                                <Skeleton paragraph={{rows: 2 }} />
                                                <Row justify='space-between' align='middle'>
                                                    <Col span={7}>
                                                        <Skeleton.Button block active />
                                                    </Col>

                                                    <Col span={7}>
                                                        <Skeleton.Button block active />
                                                    </Col>

                                                    <Col span={7}>
                                                        <Skeleton.Button block active />
                                                    </Col>

                                                    <Col span={7}>
                                                        <Skeleton.Button block active />
                                                    </Col>
                                                </Row>
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Card>
                            }>

                            <Row justify='center' className=' p-1' gutter={[0, { xs: 8, sm: 8, md: 24, lg: 24, xl: 24, xxl: 24 }]}>
                                {businessData && Array.isArray(businessData) && businessData.slice(0, visibleItems).map((item, index) => (
                                    <Col span={24} key={item.id}>
                                        <SearchKeyBusinessCard items={item?.business_page} index={index} />
                                    </Col>
                                ))}
                            </Row>

                        </InfiniteScroll>
                    </Col>


                    {/* Enquiry Form */}
                    {/* <Col sm={0} xs={0} md={0} lg={6} xl={6} xxl={6} >
                        <div className=' w-full sticky top-28'>
                            <Enquiry1 getRequire={`Verified Category in City`} />
                        </div>
                    </Col> */}
                    {/* Enquiry Form */}
                    
                </Row>
            </Col>
        </Row>

        <KeywordFooter />
        

        <Modal 
            title="Enquire for the product" 
            open={isModalOpen} 
            onOk={handleClose} 
            onCancel={handleClose} 
            destroyOnClose
            footer={null} 
            >
            <Input 
                placeholder="Type your name" 
                prefix={<UserOutlined />}  
                style={{margin:10}} 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input 
                placeholder="Your Mobile Number" 
                prefix={<UserOutlined />} 
                style={{margin:10}}  
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleClose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>

                <Button 
                    style={{color:'black', backgroundColor:'greenYellow'}} 
                    onClick={handleSubmit}
                    loading={loading}
                    >
                    Submit
                </Button>
            </div>
        </Modal>
    </>
    )
}