import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const BannerUpload = ({ handle }) => {
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
        },
    ]);
    const handleChange = (info) => {
        let newFileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-2);

        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        setFileList(newFileList);
    };
    const props = {
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange: handleChange,
        multiple: true,
    };
    return (<>
        <Upload  {...props} fileList={fileList}>
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <h4 className=' py-2 text-gray-400'>Size must be : 840px*250px</h4>
    </>
    );
};
export default BannerUpload;