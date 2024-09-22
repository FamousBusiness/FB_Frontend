"use client";
import { Button, Col, Divider, Drawer, Flex, Result, Row, Skeleton } from 'antd';
import React, { useState } from 'react';
import CheckoutForm from './components/CheckoutForm';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
const fetcher = (url) => fetch(url).then((res) => res.json());

function Page() {
    const search = useSearchParams();
    const [open, setOpen] = useState(false);
    const just = search.get('q');
    const id = parseInt(just);
    const { data, error } = useSWR(`https://api.famousbusiness.in/lead-api/individual-combo-lead/${id}/`, fetcher);

    if (error) {
        // Display an error message or UI using Ant Design Result component for status 500
        return <Result status="500" title="500" subTitle="Sorry, something went wrong." />;
    }

    return (
        <div className='relative'>
            <Row className='relative' gutter={[0, 12]}>
                <Col lg={16} xxl={16} md={16} sm={24} xs={24} xl={16} className=' bg-white'>
                    <Row justify='center' gutter={[0, 12]} align='top'>
                        <Col lg={8} xxl={8} md={8} sm={22} xs={22} xl={8}>
                            <Image src='/leads/reallead.svg' loading='lazy' alt="lead" height={300} width={300} />
                        </Col>
                        <Col lg={16} xxl={16} md={16} sm={22} xs={22} xl={16}>
                            <div className=' text-slate-500 text-lg mt-10'>
                                <p className=' text-lg font-bold text-gray-900'>Famous Business- Key Points of Our Lead Generation Service</p>
                                <p>At Famous Business, we understand the crucial role lead generation plays in the success of your business. Our in-house marketing and social media marketing services are meticulously crafted to elevate your brand and generate high-quality leads that convert into loyal customers. We don&apos;t just promise results; we guarantee them, with a commitment so strong that if we don&apos;t deliver, your payment is returned.</p>
                            </div>
                        </Col>
                        <Col span={22}>
                            <p className='text-lg font-medium bg-green-300 w-fit p-2 rounded-r-xl'>How It Works</p>
                            <div className=' text-slate-500 text-lg space-y-4 mt-3'>
                                <div><b>1.	Select the Business Category:</b>
                                    <p>Business Growth Strategy: Choose your specific business category to maximize customer targeting.</p>
                                    <p>Targeted Audience: Select the category where you desire to attract customers before placing your order.</p>
                                    <p>Increased Visibility: Enhance your brand&apos;s visibility by targeting the right audience effectively.</p>
                                </div>

                                <p><b>2.	Select the city:</b> Choose Your City, Get Targeted Leads! Select one or multiple cities to generate quality leads. Maximize outreach by pinpointing specific cities for your business. Expand your customer base strategically. Don&apos;t miss out on potential leads</p>

                                <p><b>3.	Targeted your Audience:</b> Our export team identifies the type of audience interested in your products or services through data and market research. This enables you to concentrate your efforts on reaching the right people, including those within specific demographics, industries, or particular groups.</p>
                                <p><b>4.    Value-Packed Content:</b> Our tailored ad strategy offers rich insights, empowering potential leads with valuable information they seek.</p>
                                <p><b>5.	Marketing:</b> Employing a variety of marketing channels, such as social media, email marketing, content marketing, and search engine optimization (SEO), to reach potential leads through different platforms.</p>
                                <p><b>6.    Delivery of Leads:</b> Boost your business effortlessly! We deliver leads or customers every day, 365 days a year - no exceptions. Our Service Level Agreement guarantees results. Plus, we hand you your buying customers every month like clockwork. Simple, reliable, and ready to supercharge your success. Join us for a smoother ride to growth.</p>
                                <p><b>7.	Real-Time Lead Alerts:</b> Providing real-time notifications to sales teams when a lead takes a specific action, allowing for prompt follow-up and increased chances of conversion.</p>
                            </div>
                            <Divider />
                            <div className=' text-slate-500 text-lg space-y-4 mt-3'>
                                <b>Our Bold Guarantee:</b> At Famous Business Share, we are so confident in our ability to deliver results that we offer a 100% guarantee. If our lead generation service doesn&apos;t meet your expectations, we will return your payment. Our commitment to your success is not just a promise; it&apos;s a commitment backed by action.
                                <p>Ready to take your business to new heights? Partner with Famous Business Share for lead generation services that don&apos;t just generate leads but also guarantee results. Your success is our priority.</p>
                            </div>
                            <Divider />
                        </Col>
                    </Row>
                </Col>
                <Col lg={8} xxl={8} md={8} sm={0} xs={0} xl={8} className='relative'>
                    <div className='p-8 sticky top-10'>
                        <CheckoutForm data={data} />
                    </div>
                </Col>
            </Row>
            <div className='sm:invisible fixed w-full p-3 z-50 bg-slate-100 bottom-0 left-0'>
                <Button size='large' type='primary' block onClick={() => setOpen(true)}>Order</Button>
            </div>
            <Drawer open={open} onClose={() => setOpen(false)} height="60%" placement='bottom'>
                <CheckoutForm data={data} />
            </Drawer>
        </div>
    );
}

export default Page;
