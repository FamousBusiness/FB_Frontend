"use client";

import { Player } from '@lottiefiles/react-lottie-player'
import { Badge, Col, Row, Skeleton } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Carousel1 from './Carousel'
import { useHomeData } from '@/services/Commondata/HomeData';
// import { get_all_leads } from '@/services/Admin/Leads';
import { useAuth } from '@/context/AuthContext';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import { useRouter } from 'next/navigation';
// import { EnvironmentMode } from '@/components/environment';







function Top() {
  const { user } = useAuth()
  const { locationState } = useGlobalState()
  const [leadsCount, setLeadsCount] = useState(0)
  const { homedata, isLoading, isError } = useHomeData();
  const [apiUrl, setApiURL]              = useState('');
  const router = useRouter()

  const city = locationState.city;
  const state = locationState.state;

  
  useEffect(()=> {
    const is_development = process.env.NEXT_PUBLIC_IS_DEVELOPMENT
    
    if (is_development === 'True') {
      setApiURL('http://127.0.0.1:8000')
    } else {
      setApiURL('https://api.famousbusiness.in')
    }
  }, []);

  // console.log('apiURL', environmentMode())

  // const apiUrl = environmentMode()

  // console.log('apiUrl', apiUrl)

  // useEffect(() => {
  //   if (apiUrl) {
  //     const fetchData = async () => {
  //       try {
  //         const leadsData = await get_all_leads(`${apiUrl}/lead-api/all-leads/${city}/${state}/`);
  //         const results = await leadsData.results;
  
  //         if (user) {
  //           const total = results.Leads.length + results.Individual_Leads.length + results.Other_Category_Leads.length
  //           setLeadsCount(total);
  
  //         }
  //         else {
  //           setLeadsCount(results.Leads.length);
  //         }
  
  //       } catch (error) {
  //         console.error('Error fetching leads:', error);
  //       }
  //     };
  
  //     fetchData();

  //   } else {
  //      console.log('Not able to get API URL')
  //   }

  // }, [user, city, state, apiUrl]);



  if (isLoading) {
    return <Row align='middle' justify='center' gutter={12}>
      <Col xs={0} sm={0} md={0} lg={4} xl={4}>
        <Skeleton.Input block={true} style={{ height: '237px' }} active className=' w-full object-cover' />
      </Col>
      <Col xs={23} sm={23} md={18} lg={12} xl={12} xxl={12} >
        <div className=' h-36 relative overflow-hidden rounded-lg mx-1 lg:rounded-md xl:rounded-md 2xl:rounded-md xl:h-60 lg:h-60 2xl:h-60'>
          <Skeleton.Input block={true} style={{ height: '237px' }} active className='w-full object-cover' />
        </div>
      </Col>
      <Col xs={0} sm={0} md={0} lg={4} xl={4}>
        <Skeleton.Input block={true} style={{ height: '237px' }} active className='w-full object-cover' />
      </Col>
      <Col xs={0} sm={0} md={0} lg={4} xl={4}>
        <Skeleton.Input block={true} style={{ height: '237px' }} active className='w-full object-cover' />
      </Col>
    </Row>
  }

  if (isError) {
    return <p>Error loading data.</p>;
  }


  return (
    <Row align='middle' justify='center' gutter={[20, 4]} >
      <Col xs={0} sm={0} md={4} lg={4} xl={4}>
        <div className=' bg-orange-600 rounded-lg flex flex-col relative  justify-center items-center h-60 w-full '>
          <div className=' flex flex-col items-center'>
            <div className=' text-3xl font-bold text-white'>GST</div>
            <div className=' text-xl font-bold text-white'>INVOICE MAKER</div></div>
          <Player
            style={{ width: '50%', marginTop: '-10px ' }}
            src='/CategoryNearMe/Invoice.json'
            loop
            autoplay />
          <div className=' text-lg font-sans font-semibold mt-2 px-2 '>
            <div onClick={() => router.push('/invoice-generator')} className=' cursor-pointer border border-1 text-center border-white rounded-full py-1 px-2 hover:px-4 duration-300 text-white'>Get Started</div>
          </div>
        </div>
      </Col>
     
      {/* Carousel */}
      <Col xs={23} sm={23} md={12} lg={12} xl={12} xxl={12} >
        {homedata.Carousel.length > 0 ? <Carousel1 data={homedata.Carousel} /> : null}
      </Col>

       {/* Online Tender */}
      <Col xs={0} sm={0} md={4} lg={4} xl={4}  >
        <div className=' bg-green-600 rounded-lg relative flex flex-col justify-center items-center w-full h-60  py-2'>
          <div className=' flex flex-col items-center'>
            <div className=' text-2xl font-bold text-white'>ONLINE</div>
            <div className=' text-base  font-bold text-white'>OREDERS</div>
            {/* <div className=' text-white font-bold absolute top-24'>Bid The Projects</div> */}
          </div>
          <Player
            style={{ width: '50%', marginTop: '-10px ' }}
            src='/Lotties/Cart1.json'
            loop
            autoplay
          />
          <div className=' text-lg font-sans font-semibold px-2 '>
            <Link href='/store' ><div className=' border border-1 text-center border-white rounded-full py-1 px-2 hover:px-4 duration-300 text-white'>View Orders</div></Link>
          </div>
        </div>
      </Col>

      {/* Live Leads */}
      {/* Free live leads */}
      <Col xs={0} sm={0} md={4} lg={4} xl={4} >
        <div style={{ height: '100%', width:'100%' }}>
          <Badge count={leadsCount} overflowCount={99}>
            <div className=' bg-cyan-800 relative rounded-lg w-full  flex flex-col justify-center items-center  max-full h-60'>
              <div className=' flex flex-col items-center'>
                <div className='text-lg text-white font-bold'>LIVE Leads</div>
              </div>
              <Player
                style={{ width: '50%', marginTop: '-10px ' }}
                src='/Lotties/Database.json'
                loop
                autoplay />
              <div className=' text-lg font-sans font-semibold mt-2 px-2  '>
                <Link href='/leads' >
                  <div className=' border border-1 text-center border-white rounded-full py-1 px-2 hover:px-4 duration-300 text-white'>View Leads</div>
                </Link>
              </div>
            </div>
          </Badge>
        </div>
      </Col>

    </Row>

  );
};


export default Top
