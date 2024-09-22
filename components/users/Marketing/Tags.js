import React, { useState } from 'react';
import { Carousel, Col, Row, Tabs } from 'antd';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const AllTab = () => {
  const router = useRouter()
  const [select, setSelect] = useState('ads');
  const pathName = usePathname()

  const Apply = (value) => {
    router.push(`/marketing/${value}?search=${value}`);
    setSelect(value);
  }
  return (
    <Row>
      {/* Mobile View */}
      <Col xs={24} md={24} sm={24} xl={0} xxl={0} lg={0}>
        <Carousel infinite={true} slidesToShow={3} swipeToSlide={false} dots={false}>
          <div className='p-1' >
            <div onClick={() => Apply('')} className={`flex flex-col items-center ${select == '' ? "bg-slate-200" : null} justify-center h-28 relative p-2 border border-1 rounded-md`}>
              <div className=" text-center overflow-hidden">
                <Image height={50} width={50} alt='gdshgsdv' style={{ objectFit: 'cover' }} src='/marketing/ads.svg' />
              </div>
              <div className=' absolute w-full text-white -bottom-2 left-0 py-1 rounded-br-md rounded-bl-md bg-green-600 text-center'>Ads Post</div>
            </div>
          </div>
          <div className='p-1' >
            <div onClick={() => Apply('banner')} className={`flex flex-col items-center ${select == 'banner' ? "bg-slate-200" : null} justify-center h-28 relative p-2 border border-1 rounded-md`}>
              <div className=" text-center overflow-hidden">
                <Image height={50} width={50} alt='gdshgsdv' style={{ objectFit: 'cover' }} src='/marketing/banner1.svg' />
              </div>
              <div className=' absolute w-full text-white -bottom-2 left-0 py-1 rounded-br-md rounded-bl-md bg-green-600 text-center'>Banner Post</div>
            </div>
          </div>
          <div className='p-1' >
            <div onClick={() => Apply('bulkmsg')} className={`flex flex-col items-center ${select == 'bulkmsg' ? "bg-slate-200" : null} justify-center h-28 relative p-2 border border-1 rounded-md`}>
              <div className=" text-center overflow-hidden">
                <Image height={50} width={50} alt='gdshgsdv' style={{ objectFit: 'cover' }} src='/marketing/messenger4.svg' />
              </div>
              <div className=' absolute w-full text-white -bottom-2 left-0 py-1 rounded-br-md rounded-bl-md bg-green-600 text-center'>Bulk Mesenger</div>
            </div>
          </div>
        </Carousel>
      </Col>
      {/* Desktop View */}
      <Col xs={0} md={0} sm={0} xl={24} xxl={24} lg={24}>
        <Row justify='space-around' gutter={[24, 24]}>
          <Col span={3} >
            <Link href='/marketing' >
              <div className='bg-green-500  flex flex-col justify-center items-center  border border-1 rounded-full  h-32 w-32 hover:bg-red-200 hover:shadow-lg hover:cursor-pointer' >
                <div className=' place-items-center'>
                  <Player src='/marketing/ads1.json' hover={true} />
                </div>
              </div>
              <div className=' font-bold text-center text-black'>Post Ads</div>
            </Link>
          </Col>
          <Col span={3} >
            <Link href='/marketing'>
              <div className='bg-orange-500  flex flex-col justify-center items-center text-center border border-1 rounded-full  h-32 w-32 hover:bg-red-200 hover:shadow-lg hover:cursor-pointer' >
                <div className=' place-items-center'>
                  <Player src='/marketing/Website.json' style={{ width: '90%' }} hover={true} />
                </div>
              </div>
              <div className=' font-bold text-center text-black'>Post Banner</div>
            </Link>
          </Col>
          <Col span={3} >
            <Link href='/marketing'>
              <div style={{ background: '#19A29A' }} className='flex flex-col justify-center items-center text-center border border-1 rounded-full  h-32 w-32 hover:bg-red-200 hover:shadow-lg hover:cursor-pointer' >
                <div className=' place-items-center'>
                  <Player src='/marketing/messenger.json' style={{ width: '60%' }} hover={true} />
                </div>
              </div>
              <div className=' font-bold text-center text-black'>Bulk Messenger</div>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default AllTab;
