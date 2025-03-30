import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
// import { useHomeData } from '@/services/Commondata/HomeData';




const Carousel1 = ({ data }) => {

  return (<>
    <Carousel autoplay slidesToScroll={true}>
      {data.map((item) =>
        <div key={item.id}>
          <a href={item.url}>
            <div className='h-48 relative overflow-hidden rounded-lg mx-1 lg:rounded-md xl:rounded-md 2xl:rounded-md xl:h-60 lg:h-60 2xl:h-60'>
              <Image src={item.image} sizes="(min-width: 808px) 50vw, 100vw" alt='home' fill className=' object-cover' />
            </div>
          </a>
        </div>
      )}
    </Carousel>
  </>

  );
};


export default Carousel1;