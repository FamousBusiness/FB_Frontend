
import { useAuth } from '@/context/AuthContext'
import LoginForm from '@/utils/LandingPageModel'
import { showRazorpay } from '@/utils/PaymentUtils'
import { EyeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Player } from '@lottiefiles/react-lottie-player'
import { Badge, Button, Col, Flex, Modal, Progress, Row, Space, Typography } from 'antd'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { FaLocationDot, FaMapLocationDot } from 'react-icons/fa6'
const { Text, Paragraph, Title } = Typography





function PremiumMember({ item }) {
    const { user } = useAuth()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const formattedDate = moment(item.created_at).format('YYYY-MM-DD hh:mm:ss A');
    const [open, setOpen] = useState(false);
    const limit = 10
    const remain = limit - item.sum_lead_viewed;


    
    return (
        <div>
            <Row>
                {/* Desktop */}
                <Col sm={24} xs={24} md={24} xl={24} lg={24} xxl={24}>
                    <Badge.Ribbon color={item.status === 'High Priority' ? 'red' : 'green'} text={item.status === 'High Priority' ? 'Urgent' : item.status || 'open'}
                        className='py-2 font-bold '>
                        <div className=' cursor-pointer bg-white shadow-xl flex flex-col relative overflow-hidden rounded-2xl border border-1 p-3 justify-around h-full w-full'>
                            <div className=' bg-[linear-gradient(to_right,theme(colors.yellow.400),theme(colors.yellow.100),theme(colors.amber.400),theme(colors.fuchsia.200),theme(colors.yellow.400),theme(colors.yellow.100),theme(colors.yellow.400))] bg-[length:200%_auto] animate-gradient absolute rounded-tl-lg  font-bold w-10/12 left-0 top-0 py-2 flex flex-row space-x-1 rounded-br-full px-2 text-start text-black items-center '><FaMapLocationDot />
                                <div>
                                    {item.city || ''} {item.state || ''} {item.pincode || ''}
                                </div>
                            </div>
                            {/* {item.status === 'high Priority' ? null : <div className=' py-1 absolute top-0 right-0 px-2 dark:text-red-600 text-xs font-semibold'>{`${item.status}`}</div>} */}
                            <Row justify='start' gutter={[12, 12]} className=' text-sm mt-8 font-bold' >
                                <Col span={24} onClick={() => setOpen(true)}>
                                    <Row gutter={24} align='middle'>
                                        <Col span={4}>
                                            <div className=' flex flex-col items-center p-1'>
                                                <div className=' w-28 h-28 relative'>
                                                    <Player autoplay loop src='/leads/businessMan.json' style={{ width: "100%", objectFit: "cover" }} alt='Lead' />
                                                </div>
                                                <div className=' font-bold pl-2 text-blue-500 dark:text-blue text-sm'>Customer</div>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <Paragraph ellipsis={{ rows: 2 }} className=" text-lg">
                                                {item.requirement}
                                            </Paragraph>
                                        </Col>
                                        {item?.price?.price && item?.price?.price !== 0 && (
                                            <Col span={8}>
                                                <Flex justify='center' align='center' vertical >
                                                    {item.status === 'High Priority' && <Image src='/leads/Premium.svg' width={130} height={80} alt='b' />}
                                                    <Button onClick={user ? showRazorpay : () => setIsLoggedIn(true)} color='orange' className='font-bold'>
                                                        ₹ {item?.price?.price}
                                                    </Button>
                                                </Flex>
                                            </Col>
                                        )}

                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Progress strokeColor='red' percent={item.sum_lead_viewed * 10} showInfo={false} />
                                    <Flex align='baseline' justify='space-between'>
                                        <Text type='secondary' >{remain} Left</Text>
                                        <Text type='secondary' >{limit}</Text>
                                    </Flex>
                                </Col>
                                <Col span={24}>
                                    <Row align='bottom' justify='space-between'>
                                        <Col className=" font-light">
                                            <Text type='secondary'>{formattedDate}</Text>
                                        </Col>
                                        <Col className=' font-thin text-gray-500'>
                                            <Flex gap={3}>
                                                <EyeOutlined />
                                                <Text type='secondary'>{item.sum_lead_viewed}</Text>
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Badge.Ribbon>
                </Col>
            </Row>

            <LoginForm visible={isLoggedIn} onClose={() => setIsLoggedIn(false)} />

            <Modal
                centered="true"
                open={open}
                footer={null}
                // confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
            >
                <Row justify='center' gutter={[12, 8]}>
                    <Col>
                        <div className=' relative flex flex-col justify-center items-center'>
                            <Player autoplay loop src='/leads/businessMan.json' style={{ width: 250, height: 250 }} alt='Lead' />
                            <div className=' absolute text-xl font-bold bottom-2 text-green-700 dark:text-green-600'>Business</div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <Space size={10} align='center' direction='horizontal'><BiUser className=' text-lg' /><Text className=' text-xl py-2 font-semibold '>{item.created_by}</Text></Space>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[12, 12]}>
                            <Col span={24}>
                                <Space size={10} direction='horizontal' ><PhoneOutlined /><Link href={`tel:${item.mobile_number}`}>{item.mobile_number}</Link></Space>
                            </Col>
                            <Col span={24}>
                                <Space size={10} direction='horizontal'  ><MailOutlined /><Link href={`mailto:${item.email}`}>{item.email}</Link></Space>
                            </Col>
                            <Col span={24}>
                                <Space size={10} direction='horizontal'  ><FaLocationDot />{item.address || ''}</Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <div className=' text-xl py-2 font-semibold '>Requirement:</div>
                        <div className=' p-3 border border-1 rounded-lg'>{item.requirement}</div>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default PremiumMember