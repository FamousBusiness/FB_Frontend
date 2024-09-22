import React, { useMemo, useEffect } from 'react';
import { Button, Divider, InputNumber, notification, Space, Switch } from 'antd';
import { fetchDataFromApi } from 'your-api-utils'; // Import your API utility function

const Context = React.createContext({
  name: 'Default',
});

const Notification = () => {
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(3);
  const [api, contextHolder] = notification.useNotification({
    stack: enabled ? { threshold } : false,
  });

  const openNotification = useCallback((data) => {
    api.open({
      message: `Notification Title`,
      description: `Data from API: ${JSON.stringify(data)}`,
      duration: null,
    });
  }, [api]);

  const fetchDataAndNotify = async () => {
    try {
      const apiData = await fetchDataFromApi(); // Replace with your API call
      openNotification(apiData);
    } catch (error) {
      console.error('Error fetching data from API', error);
    }
  };

  useEffect(() => {
    const fetchDataAndNotify = async () => {
      try {
        const apiData = await fetchDataFromApi(); // Replace with your API call
        openNotification(apiData);
      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    };

    // Fetch data and notify when component mounts
    fetchDataAndNotify();
  }, [openNotification]);

  const contextValue = useMemo(() => ({
    name: 'Ant Design',
  }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div>
        <Space size="large">
          <Space style={{ width: '100%' }}>
            <span>Enabled: </span>
            <Switch checked={enabled} onChange={(v) => setEnabled(v)} />
          </Space>
          <Space style={{ width: '100%' }}>
            <span>Threshold: </span>
            <InputNumber
              disabled={!enabled}
              value={threshold}
              step={1}
              min={1}
              max={10}
              onChange={(v) => setThreshold(v || 0)}
            />
          </Space>
        </Space>
        <Divider />
        <Button type="primary" onClick={fetchDataAndNotify}>
          Open the notification box with API data
        </Button>
      </div>
    </Context.Provider>
  );
};

export default Notification;
