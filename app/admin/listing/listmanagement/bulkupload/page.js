"use client";
import FormListing from '@/components/admin/Listing/FormListing'
import { Row, Col } from 'antd'
import React from 'react'

function page() {
  return (
    <div>
     
<Row justify='center'>
<Col span={18}>
          <FormListing />
        </Col>
      </Row>
        
    </div>
  )
}

export default page