import React from 'react'
import { Row, Col, Button } from 'antd'
import { FaGlobe } from 'react-icons/fa'
import Mail from '../Filter/Mail'
import MultiNumber from '../Filter/MultiNumber'
import Whatsapp from '../Filter/Whatsapp'
import { IoMdShareAlt } from 'react-icons/io'

function ProfileButtons({ email, numbers, websiteUrl, whatsapp_number, number, handleShareClick }) {
  return (
    <Row justify='space-around' gutter={[12, 12]}>
      <Col span={4}>
        <MultiNumber default_Number={number} mobileNumbers={numbers} />
      </Col>
      <Col span={4}>
        {/* <div className=' shadow-lg drop-shadow-lg rounded-lg'> */}
        <Mail email={email} />
        {/* </div> */}
      </Col>
      <Col span={4}>
        {/* <div className=' shadow-lg drop-shadow-lg rounded-lg'> */}
        <Whatsapp whatsapp_number={whatsapp_number} />
        {/* </div> */}
      </Col>
      <Col span={4}>
        {/* <div className=' shadow-lg drop-shadow-lg rounded-lg'> */}
        <Button size='large' target='_blank' style={{ background: 'darkorange', color: 'white', fontWeight: 'bold', fontFamily: 'serif' }} href={websiteUrl} icon={<FaGlobe />} className=' w-full' >Website</Button>
        {/* </div> */}
      </Col>
      <Col span={4}>
        {/* <div className=' shadow-lg drop-shadow-lg rounded-lg'> */}
        <Button type='primary' onClick={handleShareClick} size='large' target='_blank' style={{ fontWeight: 'bold', fontFamily: 'serif', background: 'greenyellow', color: 'black' }} href={websiteUrl} icon={<IoMdShareAlt />} className=' w-full ' >Share</Button>
        {/* </div> */}
      </Col>
    </Row>
  )
}

export default ProfileButtons