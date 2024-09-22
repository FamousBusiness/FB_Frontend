"use client";
import { Col, Row } from 'antd';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
function Page() {
  const [data, setData] = useState([1, 2, 3, 4]);
  const searchParams = useSearchParams()
  const select = searchParams.get('search');
  console.log(select);
  return (
    <Row justify='start' gutter={[12, 24]}>
      <Col lg={4} xl={4} xxl={4} md={8} sm={8} xs={8}>
        <div className=' text-center p-2 text-blue-500 lg:text-xl xl:text-lg  2xl:text-lg md:text-base sm:text-sm font-semibold rounded-lg shadow-xl bg-slate-200 w-full xl:h-28 2xl:h-28 h-20 sm:h-24 md:h-24 lg:h-28'>Total Campaign</div>
      </Col>
      <Col lg={4} xl={4} xxl={4} md={8} sm={8} xs={8}>
        <div className=' text-center p-2 text-blue-500 lg:text-xl xl:text-lg  2xl:text-lg md:text-base sm:text-sm font-semibold rounded-lg shadow-xl bg-slate-200 w-full xl:h-28 2xl:h-28 h-20 sm:h-24 md:h-24 lg:h-28'>In Review</div>
      </Col>
      <Col lg={4} xl={4} xxl={4} md={8} sm={8} xs={8}>
        <div className=' text-center p-2 text-blue-500 lg:text-xl xl:text-lg  2xl:text-lg md:text-base sm:text-sm font-semibold rounded-lg shadow-xl bg-slate-200 w-full xl:h-28 2xl:h-28 h-20 sm:h-24 md:h-24 lg:h-28'>Available Plan</div>
      </Col>
      <Col lg={4} xl={4} xxl={4} md={8} sm={8} xs={8}>
        <div className=' text-center p-2 text-blue-500 lg:text-xl xl:text-lg  2xl:text-lg md:text-base sm:text-sm font-semibold rounded-lg shadow-xl bg-slate-200 w-full xl:h-28 2xl:h-28 h-20 sm:h-24 md:h-24 lg:h-28'>Expire Plan</div>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          {data.map((item) => (
            <Col key={item.id} lg={8} xl={8} xxl={8} md={24} sm={24} xs={24}>
              {/* <AdsCard1 data={item} /> */}
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
export default Page;
