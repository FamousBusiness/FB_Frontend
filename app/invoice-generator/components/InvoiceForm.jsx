"use client";
import React, { useState } from 'react';
import { v4 as uid } from 'uuid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../helpers/incrementString';
import { Col, Flex, Input, Row, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
});

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const InvoiceForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [discount, setDiscount] = useState('');
    const [tax, setTax] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState(1);
    const [cashierName, setCashierName] = useState('');
    const [cashierGST, setCashierGST] = useState('');
    const [cashierEmail, setCashierEmail] = useState('');
    const [cashierPhone, setCashierPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        // if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     getBase64(info.file.originFileObj, (url) => {
        //         setLoading(false);
        //         setImageUrl(url);
        //     });
        // }

        if (info.file.status === 'done') {
            // You can get the image URL here
            setLoading(false);
            setImageUrl(info.file.originFileObj);
          }
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                LOGO
            </div>
        </button>
    );




    const [items, setItems] = useState([
        {
            id: uid(6),
            name: '',
            qty: 1,
            price: '1.00',
        },
    ]);

    const reviewInvoiceHandler = (event) => {
        event.preventDefault();
        setIsOpen(true);
    };

    const addNextInvoiceHandler = () => {
        setInvoiceNumber((prevNumber) => incrementString(prevNumber));
        setItems([
            {
                id: uid(6),
                name: '',
                qty: 1,
                price: '1.00',
            },
        ]);
    };

    const addItemHandler = () => {
        const id = uid(6);
        setItems((prevItem) => [
            ...prevItem,
            {
                id: id,
                name: '',
                qty: 1,
                price: '1.00',
            },
        ]);
    };

    const deleteItemHandler = (id) => {
        setItems((prevItem) => prevItem.filter((item) => item.id !== id));
    };

    const edtiItemHandler = (event) => {
        const editedItem = {
            id: event.target.id,
            name: event.target.name,
            value: event.target.value,
        };

        const newItems = items.map((items) => {
            for (const key in items) {
                if (key === editedItem.name && items.id === editedItem.id) {
                    items[key] = editedItem.value;
                }
            }
            return items;
        });

        setItems(newItems);
    };

    const subtotal = items.reduce((prev, curr) => {
        if (curr.name.trim().length > 0)
            return prev + Number(curr.price * Math.floor(curr.qty));
        else return prev;
    }, 0);
    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = subtotal - discountRate + taxRate;


    const handleChangeImage = () => {
        if (fileInput?.current?.files) {
          const files = fileInput.current.files
    
          if (files.length > 0 && typeof onChangeImage === 'function') {
            const reader = new FileReader()
    
            reader.addEventListener('load', () => {
              if (typeof reader.result === 'string') {
                setImageUrl(reader.result)
              }
            })
    
            reader.readAsDataURL(files[0])
          }
        }
      }

    return (
        <form
            className="relative flex flex-col px-2 md:flex-row"
            onSubmit={reviewInvoiceHandler}
        >
            <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
                <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
                    <div className="flex space-x-2">
                        <span className="font-bold">Current Date: </span>
                        <span>{today}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="font-bold" htmlFor="invoiceNumber">
                            Invoice Number:
                        </label>
                        <Input
                            allowClear
                            required
                            className="max-w-[130px]"
                            type="number"
                            name="invoiceNumber"
                            min='1'
                            value={invoiceNumber}
                            onChange={(event) => setInvoiceNumber(event.target.value)}
                        />
                    </div>
                </div>
                <h1 className="text-center text-lg font-bold">INVOICE</h1>
                <Row justify='space-between' align='top' gutter={[24, 12]}>
                    <Col lg={12} xxl={12} md={12} sm={24} xs={24} xl={12} className=' p-4 bg-slate-100 rounded-md'>
                        <Flex vertical gap={'small'}>
                            <label
                                htmlFor="cashierName"
                                className="text-sm font-bold sm:text-base"
                            >
                                From:
                            </label>
                            {/* <Upload
                                listType='picture-circle'
                                className="avatar-uploader"
                                showUploadList={false}
                                onChange={handleChangeImage}
                            >
                                {imageUrl ? (
                                    <Image
                                        fill
                                        className=' object-contain'
                                        sizes='100%'
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload> */}
                            <Input
                                allowClear
                                style={{ borderRadius: 0 }}
                                required
                                size='large'
                                // className="flex-1"
                                placeholder="Business Name"
                                type="text"
                                name="cashierName"
                                // id="cashierName"
                                value={cashierName}
                                onChange={(event) => setCashierName(event.target.value)}
                            />
                            <Input
                                allowClear
                                style={{ borderRadius: 0 }}
                                required
                                size='large'
                                // className="flex-1"
                                placeholder="Phone Number"
                                type="text"
                                name="cashierPhone"
                                // id="cashierName"
                                value={cashierPhone}
                                onChange={(event) => setCashierPhone(event.target.value)}
                            />
                            <Input

                                style={{ borderRadius: 0 }}
                                allowClear
                                required
                                size='large'
                                // className="flex-1"
                                placeholder="Email"
                                type="email"
                                name="cashierNameEmail"
                                // id="cashierName"
                                value={cashierEmail}
                                onChange={(event) => setCashierEmail(event.target.value)}
                            />
                            <Input

                                style={{ borderRadius: 0 }}
                                allowClear
                                required
                                size='large'
                                // className="flex-1"
                                placeholder="GST NO."
                                type="text"
                                name="cashierGST"
                                // id="cashierName"
                                value={cashierGST}
                                onChange={(event) => setCashierGST(event.target.value)}
                            />
                        </Flex>
                    </Col>

                    <Col lg={11} xxl={11} md={11} sm={24} xs={24} xl={11} className=' p-4 bg-orange-100 rounded-md'>
                        <Flex vertical gap={'small'}>

                            <label
                                htmlFor="customerName"
                                className="col-start-2 row-start-1 text-sm font-bold md:text-base"
                            >
                                Billing To:
                            </label>
                            <Input
                                style={{ borderRadius: 0 }}
                                allowClear
                                size='large'
                                required
                                className="flex-1"
                                placeholder="Customer name"
                                type="text"
                                name="customerName"
                                id="customerName"
                                value={customerName}
                                onChange={(event) => setCustomerName(event.target.value)}
                            />

                            <Input
                                style={{ borderRadius: 0 }}
                                allowClear
                                size='large'
                                required
                                className="flex-1"
                                placeholder="Phone Number"
                                type="text"
                                name="customerPhone"
                                id="customerPhone"
                                value={customerPhone}
                                onChange={(event) => setCustomerPhone(event.target.value)}
                            />
                            <Input
                                style={{ borderRadius: 0 }}
                                allowClear
                                size='large'
                                required
                                className="flex-1"
                                placeholder="Email"
                                type="text"
                                name="customerName"
                                id="customerName"
                                value={customerEmail}
                                onChange={(event) => setCustomerEmail(event.target.value)}
                            />

                            <TextArea
                                style={{ borderRadius: 0 }}
                                allowClear
                                size='large'
                                required
                                className="flex-1"
                                placeholder="Customer Address"
                                type="text"
                                name="customerNameAddress"
                                // id="customerNameAddress"
                                value={customerAddress}
                                onChange={(event) => setCustomerAddress(event.target.value)}
                            />
                        </Flex>
                    </Col>
                </Row>
                <table className="w-full mt-4 p-4 text-left">
                    <thead>
                        <tr className="border-b border-gray-900/10 text-sm md:text-base">
                            <th>ITEM</th>
                            <th>QTY</th>
                            <th className="text-center">PRICE</th>
                            <th className="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <InvoiceItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                qty={item.qty}
                                price={item.price}
                                onDeleteItem={deleteItemHandler}
                                onEdtiItem={edtiItemHandler}
                            />
                        ))}
                    </tbody>
                </table>
                <button
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                    type="button"
                    onClick={addItemHandler}
                >
                    Add Item
                </button>
                <div className="flex flex-col items-end space-y-2 pt-6">
                    <div className="flex w-full justify-between md:w-1/2">
                        <span className="font-bold">Subtotal:</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between md:w-1/2">
                        <span className="font-bold">Discount:</span>
                        <span>
                            ({discount || '0'}%)₹{discountRate.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex w-full justify-between md:w-1/2">
                        <span className="font-bold">Tax:</span>
                        <span>
                            ({tax || '0'}%)₹{taxRate.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">
                            ₹{total % 1 === 0 ? total : total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="basis-1/4 bg-transparent">
                <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
                    <button
                        className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                        type="submit"
                    >
                        Review Invoice
                    </button>
                    <InvoiceModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        invoiceInfo={{
                            invoiceNumber,
                            cashierName,
                            cashierEmail,
                            cashierPhone,
                            customerName,
                            customerAddress,
                            customerEmail,
                            customerPhone,
                            subtotal,
                            taxRate,
                            discountRate,
                            total,
                            today,
                            cashierGST,
                            imageUrl
                        }}
                        items={items}
                        onAddNextInvoice={addNextInvoiceHandler}
                    />
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <label className="text-sm font-bold md:text-base" htmlFor="tax">
                                Tax rate:
                            </label>
                            <div className="flex items-center">
                                <Input
                                    size='large'
                                    addonAfter=" %"
                                    className="w-full rounded-r-none "
                                    type="number"
                                    name="tax"
                                    id="tax"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="0.0"
                                    value={tax}
                                    onChange={(event) => setTax(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-bold md:text-base"
                                htmlFor="discount"
                            >
                                Discount rate:
                            </label>
                            <div className="flex items-center">
                                <Input
                                    size='large'
                                    addonAfter=" %"
                                    className="w-full rounded-r-none  "
                                    type="number"
                                    name="discount"
                                    id="discount"
                                    min="0"
                                    step="0.01"
                                    max="100"
                                    placeholder="0.0"
                                    value={discount}
                                    onChange={(event) => setDiscount(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default InvoiceForm;