import { UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Row } from 'antd'
import React from 'react'

function CompanyDetails() {
    return (
        <Row justify='center'><Col >
            <Avatar icon={<UserOutlined />} size={50} />
        </Col>
            <Col span={22}>
                <div className=' text-center text-green-600 text-sm sm:text-xl drop-shadow-md font-semibold'> Webdesk Private Limited</div>
            </Col>
        </Row>
    )
}

export default CompanyDetails