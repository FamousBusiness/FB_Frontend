"use client"
import React, { useRef, useState } from 'react'
import { Button, Card, Col, Divider, Flex, Modal, Result, Row, Skeleton, Space } from 'antd'
import ProfileCard from './Components/ProfileCard'
import Quicklink from './Components/Quicklinks'
import ResumeUpload from './Components/Upload'
import ResumeSec from './Components/ResumeSec'
import SkillSec from './Components/SkillSec'
import EducationSec from './Components/EducationSec'
import EmploymentSec from './Components/EmploymentSec'
function Page() {
  const [open, setOpen] = useState(false)
  // const [loading, setLoading] = useState(false)
  const resumeUpdateRef = useRef(null);
  // const resumeHeadlineRef = useRef(null);
  const keySkillsRef = useRef(null);
  const employmentAddRef = useRef(null);
  const educationAddRef = useRef(null);
  const itSkillsAddRef = useRef(null);
  // const projectsAddRef = useRef(null);
  // const profileSummaryAddRef = useRef(null);
  // const accomplishmentsRef = useRef(null);
  // const careerProfileRef = useRef(null);
  const personalDetailsRef = useRef(null);
  // console.log("from",data);

  const handleClick = (key) => {
    switch (key) {
      case 'resumeUpdate':
        resumeUpdateRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      // case 'resumeHeadline':
      //   resumeHeadlineRef.current?.scrollIntoView({ behavior: 'smooth' });
      //   break;
      case 'keySkills':
        keySkillsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'addEmployment':
        employmentAddRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'addEducation':
        educationAddRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      // case 'addITSkills':
      //   itSkillsAddRef.current?.scrollIntoView({ behavior: 'smooth' });
      //   break;
      // case 'addProjects':
      //   projectsAddRef.current?.scrollIntoView({ behavior: 'smooth' });
      //   break;
      // case 'addProfileSummary':
      //   profileSummaryAddRef.current?.scrollIntoView({ behavior: 'smooth' });
      //   break;
      // case 'accomplishments':
      //   accomplishmentsRef.current?.scrollIntoView({ behavior: 'smooth' });
      //   break;
      // case 'careerProfile':
      //   careerProfileRef.current?.scrollIntoView({ behavior: 'smooth' });
      //   break;
      case 'personalDetails':
        personalDetailsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
    console.log('Clicked: ', key);
    // You can add logic to navigate or perform actions based on the clicked menu item
  };

  return (<>
    <div className=' p-2 sm:p-10 dark:text-gray-800 bg-stone-100 '>
      <Row justify='center' gutter={[0, 16]}>
        <Col lg={18} xxl={18} md={18} sm={23} xs={23} xl={18}>
          <ProfileCard />
        </Col>
        <Col lg={18} xxl={18} md={18} sm={23} xs={23} xl={18}>
          <div className=' relative'>
            <Row justify='space-between' align='top' gutter={16}>
              <Col lg={5} xxl={5} md={5} sm={0} xs={0} xl={5}>
                <Quicklink handleClick={handleClick} />
              </Col>
              <Col md={19} lg={19} xxl={19} sm={24} xs={24} xl={19}>
                <Row align='middle' gutter={[0, 16]}>

                  {/* Resume Section */}
                  <Col ref={resumeUpdateRef} span={24}>
                    <ResumeSec />
                  </Col>
                  {/* Resume Section */}

                  {/* <Col ref={resumeHeadlineRef} span={24}>
                    <Card className=' w-full  shadow-xl'>
                      <Space direction='horizontal' size={5}> <span className=' text-lg font-semibold'>Resume Headlines </span><EditOutlined className=' text-xl hover:text-2xl duration-100' /></Space>
                    </Card>
                  </Col> */}

                  <Col ref={keySkillsRef} span={24}>
                    <SkillSec />
                  </Col>
                  <Col ref={employmentAddRef} span={24}>
                    <EmploymentSec />
                  </Col>
                  <Col ref={educationAddRef} span={24}>
                    <EducationSec />
                  </Col>

                  {/* IT skills */}
                  {/* <Col ref={itSkillsAddRef} span={24}>
                    <Card className=' w-full h-32 shadow-xl'>
                      <Flex justify='space-between' > <span className=' text-lg font-semibold'>IT Skills</span> <Button onClick={() => setOpen(true)} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add details</Button></Flex>
                    </Card>
                  </Col> */}
                  {/* IT skills */}

                  {/* <Col ref={projectsAddRef} span={24}>
                    <Card className=' w-full h-32 shadow-xl'>
                      <Flex justify='space-between' > <span className=' text-lg font-semibold'>Projects</span> <Button onClick={() => setOpen(true)} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add project</Button></Flex>
                    </Card>
                  </Col>
                  <Col ref={profileSummaryAddRef} span={24}>
                    <Card className=' w-full h-32 shadow-xl'>
                      <Flex justify='space-between' > <span className=' text-lg font-semibold'>Profile summary</span> <Button onClick={() => setOpen(true)} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add profile summary</Button></Flex>
                    </Card>
                  </Col> */}


                  {/* Accomplishments */}
                  {/* <Col span={24}>
                    <Card className=' w-full shadow-xl'>
                      <p className=' text-lg font-semibold mb-6'>Accomplishments</p>
                      <Row gutter={[0, 0]}>
                        <Col span={24}><Flex justify='space-between' > <span className=' text-lg font-semibold'>Profile summary</span> <Button onClick={() => setOpen(true)} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add</Button></Flex></Col>
                        <Col span={24}><Divider /></Col>
                        <Col span={24}><Flex justify='space-between' > <span className=' text-lg font-semibold'>Profile summary</span> <Button onClick={() => setOpen(true)} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add</Button></Flex></Col>
                        <Col span={24}><Divider /></Col>
                        <Col span={24}><Flex justify='space-between' > <span className=' text-lg font-semibold'>Profile summary</span> <Button onClick={() => setOpen(true)} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add</Button></Flex></Col>
                        <Col span={24}><Divider /></Col>
                        <Col span={24}><Flex justify='space-between' > <span className=' text-lg font-semibold'>Profile summary</span> <Button onClick={() => setOpen(true)} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add</Button></Flex></Col>
                        <Col span={24}><Divider /></Col>
                        <Col span={24}><Flex justify='space-between' > <span className=' text-lg font-semibold'>Profile summary</span> <Button onClick={() => setOpen(true)} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add</Button></Flex></Col>
                        <Col span={24}><Divider /></Col>
                        <Col span={24}><Flex justify='space-between' > <span className=' text-lg font-semibold'>Profile summary</span> <Button onClick={() => setOpen(true)} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add</Button></Flex></Col>
                      </Row>
                    </Card>
                  </Col> */}

                  {/* Accomplishments */}
                  {/* <Col ref={personalDetailsRef} span={24}> */}
                  {/* <Card className=' w-full shadow-xl'>
                      <Flex gap={6} align='center'> <p className=' text-lg font-semibold'>Personal Details</p> <EditOutlined className=' text-xl hover:text-2xl duration-100' /> </Flex>
                      <Row justify='space-between' className=' mt-6'>
                        <Col span={11}>
                          <Flex vertical gap={8}>
                            <Space direction='vertical' size={6}>
                              <p className=' text-base text-gray-600'>Personal</p>
                              <p className=' text-lg font-semibold'></p>
                            </Space>
                            <Space direction='vertical' size={6}>
                              <p className=' text-base text-gray-600'>Date of birth</p>
                              <p className=' text-lg font-semibold'>Date of birth</p>

                            </Space>
                            <Space direction='vertical' size={6}>
                              <p className=' text-base text-gray-600'>Address</p>
                              <p className=' text-lg font-semibold'></p>
                            </Space>
                          </Flex>
                        </Col>
                        <Col span={11}>
                          <Flex vertical gap={8}>
                            <Space direction='vertical' size={6}>
                              <p className=' text-base text-gray-600'>Email</p>
                              <p className=' text-lg font-semibold'></p>
                            </Space>
                            <Space direction='vertical' size={6}>
                              <p className=' text-base text-gray-600'>Career break</p>
                              <p className=' text-lg font-semibold'>Career break</p>
                            </Space>
                            <Space direction='vertical' size={6}>
                              <p className=' text-base text-gray-600'>Languages</p>
                              <p className=' text-lg font-semibold'>Languages</p>
                            </Space>
                          </Flex>
                        </Col>
                      </Row>
                    </Card>
                  </Col> */}
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  </>
  );
};

export default Page