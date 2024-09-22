
// import { useHomeData } from '@/services/Commondata/HomeData';
// import { Carousel, Row, Col, Button, Skeleton } from 'antd';
// import Image from 'next/image';
// import React from 'react';
// import { MdCall } from 'react-icons/md';

// function AdsSection() {
//   // Fetch home data
//   const { homedata, isLoading, isError } = useHomeData();
//   // Loading state
//   if (isLoading) {
//     return (
//       <div className='p-2'>
//         {/* Skeleton Loading */}
//         <div className='relative bg-white w-full shadow-md m-2 pb-2 border border-1 rounded-md'>
//           <Row justify='center' align='middle' gutter={[0, 5]} className='w-full'>
//             <Col span={24}>
//               <Skeleton.Avatar style={{ width: '100%' }} active size={120} shape='square' />
//             </Col>

//             <Col span={23}>
//               <Skeleton active paragraph={{ rows: 1, width: '80%' }} />
//             </Col>
//             <Col span={23}>
//               <Skeleton active paragraph={{ rows: 1, width: '50%' }} />
//             </Col>

//             <Col span={23}>
//               <Skeleton.Button size='small' block={true}>
//                 Call Now
//               </Skeleton.Button>
//             </Col>
//           </Row>
//           {/* Ads Tag */}
//           <div className='absolute top-0 right-0 px-3 py-1 text-sm shadow-xl text-gray-500 font-medium bg-green-200'>Ads</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (isError) {
//     return <p>Error loading data.</p>;
//   }
//   // Display Ads
//   return (
//     <Row justify='center' gutter={[12, 4]}>
//       <Col span={23} className='relative'>
//         {/* Carousel for Ads */}
//         <Carousel dots={false} slidesToShow={1} className='center' centerMode pauseOnFocus={true} centerPadding='60' arrows={true}>
//           {homedata.ads && homedata.ads.length > 0 ? (
//             homedata.ads.map((item, index) => (
//               <div key={item.id} className='p-2'>
//                 {/* Individual Ad */}
//                 {item ? (
//                   <div className='relative bg-white w-full shadow-md m-2 pb-2 border border-1 rounded-md'>
//                     <Row justify='center' align='middle' gutter={[0, 5]} className='w-full'>
//                       <Col span={24}>
//                         {/* Image for Ad */}
//                         <div className='w-full h-32 overflow-hidden bg-slate-100'>
//                           <Image src={item.img1} fill sizes='100%' alt='ads' className='object-cover' />
//                         </div>
//                       </Col>

//                       <Col span={23}>
//                         <div className='text-base font-semibold text-green-800'>{item.title}</div>
//                       </Col>
//                       <Col span={23}>
//                         <div className='text-sm font-semibold text-gray-600'>{item.location}</div>
//                       </Col>

//                       <Col span={23}>
//                         {/* Call Now Button */}
//                         <Button className='w-full text-white' style={{ fontWeight: 700, fontSize: 15, background: 'green', color: 'white' }} icon={<MdCall />}>
//                           Call Now
//                         </Button>
//                       </Col>
//                     </Row>
//                     {/* Ads Tag */}
//                     <div className='absolute top-0 right-0 px-3 py-1 text-sm shadow-xl text-gray-500 font-medium bg-green-200'>Ads</div>
//                   </div>
//                 ) : (
//                   <div className='p-2'>
//                     {/* Skeleton Loading for Ad */}
//                     <div className='relative bg-white w-full shadow-md m-2 pb-2 border border-1 rounded-md'>
//                       <Row justify='center' align='middle' gutter={[0, 5]} className='w-full'>
//                         <Col span={24}>
//                           <Skeleton.Avatar active size={120} shape='square' />
//                         </Col>

//                         <Col span={23}>
//                           <Skeleton active paragraph={{ rows: 1, width: '80%' }} />
//                         </Col>
//                         <Col span={23}>
//                           <Skeleton active paragraph={{ rows: 1, width: '50%' }} />
//                         </Col>

//                         <Col span={23}>
//                           {/* Call Now Button */}
//                           <Button className='w-full text-white' style={{ fontWeight: 700, fontSize: 15, background: 'green', color: 'white' }} icon={<MdCall />}>
//                             Call Now
//                           </Button>
//                         </Col>
//                       </Row>
//                       {/* Ads Tag */}
//                       <div className='absolute top-0 right-0 px-3 py-1 text-sm shadow-xl text-gray-500 font-medium bg-green-200'>Ads</div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className='p-2'>
//               {/* Skeleton Loading for Ad */}
//               <div className='relative bg-white w-full shadow-md m-2 pb-2 border border-1 rounded-md'>
//                 <Row justify='center' align='middle' gutter={[0, 5]} className='w-full'>
//                   <Col span={24}>
//                     <Skeleton.Avatar active size={120} shape='square' />
//                   </Col>

//                   <Col span={23}>
//                     <Skeleton active paragraph={{ rows: 1, width: '80%' }} />
//                   </Col>
//                   <Col span={23}>
//                     <Skeleton active paragraph={{ rows: 1, width: '50%' }} />
//                   </Col>

//                   <Col span={23}>
//                     {/* Call Now Button */}
//                     <Button className='w-full text-white' style={{ fontWeight: 700, fontSize: 15, background: 'green', color: 'white' }} icon={<MdCall />}>
//                       Call Now
//                     </Button>
//                   </Col>
//                 </Row>
//                 {/* Ads Tag */}
//                 <div className='absolute top-0 right-0 px-3 py-1 text-sm shadow-xl text-gray-500 font-medium bg-green-200'>Ads</div>
//               </div>
//             </div>
//           )}
//         </Carousel>
//       </Col>
//     </Row>
//   );
// }

// export default AdsSection;



import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import { Carousel, Col, Row } from 'antd';

export default function BasicCard() {

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Row >
      <Col xl={24} md={24} lg={24} xxl={24} sm={0} xs={0}>
        <Carousel touchThreshold={10} centerMode centerPadding='2%' swipeToSlide={true} speed={500} swipe={true} slidesToShow={4}>
          {array.map((index) => <div className=' p-2' key={index}>
            <Card variant='outlined' color='neutral' sx={{ width: 340 }}>
              <div>
                <Typography level="title-lg">Yosemite National Park</Typography>
                <Typography level="body-sm">April 24 to May 02, 2021</Typography>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                >
                  <p className=' bg-slate-100 rounded-md px-1 py-1'>Ad</p>
                </IconButton>
              </div>
              <Carousel pauseOnHover pauseOnFocus autoplay >
                {array.map((index) =>
                  <AspectRatio key={index} minHeight="120px" maxHeight="200px">
                    <Image
                      src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                      // srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                      loading='lazy'
                      alt=""
                      fill
                      sizes='100%'
                    />
                  </AspectRatio>)}
              </Carousel>
              <CardContent orientation="horizontal">
                <div>
                  <Typography level="body-xs">Total price:</Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    ₹2,900
                  </Typography>
                </div>
                <Button
                  variant='outlined'
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}>
                  Explore
                </Button>
              </CardContent>
            </Card>
          </div>)}
        </Carousel>
      </Col>

      <Col sm={24} xs={24} xl={0} md={0} lg={0} xxl={0}>
        <Carousel touchThreshold={10} centerMode centerPadding='4%' swipeToSlide={true} speed={500} slidesToShow={1} slidesToScroll={1}>
          {array.map((index) => <div key={index}>
            <Card variant='outlined' color='neutral' sx={{ width: 340 }}>
              <div>
                <Typography level="title-lg">Yosemite National Park</Typography>
                <Typography level="body-sm">April 24 to May 02, 2021</Typography>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                >
                  <p className=' bg-slate-100 rounded-md px-1 py-1'>Ad</p>
                </IconButton>
              </div>
              <Carousel pauseOnFocus pauseOnHover autoplay >
                {array.map((index) => <AspectRatio key={index} minHeight="120px" maxHeight="200px">
                  <Image
                    src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                    // srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading='lazy'
                    alt=""
                    fill
                    sizes='100%'
                  />
                </AspectRatio>)}</Carousel>
              <CardContent orientation="horizontal">
                <div>
                  <Typography level="body-xs">Total price:</Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    ₹2,900
                  </Typography>
                </div>
                <Button
                  variant='outlined'
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                >
                  Call
                </Button>
              </CardContent>
            </Card>
          </div>)}
        </Carousel>
      </Col>
    </Row>
  );
}

