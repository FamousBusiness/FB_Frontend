
import React, { useState, useEffect } from 'react';
import { Button, Menu, Modal, Row, Col } from 'antd';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BiPhoneOutgoing } from 'react-icons/bi';
import { IoCallOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import LoginForm from '@/utils/LandingPageModel';

const MultiNumber = ({ mobileNumbers, default_Number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const [single, setSingle] = useState(false);
    const [notLoggedIn, setnotLoggedIn] = useState(false);



    const showModal = () => {
        if (user && mobileNumbers && mobileNumbers.length >= 1) {
            setIsModalOpen(true);
        } else {
            if (user) {
                setSingle(true);
            }
            else {
                setnotLoggedIn(true);
            }

        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const renderNumbers = () => {
        if (!user) {
            return (
                <p>Please <Link href="/login"><a>Login</a></Link> to view contact numbers.</p>
            );
        }

        return (
            <>
                <Menu.Item icon={<BiPhoneOutgoing />} key='sas'>{default_Number}</Menu.Item>
                {mobileNumbers && mobileNumbers.map((item, index) => (
                    <Menu.Item icon={<IoCallOutline />} key={index}>
                        <Link type='text' href={`tel:+91${item.mobile_number}`}>
                            {item.mobile_number}
                        </Link>
                    </Menu.Item>
                ))}
            </>
        );
    };

    return (
        <>
            <Row>
                <Col xs={0} sm={0} md={0} xl={24} lg={24} xxl={24}>
                    <Button
                        size='large'
                        icon={
                            <motion.div animate={{
                                rotate: [0, 60, 0],
                                borderRadius: ["50%", "50%"],
                            }}
                                transition={{
                                    duration: 2,
                                    ease: "easeOut",
                                    repeat: Infinity
                                }}>
                                <BsFillTelephoneFill style={{ color: 'white' }} />
                            </motion.div>
                        }
                        style={{ background: '#3c89d0', color: 'white' }}
                        onClick={showModal}
                    >
                        {single ? `${default_Number}` : 'View Number'}
                    </Button>
                </Col>
                <Col xs={24} md={24} sm={24} xl={0} xxl={0} lg={0}>
                    <Button
                        size='large'
                        className='w-full'
                        icon={
                            <motion.div animate={{
                                rotate: [0, 60, 0],
                                borderRadius: ["50%", "50%"],
                            }}
                                transition={{
                                    duration: 2,
                                    ease: "easeOut",
                                    repeat: Infinity
                                }}>
                                <BsFillTelephoneFill style={{ color: 'white' }} />
                            </motion.div>
                        }
                        style={{ background: '#3c89d0', color: 'white' }}
                        href={user ? `tel:+91${default_Number}` : null}
                        onClick={showModal}>
                        Call Now
                    </Button>
                </Col>
            </Row>
            <LoginForm visible={notLoggedIn} onClose={() => setnotLoggedIn(false)} />
            <Modal footer={null} centered open={isModalOpen} title='Contacts' onCancel={handleCancel}>
                <Menu className='font-semibold'>
                    {renderNumbers()}
                </Menu>
            </Modal>
        </>
    );
};

export default MultiNumber;
