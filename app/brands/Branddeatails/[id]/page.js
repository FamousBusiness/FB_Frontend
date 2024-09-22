"use client"
import DesktopView from '@/components/users/ProfilePage/DesktopView'
import Footer from '@/components/users/ProfilePage/Footer'
import MobileView from '@/components/users/ProfilePage/MobileView'
import SearchPageSkeleton from '@/components/users/SearchPageSkeleton'
import { Col, Result, Row } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'


const fetcher = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'GET'
    })
    if (!res.ok) {
      throw new Error(`Fetching ${url} failed`)
    }
    const data = await res.json()

    console.log(data);
    const business = data.data
    return business.Brand_data

  }
  catch (err) {
    console.error(err)

  }

}

function Page() {
  const param = useParams()
  const brand = decodeURIComponent(param.id)
  const { data, error, mutate } = useSWR(`https://api.famousbusiness.in/brand-api/brand-profile/${brand}/`, fetcher)

  if (!data) {
    return <SearchPageSkeleton />
  }

  if (error) {
    return <Result status='500' subTitle={error} />
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


  const handleRefresh = () => {
    mutate();
  }

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
  const averageRating = calculateAverageRating(data.ReviewRatings);
  return (

    <div className=' overflow-hidden'>
      <Row>
        <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
          <MobileView brand={true} refresh={handleRefresh} averageRating={averageRating} handleShareClick={handleShareClick} business={data} />
        </Col>
        <Col xs={0} sm={0} md={0} xl={24} xxl={24} lg={24}>
          <DesktopView brand={true} refresh={handleRefresh} averageRating={averageRating} handleShareClick={handleShareClick} business={data} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Footer BusinessName={data} />
        </Col>
      </Row>
    </div>
  )
}

export default Page




