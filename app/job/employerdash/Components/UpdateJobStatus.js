// components/UpdateJobStatus.js
import React, { useState } from 'react';
import { Form, Select, Button, message, Input, Modal } from 'antd';
import useSWR, { mutate } from 'swr';
import Cookies from 'js-cookie';

const UpdateJobStatus = ({ jobs, open, onclose }) => {

    const onFinish = async (values) => {
        const data = {
            job_id: jobs.id,
            ...values
        }
        try {
            await fetch('https://api.famousbusiness.in/job-api/company-job-status-update/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('accessToken')
                },
                body: JSON.stringify(data),
            });

            // Trigger a re-fetch of the jobs data after updating status
            message.success('Job status updated successfully');
        } catch (error) {
            message.error('Error updating job status');
            console.error('Error:', error);
        }
    };

    return (
        <Modal open={open} footer={null} centered onCancel={onclose}>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item label="Status" name="is_active" rules={[{ required: true, message: 'Please select a status' }]}>
                    <Select>
                        <Select.Option value="True">Active</Select.Option>
                        <Select.Option value="False">Inactive</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Update Status
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateJobStatus;
