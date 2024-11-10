import { Badge, Checkbox, Col, Row } from 'antd'
import React from 'react'




function PaymentStep({ }) {
    return (
        <Badge.Ribbon text='1st Payment' color='orange' style={{ padding: '10px 20px' }} className='text-lg font-bold'>
            <div className=' w-full border border-1 py-12 px-8 bg-green-600 rounded-md h-full'>
                <Row align='top' justify='center' gutter={[12, 24]}>
                    {/* <Col>FEATURES OF FRUITS & VEGETABLES DELIVERY APPLICATION</Col> */}
                    <Col span={1}>
                        <Checkbox />
                    </Col>
                    <Col span={23}>
                        <div className=' text-2xl font-semibold flex flex-row text-white text-center items-center'>
                            Pay only INR ₹ 30000 first payment
                            For Book your Software Development Process
                        </div>
                    </Col>
                    <Col span={24}><hr />
                    </Col>
                    <Col span={23}>
                        <div className=' text-white text-base text-center font-semibold '>
                            Your payment is 100% Secure & Safe. 100% Delivery Guarantee within Timeline.
                        </div>
                    </Col>
                </Row>


            </div>
        </Badge.Ribbon>
    )
}

export default PaymentStep