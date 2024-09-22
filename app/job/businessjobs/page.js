"use client";
import React, { useState } from 'react';
import { Button, Card, Col, Drawer, Empty, Row, Skeleton } from 'antd';
import { FilterOutlined, FilterTwoTone } from '@ant-design/icons';
import SideFilter from '../Components/SideFilter';
import useSWR from 'swr';
import { GetAllJobs } from '@/services/Admin/Jobs';
import JobCard from '../Components/JobCard';
import { MdTune } from 'react-icons/md';

function Page() {
  const [open, setOpen] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { data, error, isValidating: isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/job-api/all-job/`, GetAllJobs);
  const array = Array.from({ length: 18 }, (_, i) => i + 1); // An array with 18 elements
  const { Busines_Page_Jobs, brand_jobs } = data || {};
  // const combinedJobs = (brand_jobs || []).concat(Busines_Page_Jobs || []);

  // useEffect(() => {
  //   // Apply filters locally when filter options change
  //   const applyFilters = () => {
  //     let filteredJobs = [...originalData];

  //     if (selectedJobTypes.length > 0) {
  //       filteredJobs = filteredJobs.filter(job => selectedJobTypes.includes(job.jobType));
  //     }

  //     if (selectedLocations.length > 0) {
  //       filteredJobs = filteredJobs.filter(job => selectedLocations.includes(job.location));
  //     }

  //     if (selectedCategories.length > 0) {
  //       filteredJobs = filteredJobs.filter(job => job.categories.some(category => selectedCategories.includes(category)));
  //     }

  //     setFilteredData(filteredJobs);
  //   };

  //   applyFilters();
  // }, [selectedJobTypes, selectedLocations, selectedCategories]);

  

  return (
    <div className=' py-2 sm:p-10 relative min-h-screen'>
      <div className=" sm:invisible flex justify-end px-2 items-center flex-row">
        <Button onClick={() => setOpen(true)} shape='circle' icon={<MdTune />} />
      </div>
      <Row justify='center' gutter={[12, 12]} className='relative mt-10 sm:mt-0'>
        <Col md={16} lg={16} xxl={16} sm={22} xs={22} xl={16}>
          <Row gutter={12}>
            <Col sm={0} xs={0} xxl={8} md={8} lg={8} xl={8} className='relative'>
              <div className='sticky top-4'>
                <Card className='shadow-xl' bordered>
                  <SideFilter />
                </Card>
              </div>
            </Col>
            <Col lg={16} md={16} xxl={16} sm={24} xs={24} xl={16}>
              <Row gutter={[0, 12]}>
                {isLoading
                  ? array.map((index) => (
                    <Col key={index} span={24}>
                      <Card className=' h-20' style={{ borderRadius: "20px" }} loading={isLoading} />
                    </Col>
                  ))
                  : error || (!isLoading && (!Busines_Page_Jobs || Busines_Page_Jobs.length === 0))
                    ? <Col span={24}><Empty description="No jobs available" /></Col>
                    : Busines_Page_Jobs.map((job) => (
                      <Col key={job.id} span={24}>
                        <JobCard brand={false} className='shadow-xl' job={job} />
                      </Col>
                    ))}

                {isLoading
                  ? array.map((index) => (
                    <Col key={index} span={24}>
                      <Card className=' h-20' style={{ borderRadius: "20px" }} loading={isLoading} />
                    </Col>
                  ))
                  : error || (!isLoading && (!brand_jobs || brand_jobs.length === 0))
                    ? null
                    : brand_jobs.map((job) => (
                      <Col key={job.id} span={24}>
                        <JobCard brand={true} className='shadow-xl' job={job} />
                      </Col>
                    ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Drawer width='50%' title="Filter" closable={false} onClose={() => setOpen(false)} open={open}>
        <SideFilter />
      </Drawer>
    </div>
  );
}

export default Page;
