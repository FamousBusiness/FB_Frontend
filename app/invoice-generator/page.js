import InvoiceForm from './components/InvoiceForm';

function Page() {
    return (
        <div className="min-h-screen relative bg-gray-100 overflow-hidden">
            {/* <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'url("/Invoice.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(20px)',
                }}
            /> */}
            <div className="mx-auto max-w-7xl relative z-10">
                <InvoiceForm />
            </div>
        </div>
    );
}

export default Page;


// import React from 'react'
// import InvoicePage from './components/InvoicePage'
// function App() {
//     const savedInvoice = window.localStorage.getItem('invoiceData')
//     let data = null

//     try {
//         if (savedInvoice) {
//             data = JSON.parse(savedInvoice)
//         }
//     } catch (_e) { }

//     const onInvoiceUpdated = (invoice) => {
//         window.localStorage.setItem('invoiceData', JSON.stringify(invoice))
//     }

//     return (
//         <div className="app">
//             <h1 className="center fs-30">React Invoice Generator</h1>
//             <InvoicePage data={data} onChange={onInvoiceUpdated} />
//         </div>
//     )
// }

// export default App
