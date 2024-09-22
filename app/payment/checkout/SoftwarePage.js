
import { Col, Row } from 'antd'
import Image from 'next/image'
import { TiTick } from "react-icons/ti";
import React from 'react'
import { adminPhaseDevelopmentPoints, developmentPoints1, finalPhaseDevelopmentPoints, phaseTwoDevelopmentPoints } from '@/data/data';
import StepsCard from './Components/StepCards';


function SoftwarePage({ data }) {
    return (
        <div className=' h-full dark:text-gray-600 p-8' style={{ background: 'linear-gradient(to bottom, #e8fffc 0%,#fff4f4 100%)', }}>
            <Row gutter={[12, 24]}>
                <Col span={24}>
                    <p className=' text-xl font-black font-serif py-2'>INTRODUCTION</p>
                    <p className=' text-slate-500 text-lg'>Choose our ready-to-launch Android apps and website to elevate your business with cutting-edge technology and user-friendly interfaces. With a diverse range of solutions tailored to your unique needs, our pre-built apps cover various industries, guaranteeing a hassle-free experience with a 100% hosting guarantee. Prioritizing user satisfaction and operational efficiency, we enable you to focus on strategic decisions while we handle the technical intricacies. Embrace the future of business innovation confidently, backed by a reliable hosting infrastructure for uninterrupted service. Don&apos;t miss the opportunity to accelerate your business growth - opt for our turnkey solution for a robust and reliable mobile presence.</p>
                </Col>
                <Col span={24}>
                    <div className=' text-2xl font-black font-serif'>Buy Your Business Software in easy Step</div>
                    <hr className=' mt-3' />
                </Col>
                <Col span={24}>
                    <div>ABOUT THE PROJECT </div>
                </Col>
                <Col span={24}>
                    <div className=' text-2xl font-black'>{data.product_name} Solution</div>
                </Col>
                <Col span={24}>
                    <Image src={data.image_url} loading='lazy' alt="delivery" style={{ objectFit: 'fill', width: 'auto', height: 'auto', float: 'left' }} height={400} width={400} />
                    <div className=' text-slate-500 text-lg'>
                        {data.about}
                    </div>
                </Col>
                <Col span={24}>
                    <hr />
                </Col>
                <Col span={24}>
                    <Row gutter={24} justify='end'>
                        <Col>
                            <div className=' rounded-full border border-1 p-3 shadow-xl'><Image src='/Software/apple.svg' width={50} height={50} alt='apple' /></div>
                        </Col>
                        <Col>
                            <div className=' rounded-full border border-1 p-3 shadow-xl'><Image src='/Software/android.svg' width={50} height={50} alt='apple' /></div>
                        </Col>
                    </Row>

                </Col>

                {/* step 1 */}
                <Col span={24}>
                    <StepsCard description="Idea ,Conceptualization,Design & Planning, Development & Coding, Testing & Debugging, Deployment & Launch,Maintenance & Updates,Analytics & Optimization" title="Development Process" step="1st Step" />
                </Col>



                {/* Customer App */}


                <Col span={24}>
                    <Row gutter={12}>
                        <Col span={22}>

                            <Row justify='end' gutter={[0, 12]}>
                                <Col span={24}>
                                    <div className=' text-gray-500'>
                                        <span>ios,</span><span>android</span>
                                    </div>

                                </Col>
                                <Col span={24}>
                                    <div className=' text-2xl font-extrabold'>Customer App</div>
                                </Col>
                                {/* ALl Feature */}
                                <Col span={23}>


                                    {developmentPoints1.map((item) => {
                                        return (
                                            <Row key={item.id} align='top' gutter={[0, 12]}>


                                                <Col span={2} className=' mt-1' >
                                                    <TiTick className=' bg-gradient-to-tr from-cyan-500  text-xl text-white to-orange-500 p-1 rounded-full' />
                                                </Col>
                                                <Col span={20}><p className=' text-lg text-gray-500 font-semibold'>
                                                    {item.description}
                                                </p></Col>
                                            </Row>

                                        )
                                    })}


                                </Col>
                            </Row>

                        </Col>

                        {/* <Col span={10}>
                            <Image src='/Software/grocery1.png' alt="customer" style={{ objectFit: 'fill' }} height={500} width={200} />
                        </Col> */}
                    </Row>

                </Col>

                {/* Step 2 */}

                <Col span={24}>
                    <StepsCard description="Idea ,Conceptualization,Design & Planning, Development & Coding, Testing & Debugging, Deployment & Launch,Maintenance & Updates,Analytics & Optimization" title="Development Process" step="2nd Step" />
                </Col>
                {/* Step 2 */}

                {/* Admin Panel */}


                <Col span={24}>
                    <Row gutter={12}>
                        <Col span={22}>

                            <Row justify='end' gutter={[0, 12]}>
                                <Col span={24}>
                                    <div className=' text-gray-500'>
                                        <span>web</span>
                                    </div>

                                </Col>
                                <Col span={24}>
                                    <div className=' text-2xl font-extrabold'>Admin Panel</div>
                                </Col>
                                {/* ALl Feature */}
                                <Col span={23}>

                                    {phaseTwoDevelopmentPoints.map((item) => {
                                        return (
                                            <Row key={item.id} align='top' gutter={[0, 12]}>


                                                <Col span={2} >
                                                    <TiTick className=' bg-gradient-to-tr mt-2 from-cyan-500  text-xl text-white to-orange-500 p-1 rounded-full' />
                                                </Col>
                                                <Col span={20} >
                                                    <p className=' text-lg text-gray-500 font-semibold'>
                                                        {item.description}
                                                    </p>
                                                </Col>
                                            </Row>

                                        )
                                    })}


                                </Col>
                            </Row>

                        </Col>

                        {/* <Col span={10}>
                            <Image src='/Software/grocery1.png' alt="customer" style={{ objectFit: 'fill' }} height={600} width={200} />
                        </Col> */}
                    </Row>

                </Col>




                {/* Step 3 */}

                <Col span={24}>
                    <StepsCard description="Idea ,Conceptualization,Design & Planning, Development & Coding, Testing & Debugging, Deployment & Launch,Maintenance & Updates,Analytics & Optimization" title="Testing Phase" step="3rd Step" />
                </Col>
                {/* Step 3 */}

                {/* Website */}


                <Col span={24}>
                    <Row gutter={12}>
                        <Col span={22}>

                            <Row justify='end' gutter={[0, 12]}>
                                <Col span={24}>
                                    <div className=' text-gray-500'>
                                        <span>website</span>
                                    </div>

                                </Col>
                                <Col span={24}>
                                    <div className=' text-2xl font-extrabold'>Admin Panel</div>
                                </Col>
                                {/* ALl Feature */}
                                <Col span={23}>

                                    {adminPhaseDevelopmentPoints.map((item) => {
                                        return (
                                            <Row key={item.id} align='top' gutter={12}>


                                                <Col span={2} className=' mt-1' >
                                                    <TiTick className=' bg-gradient-to-tr from-cyan-500  text-xl text-white to-orange-500 p-1 rounded-full' />
                                                </Col>
                                                <Col span={20}>
                                                    <p className=' text-lg text-gray-500 font-semibold'>
                                                        {item.description}
                                                    </p>
                                                </Col>
                                            </Row>

                                        )
                                    })}


                                </Col>
                            </Row>

                        </Col>

                        {/* <Col span={10}>
                            <Image src='/Software/grocery1.png' alt="customer" style={{ objectFit: 'fill' }} height={600} width={200} />
                        </Col> */}
                    </Row>

                </Col>



                {/* Step 4 */}

                <Col span={24}>
                    <StepsCard title="Deliver" step="Final" />
                </Col>
                {/* Step 4 */}
                {/* <Col span={24} className=' text-lg font-bold'>
                    Order Status
                   
                </Col> */}
                {/* <Col span={24}>
                    <Track />
                </Col> */}

                <Col span={22}>

                    <Row justify='end' gutter={[0, 12]}>

                        <Col span={23}>

                            {finalPhaseDevelopmentPoints.map((item) => {
                                return (
                                    <Row key={item.id} align='top' gutter={12}>


                                        <Col span={2} className=' mt-1' >
                                            <TiTick className=' bg-gradient-to-tr from-cyan-500  text-xl text-white to-orange-500 p-1 rounded-full' />
                                        </Col>
                                        <Col span={20}>
                                            <p className=' text-lg text-gray-500 font-semibold'>
                                                {item.description}
                                            </p>
                                        </Col>
                                    </Row>

                                )
                            })}


                        </Col>
                    </Row>

                </Col>

                <Col span={24}>
                    <StepsCard title="Server Integration" step="Disclaimer" />
                </Col>

            </Row>


        </div>
    )
}

export default SoftwarePage



