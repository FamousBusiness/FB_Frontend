"use client";
import { Col, Flex, Row, Typography } from 'antd'
import React from 'react'
const { Text, Paragraph, Title } = Typography
function Page() {
  return (
    <div className=' p-6 dark:text-black'>
      <Row justify='center' gutter={[0, 24]}>
        <Col >
          <Title level={3}>
            Contact Us
          </Title>
        </Col>
        <Col span={20}>
        </Col>
        <Col span={20}>
          <Row justify='center' gutter={[0, 28]}>
            <Col span={24} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className=' bg-white border rounded-md border-1 h-min  p-8 '>
              <Row justify='space-between' align='middle' gutter={[0, 6]}>
                <Col span={24}>
                  <p className=' text-xl font-sans font-semibold text-gray-700'>Get a quick solution to all your queries.</p>
                </Col>
                <Col sm={22} xs={22} xxl={6} lg={6} xl={6}>
                  <Flex gap={5} vertical>
                    <Title level={4}>Customer Service No.</Title>
                    <Title level={5} >+919883835373</Title>
                  </Flex>
                </Col>
                <Col sm={22} xs={22} xxl={6} lg={6} xl={6}>
                  <Flex gap={5} vertical>
                    {/* <p>Help</p> */}
                    <p></p>
                  </Flex>
                </Col>
                <Col sm={22} xs={22} xxl={6} lg={6} xl={6}>
                  <Flex gap={5} vertical>
                    <Title level={4}>Write to us</Title>
                    <Title level={5}>customercare@famousbusiness.in</Title>
                  </Flex>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className=' bg-white border rounded-md border-1 h-min p-8'>
                <Row justify='space-between'>
                  <Col sm={24} xs={24} xxl={24} xl={10} lg={10}>
                    <Title level={4}>Registered Office</Title>
                    <div className=' text-gray-700 mt-2 text-lg'>
                      <p>Webzotica Business Famous Software Private Limited.</p>
                      <p>545 Sector 58, Transport nagar, Ballabgarh,</p>
                      <p>Faridabad - 121004 , India</p>
                      <p>CIN : U63112HR2023PTC116103</p>
                      {/* 91 - 11 - 46710500 */}
                    </div>
                  </Col>
                  <Col sm={24} xs={24} xxl={24} xl={10} lg={10}>
                    <Title level={4}>Corporate Office</Title>
                    <div className=' text-gray-700 mt-2 text-lg'>
                      <p> Webzotica Business Famous Software Private Limited.</p>
                      <p>545 Sector 58, Transport nagar, Ballabgarh,</p>
                      <p>Faridabad - 121004 , India</p>
                      <p>CIN : U63112HR2023PTC116103</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default Page