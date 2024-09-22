import React, { useState } from 'react';
import { Button, Col, Drawer, Dropdown, Row,Radio } from 'antd';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
const DrawerPlan = ({handleChange}) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        handleChange(e.target.value);
      };
    return (
        <>
            <Button type="link" onClick={showDrawer}>
                Change <DownOutlined />
            </Button>
            <Drawer extra={<CloseOutlined onClick={onClose}/>} closable={false} maskClosable={true} height={250} title={<p className=' text-lg font-semibold'>Choose Plan</p>} placement='bottom'  open={open}>
                <Row justify='space-arround' gutter={[10, 12]}>
                    <Col span={24} className=' text-lg font-semibold font-serif'>
                        Select Validity
                    </Col>
                    <Col>
                        <Radio.Group onChange={onChange} defaultValue="1" buttonStyle='solid' >
                            <Radio.Button value="1">1 Year</Radio.Button>
                            <Radio.Button value="2">2 Year</Radio.Button>
                            <Radio.Button value="3">3 Year</Radio.Button>
                            <Radio.Button value="4">4 Year</Radio.Button>
                            
                        </Radio.Group>
                    </Col>
                    <Col span={24} className=' text-lg font-semibold font-serif'>
                        Selected Device
                    </Col>
                    <Col>
                    <Radio.Group defaultValue="d&m" buttonStyle='solid'>
                    <Radio.Button defaultChecked={true} value="d&m">Desktop & Mobile</Radio.Button>
                    </Radio.Group></Col>
                </Row>

            </Drawer>
        </>
    );
};
export default DrawerPlan;