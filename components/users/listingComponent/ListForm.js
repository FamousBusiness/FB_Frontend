import { Col, Form, Row, Input, Button,Select } from 'antd'
import React from 'react'
import { MdAdd } from 'react-icons/md'

function ListForm() {
  return (
    <div>  <Row justify='center' className=' my-2'>
    <Col span={22} className=' text-base font-semibold'>
        10 Crore Customers Are Waiting Your Business!
    </Col>

</Row>

<Form>
    <Row justify='center' gutter={8} >
        <Col span={22}><Form.Item name='business_name'>
            <Input size='large' className=' w-full ' placeholder=' Business Name' />
        </Form.Item></Col>
        <Col span={14}><Form.Item name='category'>
            <Select size='large' className=' w-full ' placeholder=' Select Category ' />
        </Form.Item></Col>
        <Col span={8}>
            <Button type='default' size='large' className=' w-full ' style={{ color: 'blue' }} icon={<MdAdd className=' text-lg' />} >Add</Button>
        </Col>
        <Col span={22}><Form.Item name='mobile_number'
            className=' w-full'>
            <Input size='large' className=' w-full' placeholder=' Mobile Number' />
        </Form.Item></Col>
        <Col span={11}><Form.Item name='pincode'>
            <Input type='number' size='large' className=' w-full' placeholder='Pincode' />
        </Form.Item></Col>
        <Col span={11}><Form.Item name='city'>
            <Input size='large' className=' w-full' placeholder='City' />
        </Form.Item></Col>

        <Col span={22}><Form.Item name='whatsapp'>
            <Input size='large' type='tel' className=' w-full' placeholder='Whatsapp' />
        </Form.Item></Col>

        <Col span={22}><Form.Item name='email'
        >
            <Input size='large' type='email' className=' w-full' placeholder='E-mail' />
        </Form.Item></Col>
        <Col span={22}><Form.Item name='website'>
            <Input size='large' type='url' className=' w-full' placeholder='Website' />
        </Form.Item></Col>
        <Col span={22}><Form.Item name='gst_no'>
            <Input size='large'  className=' w-full' placeholder='GST Number' />
        </Form.Item></Col>
      
    </Row>
</Form></div>
  )
}

export default ListForm