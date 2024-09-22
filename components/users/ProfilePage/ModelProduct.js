import { useAuth } from '@/context/AuthContext'
import { Badge, Button, Col, Form, Input, Modal, Popconfirm, Row, Upload, message } from 'antd'
import Cookies from 'js-cookie'
import Image from 'next/image'
import React, { useState } from 'react'

function ModelProduct({ business, index, brand, refresh }) {
    const [open, setOpen] = useState(false)
    const { user, userdata } = useAuth()
    const [form] = Form.useForm();
    const [update, setUpdate] = useState(true)
    const [loading, setLoading] = useState(false)
    const productId = business && business.products && business.products[index] ? business.products[index].id : null;
    const isProfileOwner = (userdata && userdata.business === business.id) || (user && user.user_id === 1) || (user && user.user_id === 2);
    const delUrl = brand ? `https://api.famousbusiness.in/brand-api/brand-product-delete/` : `${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/product-services-delete/`;
    const UpdateUrl = brand ? `https://api.famousbusiness.in/brand-api/brand-product-update/${business.id}/` : `${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/product-services/${business.id}/`;
    const handleDelete = async (productId) => {
        try {
            // Call API to delete product
            console.log("delete", productId);
            const response = await fetch(delUrl, {
                method: 'DELETE',

                body: JSON.stringify({
                    product_id: productId,
                    business_id: business.id,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                },
            });

            if (response.ok) {
                message.success('Product deleted successfully');
                setOpen(false)
                refresh()
                // Perform any additional actions after successful deletion if needed
            } else {
                message.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            message.error('Error deleting product');
        }
    };

    const handleEdit = async (values) => {
        // console.log('Edit', productId);
        // console.log('Edit', values);
        try {
            const formData = new FormData();
            // Append form values to FormDat
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('product_id', productId);

            const currentPicture = business.products[index]?.picture;
            const newPicture = values.picture?.[0]?.originFileObj;

            if (newPicture && newPicture !== currentPicture) {
                formData.append('picture', newPicture);
            }
            setLoading(true);
            const response = await fetch(UpdateUrl, {
                method: 'PUT',
                body: formData,
                headers: {
                    // 'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                },
            });

            if (response.ok) {
                message.success('Product updated successfully');
                setLoading(false);
                setOpen(false)
                setUpdate(true)
                refresh()
                // Perform any additional actions after successful update if needed
            } else {
                setLoading(false);
                message.error('Failed to update product');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating product:', error);
            message.error('Error updating product');
        }
    };

    return (
        <>
            <Row >
                <Col xl={24} lg={24} xxl={24} xs={0} sm={0} md={0}>
                    <Badge.Ribbon text={business.products[index] && business.products[index].price && `₹ ${business.products[index].price}` || "N/A"}>
                        <div onClick={() => setOpen(true)} className=' bg-white shadow-md relative overflow-hidden h-48 rounded-md' span={4}>
                            {/* <div className=' absolute top-0 right-0 z-30 bg-orange-300 py-2 px-2 shadow-sm font-semibold '>₹ {business.products[index] && business.products[index].price && `${business.products[index].price}` || "N/A"}</div> */}
                            {business.products[index] && business.products[index].picture && <Image src={business.products[index].picture} alt={business.products[index].name} fill className=' transition ease-in-out delay-150  hover:scale-110 duration-150 object-contain' sizes='100%' />}
                            <div className='  rounded-b-lg bg-purple-500 text-white font-bold text-center  absolute bottom-0 left-0 py-1 w-full'>
                                {business.products[index] && business.products[index].name && `${business.products[index].name}` || "Product & Servoices"}
                            </div>
                        </div>
                    </Badge.Ribbon>
                </Col>
                <Col xl={0} lg={0} xxl={0} xs={24} sm={24} md={24}>
                    <Badge.Ribbon text={business.products[index] && business.products[index].price ? `₹ ${business.products[index].price}` : "N/A"}>
                        <div onClick={() => setOpen(true)} className=' bg-white shadow-md relative h-28 rounded-md' span={4}>
                            {business.products[index] && business.products[index].picture && <Image src={business.products[index].picture} alt={business.products[index].name} fill className=' object-contain' sizes='100%' />}
                            <div className=' rounded-b-lg bg-purple-500 text-white font-bold text-center absolute bottom-0 left-0 py-1 w-full'>
                                {business.products[index] && business.products[index].name ? (business.products[index].name.length > 28 ? `${business.products[index].name.slice(0, 28)}...` : business.products[index].name) : "Product & Services"}
                            </div>
                        </div>
                    </Badge.Ribbon>
                </Col>
            </Row>
            <Modal centered closeIcon={true} footer={null} title='Product Details' open={open} onCancel={() => setOpen(false)} >
                {update ? (<Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Row justify='center'>
                            <Col>
                                {business.products[index] && business.products[index].picture && <Image src={business.products[index].picture} alt={business.products[index].name} width={200} height={200} />}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className=' font-sans font-semibold text-base text-gray-800'>
                        Product Name: {business.products[index] && business.products[index].name && `${business.products[index].name}` || "Product & Servoices"}
                    </Col>
                    <Col span={12} className=' font-sans font-semibold text-base text-gray-800'>
                        Price:{business.products[index] && business.products[index].price && `₹ ${business.products[index].price}` || "N/A"}
                    </Col>
                    <Col span={24} className=' font-sans font-semibold text-base text-gray-800'>
                        Description: {business.products[index] && business.products[index].description && `${business.products[index].description}` || "N/A"}
                    </Col>
                    {isProfileOwner && <Col span={24}>
                        <Row justify='end' gutter={12}>
                            <Col>
                                {business.products[index] && business.products[index].id &&
                                    <Popconfirm
                                        title="Delete the product"
                                        description="Are you sure to delete this product?"
                                        onConfirm={(e) => handleDelete(business.products[index].id)}
                                        onCancel={(e) => {
                                            console.log(e);
                                            message.error('Click on No');
                                        }}
                                        okText="Yes"
                                        cancelText="No">

                                        <Button size='large' danger>
                                            Delete
                                        </Button>
                                    </Popconfirm>}
                            </Col>
                            {isProfileOwner && <Col>
                                <Button onClick={() => setUpdate(false)} type='primary' size='large'>Update</Button>
                            </Col>}
                        </Row>
                    </Col>}
                </Row>) : (
                    <Form form={form} onFinish={handleEdit} initialValues={business.products[index] && business.products[index]}>
                        <Row gutter={[12, 12]}>
                            <Col span={24}>
                                <Form.Item name='picture' getValueFromEvent={(e) => {
                                    if (Array.isArray(e)) {
                                        return e;
                                    }
                                    return e && e.fileList;
                                }}>
                                    <Upload listType='text'>
                                        <Button>Change Image</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name='name'>
                                    <Input placeholder='Product Name' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name='price'>
                                    <Input placeholder='Product Price' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name='description'>
                                    <Input.TextArea placeholder='Product Description' rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button loading={loading} block type='primary' htmlType='submit'>
                                        SAVE
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal>
        </>
    )
}

export default ModelProduct

