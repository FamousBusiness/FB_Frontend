import { Col, Result, Row } from 'antd'
import React from 'react'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import SearchPageSkeleton from '../SearchPageSkeleton'
import NextBreadcrumb from '@/components/NextBreadcrum'
import Enquiry1 from '../EnquiryForm/Enquiry1'
import BusinessCard from '../Filter/Card'
import BrandCard from './BrandCard'
const fetcher = async (url) => {
    try {
        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const brand = data.results;
        return brand;
    } catch (error) {
        console.log("Error in getting brands by ID (service) =>", error);
    }
};
function SearchPageBrand() {
    const params = useParams();
    const name = decodeURIComponent(params.city);
    // console.log("decode", name);
    const { data, error } = useSWR(`https://api.famousbusiness.in/brand-api/${name}/`, fetcher);
    if (error) {
        // Handle error, e.g., display an error message
        return <Result status="error" subTitle={error} />;
    }
    if (!data) {
        // Handle loading state, e.g., display a loading spinner
        return <div><SearchPageSkeleton /></div>;
    }
    const handleShareClick = async () => {
        const currentUrl = window.location.href;
        // console.log(currentUrl);
        if (navigator.share) {
            // Use the Web Share API if supported
            try {
                await navigator.share({
                    title: 'Share via',
                    text: 'Check out this link:',
                    url: currentUrl,
                });
            } catch (error) {
                console.error('Share API error:', error);
            }
        } else {
            // Fallback for browsers that don't support the Web Share API
            const shareText = `Check out this link: ${currentUrl}`;
            const shareSubject = 'Share via';
            // Use the Web Share dialog if available
            if (navigator.canShare && navigator.canShare({ title: shareSubject, text: shareText, url: currentUrl })) {
                try {
                    await navigator.share({ title: shareSubject, text: shareText, url: currentUrl });
                } catch (error) {
                    console.error('Web Share dialog error:', error);
                }
            } else {
                // Fallback to a generic share link
                const shareLink = `mailto:?subject=${shareSubject}&body=${shareText}`;
                window.location.href = shareLink;
            }
        }
    };
    return (
        <div className='p-1'>
            <Row justify='center' gutter={[12, { xs: 8, sm: 8, md: 10, lg: 12, xl: 24, xxl: 24 }]} >
                <Col sm={24} xs={24} md={24} lg={23} xl={23} xxl={23}>
                    <BrandCard brand={data} handleShareClick={handleShareClick} />
                </Col>
                <Col sm={0} xs={0} md={0} lg={23} xl={23} xxl={23}>
                    <div>
                        <NextBreadcrumb separator=">" capitalizeLinks={true} />
                    </div>
                </Col>
                <Col span={23}>
                    <p className=" xl:text-2xl sm:text-lg md:text-xl font-semibold ">Associate Dealer with {name}</p>
                </Col>
                <Col span={24}>
                    <Row gutter={12} justify='space-between' >
                        <Col sm={24} xs={24} md={24} lg={18} xl={18} xxl={18}>
                            {data.Business && data.Business.length > 0 ?
                                <Row justify='center' gutter={[12, { xs: 4, sm: 4, md: 4, lg: 24, xl: 24, xxl: 24 }]}>
                                    {data.Business.map((item, index) => (
                                        <Col span={24} key={index}>
                                            <BusinessCard items={item} index={index} />
                                        </Col>
                                    ))
                                    }
                                </Row> : "No Data"}
                        </Col>
                        <Col sm={0} xs={0} md={0} lg={6} xl={6} xxl={6} >
                            <div className=' w-full sticky top-1/3'>
                                <Enquiry1 />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default SearchPageBrand
