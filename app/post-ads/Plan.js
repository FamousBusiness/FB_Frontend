import React, { useState } from 'react';
import { Collapse, Flex, Radio, Typography, Skeleton, Result } from 'antd';
import useSWR from 'swr';
const { Text } = Typography;

const fetcher = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
    });
    if (!res.ok) {
      throw new Error(`Fetching ${url} failed`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Fetching ${url} failed`);
  }
};

const App = ({ handlePlan }) => {
  const [activeKey, setActiveKey] = useState('1');
  const { data, error, isLoading } = useSWR(
    'https://api.famousbusiness.in/ads-api/ad-plans/',
    fetcher
  );

  if (error) {
    return <Result status='error' title="Something went wrong." />;
  }

  const handleCollapseChange = (item) => {
    console.log(item.name)
    if (item && item.id) {
      setActiveKey(item.id.toString());
      handlePlan(item);
    }
  };



  const genExtra = (item) => {
    return (
      <Radio
        value={item.id.toString()} // Use the unique identifier (id) as the value
        checked={activeKey === item.id.toString()}
        onChange={() => handleCollapseChange(item)}
      />
    );
  };

  return (
    <div className='border border-1'>
      <div className='bg-slate-100 p-2'>
        <Typography.Title level={5}>Types Of Ads</Typography.Title>
        <Typography.Text type='secondary'>
          Please choose the below
        </Typography.Text>
      </div>
      <Collapse
        bordered={false}
        accordion
        activeKey={activeKey}
        onChange={(key) => handleCollapseChange(data.data[key])}
      >
        {isLoading ? (
          // Display Skeleton while data is loading
          <Skeleton active />
        ) : (
          data &&
          data.data.map((item) => (
            <Collapse.Panel
              key={item.id.toString()}
              header={`${item.name}- ₹ ${item.price}`}
              extra={genExtra(item)}
            >
              <Flex vertical>
                <Text italic>{`-Ad views: ${item.views_quantity}`}</Text>
                <Text italic>{`-Price: ${item.price}`}</Text>
              </Flex>
            </Collapse.Panel>
          ))
        )}
      </Collapse>
    </div>
  );
};

export default App;
