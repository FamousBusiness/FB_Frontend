import React, {useState, useEffect} from 'react';
import { Checkbox, Select } from 'antd';

const { Option } = Select;

const CityOption = ({ cityData, onChange }) => {
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        if (selectAll) {
            const allCities = cityData.map((item) => item);
            setSelectedCities(allCities);
            onChange(allCities);
        } else {
            setSelectedCities([]);
            onChange([]);
        }
    }, [selectAll, cityData, onChange]);
    // When "Select All" is checked, select all options

    const handleChange = (value) => {
        // Call the onChange function to handle changes
        onChange(value);
    };

    return (
        <Select
            mode="multiple"
            style={{
                width: '100%',
            }}
            placeholder="Select "
            onChange={handleChange}
            optionLabelProp="label"
        >
           <Option value="Select All" label="Select All">
           <Checkbox checked={selectAll} onChange={handleSelectAll}>
                    Select All
                </Checkbox>
            </Option>
            
            {cityData.map((item) => (
                <Option value={item} label={item} key={item}>
                    {item}
                </Option>
            ))}
        </Select>
    );
}

export default CityOption;
