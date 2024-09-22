import { Badge, Card, Col, Divider, Flex, Row, Space } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Link from 'next/link'
import React from 'react'
import { IoLocation } from 'react-icons/io5'
import { PiSuitcaseSimple } from 'react-icons/pi'

function JobCard({ job, className, brand }) {
  return (
    <Badge.Ribbon className={` px-2 py-1 font-semibold ${job.is_active ? 'visible' : 'invisible'}`} text='Urgent' color='red'>
      <Link href={`/job/Apply?job=${job.id}&company=${job.business_name}&&var=${brand}`}>
        <Card className={className} style={{ borderRadius: "20px" }} hoverable bordered>
          <Row justify='center' gutter={[0, 8]}>
            <Col span={24}>
            </Col>
            <Col span={22}>
              <Paragraph ellipsis={{ rows: 1, expandable: true }}>
                {job.position}
              </Paragraph>
            </Col>
            <Col span={22}>
              <Flex gap={4} align='flex-start'>
                <PiSuitcaseSimple className=' text-blue-500 text-xs sm:text-base' />
                <Paragraph ellipsis={{ rows: 1, expandable: true }} className=' text-gray-700'>{job.experience}</Paragraph>
                <Divider type='vertical' />
                ₹ <Paragraph ellipsis={{ rows: 1, expandable: true }} className=' text-gray-700'>{job.salary}</Paragraph>
              </Flex>
            </Col>
            <Col span={22}>
              <Paragraph ellipsis={{ rows: 1 }}>
                {job.description}
              </Paragraph>
            </Col>
            <Col span={22}>
              <Space direction='horizontal' align='center' size={4}>
                <IoLocation className='text-base text-red-500' /> {job.location}
              </Space>
            </Col>
            <Col span={22}>
              <Flex justify='end' align='end'><p className=' text-gray-600 text-xs'>{job.created_date}</p></Flex>
            </Col>
          </Row>
        </Card>
      </Link>
    </Badge.Ribbon>
  )
}
export default JobCard