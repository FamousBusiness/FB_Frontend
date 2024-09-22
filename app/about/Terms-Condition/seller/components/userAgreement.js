"use client"
import React, { useState } from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import Agreement from './Agreement';
import FruadWarning from '../../buyer/components/FruadWarning';
import AgreementBuyer from '../../buyer/components/Agreement';
import TermsOfUse from '@/app/about/component/TermsOfUse';
const tabList = [
    {
        label: <p className=' text-xl font-semibold border border-1 px-2 py-1 bg-lime-600 text-white rounded-md'>Terms of Use</p>,
        key: 1,
        children:<TermsOfUse/>,
    },
    {
        label: <p className=' text-xl font-semibold border border-1 px-2 py-1 bg-lime-600 text-white rounded-md'>Terms & Conditions Seller</p>,
        key: 2,
        children: <Agreement />,
    },
    {
        label: <p className=' text-xl font-semibold border border-1 px-2 py-1 bg-lime-600 text-white rounded-md'>Terms & Conditions Buyer</p>,
        key: 3,
        children: <AgreementBuyer />,
    },
    {
        label: <p className=' text-xl font-semibold  border border-1 px-2 py-1 bg-yellow-400 text-white rounded-md'>Fraud Warning</p>,
        key: 4,
        children: <FruadWarning />,
    },
];

const TabApp = () => {
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div className=' dark:text-black'>
            <Row justify='center'>
                <Col sm={0} xs={0} md={0} xl={24} xxl={24} lg={24}>
                    <Card
                        style={{
                            // width: '100%',
                            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                        }}
                    // title="Card title"


                    >

                        <Tabs
                            onChange={onChange}
                            tabPosition='top'
                            centered
                            type='line'
                            // centered={true}
                            items={tabList}
                        />
                    </Card>


                </Col>
                <Col sm={24} xs={24} md={24} xl={0} xxl={0} lg={0}>
                    <Row justify='center' align='middle' gutter={[0, 24]}>
                        <Col span={24}>
                            <p className=' text-lg font-semibold px-2 py-1'>USER AGREEMENT</p>
                            <hr className=' py-2'/>
                        </Col>
                        <Col span={24}>
                            <Agreement />
                        </Col>
                        <Col span={24}>
                            <p className=' text-lg font-semibold px-2 py-1'>FRAUD WARNING</p>
                            <hr className=' py-2'/>
                        </Col>
                        <Col span={24}>
                            <FruadWarning />
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    );
};
export default TabApp;