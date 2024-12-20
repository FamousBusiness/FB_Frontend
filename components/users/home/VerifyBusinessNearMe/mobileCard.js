"use client";
import React from "react";
import { Badge, Card, Carousel, Col, Rate, Row } from "antd";
import { BiSolidBusiness } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { StarFilled } from "@ant-design/icons";
import MultiNumber from "../../Filter/MultiNumber";
import EnquiryFormModel from "../../Filter/EnquiryFormModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import Whatsapp from "../../Filter/Whatsapp";
import Paragraph from "antd/es/typography/Paragraph";



function MobileCard({ items }) {
  const router = useRouter();
  const handlePage = () => {
    router.push(`/userprofile/${items.business_name}?z_id=${items.id}`);
  };


  return (
    <Badge.Ribbon
      text="Authorized Dealer"
      className={`py-1 font-bold ${items.authorized ? "visible" : "hidden"}`}
    >
      <Card
        style={{ borderRadius: "20px" }}
        className=" relative dark:text-black bg-white shadow-md border border-1 rounded-md"
      >
        <Row justify="start" align="middle" gutter={[12, 12]}>
          {items.authorized && <Col span={24}></Col>}

          <Col span={10}>
            {items.business_images &&
            Array.isArray(items.business_images) &&
            items.business_images.length > 0 ? (
              <Carousel slidesToScroll={true} autoplay>
                {items.business_images.map((item, index) =>
                  item &&
                  item.image &&
                  Array.isArray(item.image) &&
                  item.image.length > 0
                    ? item.image.map((imageItem, imageIndex) => (
                        <div
                          key={imageItem.id}
                          className=" h-44 w-full relative"
                        >
                          <Image
                            fill
                            src={imageItem.image}
                            loading="lazy"
                            sizes="100%"
                            className=" object-contain"
                            alt={`business-${index}-${imageIndex}`}
                          />
                        </div>
                      ))
                    : null
                )}
              </Carousel>

            ) : (
              <div className=" h-44 w-full relative">
                <Image
                  src={items.picture}
                  alt="business"
                  fill
                  className=" object-contain"
                  sizes="100%"
                />
              </div>
            )}
          </Col>
          
          <Col onClick={handlePage} span={14}>
            {/* Business details */}
            <Row align="middle" gutter={[2, 6]}>
              <Col>
                <BiSolidBusiness className="text-lg text-purple-600" />
              </Col>
              <Col span={18}>
                {/* Truncate long business names */}
                <div className="text-base font-bold truncate line-clamp-1 ">{items.business_name}</div>
              </Col>
              <Col>
                {/* Display verified icon if business is verified */}
                {items.verified && (
                  <MdVerified className="text-blue-600 text-lg" />
                )}
              </Col>
              <Col span={24} className="text-black text-sm font-semibold">
                GSTIN:{items.GSTIN}
              </Col>
              <Col span={24}>
                <Row>
                  {/* <Col>
                                       
                                        <div>{items.trending ? <div style={{ fontSize: 10 }} className='border border-1 bg-purple-600 rounded-md text-white flex flex-row items-center text-center py-1 px-2 '>
                                            <BsFillSunFill className='mr-1' /> Trending</div> : null}</div>
                                    </Col> */}

                  {/* {items.trusted && <Col className='relative'>
                                        <div className=' px-2 rounded-md w-full text-white font-bold text-xs text-center bg-[linear-gradient(to_right,theme(colors.red.600),theme(colors.red.200),theme(colors.orange.600),theme(colors.fuchsia.600),theme(colors.orange.600),theme(colors.red.200),theme(colors.red.600))] bg-[length:200%_auto] animate-gradient'>
                                            Trusted
                                        </div>
                                    </Col>} */}

                  {items.trending && (
                    <Col className="relative ml-4">
                      <div className=" px-2 rounded-md w-full text-white font-bold text-xs text-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                        Trending
                      </div>
                    </Col>
                  )}
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="start" align="middle" gutter={5}>
                  {items.super && (
                    <Col span={6} className=" text-center">
                      <Player
                        src="/profile/tags/saler.json"
                        autoplay
                        loop
                        style={{ width: "80%", margin: 0 }}
                      />
                    </Col>
                  )}
                  {items.premium && (
                    <Col span={6}>
                      <Player
                        src="/profile/tags/premium-badge.json"
                        autoplay
                        loop
                        style={{ width: "70%", margin: 0 }}
                      />
                    </Col>
                  )}

                  {items.industry_leader && (
                    <Col span={6}>
                      <Image
                        src="/Verified/leader.svg"
                        alt="Industry Leader"
                        width={40}
                        height={40}
                      />
                    </Col>
                  )}
                </Row>
              </Col>
              <Col span={24}>
                <Rate
                  style={{ color: "#FF5349" }}
                  character="★"
                  defaultValue={4}
                  disabled
                />
              </Col>
              <Col span={24}>
                <Paragraph className=" text-base" type="secondary">
                  {" "}
                  {`${items.city}-${items.pincode && items.pincode}`}
                </Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            {/* Display multiple mobile numbers */}
            <MultiNumber
              mobileNumbers={items.mobile_numbers}
              default_Number={items.mobile_number}
            />
          </Col>
          <Col span={12}>
            <Whatsapp whatsapp_number={items.whatsapp_number} />
          </Col>
        </Row>

        {/* Display trusted badge if business is trusted */}
        {items.trusted ? (
          <div
            style={{ borderTopLeftRadius: 6 }}
            className="absolute top-0 left-0 px-3 py-1 text-sm shadow-xl text-white font-medium bg-orange-600"
          >
            Trusted
          </div>
        ) : null}
      </Card>
    </Badge.Ribbon>
  );
}

export default MobileCard;
