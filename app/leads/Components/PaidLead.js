"use client";
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Modal, Row, Space, Badge, Progress, Empty, Flex, message, Result, Typography } from 'antd';
import { EyeFilled, MailFilled, PhoneFilled, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Player } from '@lottiefiles/react-lottie-player';
import { BiSolidUser } from 'react-icons/bi';
import Link from 'next/link';
import { FaLocationDot, FaLocationPin } from 'react-icons/fa6';
import moment from 'moment';




const PaidLeads = ({ item, icon, color, title, limit }) => {
    const [leadId, setLeadId] = useState(item.id);
    const [data, setData] = useState(null);
    const formattedDate = moment(item.lead.created_at).format('YYYY-MM-DD hh:mm:ss A');
    const [tick, settick] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = async () => {
        setOpen(true);
    };


    const left = 5 - item.lead.views;


    const handleCancel = () => {
        // console.log('Clicked cancel button');
        setOpen(false);
    };


    return (
        <>
            <Row>
                {/* Desktop */}

                <Col sm={24} xs={24} md={24} xl={24} lg={24} xxl={24}>
                    <Badge.Ribbon color='green' text={item.lead.status === 'high priority' ? 'open' : item.lead.status || 'open'}
                        className={` py-1 font-bold `}>
                        <div className=' shadow-xl bg-white flex flex-col relative overflow-hidden rounded-2xl border border-1 p-3 justify-around h-full w-full'>
                            <div className=' bg-[linear-gradient(to_right,theme(colors.yellow.400),theme(colors.yellow.100),theme(colors.amber.400),theme(colors.fuchsia.200),theme(colors.yellow.400),theme(colors.yellow.100),theme(colors.yellow.400))] bg-[length:200%_auto] animate-gradient absolute rounded-tl-lg  font-bold w-10/12 left-0 top-0 py-2 flex flex-row space-x-1 rounded-br-full px-2 text-start text-black items-center '><FaLocationDot />
                                <div>
                                    {item.lead.city || ""} {item.lead.state || ""}
                                </div>
                            </div>
                            {/* {item.status === 'high priority' ? null : <div className=' py-1 absolute top-0 right-0 px-2 dark:text-red-600 text-xs font-semibold'>{`${item.status}`}</div>} */}
                            <Row justify='start' gutter={[12, 12]} className=' text-sm mt-8 font-bold' >
                                <Col span={24} onClick={showModal}>
                                    <Row gutter={[10,10]} align='middle'>
                                         <Col span={24}>
                                             <p className=" text-lg font-semibold" >Customer Details</p>
                                          </Col>
                                        <Col span={24}>
                                            <Flex vertical gap={1}>
                                                <p className=' text-base font-semibold' >Requirement</p>
                                                <Typography.Paragraph ellipsis={{ rows: 2 }}>
                                                    {item.lead.requirement}
                                                </Typography.Paragraph>
                                                <p className=' text-base font-light text-red'>Pin Code: {item.lead.pincode || ''}</p>
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row align='bottom' justify='space-between'>
                                        <Col span={24}>
                                            <Progress strokeColor='green' percent={item.lead.views * 20} showInfo={false} />
                                            <Flex align='baseline' justify='space-between'>
                                                <p className=' text-sm font-light italic' >left: {left} </p>
                                                <p className=' text-sm font-light italic' >total: 5</p>
                                            </Flex>
                                        </Col>
                                        <Col className=" font-light">
                                            {formattedDate}
                                        </Col>
                                        <Col className=' font-thin text-gray-500'>
                                            <Flex gap={3}>
                                                <EyeFilled />{item.lead.views}</Flex>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Badge.Ribbon>
                </Col>
            </Row>
            <Modal
                centered="false"
                open={open}
                footer={null}
                // okText={tick ? 'Remove' : 'Add'}
                // onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Row justify='center' gutter={[12, 8]}>
                    <Col >
                        <div className=' relative flex flex-col justify-center items-center'>
                            <Player autoplay loop src='/leads/businessMan.json' style={{ width: 250, height: 250 }} alt='Lead' />
                            <div className=' absolute text-xl font-bold bottom-1 text-green-700 dark:text-green-600'>Business</div>
                        </div>

                    </Col>
                    <Col span={24}>
                        <Space size={10} align='center' direction='horizontal'><BiSolidUser className=' text-lg' />{item.lead.created_by}</Space>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[12, 12]}>
                            <Col span={24}>
                                <Space size={10} direction='horizontal' ><PhoneFilled /><Link href={`tel:${item.lead.mobile_number}`}>{item.lead.mobile_number}</Link></Space>
                            </Col>
                            <Col span={24}>
                                <Space size={10} direction='horizontal'  ><MailFilled /><Link href={`mailto:${item.lead.email}`}>{item.lead.email}</Link></Space>
                            </Col>
                            <Col span={24}>
                                <Space size={10} direction='horizontal'>
                                    <FaLocationPin /> {item.lead.address && `${item.lead.address}`}
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <div className=' text-xl py-2 font-semibold '>Requirement:</div>
                        <div className=' p-3 border border-1 rounded-lg'>{item.lead.requirement}</div>
                    </Col>
                    <Col span={24} className=" font-light">
                        {formattedDate}
                    </Col>
                </Row>
            </Modal>
        </>
    );
};
export default PaidLeads;
