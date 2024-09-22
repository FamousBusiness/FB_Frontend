import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
const props = {
  name: 'file',
  action: '',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const UploadX = () => (
  <Upload {...props}>
    <Button size='large' icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);
export default UploadX;