// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const ToggleButton = () => {


//     const toggleSwitch = () => setIsOn(!isOn);

//     const justifyClass = isOn ? 'justify-end' : 'justify-start';

//     const spring = {
//         type: "spring",
//         stiffness: 700,
//         damping: 30
//     };

//     return (
//         <div className={`w-56 cursor-pointer items-center flex ${justifyClass} rounded-full bg-blue-300`} onClick={toggleSwitch}>
//             <motion.div className="h-10 w-1/2 bg-white rounded-full flex items-center justify-center" layout transition={spring}>
//                 {isOn ? 'Monthly' : 'Yearly'}
//             </motion.div>
//         </div>
//     );
// }

// export default ToggleButton;

"use client";
import React, { useState } from 'react';
import { Segmented } from 'antd';

const ToggleButton = ({ handlePlan }) => {
    const [isOn, setIsOn] = useState('Monthly');

    const handle = (value) => {
        setIsOn(value);
        handlePlan(value)
    };

    return (<div className=' bg-white shadow-md rounded-full flex justify-between w-96 cursor-pointer h-12 ' >
        {/* <div onClick={() => handle('Monthly')} className={`bg-gradient-to-tr w-1/3 rounded-full text-xl py-2 text-center ${isOn === 'Monthly' && ' from-purple-600 text-white to-orange-400'} duration-300`}>
            6 Month
        </div> */}
        <div onClick={() => handle('Yearly')} className={`bg-gradient-to-tr w-1/3 rounded-full text-xl py-2 text-center ${isOn === 'Yearly' && 'from-purple-600 text-white to-orange-400'} duration-300`}>
            Monthly
        </div>

        <div onClick={() => handle('One Month Free')} className={`bg-gradient-to-tr w-1/3 rounded-full text-xl py-2 text-center ${isOn === 'One Month Free' && 'from-purple-600 text-white to-orange-400'} duration-300`}>
            Free
        </div>
    </div>);
};
export default ToggleButton;