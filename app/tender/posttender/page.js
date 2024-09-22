import FormTender from '@/components/users/Tender/FormTender'
import { Col, Row } from 'antd'
import React from 'react'

function Page() {
  return (
    <div>
      <Row justify='center' >
        <Col span={24}>
          <div className=' border border-1 h-32'>

          </div>
        </Col>
        <Col span={20}>
          <FormTender color='#E4F1FF' />
        </Col>
      </Row>
    </div>
  )
}

export default Page