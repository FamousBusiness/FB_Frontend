"use client";
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Modal, Row, Space, Progress } from 'antd';
import { MailFilled, PhoneFilled, PlusOutlined, RightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import { FaRupeeSign } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const TenderCard = ({ item, icon, color, title, limit }) => {
    const [tick, settick] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');


    const [bider, setBider] = useState(5);
    const [left, setLeft] = useState(limit);
    const router = useRouter();

    useEffect(() => {


        setLeft(limit - bider)

    }, [limit, bider])

    const value = (limit / 10) * bider;

    return (
        <>

            <Row>

                {/* mobile view */}
                <Col sm={24} xs={24} md={24} xl={24} lg={24} xxl={24}>

                    {/* <Link href="/tender/tenderpage/[...slug]" as={`/tender/tenderpage/${item.businessName}`}> */}
                        <div className=' cursor-pointer object-center relative' >
                            <div className=' flex flex-row relative  rounded-lg border border-1 p-3 justify-around h-full w-full'>
                                <Image src='/leads/bid.png' height={200} width={200} className=' absolute object-fill -z-10 opacity-5' alt='leads' />
                                <div className=' rounded-tl-lg bg-[linear-gradient(to_right,theme(colors.amber.600),theme(colors.amber.100),theme(colors.amber.400),theme(colors.yellow.100),theme(colors.amber.600),theme(colors.amber.100),theme(colors.amber.600))] bg-[length:200%_auto] animate-gradient absolute  font-bold w-10/12 left-0 top-0 py-2 flex flex-row space-x-1 rounded-br-full px-2 text-start text-green-700 items-center '><FaLocationDot /><div>{item.location}</div>
                                </div>
                                <div className=' py-1 absolute top-0 right-0 px-2 text-red-600 text-xs font-semibold'>Status</div>
                                <Row justify='start' gutter={[12, 12]} className=' text-sm mt-8 font-bold' >

                                    <Col span={24} >
                                        <Row gutter={[24, 8]}>
                                            <Col span={22} className=' font-normal'>
                                                Tender Price
                                            </Col>
                                            <Col span={24}>
                                                <Row justify='space-between' >
                                                    <Col>
                                                        <FaRupeeSign className=' text-xl font-bold' />
                                                    </Col>
                                                    <Col>

                                                        <Row justify='center' align='middle' >
                                                            <Col style={{ fontSize: 12 }} className='text-gray-500 text-center font-normal'>Price:</Col><Col style={{ fontSize: 12 }} className=' text-green-500 font-normal'><del>₹249</del></Col></Row>
                                                        <div className=' py-1 px-2 bg-green-600 font-semibold text-white rounded-md'>₹ 74</div>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col span={22}>

                                                <p className=" font-medium">
                                                    {item.requirement.length > 60
                                                        ? `${item.requirement.substring(0, 60)}...`
                                                        : item.requirement}
                                                </p>
                                            </Col>


                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Progress percent={value} showInfo={false} />
                                        <Row justify='space-between'>
                                            <Col style={{ fontSize: 12 }} className=' text-red-500'>{left} Left</Col>
                                            <Col style={{ fontSize: 12 }} className=' text-gray-400'>{limit} User</Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row align='bottom' justify='space-between'>
                                            <Col>
                                                <p className=" font-light">{item.timeOfRaise}</p>
                                            </Col>

                                            <Col>

                                            </Col>
                                        </Row>
                                    </Col>


                                </Row>
                            </div>
                        </div>
                    {/* </Link> */}
                </Col>




            </Row>
        </>
    );
};
export default TenderCard;