import React from 'react';
// import { toPng } from 'html-to-image';
// import { jsPDF } from 'jspdf';
// import html2pdf from 'html2pdf';
// import { Modal, Typography } from 'antd';
// import PdfPrinter from 'pdfmake';


// import Image from 'next/image';

// const { Text, Title, Paragraph } = Typography

const InvoiceModal = ({
    isOpen,
    setIsOpen,
    invoiceInfo,
    items,
    onAddNextInvoice,
}) => {
    // var printer = new PdfPrinter(fonts);
    
    // function closeModal() {
    //     setIsOpen(false);
    // }

    // const addNextInvoiceHandler = () => {
    //     setIsOpen(false);
    //     onAddNextInvoice();
    // };

    // pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // const SaveAsPDFHandler = () => {
    //     const dom = document.getElementById("print");
    
    //     html2canvas(dom, { scale: 2 }).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    
    //         const docDefinition = {
    //             pageSize: "A4",
    //             content: [
    //                 {
    //                     image: imgData,
    //                     width: 500, // Adjust based on your needs
    //                 },
    //             ],
    //         };
    
    //         pdfMake.createPdf(docDefinition).download(`invoice-${Date.now()}.pdf`);
    //     }).catch((error) => {
    //         console.error("Error generating PDF:", error);
    //     });
    // };

    // const SaveAsPDFHandler = () => {
    //     const dom = document.getElementById('print');

    //     toPng(dom)
    //         .then((dataUrl) => {
    //             const img = new Image();
    //             img.crossOrigin = 'annoymous';
    //             img.src = dataUrl;
    //             img.onload = () => {
    //                 // Initialize the PDF.
    //                 const pdf = new jsPDF({
    //                     orientation: 'portrait',
    //                     unit: 'pt',
    //                     format: [612, 792],
    //                 });

    //                 // Define reused data
    //                 const imgProps = pdf.getImageProperties(img);
    //                 const imageType = imgProps.fileType;
    //                 const pdfWidth = pdf.internal.pageSize.getWidth();

    //                 // Calculate the number of pages.
    //                 const pxFullHeight = imgProps.height;
    //                 const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
    //                 const nPages = Math.ceil(pxFullHeight / pxPageHeight);

    //                 // Define pageHeight separately so it can be trimmed on the final page.
    //                 let pageHeight = pdf.internal.pageSize.getHeight();

    //                 // Create a one-page canvas to split up the full image.
    //                 const pageCanvas = document.createElement('canvas');
    //                 const pageCtx = pageCanvas.getContext('2d');
    //                 pageCanvas.width = imgProps.width;
    //                 pageCanvas.height = pxPageHeight;

    //                 for (let page = 0; page < nPages; page++) {
    //                     // Trim the final page to reduce file size.
    //                     if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
    //                         pageCanvas.height = pxFullHeight % pxPageHeight;
    //                         pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
    //                     }
    //                     // Display the page.
    //                     const w = pageCanvas.width;
    //                     const h = pageCanvas.height;
    //                     pageCtx.fillStyle = 'white';
    //                     pageCtx.fillRect(0, 0, w, h);
    //                     pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

    //                     // Add the page to the PDF.
    //                     if (page) pdf.addPage();

    //                     const imgData = pageCanvas.toDataURL(`image/₹{imageType}`, 1);
    //                     pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
    //                 }
    //                 // Output / Save
    //                 pdf.save(`invoice-₹{invoiceInfo.invoiceNumber}.pdf`);
    //             };
    //         })
    //         .catch((error) => {
    //             console.error('oops, something went wrong!', error);
    //         });
    // };

    return (
        <></>
        // <Modal width={'auto'} footer={null} centered open={isOpen} onCancel={closeModal} >

        //     <div className="my-8 inline-block w-full max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-middle  transition-all">

        //         {/* New Design */}

        //         <div id="print">
        //             <div className=' p-6'>
        //                 <div class="grid grid-cols-2 items-center p-4">
        //                     <div>
        //                         {/* <!--  Company logo  --> */}
        //                         {/* <image src={'/Verified/verified1.svg'} alt="company-logo" height={100} width={100} /> */}
        //                     </div>

        //                     <div class="text-right">
        //                         <Title level={2} type='danger'>
        //                             {invoiceInfo.cashierName}
        //                         </Title>
        //                         <Text type='secondary' class="text-gray-500 text-sm">
        //                             {invoiceInfo.cashierEmail}
        //                         </Text>
        //                         <Paragraph class="text-gray-500 text-sm mt-1">
        //                             {invoiceInfo.cashierPhone}
        //                         </Paragraph>
        //                         <Paragraph class="text-gray-500 text-sm mt-1">
        //                             GST NO: {invoiceInfo.cashierGST}
        //                         </Paragraph>
        //                     </div>
        //                 </div>

        //                 {/* <!-- Client info --> */}
        //                 <div class="grid grid-cols-2 items-center mt-8">
        //                     <div>
        //                         <p class="font-bold text-gray-800">
        //                             Bill to :
        //                         </p>
        //                         <p class="text-gray-500">
        //                             {invoiceInfo.customerName}
        //                             <br />
        //                             {invoiceInfo.customerAddress}
        //                         </p>
        //                         <p class="text-gray-500">
        //                             {invoiceInfo.customerEmail}
        //                         </p>
        //                         <p class="text-gray-500 text-sm mt-1">
        //                             {invoiceInfo.customerPhone}
        //                         </p>
        //                     </div>

        //                     <div class="text-right">
        //                         <p class="">
        //                             Invoice number:
        //                             <span class="text-gray-500">{invoiceInfo.invoiceNumber}</span>
        //                         </p>
        //                         <p>
        //                             Invoice date: <span class="text-gray-500">{invoiceInfo.today}</span>
        //                             <br />
        //                             Due date:<span class="text-gray-500">{invoiceInfo.today}</span>
        //                         </p>
        //                     </div>
        //                 </div>

        //                 {/* <!-- Invoice Items --> */}
        //                 <div class="-mx-4 mt-8 flow-root sm:mx-0">
        //                     <table cellPadding={10} class="min-w-full">

        //                         <thead class=" border-b-2 border-gray-300 text-gray-900">
        //                             <tr>
        //                                 <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Items</th>
        //                                 <th scope="col" class="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Quantity</th>
        //                                 <th scope="col" class="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Price</th>
        //                                 <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Amount</th>
        //                             </tr>
        //                             <hr />
        //                         </thead>

        //                         <tbody>

        //                             {items.map((item) => (

        //                                 <tr className=' border-b-2' key={item.id}>
        //                                     <td className="w-full">{item.name}</td>
        //                                     <td className="min-w-[50px] text-center">
        //                                         {item.qty}
        //                                     </td>
        //                                     <td className="min-w-[80px] text-right">
        //                                         ₹{Number(item.price).toFixed(2)}
        //                                     </td>
        //                                     <td className="min-w-[90px] text-right">
        //                                         ₹{Number(item.price * item.qty).toFixed(2)}
        //                                     </td>
        //                                 </tr>

        //                             ))}

        //                         </tbody>
        //                         <tfoot>
        //                             <tr>
        //                                 <th scope="row" colspan="3" class="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Subtotal</th>
        //                                 <th scope="row" class="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal</th>
        //                                 <td class="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">₹{invoiceInfo.subtotal.toFixed(2)}</td>
        //                             </tr>
        //                             <tr>
        //                                 <th scope="row" colspan="3" class="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Tax</th>
        //                                 <th scope="row" class="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Tax</th>
        //                                 <td class="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">₹{invoiceInfo.taxRate.toFixed(2)}</td>
        //                             </tr>
        //                             <tr>
        //                                 <th scope="row" colspan="3" class="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Discount</th>
        //                                 <th scope="row" class="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Discount</th>
        //                                 <td class="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">₹{invoiceInfo.discountRate.toFixed(2)}</td>
        //                             </tr>
        //                             <tr>
        //                                 <th scope="row" colspan="3" class="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">Total</th>
        //                                 <th scope="row" class="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total</th>
        //                                 <td class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"> ₹
        //                                     {invoiceInfo.total % 1 === 0
        //                                         ? invoiceInfo.total
        //                                         : invoiceInfo.total.toFixed(2)}</td>
        //                             </tr>
        //                         </tfoot>
        //                     </table>
        //                 </div>

        //                 {/* <!--  Footer  --> */}
        //                 {/* <div class="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
        //                 Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.
        //             </div> */}
        //             </div>

        //         </div>





        //         {/* New Design */}












        //         <div className="mt-4 flex space-x-2 px-4 pb-6">
        //             <button
        //                 className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
        //                 onClick={SaveAsPDFHandler}
        //             >
        //                 <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     className="h-4 w-4"
        //                     fill="none"
        //                     viewBox="0 0 24 24"
        //                     stroke="currentColor"
        //                 >
        //                     <path
        //                         strokeLinecap="round"
        //                         strokeLinejoin="round"
        //                         strokeWidth={2}
        //                         d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        //                     />
        //                 </svg>
        //                 <span>Download</span>
        //             </button>
        //             <button
        //                 onClick={addNextInvoiceHandler}
        //                 className="flex w-full items-center justify-center space-x-1 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
        //             >
        //                 <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     className="h-4 w-4"
        //                     fill="none"
        //                     viewBox="0 0 24 24"
        //                     stroke="currentColor"
        //                 >
        //                     <path
        //                         strokeLinecap="round"
        //                         strokeLinejoin="round"
        //                         strokeWidth={2}
        //                         d="M13 5l7 7-7 7M5 5l7 7-7 7"
        //                     />
        //                 </svg>
        //                 <span>Next</span>
        //             </button>
        //         </div>
        //     </div>

        // </Modal>
    );
};

export default InvoiceModal;