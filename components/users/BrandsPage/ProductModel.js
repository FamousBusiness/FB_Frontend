// import React, { useState } from 'react';
// import { Badge, Button, Card, Col, Modal, Row } from 'antd';
// import Image from 'next/image';
// const ProductModal = ({ product }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//     const handleOk = () => {
//         setIsModalOpen(false);
//     };
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };
//     return (
//         <>
//             <Row >
//                 <Col xl={24} lg={24} xxl={24} xs={0} sm={0} md={0}>
//                     <Badge.Ribbon text={product.price && `₹ ${product.price}` || "N/A"}>
//                         <div onClick={showModal} className=' bg-white shadow-md relative h-48 rounded-md' span={4}>
//                             {/* <div className=' absolute top-0 right-0 z-30 bg-orange-300 py-2 px-2 shadow-sm font-semibold '>₹ {product && product.price && `${product.price}` || "N/A"}</div> */}
//                             {product.image && <Image src={product.image} alt={product.name} fill className=' object-contain' sizes='100%' />}
//                             <div className='  rounded-b-lg bg-purple-500 text-white font-bold text-center  absolute bottom-0 left-0 py-1 w-full'>
//                                 {product && product.name && `${product.name}` || "Product & Servoices"}
//                             </div>
//                         </div>
//                     </Badge.Ribbon>

//                 </Col>
//                 <Col xl={0} lg={0} xxl={0} xs={24} sm={24} md={24}>
//                     <Badge.Ribbon text={product && product.price ? `₹ ${product.price}` : "N/A"}>
//                         <div onClick={showModal} className=' bg-white shadow-md relative h-28 rounded-md' span={4}>
//                             {product && product.image && <Image src={product.image} alt={product.name} fill className=' object-contain' sizes='100%' />}
//                             <div className=' rounded-b-lg bg-purple-500 text-white font-bold text-center absolute bottom-0 left-0 py-1 w-full'>
//                                 {product && product.name ? (product.name.length > 28 ? `${product.name.slice(0, 28)}...` : product.name) : "Product & Services"}
//                             </div>
//                         </div>
//                     </Badge.Ribbon>
//                 </Col>

//             </Row>

//             <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
//                 <Row gutter={[12, 12]}>
//                     <Col span={24}>
//                         <Row justify='center'>
//                             <Col>
//                             <Image src={product.image} alt={product.name} width={200} height={200} />
//                             </Col>
//                         </Row>

//                     </Col>
//                     <Col span={24} className=' font-sans font-semibold text-base text-gray-800'>
//                         Product Name: {product && product.name && `${product.name}` || "Product & Servoices"}
//                     </Col>
//                     <Col span={12} className=' font-sans font-semibold text-base text-gray-800'>
//                         Price:{product && product.price && `₹ ${product.price}` || "N/A"}
//                     </Col>
//                     <Col span={24} className=' font-sans font-semibold text-base text-gray-800'>
//                         Description: {product && product.description && `${product.description}` || "N/A"}
//                     </Col>
//                 </Row>


//             </Modal>
//         </>
//     );
// };
// export default ProductModal;



import { useAuth } from '@/context/AuthContext'
import { Badge, Button, Col, Form, Input, Modal, Popconfirm, Row, Upload, message } from 'antd'
import Cookies from 'js-cookie'
import Image from 'next/image'
import React, { useState } from 'react'

function ProductModel({ business, brand, index }) {

    const [open, setOpen] = useState(false)
    const { user, userdata } = useAuth()
    const [form] = Form.useForm();
    const [update, setUpdate] = useState(true)
    const [loading, setLoading] = useState(false)
    const productId = business.id;
    const brandId = brand && brand.Brands ? brand.Brands.id : null;
    const isProfileOwner = user && (userdata && userdata.business === brandId) || (user && user.user_id === 1) || (user && user.user_id === 2);

    const handleDelete = async (productId) => {
        try {
            // Call API to delete product
            console.log("delete", productId);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand-api/brand-product-delete/`, {
                method: 'DELETE',

                body: JSON.stringify({
                    product_id: productId,
                    brand_id: brandId

                }),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                },
            });

            if (response.ok) {
                message.success('Product deleted successfully');
                setOpen(false)
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

            // Append the image file (if selected) to FormData
            if (values.picture && values.picture.length > 0) {
                formData.append('picture', values.picture[0].originFileObj);
            }
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand-api/brand-product-update/${brandId}/`, {
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
                    <Badge.Ribbon text={business.price && `₹ ${business.price}` || "N/A"}>
                        <div onClick={() => setOpen(true)} className=' bg-white shadow-md relative h-48 rounded-md' span={4}>
                            {/* <div className=' absolute top-0 right-0 z-30 bg-orange-300 py-2 px-2 shadow-sm font-semibold '>₹ {business.products[index] && business.products[index].price && `${business.products[index].price}` || "N/A"}</div> */}
                            {business.image && <Image src={business.image} alt={business.image} fill className=' object-contain' sizes='100%' />}
                            <div className='  rounded-b-lg bg-purple-500 text-white font-bold text-center  absolute bottom-0 left-0 py-1 w-full'>
                                {business.name && `${business.name}` || "Product & Servoices"}
                            </div>
                        </div>
                    </Badge.Ribbon>

                </Col>
                <Col xl={0} lg={0} xxl={0} xs={24} sm={24} md={24}>
                    <Badge.Ribbon text={business && business.price ? `₹ ${business.price}` : "N/A"}>
                        <div onClick={() => setOpen(true)} className=' bg-white shadow-md relative h-28 rounded-md' span={4}>
                            {business && business.image && <Image src={business.image} alt={business.image} fill className=' object-contain' sizes='100%' />}
                            <div className=' rounded-b-lg bg-purple-500 text-white font-bold text-center absolute bottom-0 left-0 py-1 w-full'>
                                {business.name && business.name ? (business.name.length > 28 ? `${business.name.slice(0, 28)}...` : business.name) : "Product & Services"}
                            </div>
                        </div>
                    </Badge.Ribbon>
                </Col>

            </Row>

            <Modal centered closeIcon={true} footer={null} title='Product Details' open={open} onCancel={() => setOpen(false)} >
                {update ? (<Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Row justify='center'>
                            <Col> {business && business.image && <Image src={business.image} alt={business.name} width={200} height={200} />}
                            </Col>
                        </Row>

                    </Col>
                    <Col span={24} className=' font-sans font-semibold text-base text-gray-800'>
                        Product Name: {business && business.name && `${business.name}` || "Product & Servoices"}
                    </Col>
                    <Col span={12} className=' font-sans font-semibold text-base text-gray-800'>
                        Price:{business && business.price && `₹ ${business.price}` || "N/A"}
                    </Col>
                    <Col span={24} className=' font-sans font-semibold text-base text-gray-800'>
                        Description: {business && business.description && `${business.description}` || "N/A"}
                    </Col>
                    {isProfileOwner && <Col xl={24} xxl={24} xs={0} sm={0} md={0} lg={24}>
                        <Row justify='end' gutter={12}>
                            <Col>
                                {business && business.id &&
                                    <Popconfirm
                                        title="Delete the product"
                                        description="Are you sure to delete this product?"
                                        onConfirm={(e) => handleDelete(business.id)}
                                        onCancel={(e) => {
                                            console.log(e);
                                            message.error('Click on No');
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
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

                    <Form form={form} onFinish={handleEdit} initialValues={business}>
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

export default ProductModel

