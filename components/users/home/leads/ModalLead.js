"use client";
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Space, Badge, Progress, Flex, message, Result, Typography, notification } from 'antd';
// import { EyeFilled, MailFilled, PhoneFilled } from '@ant-design/icons';
// import { Player } from '@lottiefiles/react-lottie-player';
// import { BiSolidUser } from 'react-icons/bi';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';
import { useAuth } from '@/context/AuthContext';
import Axios from "axios";
import moment from 'moment';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { AuthLeads } from '@/services/Admin/Leads';
import LoginForm from '@/utils/LandingPageModel';
// import PayNowModal from './PayNowModal';
import Paragraph from 'antd/es/typography/Paragraph';
import { Avatar } from 'antd';
// import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button as JoyButton } from '@mui/joy';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GoogleAD from '@/app/leads/Components/GoogleAd';
import { useTheme, useMediaQuery } from '@mui/material';

const { Text } = Typography


const ModalLead = ({ item, icon, color, title, limit, indivisual }) => {
    const theme = useTheme()
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { authTokens, user, userdata } = useAuth()
    const router = useRouter()
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [amount, setAmount] = useState(item.price?.price);
    const [leadId, setLeadId] = useState(item.id);
    const [data, setData] = useState(null);
    const formattedDate = moment(item.created_at).format('YYYY-MM-DD hh:mm:ss A');
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [checkout, setCheckOut] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');

    const remain = Math.max(3 - item.views, 0);

    const offer = (amount / 10) + amount;


    ///// Redirect to Whatsapp and Mobile number
    const handleButtonRedirect = (name, value)=> {
        if (name === 'phone') {
            router.push(`tel:${value}`)
        } else if (name === 'whatsapp') {
            router.push(``)
        } else if (name === 'email') {
            router.push(`mailto:${value}`)
        }
    };


    ///// Show Lead Data
    const showModal = async () => {

        if (item.status !== 'expired') {
            if (authTokens) {

                try {
                    const res = await AuthLeads(indivisual === true ? { individual_lead_id: leadId } : { lead: leadId });

                    if (res.data) {
                        setData(res.data);
                        setOpen(true); // Show lead modal
                    } else {
                        // showRazorpay()
                        setCheckOut(true);
                    }
                } catch (error) {

                    if (error.message === 'No Available Premium Plan balance to view the lead Please Purchase') {
                        window.location.href = '/plan/'
                    } else if (error.message === 'You can not view this category lead has to purchase the lead') {
                        notification.info({
                            message: 'Can not view Lead other than your category',
                            placement: 'topRight',
                            duration: 3000,
                        })
                    }
                }

            } else {
                setNotLoggedIn(true); // Show login form modal
            }
        }
    };

    const handleCancel = () => {
        // console.log('Clicked cancel button');
        setOpen(false);
    };


    const handlePaymentSuccess = async (response) => {
        try {
            let bodyData = new FormData();
            bodyData.append("provider_order_id", response.razorpay_order_id)
            bodyData.append("payment_id", response.razorpay_payment_id);
            bodyData.append("signature_id", response.razorpay_signature);
            bodyData.append("lead_id", item.id);
            await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/lead-api/lead-payment-complete/`, bodyData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${Cookies.get("accessToken")}`
                },
            })
                .then((res) => {
                    console.log("Everything is OK!");
                    setLeadId("");
                    setAmount("");
                })
                .catch((err) => {
                    // console.log(err);
                });
        } catch (error) {
            // console.error(error);
        }
    };

    const loadScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
            script.onload = resolve;
            document.body.appendChild(script);
        });
    };


    // Lead Payemnt method
    const showRazorpay = async () => {
        // await loadScript();
        let bodyData = new FormData();
        bodyData.append("amount", amount);
        bodyData.append("lead_id", leadId);

        try {

            setCheckOut(false);
                const { data } = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/lead-api/lead-payment/`, bodyData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`
                },
            });

            const redirect = data.payment_response.redirect_url;
            router.push(redirect)

        }
        catch (error) {
            console.error(error);
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

 


    return (
        <>
            <Row>
                <Col sm={24} xs={24} md={24} xl={24} lg={24} xxl={24}>
                    <Badge.Ribbon color={item.status === 'High Priority' ? 'blue' : 'green'} className={` py-2 font-bold`} text={item.status === 'High Priority' ? 'Open' : item.status || 'Open'}>
                        
                        <div className={`cursor-pointer bg-white shadow-xl ${item.status === 'expired' && 'grayscale'} flex flex-col relative overflow-hidden rounded-2xl border border-1 p-3 justify-around h-full w-full`}>
                            <div className=' bg-[linear-gradient(to_right,theme(colors.yellow.400),theme(colors.yellow.100),theme(colors.amber.400),theme(colors.fuchsia.200),theme(colors.yellow.400),theme(colors.yellow.100),theme(colors.yellow.400))] bg-[length:200%_auto] animate-gradient absolute rounded-tl-lg  font-bold w-10/12 left-0 top-0 py-2 flex flex-row space-x-1 rounded-br-full px-2 text-start text-black items-center '><FaLocationDot />
                                <div>
                                    {item.city || ''} {item.state || ''}
                                </div>
                            </div>
                            <div className=' absolute z-10 right-0 top-8 '>
                                {/* {item.status === 'High Priority' &&
                                    <Image src='/leads/Premium.svg' width={100} height={100} alt='' />
                                } */}
                            </div>
                            {/* {item.status === 'high Priority' ? null : <div className=' py-1 absolute top-0 right-0 px-2 dark:text-red-600 text-xs font-semibold'>{`${item.status}`}</div>} */}

                            <Row justify='start' gutter={[12, 12]} className=' text-sm mt-8 font-bold' >
                                <Col span={24} onClick={showModal}>
                                    <Row gutter={[10, 10]} align='middle'>
                                        <Col span={24}>
                                            <div style={{display:'flex', justifyContent:'flex-start'}}>
                                                <div style={{marginTop:2}}>
                                                    <AccountCircleIcon sx={{fontSize:'35px'}} color='primary'/>
                                                </div>

                                                <p className="text-lg font-semibold" style={{marginLeft:5, marginTop:2}}>
                                                    {item?.created_by || 'Customer Details'}
                                                </p>
                                            </div>
                                        </Col>

                                        <Col span={24}>
                                            <Flex vertical gap={1}>
                                                <p className=' text-base font-medium' >Requirement</p>
                                                <Paragraph ellipsis={{ rows: 2 }} style={{ lineHeight: '16px', fontSize: '16px', fontWeight: 'lighter' }}>
                                                    {item.requirement}
                                                </Paragraph>
                                                {/* <p className=' text-base font-light text-red'>Pin Code: {item.pincode || ''}</p> */}
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col span={24}>
                                    <Progress strokeColor='green' percent={100} showInfo={false} />
                                    {/* <Flex align='baseline' justify='space-between'>
                                        <p className=' text-sm font-light italic' >left: {remain}</p>
                                        <p className=' text-sm font-light italic' >total: 2</p>
                                    </Flex> */}

                                    <Row justify='center' align='middle' className=' mt-2'>
                                        <Col span={10} >
                                            <div onClick={(e) => stopPropagation(e)} className=' w-full'>
                                                <Button block style={{ background: '#3c89d0', color: 'white' }} onClick={!user ? () => router.push('/login') : () => showModal()} color='orange' className='font-bold'>
                                                    View
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span={24}>
                                    <Row align='bottom' justify='space-between'>
                                        <Col className=" font-light">
                                            <Text type='secondary'>{formattedDate}</Text>
                                            {/* <Text type='secondary'>Pending task</Text> */}
                                        </Col>
                                        <Col>
                                            {/* <Flex gap={3}> */}
                                                {/* <EyeFilled /> */}
                                                {/* <Text type='secondary'>{item.views}</Text>
                                            </Flex> */}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Badge.Ribbon>
                </Col>
            </Row>
            <LoginForm visible={notLoggedIn} onClose={() => setNotLoggedIn(false)} />


            <Modal
                centered="false"
                open={open}
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                title={"Customer Details"}
            >

                {data && <Row justify='center'  gutter={[12, 8]}>
                    
                    <Col span={24}>
                        <Space size={10} align='center' direction='horizontal' style={{display:'flex', justifyContent: 'center'}}>
                            <Avatar
                                style={{
                                backgroundColor: '#f56a00',
                                verticalAlign: 'middle',
                                }}
                                size={64}
                                gap={2}
                            >
                               <b style={{fontSize:'30px'}}>{data.created_by ? data.created_by[0]: 'U'}</b>
                            </Avatar>
                        </Space>
                    </Col>

                    <Col span={24}>
                        <Space size={10} align='center' direction='horizontal' style={{display:'flex', justifyContent:'center'}}>

                            {/* <BiSolidUser className=' text-lg' /> */}
                            <Link target='_blank' href={`https://famousbusiness.in/userprofile/${data.created_by}?z_id=${data.business_page}`} className=' text-xl py-2 font-semibold '>
                            {data.created_by}
                            </Link>
                        </Space>
                    </Col>

                    <Col span={24}>
                        <div className=' text-xl py-2 font-semibold '>Requirement:</div>
                        <div className=' p-1 border border-1 rounded-lg' style={{marginBottom:6}}>{data.requirement}</div>
                    </Col>

                    <Col span={24}>
                        <Row gutter={[12, 12]}>
                            <Col span={24}>
                                <div style={{display:'flex', justifyContent:'space-between'}}>

                                    <JoyButton
                                        startDecorator={<LocalPhoneIcon />} 
                                        color="success" 
                                        onClick={()=> {handleButtonRedirect('phone', data?.mobile_number); setMobileNumber(data?.mobile_number)}}>
                                        {isSmDown ? (mobileNumber ? mobileNumber : '') : (mobileNumber ? mobileNumber : 'Call Now')}
                                    </JoyButton>

                                    <JoyButton 
                                        startDecorator={<WhatsAppIcon />} 
                                        sx={{backgroundColor:'#Ffa500', color:'white'}} 
                                        onClick={()=> router.push(`https://wa.me/${data?.mobile_number}`)}>
                                        {!isSmDown && 'Whatsapp'}
                                    </JoyButton>

                                    {/* <JoyButton  startDecorator={<EmailIcon />} onClick={()=> router.push(`mailto:${data?.email}`)}>
                                        Email
                                    </JoyButton> */}
                               </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row gutter={[12, 12]}>
                            <GoogleAD />
                        </Row>
                    </Col>
                    
                    {/* <Col span={24}>
                        <Row gutter={[12, 12]}>
                            <Col span={24}>
                                <Space size={10} direction='horizontal' ><PhoneFilled /><Link href={`tel:${data?.mobile_number}`}>{data?.mobile_number}</Link></Space>
                            </Col>

                            <Col span={24}>
                                <Space size={10} direction='horizontal'  ><MailFilled /><Link href={`mailto:${data?.email}`}>{data?.email}</Link></Space>
                            </Col>
                        </Row>
                    </Col> */}
                    
                </Row>}
            </Modal>
            {/* <PayNowModal open={checkout} handleShow={showRazorpay} onClose={() => setCheckOut(false)} amount={amount} /> */}
        </>
    )
};



export default ModalLead;
