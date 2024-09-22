import React, { useState } from 'react';
import { Form, Input, Select, Space, Button, Upload, message, Modal, Row, Col } from 'antd';
import { add_new_category } from '@/services/Admin/category';
import { Option } from 'antd/es/mentions';
const AddnewCat = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const { image, ...restValues } = values;
        const formData = new FormData();
        formData.append('name', restValues.name);
        formData.append('type', restValues.type);
        formData.append('trending', restValues.trending[0]);
        formData.append('image', image[0].originFileObj);

        try {
            await add_new_category(formData);
            form.resetFields();
            message.success('Category added successfully');
            const updatedData = await get_all_categories();
            if (updatedData) {
                setItems(updatedData);
            }
        } catch (error) {
            console.log('Error adding category:', error);
            message.error('Failed to add category');
        }
    };
    return (
        <>
            <Form form={form} onFinish={onFinish}>
                <Row gutter={8}>
                    <Col>
                        <Form.Item name="name"  rules={[{ required: true, message: 'Please enter the name' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name="type"  rules={[{ required: true, message: 'Please select the type' }]}>
                            <Select placeholder="Select a type">
                                {/* Type options */}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name="trending"  rules={[{ required: true, message: 'Please select trending' }]}>
                            <Select placeholder="Select trending status">
                              <Option value='true'>True</Option>
                              <Option value='false'>False</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please upload an image' }]}>
                            <Upload name="logo" listType="picture">
                                <Button>Upload Image</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Add Category
                                </Button>
                                <Button onClick={() => form.resetFields()}>Reset</Button>
                            </Space>


                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </>

    );
};
export default AddnewCat;









