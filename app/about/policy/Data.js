import Link from 'next/link'
import React from 'react'

function PolicyDetails() {

    const thBorder = {
        "border": "1px solid black",
        " text-align": "center",
        "padding": "10px",
        // "border-collapse": "collapse
    }

    return (
        <div className=' dark:text-black'>

            <ol type='1' className=' space-y-4'>

                <li>
                    <strong>1.	Information Collection:</strong>
                    <p>
                        We diligently gather publicly available business information that you willingly provide, encompassing critical details such as phone numbers, email addresses, and website information, all essential for the seamless provision of our services. Furthermore, to enrich your user experience, we may employ automatic data collection through cookies and similar technologies. This helps us tailor our offerings to your preferences and optimize the functionality of our platform. Rest assured, we prioritize the security and confidentiality of this information, implementing robust measures to safeguard against unauthorized access or disclosure. Your privacy is of utmost importance to us, and we are committed to transparent practices in handling the data necessary for our services. If you have any concerns or inquiries about your data, please don&apos;t hesitate to contact us.     </p>
                </li>

                <li>
                    <strong>2. Use of Information:</strong>
                    <p>
                        We use the collected information to provide, maintain, and improve our services. This includes customizing content, communicating with you, and ensuring the security of your data. We may also use aggregated and anonymized data for analytical purposes.
                    </p>
                </li>





                {/* business Listing */}

                <li>
                    <strong>3. Information Sharing:</strong>
                    <p>
                        We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted service providers who assist us in delivering our services, subject to strict confidentiality agreements.       </p>
                </li>


                {/* Premium */}

                <li>
                    <strong>4. Security:</strong>
                    <p>
                        We implement industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, and destruction. Despite our efforts, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.  </p>
                </li>


                <li>
                    <strong>5.	Data Retention:</strong>
                    <p>
                        We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.  </p>
                </li>
                <li>
                    <strong>5.	Your Choice:</strong>
                    <p>
                        You have the right to access, update, or delete your personal information. You can also opt-out of certain communications and cookies. However, please note that some features of our services may be affected by your choices.</p>
                </li>
                <li>
                    <strong>5. Children&apos;s Privacy:</strong>
                    <p>
                        Our services are not directed to individuals under the age of 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information. </p>
                </li>
                <li>
                    <strong>8.	Changes to Privacy Policy: </strong>
                    <p>
                        We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of any significant changes through our website or other communication channels.</p>
                </li>
            </ol>

            <table className=' w-full border-1 border bg-white p-3'>
                <tr>
                    <th style={thBorder}>Sr. No.</th>
                    <th style={thBorder}>Source of Information</th>
                    <th style={thBorder}>Nature of Information Collected</th>
                </tr>
                <tr>
                    <td style={thBorder}>1.</td>
                    <td style={thBorder}>
                        Users/Customers
                    </td>
                    <td style={thBorder}> <ol className=' space-y-2'>
                        <li> 1.	Personal Identifying information such as name, address and phone numbers; email Id, Age, personal description, profile photograph etc., & delivery address,</li>
                        <li>2.	payment information.</li>
                        <li>3.	location information.</li>
                        <li>4.	Device information (if you provided).</li>
                        <li>5.	IP address.</li>
                        <li>6.	Name, addresses & phone numbers, e-mail IDs of friends and other people listed in Addresses;</li>
                        <li>7.	Content of reviews and e-mails to us.</li>
                        <li>8.	voice recordings when you call to us.</li>
                        <li>9.	credit usage, login detail, device log files etc., while using our platform.</li>
                        <li>10.	Contacts - address book for app users</li>

                    </ol></td>
                </tr>
                <tr>
                    <td style={thBorder}>2.</td>
                    <td style={thBorder}>Vendors/Sellers</td>
                    <td style={thBorder}>
                        <ol className=' space-y-2'>
                            <li>1.	Personal Identifying information such as name, address and phone numbers; email Id, Age, personal description, profile photograph ,Marital status etc.,.</li>
                            <li>2.	payment information.</li>
                            <li>3.	location information.</li>
                            <li>4.	Device information (if you provided)</li>
                            <li>5.	IP address.</li>
                            <li>6.	Name, addresses & phone numbers, e-mail IDs of friends and other people listed in Addresses.</li>
                            <li>7.	content of reviews and e-mails to us.</li>
                            <li>8.	voice recordings when you call to us.</li>
                            <li>9.	images, videos and other content collected or stored in connection with our Services.</li>
                            <li>10.	information and officially valid documents (KYC regarding identity and address information, including mobile & landline number, place of business, valid Email id, vendor’s photo, id & address proof (such as Aadhar card, Pan Card, GST Voter Id Card, Passport, Shop and Establishment Certificate, etc.,.</li>
                            <li>11.	credit usage</li>
                            <li>12.	corporate and financial information, and</li>
                            <li>13.	device log files and configurations etc.,.</li>

                        </ol>




                    </td>
                </tr>
                <tr>
                    <td style={thBorder}>3.</td>
                    <td style={thBorder}>Automatic Information</td>
                    <td style={thBorder}>
                        <ol className=' space-y-2'>
                            <li>1.	IP address of your device connected to our platform.</li>
                            <li>2.	Login details, e-mail address, and password, device log files etc.</li>
                            <li>3.	location of device/computer.</li>
                            <li>4.	content interaction information, downloads, streaming of video, network details etc.</li>
                            <li>5.	device metrics, application usage, connectivity data, and any errors or event failures.</li>
                            <li>6.	our Services metrics, any technical errors, interactions with our service features and content, settings preferences and backup information, location of device, file name, dates, times etc while using our service.</li>
                            <li>7.	content use history.</li>
                            <li>8.	URLs including date & time; products & contents viewed or searched for; page response times, download errors, length of visits to certain pages, and page interaction information etc.</li>
                            <li>9.	phone numbers used to call to us.</li>
                            <li>10.	Images/videos while visiting our platforms.</li>
                            <li>11.	device identifiers, cookies, browsing history, usage history, and/or other technical information.</li>

                        </ol>

                    </td>
                </tr>

                <tr>
                    <td style={thBorder}>4.</td>
                    <td style={thBorder}>Information from Other Sources</td>
                    <td style={thBorder}>
                        <ol className=' space-y-2'>
                            <li>1.	updated delivery and address information from our carriers or other third parties.</li>
                            <li>2.	account information, purchase or redemption information and page-view information from some merchants/partners for which we provide technical, advertising or other services.</li>
                            <li>3.	information about interactions with vendors while interacting via JD channel.</li>
                            <li>4.	search results and links, including paid/free listings.</li>
                            <li>5.	internet-connected devices details.</li>

                        </ol>
                    </td>
                </tr>
                <tr>
                    <td style={thBorder}>5.</td>
                    <td style={thBorder}>Officials/Employees/Resellers etc.</td>
                    <td style={thBorder}>
                        <ol className=' space-y-2'>
                            <li>  1.	Personal Identifying information such as name, address and phone numbers; email Id, Age, personal description, profile photograph etc.,.</li>
                            <li>  2.	Educational Information.</li>
                            <li>  3.	information and officially valid documents (KYC) regarding identity and address information.</li>
                            <li>  4.	payment information.</li>
                            <li>  5.	location information.</li>
                            <li>  6.	Device information (if you provided)</li>
                            <li>  7.	IP address.</li>
                            <li>  8.	content of reviews and e-mails to us.</li>
                            <li>  9.	voice recordings when you call to us.</li>
                            <li>  10.	login detail, device log files etc., while using our platforms.</li>


                        </ol>
                    </td>
                </tr>
                <tr>
                    <td style={thBorder}>6.</td>
                    <td style={thBorder}>Third Party Information</td>
                    <td style={thBorder}>

                        <ol className=' space-y-2'>
                            <li>  1.	Corporate & financial information about our co-branded partners, delivery partners, and other third party associated with us.</li>
                            <li>  2.	CIN Number, PAN Number, GSTN Number etc.,.</li>
                            <li>  3.	Location information.</li>
                            <li>  4.	Device information (if you provided)</li>
                            <li>  5.	IP address.</li>
                            <li>  6.	Internet-connected devices details.</li>
                            <li>  7.	Identity and address information etc</li>

                        </ol>

                    </td>
                </tr>
            </table>
        </div>
    )
}

export default PolicyDetails