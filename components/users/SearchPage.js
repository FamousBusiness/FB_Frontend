"use client"
import React, { useState, useEffect } from 'react';
import { Card, Col, Flex, Row, Skeleton, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Banner from './home/leads/Banner';
import NextBreadcrumb from '../NextBreadcrum';
import BusinessCard from './Filter/Card';
import Enquiry1 from './EnquiryForm/Enquiry1';
import { get_product_by_category_id } from '@/services/Admin/products';
import SearchPageSkeleton from './SearchPageSkeleton';
import CategoryFilter from './Filter/FilterComponent';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import Head from 'next/head';
import Script from "next/script";




function SearchPage({ CatName }) {
    const [businessData, setBusinessData] = useState([]);
    const [schemaData, setSchemaData] = useState({});
    const [titleTag, setTitletag]     = useState('');
    const [metaTag, setMetaTag]       = useState([]);
    
    //// Schema data update section
    useEffect(() => {
        if (!businessData.length) return;
    
        // Extract category data from all businesses
        const categories = businessData.map(business => business.category).filter(Boolean); // Remove null categories
    
        // Process breadcrumb schema
        const breadcrumbSchema = categories.flatMap(category => 
            category?.breadcrumb_item_schema?.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@id": item?.item_id,
                    "name": item?.item_name,
                },
            }))
        ).length
            ? {
                "@context": "http://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": categories.flatMap(category => 
                    category?.breadcrumb_item_schema?.map((item, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "item": {
                            "@id": item?.item_id,
                            "name": item?.item_name,
                        },
                    }))
                ),
            }
            : null;
    
        // Process item list schema
        const itemListSchema = categories.flatMap(category => category?.item_list_schema?.list_elements || []).length
            ? {
                "@context": "http://schema.org",
                "@type": "ItemList",
                "name": categories[0]?.item_list_schema?.name, // Assuming one name applies
                "itemListElement": categories.flatMap(category => 
                    category?.item_list_schema?.list_elements?.map((item, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "item": {
                            "@type": "LocalBusiness",
                            "name": item?.item_name,
                            "url": item?.item_url,
                            "telephone": item?.telephone,
                            "address": {
                                "@type": item?.address_type,
                                "streetAddress": item?.streetAddress,
                                "addressLocality": item?.addressLocality,
                                "addressRegion": item?.addressRegion,
                                "postalCode": item?.postalCode,
                                "addressCountry": item?.addressCountry,
                            },
                            "openingHours": item?.openingHours,
                            "serviceArea": {
                                "@type": item?.serviceArea_type,
                                "name": item?.serviceArea_name,
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": item?.ratingValue,
                                "ratingCount": item?.ratingCount,
                            },
                        },
                    }))
                ),
            }
            : null;
    
        // Process FAQ schema
        const faqPageSchema = categories.flatMap(category => category?.faq_page_schema || []).length
            ? {
                "@context": "http://schema.org",
                "@type": "FAQPage",
                "mainEntity": categories.flatMap(category => 
                    category?.faq_page_schema?.map(item => ({
                        "@type": "Question",
                        "name": item?.Question_name,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item?.acceptedAnswer_text,
                        },
                    }))
                ),
            }
            : null;
        
        //// Process Article schema
        const articleSchema = categories.flatMap(category => category?.articleSchema || []).length
        ? {
            "@context": "http://schema.org",
            "@graph": categories.flatMap(category => 
                category?.articleSchema?.map(item => ({
                    "@type": "Article",
                    "headline": item?.headline,
                    "articleBody": item?.articleBody,
                    "author": {
                        "@type": "Person",
                        "name": "Admin Famous-Business",
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": item?.publisher_name,
                        "logo": {
                            "@type": "ImageObject",
                            "url": item?.logo_url,
                        },
                    },
                    "datePublished": item?.datePublished,
                    "image": item?.image,
                    "mainEntityOfPage": {
                        "@type": item?.mainEntityOfPage_type,
                        "@id": item?.mainEntityOfPage_id,
                    },
                }))
            ),
        }
        : null;

        const VideoObjectSchema = categories.some(category => category?.video_object_schema) 
            ? {
                "@context": "https://schema.org",
                "@graph": categories
                    .filter(category => category?.video_object_schema) // Filter out categories without video_object_schema
                    .map(category => {
                        const videoSchema = category.video_object_schema; // Since it's not an array, use directly
                        
                        return {
                            "@type": "VideoObject",
                            "name": videoSchema?.name,
                            "description": videoSchema?.description,
                            "thumbnailUrl": videoSchema?.thumbnailUrl,
                            "uploadDate": videoSchema?.uploadDate,
                            "duration": videoSchema?.duration,
                            "contentUrl": videoSchema?.contentUrl,
                            "embedUrl": videoSchema?.embedUrl,
                            "publisher": {
                                "@type": "Organization",
                                "name": videoSchema?.publisher_name,
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": videoSchema?.publisher_logo
                                }
                            },
                            "interactionStatistic": videoSchema?.interaction_statitics?.map(interaction => ({
                                "@type": "InteractionCounter",
                                "interactionType": { "@type": interaction?.interactionType },
                                "userInteractionCount": interaction?.userInteractionCount,
                                "url": interaction?.url
                            })) || [] // Ensures this property is always an array
                        };
                    })
            }
            : null; // Return null if no valid video data exists

    
        setSchemaData({
            breadcrumbSchema,
            itemListSchema,
            faqPageSchema,
            articleSchema,
            VideoObjectSchema
        });
    
    }, [businessData]);
    

    // const pincode = locationState.pincode;
    const params = useParams();
    const { locationState } = useGlobalState()
    const { user, authTokens } = useAuth()
    const city = decodeURIComponent(params.item[0]);
    const category = decodeURIComponent(params.item[1]);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const City = locationState.city;
    const State = locationState.state;
    const [visibleItems, setVisibleItems] = useState(10);
    const [filters, setFilters] = useState({});
    const [filteredData, setFilteredData] = useState(null);

    const customSort = (a, b) => {
        // Check for 'authorized', 'verified', and 'trusted' properties in descending order
        if (a.authorized && !b.authorized) {
            return -1;
        } else if (!a.authorized && b.authorized) {
            return 1;
        } else if (a.verified && !b.verified) {
            return -1;
        } else if (!a.verified && b.verified) {
            return 1;
        } else if (a.trending && !b.trending) {
            return -1;
        } else if (!a.trending && b.trending) {
            return 1;
        } else if (a.trusted && !b.trusted) {
            return -1;
        } else if (!a.trusted && b.trusted) {
            return 1;
        } else {
            return 0;
        }
    };

    const fetchMoreData = () => {
        // Increase the number of visible items by 10
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log('page', page);
                const response = await get_product_by_category_id(CatName, City, page);
                setData(response.results);
                setTitletag(response.results.title_tag)
                setMetaTag(response.results.category_meta_tag)
                setCount(response.count);
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, [CatName, City, page]);


    ///// Update Business data for Schema
    useEffect(()=> {
        if (data?.category_wise_business?.length > 0) {
            setBusinessData(data.category_wise_business);
        }
    }, [data])
    
    

    useEffect(() => {
        if (visibleItems === 100) {
            setPage((prev) => prev + 1);
        }

    }, [visibleItems])


    useEffect(() => {
        if (data) {
            // Apply filters here to the 'data' state
            let filteredData = data.category_wise_business;

            if (filters.trending) {
                filteredData = filteredData.filter((item) => item.trending === true);
            }

            if (filters.authorized) {
                filteredData = filteredData.filter((item) => item.authorized === true);
            }
            // Apply filter for 'topRated'
            if (filters.pincode) {
                filteredData = filteredData.filter(
                    (item) => item.pincode === filters.pincode
                );
            }

            // Apply filter for 'verified'
            if (filters.verified) {
                filteredData = filteredData.filter(
                    (item) => item.verified === true
                );
            }

            // Apply filter for 'ratings'
            if (filters.ratings) {
                filteredData = filteredData.filter(
                    (item) => item.rating >= filters.ratings
                );
            }

            // Apply filter for 'trusted'
            if (filters.trusted) {
                filteredData = filteredData.filter(
                    (item) => item.trusted === true
                );
            }
            filteredData.sort(customSort);

            setFilteredData(filteredData);
        }
    }, [data, filters]);


    const handleFilterChange = (newFilters) => {
        // console.log(newFilters);
        setFilters(newFilters);
    };

    if (error) {
        return <div className='min-h-screen'>Error during data fetch</div>;
    }

    if (!data) {
        return <div><SearchPageSkeleton /></div>;
    }


    return (
<>
        <title>{titleTag}</title>

        {metaTag.map((item, index) => (
            <meta 
                key={index}
                {...(item.name ? { name: item.name } : {})}
                {...(item.property ? { property: item.property } : {})}
                content={item?.content} 
            />
        ))}
     
        {Object.values(schemaData).map(
            (schema, index) =>
                schema && (
                    <script
                        key={index}
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                    />
            )
        )}
       
    
    <Row justify='center' gutter={[12, { xs: 8, sm: 8, md: 10, lg: 12, xl: 24, xxl: 24 }]} >
        <Col sm={24} xs={24} md={24} lg={23} xl={23} xxl={23}>
            {data.category_wise_banner && data.category_wise_banner.length > 0 || data.side_images && data.side_images.length > 0 ? <Banner side={data.side_images} banner={data.category_wise_banner} /> : null}
        </Col>

        <Col sm={0} xs={0} md={0} lg={23} xl={23} xxl={23}>
            <Row  gutter={7} align='middle'>
                <Col >
                    <NextBreadcrumb separator=">" capitalizeLinks={true} />
                </Col>
                
                <Col className=' font-semibold pb-1'>
                    &gt;{count}
                </Col>
            </Row>
        </Col>

        <Col span={23}>
            <p className=" xl:text-2xl sm:text-lg md:text-xl font-semibold ">Verified {category} in {city}</p>
        </Col>

        <Col sm={0} xs={0} md={0} lg={23} xl={23} xxl={23} >
            <div>
                <CategoryFilter onFilterChange={handleFilterChange} />
            </div>
        </Col>

        <Col span={24}>
            <Row gutter={12} justify='space-between'>
                <Col sm={24} xs={24} md={18} lg={18} xl={18} xxl={18} className=' overflow-hidden'>
                    <InfiniteScroll
                        dataLength={visibleItems}
                        next={fetchMoreData}
                        hasMore={filteredData && visibleItems < filteredData.length}
                        loader={
                            <Card>
                                <Row gutter={[12, 12]}>
                                    <Col span={7}>
                                        <Skeleton.Avatar shape='square' size={150} active />
                                    </Col>
                                    <Col span={17}>
                                        <Flex justify='space-between' vertical gap={6}>
                                            <Skeleton paragraph={{
                                                rows: 2
                                            }} />
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
                            {filteredData && Array.isArray(filteredData) && filteredData.slice(0, visibleItems).map((item, index) => (
                                <Col span={24} key={item.id}>
                                    <BusinessCard items={item} index={index} category={category} />
                                </Col>
                            ))}
                        </Row>
                    </InfiniteScroll>
                </Col>

                <Col sm={0} xs={0} md={0} lg={6} xl={6} xxl={6} >
                    <div className=' w-full sticky top-28'>
                        <Enquiry1 getRequire={`Verified ${category} in ${city}`} />
                    </div>
                </Col>
                
            </Row>
        </Col>
    </Row>
</>

    );
}


export default SearchPage;


