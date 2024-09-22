import Back from "@/components/admin/CommonBackHeader/Back";
import NextBreadcrumb from "@/components/NextBreadcrum";
import BidForm from "@/components/users/Tender/BidForm";
import { UserOutlined } from "@ant-design/icons";
import { Row, Col, Divider, Button, Form, Input, Avatar } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from "next/link";
import { BsBookmarkCheck, BsMessenger } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Page() {


    return (<>
        <Row justify='center'>

            {/* Desktop View */}
            {/* Desktop View */}
            {/* Desktop View */}
            {/* Desktop View */}
            {/* Desktop View */}
            {/* Desktop View */}


            <Col xs={0} sm={0} md={0} lg={23} xl={23} xxl={23}>

                <Row className=" relative">
                    <Col span={14}>
                  <NextBreadcrumb separator=">" capitalizeLinks={true}/>
                        <Row gutter={[0, 24]}>
                            <Col span={23}>
                                <div className=" text-3xl font-extrabold font-sans my-4">Tender Details</div>
                                <hr />
                            </Col>
                            <Col span={11}>
                                <Row gutter={[12, 24]} style={{ borderRightWidth: .5, borderColor: 'grey' }}>
                                    <Col span={24} >
                                        <Row gutter={[12, 24]}>
                                            <Col>

                                                <p className=" text-xl font-bold">Tender ID</p>
                                            </Col>:
                                            <Col>
                                                <p className=" text-xl ">23252264</p>

                                            </Col>



                                        </Row>

                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={12}>
                                            <Col>

                                                <p className=" text-xl font-bold">Tender Type</p>
                                            </Col>:
                                            <Col>
                                                <p className=" text-xl ">Type</p>

                                            </Col>



                                        </Row>

                                    </Col>
                                </Row>

                            </Col>

                            <Col span={11}>
                                <Row justify='end' gutter={[12, 24]}>
                                    <Col span={22}>
                                        <Row gutter={[12, 24]}>
                                            <Col>

                                                <p className=" text-xl font-bold">Tender Price</p>
                                            </Col>:
                                            <Col>
                                                <p className=" text-xl ">₹ 1236534</p>

                                            </Col>



                                        </Row>

                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={12}>
                                            <Col>

                                                <p className=" text-xl font-bold"></p>
                                            </Col>
                                            <Col>
                                                <p className=" text-xl "></p>

                                            </Col>



                                        </Row>

                                    </Col>
                                </Row>

                            </Col>

                            {/* Description */}
                            <Col span={23}>
                                <Row gutter={[12, 24]}>
                                    <Col span={24}>
                                        <div className=" text-3xl font-extrabold font-sans my-4">Description</div>
                                        <hr />
                                    </Col>
                                    <Col span={23}>
                                        <p className=" text-lg text-slate-500">
                                            Nostrud incididunt eu do incididunt aute ut duis labore adipisicing eu officia sint. Est aliqua enim ut labore adipisicing ut sit veniam ullamco labore eiusmod ad laborum. Amet nisi dolore aliqua quis dolor proident sit quis nostrud sit eu eiusmod id. Elit ex voluptate dolor id reprehenderit adipisicing fugiat duis nostrud sit incididunt consectetur aliquip fugiat. In Lorem enim exercitation incididunt elit cillum aute pariatur cupidatat est eiusmod in.
                                        </p>
                                    </Col>
                                </Row>

                            </Col>

                            {/* Document */}
                            <Col span={23}>
                                <div className=" text-2xl font-extrabold font-sans my-4">Document</div>
                                <hr className=" mb-4" />
                                <Row gutter={[12, 12]}>
                                    <Col>
                                        <a href="/path-to-your-file/filename.extension" download>Download File 1</a>
                                    </Col>
                                    <Col>
                                        <a href="/path-to-your-file/filename.extension" download>Download File 1</a>
                                    </Col>
                                    <Col>
                                        <a href="/path-to-your-file/filename.extension" download>Download File 1</a>
                                    </Col>
                                    <Col>
                                        <a href="/path-to-your-file/filename.extension" download>Download File 1</a>
                                    </Col>
                                    <Col>
                                        <a href="/path-to-your-file/filename.extension" download>Download File 1</a>
                                    </Col>
                                    <Col>
                                        <a href="/path-to-your-file/filename.extension" download>Download File 1</a>
                                    </Col>
                                    <Col>
                                        <a href="/path-to-your-file/filename.extension" download>Download File 1</a>
                                    </Col>

                                </Row>


                            </Col>


                            {/* Posted By  */}

                            <Col span={23}>
                                <div className=" text-2xl font-extrabold font-sans my-4">Posted By</div>
                                <hr className=" mb-4" />
                                <Row align='middle' gutter={[12, 12]} className=" p-4 bg-slate-200">

                                    <Col >

                                        <Avatar shape='circle' className=" h-14 w-14" size='large' icon={<UserOutlined />} />

                                    </Col>

                                    <Col>
                                        <div className=" text-lg font-medium py-1"> Kamlesh</div>
                                        <div><Link href='#'>View Profile</Link></div>

                                    </Col>

                                </Row>
                            </Col>

                            {/* Tender Guidlines  */}
                            <Col span={23}>
                                <Row align='middle' justify='space-between'>
                                    <Col>
                                        <div className=" text-2xl font-extrabold font-sans my-4">Tender Guidlines</div>

                                    </Col>
                                    <Col><Link href='#'>More</Link>
                                    </Col>
                                </Row>
                                <hr className=" mb-4" />
                                <Row align='middle' gutter={[12, 12]}>
                                    <Col span={1}>
                                        <BsBookmarkCheck />
                                    </Col>
                                    <Col span={23}>
                                        Be careful when paying offline
                                    </Col>

                                    <Col span={1}>
                                        <BsBookmarkCheck />
                                    </Col>
                                    <Col span={23}>
                                        Be careful when paying offline
                                    </Col>
                                    <Col span={1}>
                                        <BsBookmarkCheck />
                                    </Col>
                                    <Col span={23}>
                                        Be careful when paying offline
                                    </Col>
                                    <Col span={1}>
                                        <BsBookmarkCheck />
                                    </Col>
                                    <Col span={23}>
                                        Be careful when paying offline
                                    </Col>


                                </Row>
                            </Col>


                        </Row>

                    </Col>





                    <Col span={10} >
                        <div className=" bg-green-700 w-full p-6 sticky top-28  border border-1">
                            <Row justify='center' gutter={[0, 12]}>
                                <Col span={24}>
                                    <div className=" flex flex-col items-center">
                                        <div className=" text-3xl font-extrabold text-white text-center">
                                            Apply For Tender
                                        </div>
                                        <div className=" text-lg mt-2 font-extrabold font-serif text-white flex flex-row items-center">
                                            <p className=" px-1">Be Venter</p> | <p className=" px-1">Be Tender</p>
                                        </div>

                                    </div>


                                </Col>

                                <Col span={23}>

                                    <BidForm />

                                </Col>


                            </Row>

                        </div>
                    </Col>
                </Row>

            </Col>


            {/* Mobile View */}
            {/* Mobile View */}
            {/* Mobile View */}
            {/* Mobile View */}
            {/* Mobile View */}
            <Col xs={24} md={24} sm={24} lg={0} xl={0} xxl={0}>
                <Row justify='center' gutter={[8, 14]}>
                    <Col span={22} className=" border border-1 rounded-md p-4 bg-slate-50" >
                        <Row justify='space-around' gutter={[6, 12]}>
                            <Col span={11} className=" text-base font-medium">Tender Id: 43321524354</Col>
                            <Col span={11} className=" text-base font-medium">Tender Price: ₹ 43542321</Col>
                            <Col span={23} className=" text-base font-medium">Tender Type: Type</Col>
                        </Row>

                    </Col>
                    <Col span={22}>
                        <Row justify='end'>
                            <Col span={4}  className=" border border-1 rounded-sm text-center font-semibold">
                            <Link href='#apply'>Apply</Link>
                            </Col>
                        </Row>
                      
                    </Col>
                    <Col span={22} className=" border border-1 rounded-md p-4 bg-slate-50" >
                        <Row justify='space-around' gutter={[6, 12]}>
                            <Col span={23} className=" text-base font-medium">Description</Col>

                            <Col span={23}>
                                Nostrud incididunt eu do incididunt aute ut duis labore adipisicing eu officia sint. Est aliqua enim ut labore adipisicing ut sit veniam ullamco labore eiusmod ad laborum. Amet nisi dolore aliqua quis dolor proident sit quis nostrud sit eu eiusmod id. Elit ex voluptate dolor id reprehenderit adipisicing fugiat duis nostrud sit incididunt consectetur aliquip fugiat. In Lorem enim exercitation incididunt elit cillum aute pariatur cupidatat est eiusmod in.
                            </Col>

                        </Row>

                    </Col>



                    <Col span={24} className=" h-3 bg-slate-100">
                    </Col>

                    <Col span={22} className=" text-lg font-semibold">
                        Documents
                    </Col>
                    
                    <Col span={22}>
                        <Row justify='space-around' gutter={[6,10]}>
                            <Col span={5} className=" bg-slate-100 py-1 px-2 h-24 text-xs border border-1 rounded-sm"></Col>
                            <Col span={5} className=" bg-slate-100 py-1 px-2 h-24 text-xs border border-1 rounded-sm"></Col>
                            <Col span={5} className=" bg-slate-100 py-1 px-2 h-24 text-xs border border-1 rounded-sm"></Col>
                            <Col span={5} className=" bg-slate-100 py-1 px-2 h-24 text-xs border border-1 rounded-sm"></Col>
                            <Col span={5} className=" text-xs text-center rounded-sm"><Link href=''>Download</Link></Col>
                            <Col span={5} className=" text-xs text-center rounded-sm"><Link href=''>Download</Link></Col>
                            <Col span={5} className=" text-xs text-center rounded-sm"><Link href=''>Download</Link></Col>
                            <Col span={5} className=" text-xs text-center rounded-sm"><Link href=''>Download</Link></Col>
                        </Row>
                    </Col>

                    <Col span={24} className=" h-3 bg-slate-100">
                    </Col>
                    <Col span={22} className=" text-lg font-semibold">
                        Posted by
                    </Col>
                    <Col span={22}>
                        <Row align='middle' gutter={[12, 12]} className=" p-4 bg-slate-200">

                            <Col >

                                <Avatar shape='circle' className=" h-14 w-14" size='large' icon={<UserOutlined />} />

                            </Col>

                            <Col>
                                <div className=" text-lg font-medium py-1"> Kamlesh</div>
                                <div><Link href='#'>View Profile</Link></div>

                            </Col>

                        </Row>
                    </Col>
                    <Col span={24} className=" h-3 bg-slate-100">
                    </Col>

                    <Col span={22} className=" text-lg font-semibold">
                        Tender Guidlines
                    </Col>


                    <Col span={24} className=" h-3 bg-slate-100">
                    </Col>

                    <Col span={22}>
                        <div id="apply">
                            <BidForm />
                        </div>
                    </Col>
                </Row>

            </Col>
            <Col span={24}>
                <Footer className=' text-center bg-green-700 text-white'>All rights reserved by FamousBusiness</Footer>
            </Col>


        </Row>



    </>

    )
}