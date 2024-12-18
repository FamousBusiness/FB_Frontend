"use client";

import { Row, Col, Skeleton, Empty, Button, Typography, Divider, Segmented, ConfigProvider, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import ModalLead from '@/components/users/home/leads/ModalLead';
import { useAuth } from '@/context/AuthContext';
import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import PaidLeads from './Components/PaidLead';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Carousel } from 'antd';
import Pagination from '@mui/material/Pagination';
// import useSWR from 'swr';
// import PincodeByCity from '@/components/users/location/PincodeByCity';
// import PremiumMember from './Components/PremiumMember';
// import { get_all_leads } from '@/services/Admin/Leads';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const { Title } = Typography;





///// Lead Page
function Page() {
    const [activeKey, setActiveKey] = useState('1');
    const { locationState } = useGlobalState();
    const [page, setPage] = useState(1);
    const { user } = useAuth();
    const [filteredLeads, setFilteredLeads] = useState(null);
    const [LeadBanner, setLeadBanner] = useState([]);
    const [noLeadBanner, setNoLeadBanner] = useState(false);
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const state = locationState.state;
    const city = locationState.city;
    const accessToken = Cookies.get('accessToken');
    const [apiUrl, setApiURL] = useState(
        process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? "http://127.0.0.1:8000" : 'https://api.famousbusiness.in'
    );
    const [loading, setLoading]   = useState(false);  // Loader state
    const [unAUthenticatedloading, setUnAuthenticated] = useState(false); //// 
    const [allLeads, setAllLeads] = useState([]); //// All Leads
    const [paginationCount, setPaginationCount] = useState(0);
    const [error, setError] = useState(false);
    const [leadsData, setLeadsData] = useState({
        '1': null,
        '3': null,
        '9': null,
        '2': null,
        '4': null,
    }); // Data state for each segment


    ///// API URL check
    const shouldFetch = !!apiUrl; 
    const paginationValue = paginationCount ? Math.ceil(paginationCount / 100) : 0

    // const { data, error, isValidating } = useSWR(shouldFetch ? 
    //     `${apiUrl}/lead-api/all-leads/${city}/${state}/?page=${page}` : null, get_all_leads);


    ///// Tab change
    const handleTabChange = (value) => {
        setActiveKey(value);

        if (!leadsData[value]) {
            fetchLeadsData(value);
        }
    };

    
    // // API simulation for data fetching
    const fetchLeadsData = async (key) => {
        setLoading(true);

        try {
            let response;
            let Leaddata;

            switch (key) {
                case '1':
                    response = await axios.get(
                        `${apiUrl}/lead-api/business/category/leads/${city}/${state}/?page=${page}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        }
                    })

                    Leaddata = response.data.results
                    setPaginationCount(response.data.count)
                    setLeadsData((prev) => ({ ...prev, [key]: Leaddata.category_leads }));
                    break;

                case '3':
                    response = await axios.get(
                        `${apiUrl}/lead-api/individual/leads/${city}/${state}/?page=${page}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json',
                            }
                        });


                    Leaddata = response.data.results
                    setPaginationCount(response.data.count)
                    setLeadsData((prev) => ({ ...prev, [key]: Leaddata.Individual_Leads }));
                    break;

                case '9':
                    response = await axios.get(
                        `${apiUrl}/lead-api/viewed/leads/${city}/${state}/?page=${page}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        }
                    });


                    Leaddata = response.data.results
                    setPaginationCount(response.data.count)
                    setLeadsData((prev) => ({ ...prev, [key]: Leaddata.plan_viewed_leads }));
                    break;

                case '2':
                    response = await axios.get(
                        `${apiUrl}/lead-api/paid/leads/${city}/${state}/?page=${page}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        }
                    });

                    Leaddata = response.data.results
                    setPaginationCount(response.data.count)
                    setLeadsData((prev) => ({ ...prev, [key]: Leaddata.paid_leads }));
                    break;

                case '4':
                    response = await axios.get(
                        `${apiUrl}/lead-api/business/other/category/leads/${city}/${state}/?page=${page}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        }
                    }
                    );

                    Leaddata = response.data.results
                    setPaginationCount(response.data.count)
                    setLeadsData((prev) => ({ ...prev, [key]: Leaddata.Other_Category_Leads }));
                    break;

                default:
                    response = null;
            }

        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };


    //// Fetch all the Leads according to Authenticate or not
    useEffect(() => {
        setUnAuthenticated(true);

        axios.get(`${apiUrl}/lead-api/all/leads/${city}/${state}`, {
            headers: accessToken ? 
            {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            } : {}

        }).then((res) => {
            // console.log(res.data)
            setAllLeads(res.data.results.Leads);
            setPaginationCount(res.data.count);
            setError(false);
            setUnAuthenticated(false);

        }).catch((error) => {
            // console.log(error);
            setError(true);
        })

    }, [accessToken, apiUrl, city, state]);



    ////// Get paginated Data
    const handleGetPaginatedData = (event, value) => {

        if (activeKey && activeKey === '1') {

            axios.get(
                `${apiUrl}/lead-api/all/leads/${city}/${state}/?page=${value}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                // console.log(res)
                setPaginationCount(res.data.count)
                setAllLeads(res.data.results.Leads);
                setError(false)

            }).catch((error) => {
                // console.log(error)
                setError(true)
            });

        } else if (activeKey && activeKey === '3') {
            axios.get(
                `${apiUrl}/lead-api/individual/leads/${city}/${state}/?page=${value}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                }).then((res) => {
                    // console.log(res)
                    let paginationData = res.data.results
                    setPaginationCount(res.data.count)
                    setLeadsData((prev) => ({ ...prev, [activeKey]: paginationData.Individual_Leads }));
                    setError(false)

                }).catch((error) => {
                    // console.log(error)
                    setError(true)

                });

        } else if (activeKey && activeKey === '9') {
            axios.get(
                `${apiUrl}/lead-api/viewed/leads/${city}/${state}/?page=${value}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                let paginationData = res.data.results
                setPaginationCount(res.data.count)
                setLeadsData((prev) => ({ ...prev, [activeKey]: paginationData.plan_viewed_leads }));
                setError(false)

            }).catch((error) => {
                // console.log(error);
                setError(true)

            })

        } else if (activeKey && activeKey === '2') {
            axios.get(
                `${apiUrl}/lead-api/paid/leads/${city}/${state}/?page=${value}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                let paginationData = res.data.results
                setPaginationCount(res.data.count)
                setLeadsData((prev) => ({ ...prev, [activeKey]: paginationData.paid_leads }))
                setError(false)

            }).catch((error) => {
                // console.log(error);
                setError(true)
            });

        } else if (activeKey && activeKey === '4') {
            axios.get(
                `${apiUrl}/lead-api/business/other/category/leads/${city}/${state}/?page=${value}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }
            ).then((res) => {
                let paginationData = res.data.results
                setPaginationCount(res.data.count)
                setLeadsData((prev) => ({ ...prev, [activeKey]: paginationData.Other_Category_Leads }));
                setError(false)

            }).catch((error) => {
                // console.log(error);
                setError(true);
            });
        }
    }


    /// Get Lead Banner data
    useEffect(() => {
        if (city && accessToken && apiUrl) {

            axios.get(`${apiUrl}/lead-api/lead/banner/?city=${city}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }

            }).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    setLeadBanner(res.data.lead_banner_data);
                    setNoLeadBanner(false)
                }

            }).catch((error) => {
                // console.log(error);
                if (error.response.status === 400) {
                    setNoLeadBanner(true);
                } else if (error.response.status === 401) {
                    setNoLeadBanner(true)
                }
            })

        } else {
            console.log('City and token did not found')
        }

    }, [accessToken, city, apiUrl]);





    if (!allLeads) {
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
    };


    if (error) {
        return <div>Error fetching data</div>;
    };


    const countLeads = (leads) => {
        return leads ? leads.length : 0;
    };

    // console.log('allLeads', allLeads)

    /// 
    const filterLeadsByPincode = (pincode) => {
        if (data && data.results && data.results.Leads) {
            const filtered = data.results.Leads.filter((lead) =>
                lead.pincode.toLowerCase().includes(pincode.toLowerCase())
            );
            setFilteredLeads(filtered);
        }
    };


    const renderContent = () => {
        const leadTootal = paginationCount;
        // const result     = data && data.results;
        // const { Leads, paid_leads, Individual_Leads, Other_Category_Leads, premium_plan_leads, plan_viewed_leads } = result;
        // const totalLeads = countLeads(paid_leads) + countLeads(premium_plan_leads);

            {/* <RenderLeadContent leads={filteredLeads || Leads} /> */}

        if (!user) {
            return (
                <>
                    {unAUthenticatedloading ? 
                        (
                        <>
                            <div className='flex justify-center items-center'>
                                <Spin size="large" />
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                        <Segmented
                            options={[
                                { label: `All Leads (${leadTootal})`, value: '1' },
                            ]}
                            onChange={handleTabChange}
                            value={activeKey}
                        />
                        
                        <RenderLeadContent leads={allLeads && allLeads} />
                    </>
                    )}
                </>
            );
        };


        return (
            <>
                <div className=' overflow-x-auto mb-4'>

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
                            className='mb-4 overflow-x-auto'
                            options={[
                                { label: `My Category Leads (${countLeads(allLeads && allLeads)})`, value: '1' },
                                // { label: `My Category Leads (${countLeads(allLeads ? allLeads : leadsData['1'] || [])})`, value: '1' },
                                { label: `My Viewed Leads (${countLeads(leadsData['9'] || [])})`, value: '9' },
                                { label: `My Leads (${countLeads(leadsData['3'] || [])})`, value: '3' },
                                { label: `My Paid Leads (${countLeads(leadsData['2'] || [])})`, value: '2' },
                                { label: `Other Category Leads (${countLeads(leadsData['4'] || [])})`, value: '4' }
                            ]}
                            onChange={handleTabChange}
                            value={activeKey}
                        />
                    </ConfigProvider>
                </div>

                {loading ? (
                    <div className='flex justify-center items-center'>
                        <Spin size="large" />
                    </div>
                    
                ) : (
                    <>
                        {activeKey === '1' && <RenderLeadContent leads={allLeads && allLeads} type={false} />}

                        {activeKey === '3' && <RenderLeadContent leads={leadsData['3']} type={true} />}

                        {activeKey === '9' && (
                            leadsData['9'] && leadsData['9'].length > 0 ?
                                <RenderPlanViewedLeads leads={leadsData['9']} />
                                : <Empty />
                        )}

                        {activeKey === '2' && (
                            <RenderPaidLeads
                                paidLeads={leadsData['2']?.paid_leads || []}
                                premiumLeads={leadsData['2']?.premium_plan_leads || []}
                            />
                        )}

                        {activeKey === '4' && <RenderLeadContent leads={leadsData['4']} type={false} />}

                        <Pagination
                            count={paginationValue}
                            color="primary"
                            sx={{ mt: 10 }}
                            onChange={handleGetPaginatedData}
                        />
                    </>
                )}
            </>
        );
    };



    ////// Render Authenticated Leads
    const RenderLeadContent = ({ leads, type }) => {

        const sortedLeads = leads && leads.lenght > 0 ?
            [...leads].sort((a, b) => {
                if (a.expired === b.expired) {
                    return new Date(b.created_at) - new Date(a.created_at);
                }

                return a.expired - b.expired;
            })
            :
            leads;

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




    return (
        <div className='min-h-screen  relative p-2'>
            {/* <Carousel autoplay slidesToScroll={true} effect='fade'>
                <div style={{ cursor: 'pointer' }}>
                    <img 
                        src='https://mdwebzotica.famousbusiness.in/Lead_image_black_blue.jpg'
                        alt='Image'
                        style={{
                            lineHeight: '160px',
                            textAlign: 'center',
                            background: '#364d79',
                            marginRight: '10%',
                            marginLeft: '10%',
                            borderRadius: '25px',
                            color: '#fff',
                            height: '210px',
                            width: '90%'
                        }}
                    />
                </div>
            </Carousel> */}

            {noLeadBanner === false && LeadBanner && (

                <Carousel autoplay slidesToScroll={true} effect='fade'>
                    {LeadBanner.map((banner, index) => (
                        <div key={banner.id}>

                            {banner.image && (
                                <div onClick={() => window.location.href = banner.url} style={{ cursor: 'pointer' }}>
                                    <img
                                        src={banner.image}
                                        alt='Image'
                                        style={{
                                            lineHeight: '160px',
                                            textAlign: 'center',
                                            background: '#364d79',
                                            marginRight: '10%',
                                            marginLeft: '10%',
                                            borderRadius: '25px',
                                            color: '#fff',
                                            height: '210px',
                                            width: '90%'
                                        }}
                                    />
                                </div>
                            )}

                            {banner.video && (
                                <div onClick={() => window.location.href = banner.url} style={{ cursor: 'pointer' }}>
                                    <video
                                        src={banner.video}
                                        style={{
                                            lineHeight: '160px',
                                            textAlign: 'center',
                                            background: '#364d79',
                                            marginRight: '10%',
                                            marginLeft: '10%',
                                            borderRadius: '25px',
                                            color: '#fff',
                                            height: '210px',
                                            width: '80%'
                                        }}
                                        controls
                                        autoPlay
                                        loop
                                        preload="metadata"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </Carousel>
            )}


            <Row justify='center' gutter={[4, 12]}>
                {/* {!user && <Col xs={22} sm={22} lg={8} xl={8} xxl={8} md={8}>
                    <PincodeByCity handlePincode={filterLeadsByPincode} />
                </Col>} */}

                <Col span={22} >
                    {renderContent()}
                </Col>

                {/* <Col span={8}>
                    {data.next && !user && (
                        <Button
                            block
                            type='default'
                            onClick={() => setPage(page + 1)}
                        >
                            Load More
                        </Button>
                    )}
                </Col> */}
            </Row>
        </div>
    );
};




export default Page;
