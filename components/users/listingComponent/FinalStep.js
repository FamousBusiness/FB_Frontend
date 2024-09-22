import { Col, Divider, Row, Space } from 'antd'
import React, { useState } from 'react'
import DrawerPlan from './DrawerPlan'
import { Player } from '@lottiefiles/react-lottie-player';
import { TiTick } from "react-icons/ti";
import { AiFillFilter, AiFillTag } from 'react-icons/ai';
import { MdAdsClick, MdCategory, MdVerified } from 'react-icons/md';
import { IoMdHammer } from 'react-icons/io';
import { PiFlagBanner, PiSuitcaseSimpleDuotone } from 'react-icons/pi';
import { BiCategory } from 'react-icons/bi';
import { BsMessenger, BsFillSunFill } from 'react-icons/bs';
import { FireOutlined } from '@ant-design/icons';
import { SiTrustedshops } from 'react-icons/si';
import { HiDocument } from 'react-icons/hi';

function FinalStep() {
    
    const [select, setSelect] = useState(1);
    const [year, SetYear] = useState(1);
    const handleChange = (value) => {

        SetYear(value)
    }
    return (
        <div className=' min-h-screen'>
            <Row justify='center' gutter={[8, 12]} >
                <Col className=' h-44 bg-slate-200' span={24}>

                </Col>
                <Col span={22} className=' p-2 border border-1 rounded-md '>
                    <Row justify='center'>
                        <Col span={23}>
                            <Row align='middle' justify='space-between'>
                                <Col className=' font-bold'>
                                    <Space direction='horizontal' size={10}><div>{year} Year</div> <Divider type='vertical' className=' w-1' /><div>Mobile + Desktop</div></Space>
                                </Col>
                                <Col>
                                    <DrawerPlan handleChange={handleChange} />
                                </Col>

                            </Row>
                        </Col>
                    </Row>

                </Col>

                <Col span={24} className=' text-center '>
                    <div className=' font-bold text-xl'> Choose Your Plan</div>
                </Col>
                <Col span={22}>
                    <Row justify='space-between'>
                        <Col onClick={() => setSelect(1)} xs={7} md={7} sm={7} lg={7} xl={7} xxl={7} className={`border border-1 relative bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-md ${select === 1 ? 'border-yellow-400' : ' border-blue-800'} h-24 content-center text-xl font-bold shadow-xl`}>
                            <div className=' text-center text-white'>Gold </div>
                            {select === 1 ? <div className=' absolute top-0 right-0'><TiTick className=' text-lg text-white' /></div> : null}
                            <Player src='/plans/gold.json' autoplay loop style={{ width: '100%', position: 'absolute', top: 1 / 2 }} />
                            <div className=' absolute bottom-0 w-full text-center text-white'>₹ 10/Daily</div>
                        </Col>
                        <Col onClick={() => setSelect(2)} xs={7} md={7} sm={7} lg={7} xl={7} xxl={7} className={`border border-1 relative bg-gradient-to-r from-purple-500 to-purple-900 ${select === 2 ? 'border-yellow-400' : ' border-blue-800'} rounded-md h-24 content-center text-xl font-bold shadow-xl`}>
                            <div className=' text-center text-white'>Diamond </div>
                            {select === 2 ? <div className=' absolute top-0 right-0'><TiTick className=' text-lg text-white' /></div> : null}
                            <Player src='/plans/Diamond.json' autoplay loop style={{ width: '80%', position: 'absolute', top: 10, left: 10 }} />
                            <div className=' absolute bottom-0 w-full text-center text-white'>₹ 20/Daily</div>
                        </Col>

                        <Col onClick={() => setSelect(3)} xs={7} md={7} sm={7} lg={7} xl={7} xxl={7} className={`border border-1 relative bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient rounded-md ${select === 3 ? 'border-yellow-400' : ' border-blue-800'} border-amber-800 h-24 content-center text-xl font-bold shadow-xl`}>
                            {select === 3 ? <div className=' absolute top-0 right-0'><TiTick className=' text-lg text-white' /></div> : null}
                            <div className=' text-center text-white'>Business + </div>
                            <Player src='/plans/Business.json' autoplay loop style={{ width: '60%', position: 'absolute', top: 18, left: 16 }} />
                            <div className=' absolute bottom-0 w-full text-center text-white'>₹ 50/Daily</div>
                        </Col>
                    </Row>
                </Col>



                {select === 1 ?
                    <Col span={24} className=' dark:text-black'>
                        <Row justify='center' gutter={[4, 16]}>
                            <Col span={24} className=' text-center text-xs font-bold text-green-600'>Features of Gold Plan</Col>


                            {/* Gold Plan */}
                            {/* Gold Plan */}
                            {/* Gold Plan */}
                            {/* Gold Plan */}

                            <Col span={22} className=' font-bold text-xs'>
                                <Row align='middle' gutter={8}>
                                    <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Verified Business Page</Col><Col><MdVerified className=' text-blue-600' /></Col>
                                </Row>
                            </Col>
                            <Col span={22} className=' font-bold text-xs'>
                                <Row align='middle' gutter={8}>
                                    <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>View Your Business in Search Category</Col><Col><BiCategory className=' text-blue-600' /></Col>
                                </Row>
                            </Col>
                            <Col span={22}>
                                <Row align='middle' className=' font-bold' gutter={8}>
                                    <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Daily Leads</Col><Col><AiFillFilter className=' text-indigo-600' /></Col>
                                </Row>

                            </Col>
                            <Col span={22}>
                                <Row align='middle' className=' font-bold' gutter={8}>
                                    <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Free 10 Job Post</Col><Col><PiSuitcaseSimpleDuotone className=' text-green-800' /></Col>
                                </Row>


                            </Col>
                            <Col span={22}>
                                <Row align='middle' className=' font-bold' gutter={8}>
                                    <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Free 10 Ads Post</Col><Col><MdAdsClick className=' text-green-800' /></Col>
                                </Row>
                            </Col>
                            <Col span={22}>
                                <Row align='middle' className=' font-bold' gutter={8}>
                                    <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Free 50,000 Messenger Bulk Campaign </Col><Col><BsMessenger className=' text-green-800' /></Col>
                                </Row>
                            </Col>
                            <Col span={22}>
                                <Row align='middle' className=' font-bold' gutter={8}>
                                    <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Free 2 Banner Post In Your Category </Col><Col><PiFlagBanner className=' text-green-800' /></Col>
                                </Row>
                            </Col>
                        </Row> </Col> : null}


                {/* Platinum Plan  */}
                {/* Platinum Plan  */}
                {/* Platinum Plan  */}
                {/* Platinum Plan  */}


                {select == 2 ? <Col span={24}>
                    <Row justify='center' gutter={[4, 16]}>
                        <Col span={24} className=' text-center text-xs font-bold text-green-600'>Features of Platinum Plan</Col>
                        <Col span={22} className=' font-bold text-xs'>
                            <Row align='middle' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Verified Business Page</Col><Col><MdVerified className=' text-blue-600' /></Col>
                            </Row>
                        </Col>
                        <Col span={22} className=' font-bold text-xs'>
                            <Row align='middle' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>View Your Business in Search Category</Col><Col><BiCategory className=' text-blue-600' /></Col>
                            </Row>
                        </Col>
                        <Col span={22} className=' font-bold text-xs'>
                            <Row align='middle' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Your Business Bid 12 Tender Access</Col><Col><HiDocument className=' text-cyan-600' /></Col>
                            </Row>
                        </Col>
                        <Col span={22} className=' font-bold text-xs'>
                            <Row align='middle' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>View Business in Top 15 Your Category</Col><Col><MdCategory className=' text-red-600' /></Col>
                            </Row>
                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Trending Tag</Col><Col><BsFillSunFill className=' text-yellow-600' /></Col>
                            </Row>

                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Free 2,000 Bulk SMS Campaign</Col><Col><AiFillFilter className=' text-indigo-600' /></Col>
                            </Row>

                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Free 5,000 Bulk Email Campaign</Col><Col><AiFillFilter className=' text-indigo-600' /></Col>
                            </Row>

                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Daily Leads</Col><Col><AiFillFilter className=' text-indigo-600' /></Col>
                            </Row>

                        </Col>

                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Free 20 Job Post</Col><Col><PiSuitcaseSimpleDuotone className=' text-blue-800' /></Col>
                            </Row>


                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Free 20 Ads Post</Col><Col><MdAdsClick className=' text-blue-800' /></Col>
                            </Row>
                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Free 1 Lakh Messenger Bulk Campaign </Col><Col><BsMessenger className=' text-blue-800' /></Col>
                            </Row>
                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Free 5 Banner Post In Your Category </Col><Col><PiFlagBanner className=' text-blue-800' /></Col>
                            </Row>
                        </Col>
                    </Row> </Col> : null}

                 {/* Business Plus */}
                 {/* Business Plus */}
                 {/* Business Plus */}
                 {/* Business Plus */}
                 {/* Business Plus */}
                 {/* Business Plus */}
                 {select == 3 ? <Col span={24}>
                    <Row justify='center' gutter={[4, 16]}>
                        <Col span={24} className=' text-center text-xs font-bold text-green-600'>Features of Business Plus Plan</Col>
                        <Col span={22} className=' font-bold text-xs'>
                            <Row align='middle' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Verified Business Page</Col><Col><MdVerified className=' text-blue-600' /></Col>
                            </Row>
                        </Col>
                        <Col span={22} className=' font-bold text-xs'>
                            <Row align='middle' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>View Your Business in Search Category</Col><Col><BiCategory className=' text-blue-600' /></Col>
                            </Row>
                        </Col>
                        <Col span={22} className=' font-bold text-xs'>
                            <Row align='middle' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Your Business Bid 24 Tender Access</Col><Col><HiDocument className=' text-cyan-600' /></Col>
                            </Row>
                        </Col>
                        <Col span={22} className=' font-bold text-xs'>
                            <Row align='middle' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>View Business in Top 10 Your Category</Col><Col><MdCategory className=' text-red-600' /></Col>
                            </Row>
                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Trending Tag</Col><Col><BsFillSunFill className=' text-yellow-600' /></Col>
                            </Row>

                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Trusted Tag</Col><Col><SiTrustedshops className=' text-yellow-900' /></Col>
                            </Row>

                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Free 5,000 Bulk SMS Campaign</Col><Col><AiFillFilter className=' text-indigo-600' /></Col>
                            </Row>

                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Free 10,000 Bulk Email Campaign</Col><Col><AiFillFilter className=' text-indigo-600' /></Col>
                            </Row>

                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Daily Leads</Col><Col><AiFillFilter className=' text-indigo-600' /></Col>
                            </Row>

                        </Col>

                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Free 30 Job Post</Col><Col><PiSuitcaseSimpleDuotone className=' text-blue-800' /></Col>
                            </Row>


                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Your Business Free 30 Ads Post</Col><Col><MdAdsClick className=' text-blue-800' /></Col>
                            </Row>
                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Free 3 Lakh Messenger Bulk Campaign </Col><Col><BsMessenger className=' text-blue-800' /></Col>
                            </Row>
                        </Col>
                        <Col span={22}>
                            <Row align='middle' className=' font-bold' gutter={8}>
                                <Col span={2}><AiFillTag className=' text-green-700' /></Col><Col>Get Free 8 Banner Post In Your Category </Col><Col><PiFlagBanner className=' text-blue-800' /></Col>
                            </Row>
                        </Col>
                    </Row> </Col> : null}



            </Row>
            <div className=' h-16'></div>
        </div>
    )
}

export default FinalStep