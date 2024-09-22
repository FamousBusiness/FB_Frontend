"use client";
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Cookies from 'js-cookie';
const { Dragger } = Upload;

const ResumeUpload = ({ action, method, refresh }) => {

    const props = {
        name: 'resume',
        multiple: false,
        action: action,
        headers: {
            'authorization': 'Bearer ' + Cookies.get('accessToken')
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                refresh()
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Dragger method={method}  {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
    );
}
export default ResumeUpload;