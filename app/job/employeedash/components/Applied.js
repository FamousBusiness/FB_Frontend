"use client";
import React from 'react';
import { Table, Spin, Alert, Col, Row } from 'antd';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import JobCard from '../../Components/JobCard';

const fetcher = (url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${Cookies.get('accessToken')}`,
    },
  }).then((res) => res.json());

const Applied = () => {
  const { data, error } = useSWR('https://api.famousbusiness.in/job-api/candidate-applied-jobs/', fetcher);

  if (error) {
    return <Alert message="Error fetching data" type="error" />;
  }

  if (!data) {
    return <Spin size="large" />;
  }


  const renderJobCards = (jobs, brand) =>
    jobs.map((job) => (
      <div key={job.id} className='p-2 text-white'>
        <JobCard brand={brand} className='shadow-xl' job={job} />
      </div>
    ));

  return (
    <Row gutter={[0, 20]}>
      {/* Business Jobs */}
      <Col xs={24} lg={16} xxl={16} md={16} xl={16}>
        <Row gutter={[0, 20]}>
          {/* Desktop View */}
          <Col xs={0} sm={0} lg={24} xl={24} md={24} xxl={24}>
            {data.data && data.data.business_jobs && data.data.business_jobs.length > 0 ? (
              <div className='relative flex-row'>{renderJobCards(data.data.business_jobs, false)}</div>
            ) : (
              "No data"
            )}
          </Col>
          {/* Mobile View */}
          <Col xs={24} sm={24} lg={0} xl={0} md={0} xxl={0}>
            {data.data && data.data.business_jobs && data.data.business_jobs.length > 0 ? renderJobCards(data.data.dbusiness_jobs, false) : "No data"}
          </Col>
        </Row>
      </Col>

      {/* Brand Jobs */}
      <Col xs={24} lg={16} xxl={16} md={16} xl={16}>
        <Row gutter={[0, 20]}>
          {/* Desktop View */}
          {data.data && data.data.brand_jobs && data.data.brand_jobs.length > 0 && (
            <Col span={24}>
              <Row gutter={[12, 12]}>
                <Col xs={0} sm={0} lg={24} xl={24} md={24} xxl={24}>
                  {renderJobCards(data.data.brand_jobs, true)}
                </Col>
                {/* Mobile View */}
                <Col xs={4} sm={4} lg={0} xl={0} md={0} xxl={0}>
                  {data.data && data.data.brand_jobs && data.data.brand_jobs.length > 0 ? renderJobCards(data.data.brand_jobs, true) : "No data"}
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default Applied;
