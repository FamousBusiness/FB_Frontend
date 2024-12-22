import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Image, message, Col, Row, Button, Flex } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';





const UploadImage = ({ business, mutate }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpdate = async (imageId, file, mutate) => {
    try {
      // console.log("File",file);
      console.log("imageid of the photo", imageId);
      const imageToUpdate = business && business.business_images && business.business_images.length > 0 && business.business_images[0].image.find(file => file.id === imageId);
      if (!imageToUpdate) {
        message.error('Image not found for update');
        return;
      }
      console.log("image file updated", file);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/business-page-image-create-update/${business.id}/?img_id=${imageId}`,
        {
          method: 'PUT',
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${Cookies.get("accessToken")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        message.success('Image updated successfully');
        mutate()
        // Update the UI or perform any necessary actions after successful image update
      }
    } catch (error) {
      console.error('Error updating image:', error);
      message.error('Error updating image');
    }
  };

  useEffect(() => {
    if (business && business.business_images && business.business_images.length > 0) {
      console.log('Business images', business.business_images[0].image);
      setFileList(business.business_images[0].image);
    }
  }, [business]);

  const handleCancel = () => setPreviewOpen(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.image && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.image || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.name.substring(file.name.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  
  const customRequest = async ({ file, onSuccess }) => {
    // console.log('Upload', file);
    const formData = new FormData();
    // formData.append('id', uniqueId); // Add unique image ID
    formData.append('image', file);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/business-page-image-create-update/${business.id}/`, {
        method: 'POST',
        headers: {
          // 'Content-Type':'multipart/form-data',
          "Authorization": `Bearer ${Cookies.get("accessToken")}`,
        },
        body: formData,
      });

      if (response.ok) {
        message.success('Image added successfully');
        onSuccess('Ok');
        mutate()
      } else {
        message.error('Failed to add image');
        onSuccess('Error');
      }
    } catch (error) {
      console.error('Error adding image:', error);
      message.error('Error adding image');
      onSuccess('Error');
    }
  };


  const handleFileChange = (info) => {
    const file = info.file;
    // console.log('File changed', file);
    // Process the file before passing it to the handler function
    if (file.status === 'done') {
      setSelectedFile(file.originFileObj); // Store the selected file
    } else if (file.status === 'error') {
      message.error('File upload failed.');
    }
  };

  return (
    <>
      <Upload
        multiple={true}
        maxCount={6}
        listType='picture-card'
        customRequest={customRequest}
        showUploadList={false}
        // onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 6 ? null : uploadButton}
      </Upload>
      <Row gutter={12}>
        {business && business.business_images && business.business_images.length > 0 ?
          business.business_images[0].image.map((image, index) => (
            <Col key={image.id}>
              <Flex vertical gap='small'>
                <div className=' h-14 w-14 relative'>
                  <Image
                    alt={`Image ${index}`}
                    className=' object-contain w-auto'
                    src={image.image}
                    preview={false}
                  // onClick={() => handleImageUpdate(image.id)} // Call handleImageUpdate with image ID
                  />
                </div>
                <Upload onChange={handleFileChange}
                  showUploadList={false} // Hide the default file list
                  customRequest={({ file }) => handleImageUpdate(image.id, file)}>
                  <Button>Change</Button>
                </Upload>
              </Flex>
            </Col>
          )) : null}
      </Row>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImage;
