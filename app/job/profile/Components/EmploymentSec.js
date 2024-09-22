import { locations } from "@/data/data";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Flex, Form, Input, Modal, Popconfirm, Row, Select, Skeleton, Space, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import Cookies from "js-cookie";
import moment from "moment";
import { useState } from "react";
import useSWR from "swr";
const fetcher = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch skills');
        }

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching skills:', error);
    }
};



const ExperienceSec = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);
    const [form] = Form.useForm();

    const { data, error, mutate } = useSWR('https://api.famousbusiness.in/job-api/aspirant-experience/', fetcher);

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    if (!data) {
        return (
            <Card className='w-full shadow-xl'>
                <Skeleton active paragraph={{
                    rows: 4
                }} />
            </Card>
        );
    }

    const handleEdit = (record) => {
        setEditingExperience(record);
        form.setFieldsValue({
            job_title: record.job_title,
            start_date: moment(record.start_date),
            end_date: moment(record.end_date),
            company_name: record.company_name,
            job_location_city: record.job_location_city,
            job_location_state: record.job_location_state,
            is_current_job: record.is_current_job,
            job_location_country: record.job_location_country,
            description: record.description,
            salary: record.salary,
            job_profile: record.job_profile,
            notice_period: record.notice_period,
            total_experience: record.total_experience,
            designation: record.designation,
        });
        setIsModalVisible(true);
    };

    const handleEditOutsideTable = () => {
        setEditingExperience(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCreate = async (values) => {
        try {

            const formattedValues = {
                ...values,
                start_date: values.start_date ? values.start_date.format('YYYY-MM-DD') : null,
                end_date: values.end_date ? values.end_date.format('YYYY-MM-DD') : null,
            };

            const res = await fetch('https://api.famousbusiness.in/job-api/aspirant-experience-create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
                body: JSON.stringify(formattedValues),
            });

            if (res.ok) {
                message.success('Experience created successfully');
                setIsModalVisible(false);
                form.resetFields();
                mutate();
            } else {
                throw new Error('Failed to create experience');
            }
        } catch (error) {
            console.error('Error creating experience:', error);
        }
    };




    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://api.famousbusiness.in/job-api/aspirant-experience-delete/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                }
            });

            if (res.ok) {
                message.success('Experience deleted successfully');
                mutate(); // Refresh experience data after deletion
            } else {
                throw new Error('Failed to delete experience');
            }
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    };

    const handleUpdate = async (values) => {
        try {

            const formattedValues = {
                ...values,
                start_date: values.start_date ? values.start_date.format('YYYY-MM-DD') : null,
                end_date: values.end_date ? values.end_date.format('YYYY-MM-DD') : null,
            };
            const res = await fetch(`https://api.famousbusiness.in/job-api/aspirant-experience-update/${editingExperience.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                },
                body: JSON.stringify(formattedValues),
            });

            if (res.ok) {
                message.success('Experience updated successfully');
                setIsModalVisible(false);
                setEditingExperience(null); // Reset editing experience
                form.resetFields();
                mutate();
            } else {
                throw new Error('Failed to update experience');
            }
        } catch (error) {
            console.error('Error updating experience:', error);
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'job_title',
            key: 'job_title',
        },
        {
            title: 'Company Name',
            dataIndex: 'company_name',
            key: 'company_name',
        },
        // {
        //     title: 'Designation',
        //     dataIndex: 'designation',
        //     key: 'designation',
        // },
        // {
        //     title: 'City',
        //     dataIndex: 'job_location_city',
        //     key: 'job_location_city',
        // },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Are you sure to delete this skill?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    const selectAfter = (
        <Select defaultValue="day">
            <Select.Option value="day">Day</Select.Option>
            <Select.Option value="month">Month</Select.Option>
        </Select>
    );
    return (
        <Card className='w-full shadow-xl'>
            <Flex justify='space-between' align="center">
                <span className='text-lg font-semibold'>Experience</span>
                <Button type='link' onClick={handleEditOutsideTable} style={{ fontWeight: 600, fontSize: 16 }}>
                    Add Experience
                </Button>
            </Flex>
            <Table bordered={false} pagination={false} footer={null} dataSource={data} columns={columns} rowKey="id" />
            <Modal

                centered
                title={editingExperience ? 'Update Experience' : 'Add Experience'}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={editingExperience ? handleUpdate : handleCreate}
                >
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                label="Job Title"
                                name="job_title"
                                rules={[{ required: true, message: 'Please enter the job title' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Company"
                                name="company_name"
                                rules={[{ required: true, message: 'Please enter the company name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Location (City)"
                                name="job_location_city"
                                rules={[{ required: true, message: 'Please enter the city' }]}
                            >
                                <Select placeholder="select city">
                                    {locations.map((location) => <Option value={location} key={location} >
                                        {location}
                                    </Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Location (State)"
                                name="job_location_state"
                                rules={[{ required: true, message: 'Please enter the state' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Start Date"
                                name="start_date"
                                rules={[{ required: true, message: 'Please select the start date' }]}
                            >
                                <DatePicker picker="date" format="YYYY/MM/DD" placeholder="Select Date" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="End Date"
                                name="end_date"
                                rules={[{ required: true, message: 'Please select the end date' }]}
                            >
                                <DatePicker picker="date" format="YYYY/MM/DD" placeholder="Select Date" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Location (Country)"
                                name="job_location_country"
                                rules={[{ required: true, message: 'Please enter the country' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please enter the description' }]}>
                                <TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Profile"
                                name="job_profile"
                                rules={[{ required: true, message: 'Please enter the Profile' }]}>
                                <TextArea />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Notice Period"
                                name="notice_period"
                                rules={[{ required: true, message: 'Please enter the notice period' }]}>
                                <Input addonAfter={selectAfter} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Total Experience(year)"
                                name="total_experience"
                                rules={[{ required: true, message: 'Please enter the total experience' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Designation"
                                name="designation"
                                rules={[{ required: true, message: 'Please enter the designation' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Salary"
                                name="salary"
                                rules={[{ required: true, message: 'Please enter the salary' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button block type='primary' htmlType='submit' >
                                    {editingExperience ? 'UPDATE' : 'SAVE'}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Card>
    );
}

export default ExperienceSec;



