import { Col, Row } from 'antd'
import React from 'react'
import TabApp from './components/userAgreement'

function Page() {
  return (
    <div className=' p-6'>
      <Row justify='center' gutter={[0, 24]}>
        <Col>
          <p className=' text-2xl font-sans font-semibold'>Terms and Conditions For Buyer</p>
        </Col>
        <Col span={22}>
          <TabApp />
        </Col>
      </Row>
    </div>
  )
}

export default Page