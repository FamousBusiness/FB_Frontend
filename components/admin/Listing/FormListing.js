import React from 'react';
import { Upload, Button, message, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { serverUrl } from '@/utils/Server';
import { useAuth } from '@/context/AuthContext';

const { Dragger } = Upload;

const FormListing = () => {
  const {authTokens} = useAuth()
  const Token = Cookies.get('accessToken'); // Replace with your actual token
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('excel_file', file);

    try {
      const response = await fetch(`${serverUrl}/admin-api/excel-upload/`, {
        method: 'POST',
        headers: {
          // content-type:formDataType,
          Authorization: `Bearer ${Token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully!');
        message.success('File uploaded successfully!');
        // Handle success as needed
      } else {
        console.error('Failed to upload file.');
        message.error('Failed to upload file.');
        // Handle failure appropriately
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('Error uploading file.');
      // Handle errors during the upload
    }
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    // Ant Design Upload component requires a customRequest function
    uploadFile(file)
      .then(() => onSuccess())
      .catch((error) => {
        console.error('Error during customRequest:', error);
        onError(error);
      });
  };

  const draggerProps = {
    name: 'file',
    multiple: false,
    customRequest,
    showUploadList: false,
  };

  return (
    <Card title="File Upload">
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single upload.</p>
        <Button type="primary">Select File</Button>
      </Dragger>
    </Card>
  );
};

export default FormListing;
