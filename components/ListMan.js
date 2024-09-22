import { Row, Col, Space, Button, Divider } from 'antd'
import React from 'react'
import ListManage from '../Pages/ListManagement'
import Card1 from './admin/Card'

function ListMan() {
  return (
   <Row gutter={[12,12]}>
       {/* Dashboard/Listing/Listing Management */}
       <Col span={24}>Dashboard/Listing/Listing Management</Col>
            <Col span={6}><Card1 /></Col>
            <Col span={6}><Card1 /></Col>
            <Col span={6}><Card1 /></Col>
            <Col span={24}>
              <ListManage />
            </Col>

            <Col span={20}>

              <Space size={5}>
                <Button size='large'>Text Button</Button>
                <Divider type='vertical' />
                <Button size='large' >Text Button</Button>
                <Divider type='vertical' />
                <Button size='large' >Text Button</Button>
              </Space>

            </Col>
            <Col span={4}>
              <Button size='large'>Bulk upload Listing</Button>
            </Col>
    </Row>
  )
}

export default ListMan