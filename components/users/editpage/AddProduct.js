


import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Tooltip, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

function AddProduct({ business }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [addloading, setAddloading] = useState(false);
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        form.resetFields();
    };
    const onFinish = async (values) => {
        try {
            setAddloading(true)
            console.log("Add product", values);
            // Call API to create product with values
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/product-services/`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                },
            });
            if (response.ok) {
                setAddloading(false);
                message.success(response);
                handleClose();
            } else {
                setAddloading(false);
                message.error('Failed to add product');
            }
        } catch (error) {
            setAddloading(false);
            console.error('Error adding product:', error);
            message.error('Error adding product');
        }
    };
    const handleDelete = async (productId, businessId) => {
        try {
            // Call API to delete product
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/product-services-delete/`, {
                method: 'DELETE',
                body: JSON.stringify({
                    product_id: productId,
                    business_id: businessId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                },
            });

            if (response.ok) {
                message.success('Product deleted successfully');
                // Perform any additional actions after successful deletion if needed
            } else {
                message.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            message.error('Error deleting product');
        }
    };

    return (
        <>
            <h1>Add Product</h1>
            <Tooltip placement="left" title="Add Product" arrow={false}>
                <div size='large' onClick={handleOpen} className=' border-2 bg-green-400 cursor-pointer hover:border-blue-600 border-dotted rounded-md w-20 h-20 flex flex-col items-center justify-center'>
                    <PlusOutlined className=' text-white font-medium' />
                </div>
            </Tooltip>
            <Modal centered open={open} footer={null} onCancel={handleClose}>
                <Form form={form} onFinish={onFinish}>
                    <Form.List name="products">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key} align='middle' gutter={[12, 24]}>
                                        <Col span={12}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Product Name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Product Name" />
                                            </Form.Item>
                                        </Col>

                                        {/* Add other fields (price, description) similar to 'name' field */}

                                        <Col>
                                            <Form.Item
                                                {...restField}

                                                name={[name, 'price']}
                                                rules={[
                                                    {

                                                        required: true,
                                                        message: 'Missing price',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Price" />
                                            </Form.Item>
                                        </Col>

                                        <Col span={22}>
                                            <Form.Item
                                                {...restField}

                                                name={[name, 'description']}
                                                rules={[
                                                    {

                                                        required: true,
                                                        message: 'Tell about your product ',
                                                    },
                                                ]}
                                            >
                                                <TextArea rows={4} maxLength={100} placeholder="Write about the product" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={22}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'picture']}
                                                valuePropName="picture"
                                                // getValueFromEvent={normFile}
                                                rules={[
                                                    {
                                                        // type: 'url',
                                                        required: true,
                                                        message: 'Missing product picture',
                                                    },
                                                ]}
                                            >
                                                <Upload
                                                    listType="picture"
                                                    maxCount={1}
                                                    action="Your upload URL here" // Replace with your upload URL
                                                    beforeUpload={() => false} // Remove this line if you want to enable actual file upload
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>

                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                        <Col span={24}>
                                            <Form.Item>
                                                <Button htmlType='submit' type='primary' block >
                                                    SUBMIT
                                                </Button>
                                            </Form.Item>

                                        </Col>

                                    </Row>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>


                </Form>
            </Modal>
        </>
    );
}

export default AddProduct;
