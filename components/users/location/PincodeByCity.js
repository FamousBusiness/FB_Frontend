import { useGlobalState } from '@/services/LocationDetector/GlobalState';
import { Select } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react'





function PincodeByCity({ handlePincode }) {
    const { locationState } = useGlobalState()
    const [selectedSort, setSelectedSort] = useState(null);
    const [options, setOptions] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.postalpincode.in/postoffice/${locationState.city}`);
                const data = response.data;
                // console.log(data);
                if (data && data.length > 0 && data[0].Status === 'Success') {
                    // console.log(data);
                    setOptions(data[0].PostOffice);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [locationState]);


    return (
        <div>
            {options.length > 0 ? ( // Add conditional rendering here
                <Select

                    placeholder='Sort By Pincode'
                    size='large'
                    value={selectedSort}
                    onChange={(value) => {
                        setSelectedSort(value);
                        handlePincode(value);
                        // handleFilterChange();
                    }}
                    style={{ width: '100%' }}
                    showSearch={true}
                >
                    {options.map((item, index) => (
                        <Select.Option key={index} value={item.Pincode}>
                            {item.Pincode}
                        </Select.Option>
                    ))}
                </Select>
            ) : <Select placeholder="Select the pincode">
                <Select.Option key='1' value='132221'>132213</Select.Option>
                <Select.Option key='2' value='132221'>132213</Select.Option>
                <Select.Option key='3' value='132221'>132213</Select.Option>
                <Select.Option key='4' value='132221'>132213</Select.Option>
            </Select>}</div>
    )
}

export default PincodeByCity