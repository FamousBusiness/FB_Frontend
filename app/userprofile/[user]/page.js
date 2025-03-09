
"use client";
import { Row, Col, Result } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { get_product_by_id } from '@/services/Admin/products';
import useSWR from 'swr';
import { useAuth } from '@/context/AuthContext';
import MobileView from '@/components/users/ProfilePage/MobileView';
import SearchPageSkeleton from '@/components/users/SearchPageSkeleton';
import DesktopView from '@/components/users/ProfilePage/DesktopView';
import ProfilePop from '@/utils/ProfilePop';
import Footer from '@/components/users/ProfilePage/Footer';
import EmailPass from '@/utils/EmailPasswordSet';
import Head from 'next/head';



// export async function generateMetadata({ searchParams }) {
//     const id = searchParams.get("z_id");
//     if (!id) return {};

//     const business = await get_product_by_id(id);
//     if (!business) return {};

//     return {
//         title: `${business.name} - Best ${business.category} Services`,
//         description: business.description || "Find the best services here!",
//         openGraph: {
//             title: `${business.name} - ${business.category}`,
//             description: business.description || "Find the best services here!",
//             images: [business.image], // Use the correct image URL
//         },
//     };
// }



function Page() {
    const [open, setOpen] = useState(false)
    const searchParam  = useSearchParams()
    const id           = searchParam.get('z_id');
    const mail         = searchParam.get('mail')
    const uuid         = searchParam.get('uuid')
    const token        = searchParam.get('token');
    const CategoryName = decodeURIComponent(searchParam.get('Cate'));

    const handleRefresh = () => {
        mutate()
    }

    useEffect(() => {
        if (mail) {
            setTimeout(() => {
                setOpen(true);
            }, 2000)
        }
    }, [mail]);

    const { data: business, error, mutate } = useSWR(id, get_product_by_id);

    if (!business) {return <div><SearchPageSkeleton /></div>}
    
    if (error) {
        // Handle error, e.g., display an error message
        return <Result status='500' subTitle={error} />;
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


    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) {
            return 0; // Return 0 if there are no reviews
        }

        // Calculate the sum of all ratings
        const sumOfRatings = reviews.reduce((sum, review) => sum + review.rating, 0);

        // Calculate the average rating
        const averageRating = sumOfRatings / reviews.length;

        return averageRating;
    };



    const averageRating = calculateAverageRating(business.ReviewRatings);


    return (
        <>
        
        <div className='overflow-hidden'>
            <Row>
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    <MobileView 
                        brand={false} 
                        refresh={handleRefresh} 
                        averageRating={averageRating} 
                        handleShareClick={handleShareClick} 
                        business={business} 
                        categoryName={CategoryName}
                        />
                </Col>

                <Col xs={0} sm={0} md={0} xl={24} xxl={24} lg={24}>
                    <DesktopView 
                        brand={false} 
                        refresh={handleRefresh} 
                        averageRating={averageRating} 
                        handleShareClick={handleShareClick} 
                        business={business} 
                        categoryName={CategoryName} 
                        />
                </Col>
                
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Footer BusinessName={business} />
                </Col>
            </Row>
            {mail && uuid && <EmailPass tokens={token} uuid={uuid} visible={open} />}
        </div>
    </>
    )
}

export default Page