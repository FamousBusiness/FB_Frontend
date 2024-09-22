// "use client";

// import React, { useState, useEffect, useContext } from 'react';
// import Cookies from 'js-cookie';


// const OtpVerification = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [verificationResult, setVerificationResult] = useState(null);
//   const [timer, setTimer] = useState(60);
//   const { OtpVerification } = useContext(AuthContext);

//   const handleOtpChange = (e, index) => {
//     const updatedOtp = [...otp];
//     updatedOtp[index] = e.target.value;
//     setOtp(updatedOtp);
//     console.log(otp.join(''));
//   };

//   const handleVerifyOtp = () => {
//     const values = otp.join(''); // Combine the OTP digits
//     console.log(values);
//     OtpVerification(values);


//     // const storedOtp = Cookies.get('otp') || '';

//     // if (enteredOtp === storedOtp) {
//     //   setVerificationResult('OTP Verified');
//     // } else {
//     //   setVerificationResult('OTP Verification Failed');
//     // }
//   };

//   useEffect(() => {
//     let interval;

//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     }

//     return () => clearInterval(interval);

//   }, [timer]);

//   return (
//     <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
//       <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
//         <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
//           <div className="flex flex-col items-center justify-center text-center space-y-2">
//             <div className="font-semibold text-3xl">
//               <p>OTP Verification</p>
//             </div>
//             <div className="flex flex-row text-sm font-medium text-gray-400">
//               <p>We have sent a code to your Phone +91-{/* Add phone number here */}</p>
//             </div>
//           </div>

//           <div>
//             <form >
//               <div className="flex flex-col space-y-16">
//                 <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs space-x-2">
//                   {/* Create four input fields for OTP */}
//                   {[0, 1, 2, 3].map((index) => (
//                     <div key={index} className="w-16 h-16">
//                       <input
//                         className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-stone-300 focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                         type="text"
//                         name={`otp${index}`}
//                         value={otp[index]}
//                         onChange={(e) => handleOtpChange(e, index)}
//                         maxLength="1"
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-col space-y-5">
//                   <div>
//                     <button
//                       className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
//                       onClick={handleVerifyOtp}
//                     >
//                       Verify Account
//                     </button>
//                   </div>

//                   <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
//                     <p>Didnt receive the code?</p>
//                     {timer === 0 ? (
//                       <a className="flex flex-row items-center text-blue-600" href="#/" onClick={() => setTimer(60)}>
//                         Resend
//                       </a>
//                     ) : (
//                       <span className="text-gray-600">Resend in {timer} seconds</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;

// import { Spin } from 'antd'
import React from 'react'

function loading() {
  return (
    <div className='p-80 flex-1 text-center'>
   Otp
    </div>
  )
}

export default loading
