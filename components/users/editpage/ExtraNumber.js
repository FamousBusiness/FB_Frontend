import { Form, Input, Button, Modal } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import React from 'react';

const ExtraMobile = () => {
    const [visible, setVisible] = React.useState(false);

    const showModel = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <>
            <Button type='dashed' block onClick={showModel} icon={<PlusOutlined />}>
                Add Extra Numbers
            </Button>

            <Modal open={visible} onCancel={handleCancel} onOk={handleCancel}>
                <Form.List
                    name="mobile_numbers"
                    initialValue={['']}
                    max={5}
                >
                    {(fields, { add, remove }) => (
                        <div
                            style={{
                                display: 'flex',
                                rowGap: 16,
                                flexDirection: 'column',
                            }}
                        >
                            {fields.map((field) => (
                                <div key={field.key}>
                                    <Form.Item label="Mobile Number" name={[field.name]} key={field.key}>
                                        <Input />
                                    </Form.Item>

                                    {fields.length > 0 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </div>
                            ))}

                            <Button type="dashed" onClick={() => add()} block>
                                + Add Item
                            </Button>
                        </div>
                    )}
                </Form.List>
            </Modal>
        </>
    );
};

export default ExtraMobile;
