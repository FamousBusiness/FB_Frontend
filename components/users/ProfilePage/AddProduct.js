import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Upload, message } from 'antd';
import Cookies from 'js-cookie';
const AddProduct = ({ business, brand }) => {

    const Url = brand ? 'https://api.famousbusiness.in/brand-api/brand-product-create/' : `${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/product-services/`
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    const onFinish = async (values) => {
        //   / console.log("picture",  values.picture[0])
        try {
            setLoading(true);
            const formData = new FormData();

            // Append form values to FormData
            if (brand) {
                formData.append('brand_id', business.id);
            }
            else {
                formData.append('business_id', business.id);
            }
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('description', values.description);

            // Append the image file (if selected) to FormData
            if (values.picture && values.picture.length > 0) {
                formData.append('picture', values.picture[0].originFileObj);
            }
            // console.log(JSON.stringify(formData));

            // Send formData to the server using fetch or Axios
            const response = await fetch(Url, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,

                },
                body: formData,
            });

            if (response.ok) {
                setLoading(false);
                message.success('Product added successfully');
                onClose();
            } else {
                setLoading(false);
                message.error('Failed to add product');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error adding product:', error);
            message.error('Error adding product');
        }
    };

    return (
        <>
            <Button style={{background:'#3c89d0'}} type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Add Product
            </Button>
            <Drawer
                title="Create a new Product"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}>
                <Form onFinish={onFinish} layout="vertical" >
                    <Row align='middle' gutter={[16, 10]}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Product Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter product name',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter product name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[
                                    {
                                        // required: true,
                                        message: 'Please enter price',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    addonBefore="Rs."
                                    placeholder="Please enter price"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}>
                                <Input.TextArea rows={4} maxLength={200} count={true} placeholder="please enter url description" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='picture' valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
                                <Upload >
                                    <Button>
                                        Upload Image
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <Button  style={{background:'#3c89d0'}} loading={loading} disabled={loading} block type='primary' htmlType='submit'>Submit</Button>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <Button block type='default' htmlType='reset'>Reset</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default AddProduct;