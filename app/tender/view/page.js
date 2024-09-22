"use client";
import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
// import ModalLead from '@/components/users/home/leads/ModalLead';

function Page() {
  const [displayCount, setDisplayCount] = useState(3);

  const handleApplyClick = () => {
    setDisplayCount(3); // Display only the first 3 cards when "Apply" is clicked
  };

  const handleViewClick = () => {
    setDisplayCount(2); // Display all cards when "View" is clicked
  };

  return (
    <div className='mt-4'>
      <Row justify='center' gutter={[24, 24]}>
        <Col span={22}>
          <Row justify='start' gutter={24}>
            <Col span={6}>
              <Button
                onClick={handleApplyClick}
                className='w-full h-24 bg-indigo-400 text-white text-center rounded-md border border-1 py-1'
              >
                Apply
              </Button>
            </Col>
            <Col span={6}>
              <Button
                onClick={handleViewClick}
                className='w-full h-24 bg-indigo-400 text-white text-center rounded-md border border-1 py-1'
              >
                View
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={22}>
          {/* <Row gutter={[12, 12]}>
            {leads.slice(0, displayCount).map((lead) => (
              <Col span={8} key={lead.id}>
                <ModalLead icon='/leads/bid.svg' color='#186F65' item={lead} />
              </Col>
            ))}
          </Row> */}
        </Col>
      </Row>
    </div>
  );
}

export default Page;
