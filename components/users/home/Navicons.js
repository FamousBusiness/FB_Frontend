"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Row, Col, Badge } from 'antd';
import CountUp from 'react-countup';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';
import StoreIcon from '@mui/icons-material/Store';





const MenuBar = () => {
  const [counterValue, setCounterValue] = useState(100000);
  useEffect(() => {
    const decreaseInterval = setInterval(() => {
      setCounterValue((prevValue) => prevValue - 1000);
    }, 5000); // Decrease by 100,000 every 5 seconds

    const increaseInterval = setInterval(() => {
      setCounterValue((prevValue) => prevValue + 999);
    }, 60000); // Increase by 100,000 every 1 minute

    // Clear the intervals when the component is unmounted
    return () => {
      clearInterval(decreaseInterval);
      clearInterval(increaseInterval);
    };
  }, []);



  return (
    <Row justify='space-between' align='middle'>
      <Col span={23}>
        <Row justify='space-between' gutter={[{ xs: 8, sm: 16, md: 24, lg: 80 }, 0]} align='middle'>
          
          <Col span={4}>
            <div className=' flex flex-col justify-start items-center '>
              <Player src='/Lotties/liveSig.json' style={{ height: '80px', width: '80px', position: 'absolute', zIndex: 1, marginTop: '-32px', marginRight: '24px' }} autoplay loop />
              <FaUser style={{ color: 'green', fontSize: 40 }} />
              <div><CountUp start={90000} end={counterValue} style={{ fontWeight: 'bold', fontSize: '25px', color: 'red' }} duration={27} /></div>
            </div>
          </Col>
          
          <Col>
            <Link href='/' className=' text-center items-center flex flex-col'>
              <Image src="/HomeNavbar/home.svg" width={50} height={50} alt='marketplace' />
              <div className=' font-bold text-black'>Home</div>
            </Link>
          </Col>

          <Col>
            <Link className=' text-center items-center flex flex-col' href='/store'>
              {/* <Image src="/HomeNavbar/marketing.svg" width={50} height={50} alt='marketing' /> */}
              <StoreIcon color='primary' sx={{fontSize:'3.2rem'}} />
              <div className=' font-bold text-black'>Store</div>
            </Link>
          </Col>

          <Col>
            <Link target='_blank' href={`https://wa.me/919883835373`} className=' text-center items-center flex flex-col'>
              <Image src="/HomeNavbar/messenger.svg" width={50} height={50} alt='messanger' />
              <div className=' font-bold text-black'>Technical Support</div>
            </Link>
          </Col>

          <Col>
            <Link className=' text-center items-center flex flex-col' href='/'>
              <Image src="/HomeNavbar/wallet.svg" width={50} height={50} alt='wallet' />
              <div className=' font-bold text-black'>Wallet</div>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>

  );
};

export default MenuBar;
