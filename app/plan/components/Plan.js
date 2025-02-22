
"use client";
import { Badge, Card, Col, Divider, Flex, Row, Space, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import ToggleButton from './TogglepButton'
import Image from 'next/image'
import { FaCircleCheck, FaCircleXmark, FaUser } from 'react-icons/fa6';
import { MdVerified, MdWorkspacePremium } from 'react-icons/md'
import { FcBriefcase } from 'react-icons/fc'
import HandlePayment from './HandlePayment'
import { GetAllPlans } from '@/services/Admin/Premium'
import { BsInfoCircle } from "react-icons/bs";
import TrialPlan from './TrialPlan';
import axios from 'axios';
import { Player } from "@lottiefiles/react-lottie-player";


const { Text } = Typography



function Plan() {
    const [data, setData] = useState({});
    const [plan, setPlan] = useState('Yearly');
    const [notAvailable, setNotAvailable] = useState(false); //// Premium plan not available
    const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? "http://127.0.0.1:8000" : 'https://api.famousbusiness.in';

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await GetAllPlans();
    //         // console.log("All Plans", response);
    //         setData(response);
    //     };
    //     // console.log("Plan", plan)
    //     fetchData();
    // }, [plan]);


    // Fetch Premium plans
    useEffect(()=> {
        try {
            axios.get(`${apiUrl}/premium-plan-api/`, {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
              })
              .then((res) => {
                  if (res.status === 200) {
                    setData(res.data.data)
                  }
              })
              
              .catch((error) => {
                console.error("Error fetching plans:", error.response ? error.response.data : error.message);

                if (error.response.status === 404) {
                    setNotAvailable(true)
                } else {
                    setNotAvailable(true)
                }
              });

        
          } catch (error) {
            console.log("Error", error);
          }
    }, [])

    // const array = ['/plans/rocket.svg', '/plans/crown (1).svg', '/plans/business-award.svg', '/plans/silver-medal.svg']

    const planOrder = {
        'Starter': 1,
        'Business': 2,
        'Enterprises': 3,
        'Gold': 4,
    };
    // Sorting plans based on the planOrder mapping
    const sortedMonthlyPlans = data.Monthly && data.Monthly.length > 0 ? data.Monthly.sort((a, b) => planOrder[a.plan.name] - planOrder[b.plan.name]) : [];

    const sortedYearlyPlans = data.Yearly && data.Yearly.length > 0 ? data.Yearly.sort((a, b) => planOrder[a.plan.name] - planOrder[b.plan.name]) : [];


    ///// Plan not available
    if (notAvailable) {
        return (
            <Player
                style={{
                width: "40%",
                marginTop: "-10px ",
                objectFit: "cover",
                padding: 5,
                }}
                src="/NoData/no_data.json"
                loop
                autoplay
            />
        )
    }
  

    return (
        <Row justify='center'>
            <Col lg={24} xxl={24} md={24} sm={24} xs={24} xl={24}>
            
                {data && <Card className='  relative shadow-sm'>
                    <div className=' absolute rounded-t-lg top-0 w-full left-0  text-xl sm:text-3xl font-bold text-center bg-slate-100 sm:mb-10 pt-8 pb-16'>
                        Upgrade to Business Plan!
                    </div>

                    <div className=' absolute z-10 left-0 top-24 w-full text-center flex justify-center'>
                        <ToggleButton handlePlan={(value) => setPlan(value)} />
                    </div>

                    {plan === 'xxxxxx' && 
                    <div>
                        {data.Monthly && data.Monthly.length > 0 && <div className=' mt-40'>
                            <Row justify='center' gutter={[24, 24]}>

                                {sortedMonthlyPlans.map((item, index) => <Col key={item.id} xxl={6} md={6} sm={22} xs={22} xl={6} lg={6}>
                                    <Badge.Ribbon text={`${item.plan.tag_line}`} color='blue'>
                                        <Card style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} bordered={false} className=' shadow-xl relative'>
                                            <Row align='top' gutter={[12, 24]}>
                                                <Col span={5}>
                                                    {item.plan.name === 'Starter' && <Image src='/plans/rocket.svg' alt='icon' width={50} height={50} />}
                                                    {item.plan.name === 'Business' && <Image src='/plans/crown (1).svg' alt='icon' width={50} height={50} />}
                                                    {item.plan.name === 'Enterprises' && <Image src='/plans/business-award.svg' alt='icon' width={50} height={50} />}
                                                    {item.plan.name === 'Gold' && <Image src='/plans/award.svg' alt='icon' width={50} height={50} />}
                                                </Col>

                                                <Col span={19}>
                                                    <p className=' text-lg font-semibold'>{item.plan.name}</p>
                                                    <p className=' text-lg text-blue-500 mt-2'>{item.plan.tag_line}</p>
                                                </Col>

                                                <Col span={24}>
                                                    <div className=' h-2 bg-gradient-to-tr rounded-full from-orange-500 to-purple-400 ' />
                                                </Col>

                                                {/* Plan price  */}
                                                <Col span={24}>
                                                    <Flex vertical gap={4}>
                                                        <Space direction='horizontal' size={4}><p className=' text-xl font-semibold'>₹{item.plan.price}</p> /
                                                            {item.plan.duration_quantity >= 6 ? <Typography.Text mark>6 Month and 1 Month Free </Typography.Text> : item.plan.duration_quantity}</Space>
                                                        <Typography.Text color='green' italic>Included 18% GST Invoice Available</Typography.Text>
                                                    </Flex>
                                                </Col>
                                                {/* {item.plan.name==='Starter' && <div className=' h-6'></div>} */}
                                                {/* plan Feature  */}
                                                <Col span={24}>
                                                    <div className=' flex flex-col justify-start space-y-1 text-base text-black '>
                                                        {item.plan.verified ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.verified}<MdVerified className=' text-indigo-600' /></Flex> :
                                                            <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>Verified Business Icon</Text>
                                                                <MdVerified className=' text-indigo-600' /></Flex>}
                                                        {item.plan.trusted ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.trusted}
                                                            <div style={{ fontSize: "8px" }} className=' px-1 rounded-sm flex items-center justify-center h-4  text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.green.600),theme(colors.fuchsia.600),theme(colors.green.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                                                                Trusted
                                                            </div>
                                                        </Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled> Trusted Tag</Text>
                                                            <div style={{ fontSize: "8px" }} className=' px-1 rounded-sm flex items-center justify-center h-4  text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.green.600),theme(colors.fuchsia.600),theme(colors.green.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                                                                Trusted
                                                            </div>
                                                        </Flex>}
                                                        {item.plan.trending ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.trending}
                                                            <div style={{ fontSize: '8px' }} className=' px-1 rounded-sm flex items-center justify-center h-4 text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'>
                                                                Trending
                                                            </div>
                                                        </Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Trending Tag</Text>
                                                            <div style={{ fontSize: '8px' }} className=' px-1 rounded-sm flex items-center justify-center h-4 text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'>
                                                                Trending
                                                            </div>
                                                        </Flex>}
                                                        {item.plan.authorized ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.authorized}<FaUser className=' text-green-500' /></Flex> :
                                                            <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled> No Leads</Text><FaUser className=' text-green-500' /></Flex>}


                                                        {item.plan.sponsor ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.sponsor}<FcBriefcase /></Flex>
                                                            : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  No Job Post</Text><FcBriefcase /></Flex>}


                                                        {item.plan.super ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.super}</Flex>
                                                            : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Authorized Dealer Tag</Text></Flex>}

                                                        {item.plan.premium ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.premium}<MdWorkspacePremium className=' text-amber-600' /></Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Premium Seller Tag</Text><MdWorkspacePremium className=' text-amber-600' /></Flex>}

                                                        {item.plan.industry_leader ? <Flex Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.industry_leader}</Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Industry Leader Tag</Text></Flex>}

                                                        {item.plan.extra_benefits ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.extra_benefits}</Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-orange-500' /><Text disabled>Sponser Tag</Text></Flex>}

                                                        {item.plan.extra_benefits1 ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.extra_benefits1}</Flex>
                                                            : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Super Seller Tag</Text></Flex>}
                                                    </div>
                                                </Col>

                                                <Col span={24}>
                                                    <HandlePayment id={item.plan.id} amount={item.plan.price} />
                                                </Col>
                                                
                                                {/* <Col span={24}>
                                                    <Flex justify='center' align='center'><Text mark>Daily Spend only ₹ {((item.plan.price) / 180).toFixed()}</Text> </Flex>
                                                </Col> */}
                                                <Col span={24}>
                                                </Col>
                                            </Row>
                                            <div className=' border border-1 rounded-b-md font-medium bg-green-400 dark:bg-green-400 text-white dark:text-white py-2 text-center absolute bottom-0 left-0 w-full'>
                                                <Space direction='horizontal' size={5} align='center'>
                                                    Anytime Cancellation Policy Available
                                                    <Tooltip placement="topLeft" title="Cancel anytime hassle-free and get a refund for the remaining unused month.">
                                                        <BsInfoCircle className=' text-white' />
                                                    </Tooltip>
                                                </Space>
                                            </div>
                                        </Card>
                                    </Badge.Ribbon>
                                </Col>)}
                            </Row>
                        </div>}
                    </div>}

                    {plan === 'Yearly' && (
                        <div>
                            {data.Yearly && data.Yearly.length > 0 && <div className=' mt-40'>
                                <Row justify='center' gutter={[24, 24]}>
                                    {sortedYearlyPlans.map((item, index) => <Col key={item.id} xxl={6} md={6} sm={22} xs={22} xl={6} lg={6}>
                                        <Badge.Ribbon text={`${item.plan.tag_line}`} color='blue'>
                                            <Card style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} bordered={false} className=' shadow-xl relative'>
                                                <Row align='top' gutter={[12, 24]}>
                                                    <Col span={5}>
                                                        {item.plan.name === 'Starter' && <Image src='/plans/rocket.svg' alt='icon' width={50} height={50} />}
                                                        {item.plan.name === 'Business' && <Image src='/plans/crown (1).svg' alt='icon' width={50} height={50} />}
                                                        {item.plan.name === 'Enterprises' && <Image src='/plans/business-award.svg' alt='icon' width={50} height={50} />}
                                                        {item.plan.name === 'Gold' && <Image src='/plans/award.svg' alt='icon' width={50} height={50} />}
                                                    </Col>
                                                    <Col span={19}>
                                                        <p className=' text-lg font-semibold'>{item.plan.name}</p>
                                                        {/* <p className=' text-lg text-blue-500 mt-2'>{item.plan.tag_line}</p> */}
                                                    </Col>
                                                    <Col span={24}>
                                                        <div className=' h-2 bg-gradient-to-tr rounded-full from-orange-500 to-purple-400 ' />
                                                    </Col>
                                                    {/* Plan price  */}
                                                    <Col span={24}>
                                                        <Flex vertical gap={4}>
                                                            <Space direction='horizontal' size={4}><p className=' text-xl font-semibold'>₹{item.plan.price}</p> /
                                                                <Typography.Text mark>Month</Typography.Text></Space>
                                                            <Typography.Text color='green' italic>Included 18% GST Invoice Available</Typography.Text>
                                                        </Flex>
                                                    </Col>
                                                    {/* plan Feature  */}
                                                    {/* {item.plan.name==='Starter' && <div className=' h-6'></div>} */}
                                                    <Col span={24}>
                                                        <div className=' flex flex-col justify-start space-y-1 text-base text-black '>
                                                            {item.plan.verified ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.verified}<MdVerified className=' text-indigo-600' /></Flex> :
                                                                <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Verified Business Icon</Text>
                                                                    <MdVerified className=' text-indigo-600' /></Flex>}
                                                            {item.plan.trusted ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.trusted}
                                                                <div style={{ fontSize: "8px" }} className=' px-1 rounded-sm flex items-center justify-center h-4  text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.green.600),theme(colors.fuchsia.600),theme(colors.green.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                                                                    Trusted
                                                                </div>
                                                            </Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Trusted Tag</Text>
                                                                <div style={{ fontSize: "8px" }} className=' px-1 rounded-sm flex items-center justify-center h-4  text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.green.600),theme(colors.fuchsia.600),theme(colors.green.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                                                                    Trusted
                                                                </div>
                                                            </Flex>}
                                                            {item.plan.trending ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.trending}
                                                                <div style={{ fontSize: '8px' }} className=' px-1 rounded-sm flex items-center justify-center h-4 text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'>
                                                                    Trending
                                                                </div>
                                                            </Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Trending Tag</Text>
                                                                <div style={{ fontSize: '8px' }} className=' px-1 rounded-sm flex items-center justify-center h-4 text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'>
                                                                    Trending
                                                                </div>
                                                            </Flex>}
                                                            {item.plan.authorized ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.authorized}<FaUser className=' text-green-500' /></Flex> :
                                                                <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>   No Leads</Text><FaUser className=' text-green-500' /></Flex>}
                                                            {item.plan.sponsor ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.sponsor}<FcBriefcase /></Flex>
                                                                : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  No Job Post</Text><FcBriefcase /></Flex>}
                                                            {item.plan.super ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.super}</Flex>
                                                                : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Authorized Dealer Tag</Text> </Flex>}
                                                            {item.plan.premium ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.premium}<MdWorkspacePremium className=' text-amber-600' /></Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Premium Seller Tag</Text><MdWorkspacePremium className=' text-amber-600' /></Flex>}
                                                            {item.plan.industry_leader ? <Flex Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.industry_leader}</Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Industry Leader Tag</Text></Flex>}
                                                            {item.plan.extra_benefits ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.extra_benefits}</Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-orange-500' /><Text disabled>Sponser Tag</Text></Flex>}

                                                            {item.plan.extra_benefits1 ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.extra_benefits1}</Flex>
                                                                : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Super Seller Tag</Text></Flex>}
                                                        </div>
                                                    </Col>
                                                    <Col span={24}>
                                                        <HandlePayment id={item.plan.id} amount={item.plan.price} />
                                                    </Col>
                                                    {/* <Col span={24}>
                                                        <Flex justify='center' align='center'><Text mark>Daily Spend only ₹ {((item.plan.price) / 365).toFixed()}</Text> </Flex>
                                                    </Col> */}
                                                    <Col span={24}>
                                                    </Col>
                                                </Row>

                                                {/* Hassle free card */}
                                                <div className=' border border-1 rounded-b-md font-medium bg-green-400 dark:bg-green-400 text-white dark:text-white py-2 text-center absolute bottom-0 left-0 w-full'>
                                                    <Space direction='horizontal' size={5} align='center'>
                                                        Anytime Cancellation Policy Available
                                                        <Tooltip placement="topLeft" title="Cancel anytime hassle-free and get a refunthe remaining unused month.">
                                                            <BsInfoCircle className=' text-white' />
                                                        </Tooltip>
                                                    </Space>
                                                </div>
                                                {/* Hassle free card */}

                                            </Card>
                                        </Badge.Ribbon>
                                    </Col>)}
                                </Row>
                            </div>}
                        </div>)}

                    {plan === 'One Month Free' && (
                        <div>
                            {data.Trial_Plan && data.Trial_Plan.length > 0 && <div className=' mt-40'>
                                <Row justify='center' gutter={[24, 24]}>
                                    {data.Trial_Plan.map((item, index) => <Col key={item.id} xxl={6} md={6} sm={22} xs={22} xl={6} lg={6}>
                                        <Card style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} bordered={false} className=' shadow-xl relative'>
                                            <Row align='middle' gutter={[12, 24]}>
                                                <Col span={5}>
                                                    <Image src='/plans/trial.svg' alt='icon' width={50} height={50} />
                                                </Col>
                                                <Col span={19}>
                                                    <p className=' text-lg font-semibold'>{item.plan.name}</p>
                                                    <p className=' text-lg text-blue-500 mt-2'>{item.plan.tag_line} for 5 Days</p>
                                                </Col>
                                                <Col span={24}>
                                                    <div className=' h-2 bg-gradient-to-tr rounded-full from-orange-500 to-purple-400 ' />
                                                </Col>

                                                {/* plan Feature  */}
                                                {/* {item.plan.name==='Starter' && <div className=' h-6'></div>} */}
                                                <Col span={24}>
                                                    <div className=' flex flex-col justify-start space-y-1 text-base text-black '>
                                                        {item.plan.verified ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.verified}<MdVerified className=' text-indigo-600' /></Flex> :
                                                            <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Verified Business Icon</Text>
                                                                <MdVerified className=' text-indigo-600' /></Flex>}
                                                        {item.plan.trusted ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.trusted}
                                                            <div style={{ fontSize: "8px" }} className=' px-1 rounded-sm flex items-center justify-center h-4  text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.green.600),theme(colors.fuchsia.600),theme(colors.green.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                                                                Trusted
                                                            </div>
                                                        </Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Trusted Tag</Text>
                                                            <div style={{ fontSize: "8px" }} className=' px-1 rounded-sm flex items-center justify-center h-4  text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.green.600),theme(colors.fuchsia.600),theme(colors.green.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                                                                Trusted
                                                            </div>
                                                        </Flex>}
                                                        {item.plan.trending ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.trending}
                                                            <div style={{ fontSize: '8px' }} className=' px-1 rounded-sm flex items-center justify-center h-4 text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'>
                                                                Trending
                                                            </div>
                                                        </Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Trending Tag</Text>
                                                            <div style={{ fontSize: '8px' }} className=' px-1 rounded-sm flex items-center justify-center h-4 text-white font-bold text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient'>
                                                                Trending
                                                            </div>
                                                        </Flex>}
                                                        {item.plan.authorized ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.authorized}<FaUser className=' text-green-500' /></Flex> :
                                                            <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>   No Leads</Text><FaUser className=' text-green-500' /></Flex>}
                                                        {item.plan.sponsor ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.sponsor}<FcBriefcase /></Flex>
                                                            : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  No Job Post</Text><FcBriefcase /></Flex>}
                                                        {item.plan.super ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.super}</Flex>
                                                            : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Authorized Dealer Tag</Text> </Flex>}
                                                        {item.plan.premium ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.premium}<MdWorkspacePremium className=' text-amber-600' /></Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Premium Seller Tag</Text><MdWorkspacePremium className=' text-amber-600' /></Flex>}
                                                        {item.plan.industry_leader ? <Flex Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.industry_leader}</Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Industry Leader Tag</Text></Flex>}
                                                        {item.plan.extra_benefits ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.extra_benefits}</Flex> : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-orange-500' /><Text disabled>Sponser Tag</Text></Flex>}

                                                        {item.plan.extra_benefits1 ? <Flex gap={4} align='center'><FaCircleCheck className=' text-green-500 drop-shadow-lg shadow-green-500' />{item.plan.extra_benefits1}</Flex>
                                                            : <Flex gap={4} align='center'><FaCircleXmark className=' text-red-500 drop-shadow-lg shadow-green-500' /><Text disabled>  Super Seller Tag</Text></Flex>}
                                                    </div>
                                                </Col>
                                                
                                                <Col span={24}>
                                                    {/* <TrialPlan premium={item.id} /> */}
                                                    <HandlePayment id={item.plan.id} amount={item.plan.price} />
                                                </Col>
                                                {/* <Col span={24}>
                                                        <Flex justify='center' align='center'><Text mark>Daily Spend only ₹ {((item.plan.price) / 365).toFixed()}</Text> </Flex>
                                                    </Col>
                                                    <Col span={24}>
                                                    </Col> */}
                                            </Row>
                                            {/* Hassle free card */}
                                            {/* <div className=' border border-1 rounded-b-md font-medium bg-green-400 dark:bg-green-400 text-white dark:text-white py-2 text-center absolute bottom-0 left-0 w-full'>
                                                    <Space direction='horizontal' size={5} align='center'>
                                                        Anytime Cancellation Policy Available
                                                        <Tooltip placement="topLeft" title="Cancel anytime hassle-free and get a refunthe remaining unused month.">
                                                            <BsInfoCircle className=' text-white' />
                                                        </Tooltip>
                                                    </Space>
                                                </div> */}
                                            {/* Hassle free card */}
                                        </Card>
                                    </Col>)}
                                </Row>
                            </div>}
                        </div>)}


                </Card>}
            </Col>
        </Row>
    )
}

export default Plan