import { Col, Row } from 'antd'
import Image from 'next/image'
import React from 'react'

function Page() {
  return (
    <div className=' mx-16 bg-white p-4 dark:text-black '>
      <Row justify='center' gutter={[0, 12]}>
        <Col>
          <div className=' relative'>
            <Image src='/about/shipment-getting-ready.svg' width={350} height={350} alt='policy' />
            <div className=' w-full absolute text-2xl bottom-0 font-bold text-blue-600 text-center'>Shipment and Delivery</div>
          </div>
        </Col>
        <Col span={20}>
          <p>
            We regret to inform you that, as of now, <span className=' bg-yellow-300 px-1'>we do not provide shipping and delivery services.</span> Should you have any additional inquiries or require assistance unrelated to shipping and delivery matters, please do not hesitate to contact our dedicated customer support team at customercare@famousbusiness.in. We are committed to ensuring your overall experience with us is seamless and satisfactory.
          </p>
          <p>
            It is imperative for customers to exercise caution and diligence when engaging in transactions involving shipment and delivery services. We strongly advise all customers to thoroughly inspect the products and assess their quality before making any payment. Furthermore, it is crucial to refrain from transferring funds prior to receiving a formal Proforma invoice. We emphasize the importance of directing payments solely to the designated business bank current account and avoiding any transfers to individual accounts.
            WebZotica Business, operating under the legal entity Famous Software Private Limited, explicitly declares that it holds no responsibility for any financial transactions conducted outside the specified guidelines. In the interest of protecting our customers, we advocate for adherence to secure payment protocols and prudent business practices. Your trust and satisfaction are of paramount importance to us, and we appreciate your understanding and cooperation in this matter.
          </p>

          <p>
            In order to ensure a transparent and secure transaction process, we advise customers to prioritize communication with our authorized channels and to exercise due diligence in verifying the legitimacy of all transactions. Always seek clarity on the terms and conditions, as well as the specifics of the products or services being offered, prior to finalizing any agreements. This proactive approach will not only safeguard your financial interests but also contribute to a more reliable and trustworthy business relationship.
          </p>

          <p>
            It is our sincere hope that, by fostering an environment of transparency and responsible business conduct, we can collectively contribute to the prevention of potential misunderstandings and disputes. We value each customer as an integral part of our business community and are dedicated to fostering a positive and secure environment for all transactions.
          </p>
          <p>
            We extend our gratitude for considering WebZotica Business, a division of Famous Software Private Limited, for your business needs. Your commitment to ensuring a secure and reliable transaction process aligns with our values, and we are committed to continuously enhancing our services to meet and exceed your expectations. Should you have any further inquiries or if there is anything else we can assist you with, please feel free to reach out to our customer support team. We are here to help and make your experience with us as smooth and satisfactory as possible.
          </p>

          <p>
            Thank you for your understanding and cooperation.
          </p>
          <p>
            Sincerely,
          </p>
          <p>WebZotica Business Famous Software Private Limited</p>

        </Col>
      </Row>
    </div>
  )
}

export default Page

