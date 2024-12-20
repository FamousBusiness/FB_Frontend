'use client';
import React from 'react';
import PlanCard from './dashboardCard';
import { Button, Col, Result, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { PremiumPlan } from '@/services/Admin/Premium';






const Page = () => {
    // const { data, error } = useSWR('http://127.0.0.1:8000/premium-plan-api/plan-per-user/', PremiumPlan)
    const { data, error } = useSWR('https://api.famousbusiness.in/premium-plan-api/plan-per-user/', PremiumPlan)


    if (!data) {
        return <div className=' flex justify-center items-center'><Spin indicator={<LoadingOutlined className=' text-3xl shadow-md rounded-full ' spin />} /></div>
    }


    if (error) {
        return <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button href='/' type="primary">Back Home</Button>}
        />
    }
    
    
    return (
        <div className=' min-h-screen p-2 sm:p-10'>
            {data.length > 0 ? <Row justify='start' gutter={[12, 12]}>
                {
                data.map((item, index) => <Col key={item.id} sm={24} xs={24} md={6} lg={6} xl={6} xxl={6}>
                    <PlanCard planData={item} />
                </Col>
            )}

            </Row> : <Result
                status="404"
                title="No Plan"
                subTitle="Sorry, there are no plans available."
                extra={<Button href='/plan' type="primary">Go to Plans</Button>}
            />}
        </div>
    );
};



export default Page;
