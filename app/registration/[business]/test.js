// import { IoBusinessOutline } from 'react-icons/io5';
// import { HiDocumentText } from 'react-icons/hi';
// import { FaIndianRupeeSign } from 'react-icons/fa6';
// import { BsPersonArmsUp } from 'react-icons/bs';
// import { MdOutlineNature } from 'react-icons/md';
// import {  MailOutlined, MobileOutlined, UserOutlined, WhatsAppOutlined, GlobalOutlined,  } from  '@ant-design/icons';
// import { PiUserSquare } from 'react-icons/pi';

// // import Category1 from '@/components/admin/Listing/CategorySelect';
// // import ExtraMobile from '@/components/users/editpage/ExtraNumber';
// import AddressForm from '@/components/users/editpage/ComplateAddress';
// import Title from 'antd/es/typography/Title';


// export default function Test() {
//     return (
//         <Row justify='center' gutter={[0,24]}>
//             <Col span={22} className=' top-6'>
//               <Link className="text-lg sm:text-3xl font-bold" href="/"  >
//                 <span className='text-blue-600'>Famous </span>
//                 <span className='text-green-700'>Business</span>
//               </Link>

//               <hr className=' my-2' />
//             </Col>

//             <Col sm={24} xs={24} lg={15} xl={15} xxl={15}>
//                 <Card title={<Title className=' py-2' level={2}>Register As Business</Title>} style={{borderRadius:0}}>
//                     <Form
//                         form={form}
//                         layout="vertical"
//                         name="register"
//                         onFinish={onFinish}
//                         initialValues={{
//                             agreement: true,
//                             mobile_number: mobile
//                         }}
//                         requiredMark={customRequiredMark}
//                         scrollToFirstError
//                     >
//                         <Row justify='space-between' align='middle' gutter={[12, { xs: 0, sm: 0, lg: 24, xl: 24, xxl: 24, md: 0 }]}>
//                             <Col sm={24} xs={24} md={12} xxl={12} xl={12} lg={12}>
//                                 <Form.Item
//                                     name="name"
//                                     label=" Your Name"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: 'Please input your name!',
//                                         },
//                                     ]}
//                                 >
//                                     <Input  placeholder='John'  prefix={<UserOutlined />} />
//                                 </Form.Item>
//                             </Col>

//                             <Col sm={24} xs={24} md={12} xxl={12} xl={12} lg={12}>
//                                 <Form.Item
//                                     name="business_name"
//                                     label="Business Name"
//                                     tooltip

//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: 'Please input your business name!',
//                                         },
//                                     ]}
//                                 >
//                                     <Input placeholder='Business Pvt.Ltd.'  prefix={<IoBusinessOutline />} />
//                                 </Form.Item>

//                             </Col>
                            
//                             <Col sm={24} xs={24} md={12} xxl={12} xl={12} lg={12}>
//                                 <Form.Item
//                                     required
//                                     name="password"
//                                     label="Password"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: 'Please input your password!',
//                                         },
//                                     ]}
//                                 >
//                                     <PasswordInput value={password} onChange={handlePasswordChange} placeholder='XXXXXXX' />
//                                 </Form.Item>
//                             </Col>

//                             <Col sm={24} xs={24} md={12} xxl={12} xl={12} lg={12}>
//                                 <Form.Item
//                                     required
//                                     name="password2"
//                                     label="Confirm Password"
//                                     dependencies={['password']}
//                                     hasFeedback
//                                     validateTrigger="onBlur"
//                                     rules={[
//                                         {

//                                             required: true,
//                                             message: 'Please confirm your password!',
//                                         },
//                                         ({ getFieldValue }) => ({
//                                             validator(_, value) {
//                                                 if (!value || getFieldValue('password') === value) {

//                                                     return Promise.resolve();
//                                                 }
//                                                 return Promise.reject('The two passwords do not match!');
//                                             },
//                                         }),
//                                     ]}
//                                 >
//                                     <PasswordInput value={password2} onChange={handlePassword2Change} placeholder='XXXXXXX' />
//                                 </Form.Item>

//                             </Col>

//                             <Col sm={24} xs={24} md={24} xxl={8} xl={8} lg={8}>
//                                 {/* <Category1 required={true} label={true} /> */}
//                                 <FetchAllCategories required={true} label={true} />
//                             </Col>

//                             <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="mobile_number"
//                                     label="Mobile Number"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: 'Please input your mobile number!',
//                                         },
//                                     ]}
//                                 >
//                                     <Input  prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="Mobile Number" />
//                                 </Form.Item>
//                             </Col>

//                             <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="whatsapp_number"
//                                     label="Whatsapp Number"
//                                     rules={[{
//                                         type: 'tel',
//                                           required: true,
//                                             message: 'Please input your WhatsApp number!',
//                                     }]}

//                                 >
//                                     <Input  prefix={<WhatsAppOutlined />} className=' w-full' />
//                                 </Form.Item>


//                             </Col>
//                             {/* <Col sm={24} xs={24} md={23} xxl={8} xl={8} lg={8}>
//                                 Extra mobile number
//                                 <ExtraMobile />
//                             </Col> */}

//                             <Col sm={24} xs={24} md={24} xxl={12} xl={12} lg={12}>
//                                 <Form.Item
//                                     name="email"
//                                     label="Email"
//                                     rules={[
//                                         {
//                                             required: false,
//                                             type: 'email'
//                                         },
//                                     ]}
//                                 >
//                                     <Input placeholder='examplae@mail.com'  prefix={<MailOutlined />} />
//                                 </Form.Item>
//                             </Col>

//                             {/* <Col sm={24} xs={24} md={24} xxl={12} xl={12} lg={12}>
//                                 <Form.Item
//                                     name="website_url"
//                                     label="Website"
//                                 >
//                                     <Input  prefix={<GlobalOutlined />} placeholder="https://www.example.com" />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col span={24}>
//                                 <AddressForm handlePinCodeChange={handlePinCodeChange} />
//                             </Col> */}

//                             {/* <Col sm={24} xs={24} md={24} xxl={24} xl={24} lg={24}>
//                                 <Form.Item
                                    
//                                     name="business_info"
//                                     label="About The Business"
//                                     rules={[
//                                         {
//                                             required:false,
//                                         }
//                                     ]}
//                                 >
//                                     <Input.TextArea showCount rows={8} maxLength={2000} />
//                                 </Form.Item>
//                             </Col> */}


//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="established_on"
//                                     label="Year Of Establishment"
//                                 >
//                                     <Input className='w-full' placeholder='YYYY' />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="GSTIN"
//                                     label="GSTIN"
//                                 >
//                                     <Input placeholder='re5426f7f78vjhb'  prefix={<HiDocumentText />} />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="CIN_No"
//                                     label="CIN"
//                                 >
//                                     <Input placeholder='562535xxx'  prefix={<HiDocumentText />} />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="director"
//                                     label="Director"
//                                 >
//                                     <Input placeholder='Mr.Rajendra'  prefix={<PiUserSquare />} />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="RoC"
//                                     label="RoC"
//                                 >
//                                     <Input placeholder='Roc..' />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="DIN"
//                                     label="DIN"
//                                 >
//                                     <Input placeholder='5635xxx' />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="company_No"
//                                     label="Company Number"
//                                 >
//                                     <Input placeholder='12635xxx' />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="nature"
//                                     label="Nature Of Business"
//                                 >
//                                     <Input  prefix={<MdOutlineNature />} />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="turn_over"
//                                     label="Annual Turnover"
//                                 >
//                                     <Input  prefix={<FaIndianRupeeSign />} />
//                                 </Form.Item>
//                             </Col> */}

//                             {/* <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
//                                 <Form.Item
//                                     name="employee_count"
//                                     label="Number of Employees"
//                                 >
//                                     <Input placeholder='1000'  prefix={<BsPersonArmsUp />} />
//                                 </Form.Item>
//                             </Col> */}

//                             <Col span={24}>
//                                 <Row justify='center'>
//                                     <Col>
//                                         <Form.Item
//                                             name="agreement"
//                                             valuePropName="checked"
//                                             rules={[
//                                                 {
//                                                     validator: (_, value) =>
//                                                         value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
//                                                 },
//                                             ]}>
//                                             <Checkbox>
//                                                 I agree to<Link href='about/Terms-Condition'>Terms and Conditions</Link>
//                                             </Checkbox>
//                                         </Form.Item>
//                                     </Col>
//                                 </Row>
//                             </Col>

//                             <Col xl={24} sm={24} xs={24} md={24} xxl={24} lg={24} >
//                                 <Form.Item >
//                                     <Button loading={useloading} block  style={{background:'#3c89d0',color:'white'}} htmlType="submit">
//                                         Register
//                                     </Button>
//                                 </Form.Item>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Card>
//             </Col>
//         </Row>
//     )
// }