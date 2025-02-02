"use client";
import { LoadingOutlined } from '@ant-design/icons';
import { Card, Spin, Row, Col, Typography, Empty, List, Button, Divider } from 'antd';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
  // display: 'swap'
})

const fetcher = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    });
    const data = await res.json();
    return data;
  }
  catch (err) {
    console.error(err);
  }
}

function Page() {
  const { data, error, isValidating, mutate } = useSWR('https://api.famousbusiness.in/api/listings/all-brands/', fetcher);

  if (!data || isValidating) {
    return (
      <div className='flex justify-center min-h-screen items-center'>
        <Spin indicator={<LoadingOutlined spin className='text-xl bg-white rounded-full shadow-md' />} />
      </div>
    );
  }
  if (error) {
    return <div>Error fetching data</div>;
  }


  const { results, count, next, previous } = data;
  return (
    <div className=' min-h-screen'>
      <Row justify='center' gutter={[0, 12]}>
        <Col span={23}>
          <Typography.Title level={3}>
            <p className={`${poppins.className} text-gray-400`}>Listed Brands</p>
          </Typography.Title>

          <Divider />
          <List
            loading={isValidating}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={results.all_brands}
            renderItem={(item) => (
              <List.Item>
                <Link
                  href={`/brands/all-brands/[city]`}
                  as={`/brands/all-brands/${item.brand_name}`}
                >
                  <Card hoverable>
                    <div className='h-52 relative bg-stone-100'>
                      <Image
                        src={item.icons}
                        alt={`Product image for ${item.brand_name}`}
                        fill
                        sizes='100%'
                        className='object-contain w-auto h-auto'
                      />
                    </div>

                    <p className={`${poppins.className} py-2 text-center overflow-ellipsis overflow-hidden truncate  text-lg text-gray-500`} ellipsis={{ rows: 1 }}>
                      {item.brand_name}
                    </p>

                  </Card>
                </Link>
              </List.Item>
            )}
          />

          {next && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => mutate(next)}>Next</Button>
            </div>
          )}

          {previous && <div className="flex justify-center mt-4">
            <Button onClick={() => mutate(previous)}>Previous</Button>
          </div>}
        </Col>
      </Row>
    </div>
  );
}

export default Page
