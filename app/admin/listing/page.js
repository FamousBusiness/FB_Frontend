"use client";
import React from 'react';
import { Row, Col } from 'antd';
import Card1 from '@/components/admin/Card';
import Link from 'next/link';
import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';
// import RequireAuthentication from '@/components/AuthenticationAdmin/RegisterAuthentication';

function Page() {
  return (
      <Row justify='space-around' gutter={[16, 16]}>
        <Col span={5}>
            <div className=' flex flex-col items-center'>
          <div className=' hover:shadow-md h-48 w-48 p-2 border border-1 rounded-full'>
            <Image src='/admin/listing/marketer.svg' alt='marketer' width={100} height={100} style={{ objectFit: 'contain', width: 'auto', height: 'auto' }} />
          </div>
          <p className=' text-base font-bold'>Listing Management</p>
          </div>
        </Col>

        <Col span={5}>
            <div className=' flex flex-col items-center'>
          <div className=' hover:shadow-md h-48 w-48 border border-1 p-2 rounded-full'>
            <Player src='/admin/listing/backup.json' style={{ objectFit: 'contain', width: 'auto', height: 'auto' }} hover={true} />
          </div>
          <p className=' text-base font-bold'>Bulk Listing</p>
          </div>
        </Col>

        <Col span={5}>
            <div className=' flex flex-col items-center'>
          <div className=' hover:shadow-md h-48 w-48 border border-1 p-2 rounded-full'>
            <Player src='/admin/listing/cloud.json' style={{ objectFit: 'contain', width: 'auto', height: 'auto' }} hover={true} />
          </div>
          <p className=' text-base font-bold'>Single Listing</p>
          </div>
        </Col>
      </Row>  
  );
}

export default Page;
