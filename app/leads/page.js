"use client";
import { Row, Col, Skeleton, Empty, Button, Typography, Divider, Segmented, ConfigProvider } from 'antd';
import React, { useState } from 'react';
import useSWR from 'swr';
import ModalLead from '@/components/users/home/leads/ModalLead';
import { useAuth } from '@/context/AuthContext';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import PaidLeads from './Components/PaidLead';
import PincodeByCity from '@/components/users/location/PincodeByCity';
import PremiumMember from './Components/PremiumMember';
import axios from 'axios';
import Cookies from 'js-cookie';
import { get_all_leads } from '@/services/Admin/Leads';

const { Title } = Typography;





function Page() {
    const [activeKey, setActiveKey] = useState('1');
    const { locationState } = useGlobalState();
    const [page, setPage] = useState(1);
    const { user } = useAuth();
    const [filteredLeads, setFilteredLeads] = useState(null);
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const state = locationState.state;
    const city = locationState.city;
    const accessToken = Cookies.get('accessToken');
    const { data, error, isValidating } = useSWR(`https://api.famousbusiness.in/lead-api/all-leads/${city}/${state}/?page=${page}`, get_all_leads);


    if (!data && isValidating) {
        return (
            <div className='p-3'>
                <Row gutter={[12, 12]}>
                    {array.map((index) => (
                        <Col lg={8} xxl={8} sm={12} xs={12} md={8} xl={8} key={index}>
                            <Skeleton.Input active style={{ height: 200 }} block />
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
    if (error) {
        return <div>Error fetching data</div>;
    }

    const countLeads = (leads) => {
        return leads ? leads.length : 0;
    };

    const filterLeadsByPincode = (pincode) => {
        if (data && data.results && data.results.Leads) {
            const filtered = data.results.Leads.filter((lead) =>
                lead.pincode.toLowerCase().includes(pincode.toLowerCase())
            );
            setFilteredLeads(filtered);
        }
    };


    const renderContent = () => {
        const result = data && data.results;
        const leadTootal = data && data.count;
        const { Leads, paid_leads, Individual_Leads, Other_Category_Leads, premium_plan_leads, plan_viewed_leads } = result;
        const totalLeads = countLeads(paid_leads) + countLeads(premium_plan_leads);

        if (!user) {
            return (
                <>
                    <Segmented

                        options={[
                            { label: `All Leads (${leadTootal})`, value: '1' },
                        ]}
                        onChange={handleTabChange}
                        value={activeKey}
                    />
                    <RenderLeadContent leads={filteredLeads || Leads} />
                </>
            );
        }


        return (
            <>  <div className=' overflow-x-auto mb-4'>
                <ConfigProvider
                    theme={{
                        components: {
                            Segmented: {
                                itemSelectedBg: 'rgba(210, 238, 130)'
                            },
                        },
                    }}
                >
                    <Segmented

                        className=' mb-4 overflow-x-auto'
                        options={[
                            { label: ` My Category Leads (${countLeads(Leads)})`, value: '1' },
                            { label: `My Viewed Leads (${countLeads(plan_viewed_leads)})`, value: '9' },
                            { label: `My Leads (${countLeads(Individual_Leads)})`, value: '3' },
                            { label: `My Paid Leads (${totalLeads})`, value: '2' },
                            { label: `Other Category Leads (${countLeads(Other_Category_Leads)})`, value: '4' }
                        ]}
                        onChange={handleTabChange}
                        value={activeKey}
                    />

                </ConfigProvider>

            </div>
                {activeKey === '3' && <RenderLeadContent leads={Individual_Leads} type={true} />}
                {activeKey === '9' && (plan_viewed_leads && plan_viewed_leads.length > 0 ?
                    <RenderPlanViewedLeads leads={plan_viewed_leads} />
                    : <Empty />)
                }
                {activeKey === '1' && <RenderLeadContent leads={Leads} type={false} />}
                {activeKey === '2' && (
                    <RenderPaidLeads paidLeads={paid_leads} premiumLeads={premium_plan_leads} />
                )}
                {activeKey === '4' && <RenderLeadContent leads={Other_Category_Leads} type={false} />}
            </>
        );
    };


    const RenderLeadContent = ({ leads, type }) => {
        const sortedLeads = leads && leads.length > 0
            ? [...leads].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            : leads;

        if (sortedLeads && sortedLeads.length > 0) {
            return (
                <Row gutter={[16, 16]}>
                    {sortedLeads.map((lead, index) => (
                        <Col lg={8} xxl={8} sm={24} xs={24} md={8} xl={8} key={index}>
                            <ModalLead indivisual={type} limit={10} color='green' title='Leads' item={lead} />
                        </Col>
                    ))}
                </Row>
            );
        } else {
            return <Empty />;
        }
    };

    // Viewed Lead
    const RenderPlanViewedLeads = ({ leads }) => (
        <Row gutter={[16, 16]}>
            {leads.map((lead, index) => (
                <Col lg={8} xxl={8} sm={24} xs={24} md={8} xl={8} key={index}>
                    <ModalLead item={lead.lead} />
                </Col>
            ))}
        </Row>
    );


    const RenderPaidLeads = ({ paidLeads, premiumLeads }) => (
        <Row gutter={[0, 24]}>
            <Col span={24}>
                {paidLeads && paidLeads.length > 0 ?
                    <Row gutter={[16, 16]}>
                        {paidLeads.map((lead, index) => (
                            <Col lg={8} xxl={8} sm={24} xs={24} md={8} xl={8} key={index}>
                                <PaidLeads item={lead} />
                            </Col>
                        ))}
                    </Row> : <Empty />}
            </Col>
            <Col span={24}>
                <Title level={2}>Premium User Leads</Title>
                
                <Divider type='horizontal' />
                {premiumLeads && premiumLeads.length > 0 ?
                    <Row gutter={[16, 16]}>
                        {premiumLeads.map((lead, index) => (
                            <Col lg={8} xxl={8} sm={24} xs={24} md={8} xl={8} key={index}>
                                <ModalLead item={lead.lead} />
                            </Col>
                        ))}
                    </Row> : <Empty />}
            </Col>
        </Row>
    );
    

    const handleTabChange = (value) => {
        setActiveKey(value);
    };
    

    
    return (
        <div className='min-h-screen  relative p-2'>
            <Row justify='center' gutter={[4, 12]}>
                {!user && <Col xs={22} sm={22} lg={8} xl={8} xxl={8} md={8}>
                    <PincodeByCity handlePincode={filterLeadsByPincode} />
                </Col>}
                <Col span={22} >
                    {renderContent()}
                </Col>
                <Col span={8}>
                    {data.next && !user && (
                        <Button
                            block
                            type='default'
                            onClick={() => setPage(page + 1)}
                        >
                            Load More
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};




export default Page;
