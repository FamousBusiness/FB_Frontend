"use client";
import RegistrationForm from '@/components/admin/AuthenticationAdmin/RegisterForm';
import { Row, Col } from 'antd'
import React from 'react'

function page() {
    return (
        <Row justify='center' >
            <Col span={24}>
                <Row justify='center' align='middle'>
                    <Col span={10}>
                        <RegistrationForm />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default page