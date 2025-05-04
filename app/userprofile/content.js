"use client";

import { Row, Col, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import MobileView from '@/components/users/ProfilePage/MobileView';
// import SearchPageSkeleton from '@/components/users/SearchPageSkeleton';
import DesktopView from '@/components/users/ProfilePage/DesktopView';
import Footer from '@/components/users/ProfilePage/Footer';
import EmailPass from '@/utils/EmailPasswordSet';



export default function BusinessProfileContent({business, searchParams}) {
    const [open, setOpen] = useState(false);

    const mail = searchParams?.mail;
    const uuid = searchParams?.uuid;
    const token = searchParams?.token;
    const categoryName = decodeURIComponent(searchParams?.Cate || '');

    const handleRefresh = () => {
        mutate()
    }

    useEffect(() => {
        if (mail) {
            setTimeout(() => {
                setOpen(true);
            }, 2000);
        }
    }, [mail]);


    const handleShareClick = async () => {
        const currentUrl = window.location.href;
        const shareData = {
            title: 'Share via',
            text: 'Check out this link:',
            url: currentUrl,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                window.location.href = `mailto:?subject=${shareData.title}&body=${shareData.text} ${currentUrl}`;
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        return total / reviews.length;
    };

    const averageRating = calculateAverageRating(business.ReviewRatings);


return (
    <div className='overflow-hidden'>
        <Row>
            <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                <MobileView 
                    brand={false} 
                    refresh={() => window.location.reload()} 
                    averageRating={averageRating} 
                    handleShareClick={handleShareClick} 
                    business={business} 
                    categoryName={categoryName}
                />
            </Col>

            <Col xs={0} sm={0} md={0} xl={24} xxl={24} lg={24}>
                <DesktopView 
                    brand={false} 
                    refresh={() => window.location.reload()} 
                    averageRating={averageRating} 
                    handleShareClick={handleShareClick} 
                    business={business} 
                    categoryName={categoryName}
                />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Footer BusinessName={business} />
            </Col>
        </Row>
        {mail && uuid && <EmailPass tokens={token} uuid={uuid} visible={open} />}
    </div>


    )
}