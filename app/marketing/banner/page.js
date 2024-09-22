import { Col, Row } from 'antd'
import React from 'react'

function Page() {
    const array = [1, 2, 3];
    return (
        <div>
            <Row justify='center' gutter={[12, 12]}>
                <Col lg={4} xl={4} xxl={4} md={8} sm={8} xs={8}>
                    <div className=' text-center p-2 text-blue-500 lg:text-xl xl:text-lg  2xl:text-lg md:text-base sm:text-sm font-semibold rounded-lg shadow-xl bg-slate-200 w-full xl:h-28 2xl:h-28 h-20 sm:h-24 md:h-24 lg:h-28'>Total Banner</div>
                </Col>
                <Col lg={4} xl={4} xxl={4} md={8} sm={8} xs={8}>
                    <div className=' text-center p-2 text-blue-500 lg:text-xl xl:text-lg  2xl:text-lg md:text-base sm:text-sm font-semibold rounded-lg shadow-xl bg-slate-200 w-full xl:h-28 2xl:h-28 h-20 sm:h-24 md:h-24 lg:h-28'>Ongoing Banner</div>
                </Col>
                <Col lg={4} xl={4} xxl={4} md={8} sm={8} xs={8}>
                    <div className=' text-center p-2 text-blue-500 lg:text-xl xl:text-lg  2xl:text-lg md:text-base sm:text-sm font-semibold rounded-lg shadow-xl bg-slate-200 w-full xl:h-28 2xl:h-28 h-20 sm:h-24 md:h-24 lg:h-28'>In Review</div>
                </Col>
                {array.map((index) =>
                    <>
                        <Col lg={0} xl={0} xxl={0} md={23} sm={23} xs={23} className=' rounded-md shadow-md relative h-28 bg-gray-300 '>
                            <div className=' absolute  bg-orange-300 px-2 rounded-lg top-2 right-2 text-black font-medium'>Status</div>
                            <div className=' static top-1/2 right-2'>time</div>
                        </Col>
                        <Col lg={8} xl={8} xxl={8} md={0} sm={0} xs={0}>

                        </Col>
                    </>

                )}
            </Row>
        </div>
    )
}

export default Page