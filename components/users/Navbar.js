"use client";
import { Button, Col, Flex, Modal, Row, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AutoCom from "./AutoComplete";
import MenuBar from './home/Navicons';
import LocAuto from './location/SelectLoc';
import ProfileDrawer from './profile/Avatar';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { IoBusiness } from 'react-icons/io5';
import { motion } from 'framer-motion';
import MenuBar1 from './MenuBar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LoginForm from '@/utils/LandingPageModel';
import axios from 'axios';




const Navbar = () => {
  const pathName = usePathname()
  const router   = useRouter();
  const { user, userdata, authTokens } = useAuth();
  const [login, setLogin]              = useState(false);  /// Login State (false no need to Login) (True Need to Login)
  const [location, setLocation]        = useState('');
  const [search, setSearch]            = useState('');
  const [isScrolled, setIsScrolled]    = useState(false); 
  const [focus, setFous]               = useState(false);
  const [removePlan, setRemovePlan]    = useState(false);
  const [apiUrl, setApiURL]            = useState(
            process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? "http://127.0.0.1:8000" : 'https://api.famousbusiness.in'
      );


 
    ///// Login of user for Premium plan access
    const handleCheckPremiumPlanLogin = async () => {
      if (!authTokens) {
          setLogin(true);
          return;
      }
    
      try {
        const response = await axios.post(`${apiUrl}/api/token/verify/`, {
          token: authTokens.access
        });
    
        if (response.status === 200) {
          setLogin(false);
          window.location.href = '/plan'; // Redirect after successful verification
        }

      } catch (error) {
        console.error('Token verification failed:', error.response ? error.response.data : error.message);
        setLogin(true);
      }
    };


  // chek whether the path starts with store or not 
  useEffect(()=> {
      const url = new URL(window.location.href)
      const firstPath = url.pathname.split("/")[1];

      if (firstPath === 'store') {
          setRemovePlan(true);
      }

  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handle = () => {
    setFous(true)
  }



  const handleSearch = (value) => {
    setLocation(value);
  };


  const handleSubmit = (value) => {
    const category = 'All category';
    // Set default productID to 'all-products' or pass the actual product ID
    const productID = 'all-products'; // Change this to the default value you want
    router.push(`/Search/${location}/${value}`);
    setSearch(`/Search/${location}/${value}`);
  }


  const handleFreeListingClick = () => {
    if (user && userdata.business) {
      Modal.success({
        title: 'Thank You',
        icon: <IoBusiness />,
        content: 'Business Already Listed'
      })
    } else {
      router.push('/registration'); // Redirect to registration page
    }
  };

  return (
    <>
      {
      pathName.includes('/failure') || 
      pathName.includes('/success') || 
      pathName.includes('/admin') || 
      pathName.includes('/login') || 
      pathName.includes('/about') || 
      pathName === '/job/employerdash' || 
      pathName === '/job/employeedash' || 
      pathName == '/tender' || 
      pathName.includes('/registration') || 
      pathName.includes('/passwordChange') || 
      pathName.includes('/enquiry') ? null :

        <div className=" px-2 py-2 sm:py-3  mb-4 sticky top-0 z-20 w-full bg-white" style={{ boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px' }} >

          <Row align='middle' gutter={[0, 10]}>

            <Col xs={24} sm={24} xl={0} lg={0} xxl={0}>
              <Row justify='space-between' gutter={4} align='middle'>

                <Col span={6}>
                  <Link href='/' className=' text-base'><span className=' font-black text-blue-600'>Famous</span><span className=' font-black text-green-700'>Business</span></Link></Col>
                    {!pathName.includes('/job') && <Col span={10}>
                  <LocAuto />
                </Col>}
                
                <Col >
                  <MenuBar1 />
                </Col>
              </Row>
            </Col>

            <Col xs={0} sm={0} md={5} lg={5} xl={5}>
              <Row justify='center'>
                <Col >
                  <Link className=" text-3xl font-bold" href="/" style={{textDecoration:'none'}}>
                    <span className=' text-blue-600'>Famous </span><span className=' text-green-700'>Business</span>
                  </Link>
                </Col>
              </Row>
            </Col>

            <Col sm={24} xs={24} md={19} lg={19} xl={19} xxl={19}>
              <Row justify='start' gutter={4} align='middle'>
                <Col xs={0} sm={0} md={4} lg={4} xl={4} xxl={4} >

                {/* Location Search Component */}
                  <LocAuto />

                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                {/* Search bar (Long) */}
                  <AutoCom handle={handle} search={search} handleSubmit={handleSubmit} />
                  
                </Col>

                <Col xs={24} sm={24} lg={0} xl={0} xxl={0} md={0} >
                </Col>

                <Col xs={24} sm={24} lg={0} xl={0} xxl={0} md={0} >
                </Col>

                <Col xs={24} sm={24} lg={0} xl={0} xxl={0} md={0} >
                </Col>

                <Col xs={0} sm={0} md={7} lg={7} xl={7} xxl={7}>
                  <Row align='middle' gutter={4} justify='space-around'>
                    {/* <Col span={4}> <Link href={'/job'}>
                      <Flex className=' hover:rotate-12 hover:scale-105 duration-150' vertical align='center' justify='center' >
                        <PiSuitcaseSimpleLight className=' text-lg' />
                        <Typography.Text className=' text-clip rounded-3xl bg-slate-100 px-2 text-sm' strong >Jobs</Typography.Text>
                      </Flex>
                    </Link></Col> */}
                    <Col span={7}>
                      <div className=' text-center'>
                        {user ? (
                          <ProfileDrawer />
                        ) : (
                          <Tooltip title='Login Now' arrow placement='bottom' open={false}>
                            <Button size='large' href="/login" type='primary' style={{ fontWeight: 'bold' }} shape='round' >Log In</Button>
                          </Tooltip>)}
                      </div>
                    </Col>


                    {/* Plan */}
                    {removePlan ? (
                        <Col span={16}>
                            <Link href="/" style={{textDecoration:'none'}}>
                                <StorefrontIcon sx={{marginBottom:'5px'}} fontSize='large' /><span style={{ marginLeft:'5px', fontSize:'20px'}}>Become a Seller</span>
                            </Link>
                        </Col>

                    ) : ( 
                      <Col span={7}>
                        <Link href="#" onClick={(e) => { e.preventDefault(); handleCheckPremiumPlanLogin(); }}>
                          <div className=' border-2 border-orange-300 hover:border-2  hover:border-black hover:text-white duration-300 hover:bg-gradient-to-r from-zinc-300 to-orange-400 cursor-pointer font-bold flex flex-row items-center justify-center  dark:text-gray-600 px-1 py-2 text-center  '>
                            <Image src='/plans/premium.svg' width={20} height={20} alt='plan' /> <span className=' ml-1'>Plan</span>
                          </div>
                        </Link>
                      </Col>
                    )}


                    {/* <Col span={4}>
                        <a href={'/Download/Famous_Business (1).apk'} download>
                          <Image src="/app-download.svg" width={60} height={60} alt='' />
                        </a>
                    </Col> */}

                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

        
          {(pathName === '/brands' || pathName !== '/' || pathName.match(/^\/[^/]+$/)) ? null : (
            <motion.div className=' relative' animate={{
              visibility: isScrolled ? 'hidden' : 'visible', height: isScrolled ? 0 : 'auto',
              // transition: { duration: 0.5 }
            }}
              transition={{ duration: 0.5 }}
            >
              <motion.div animate={{
                opacity: isScrolled ? 0 : 1, height: isScrolled ? 0 : 'auto',
                transition: { duration: 0.2 }
              }}
              >
                <Row justify='start' className=' mt-4'>
                  <Col xs={0} sm={0} xl={24} lg={24} xxl={24} md={24}>
                    <Row justify='space-between' align="middle" className=' mt-4'>
                      <Col span={4}>
                        <div className=' relative h-20 justify-center flex flex-col'>
                          <p className='  -rotate-90 absolute -left-1 z-10 text-white font-semibold'>PREMIER</p>
                          <Image src='/HomeNavbar/Google Partner Logo Vector.svg' fill className=' object-cover' sizes='800px' alt='google' />
                        </div>
                      </Col>
                      
                      <Col span={18}>
                        {/* <div className=' flex flex-col justify-start p-4 rounded-md items-center '>
                          <Player src='/Lotties/liveSig.json' style={{ height: '50px', width: '50px', position: 'absolute', zIndex: 1, marginTop: '-30px', marginRight: '24px' }} autoplay loop />
                          <FaUser style={{ color: 'green', fontSize: 30 }} />
                          <div><CountUp start={878774} end={100000} style={{ fontWeight: 'bold', fontSize: '18px', color: 'red' }} duration={27} /></div>
                        </div> */}

                        {/* Top bar in large screen (Home, Orders, Technical Support, Wallet) */}
                        <MenuBar />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </motion.div>
            </motion.div>
          )}
        </div>}

      <LoginForm visible={login} onClose={() => setLogin(false)} />

    </>
  );
};

export default Navbar;


