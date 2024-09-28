'use client'

import { useEffect, useState } from "react";


const ServerMode = process.env.NEXT_PUBLIC_IS_DEVELOPMENT;


export const environmentMode = ()=> {
    const [apiURL, setApiURL] = useState('');

    useEffect(() => {
        if (ServerMode == 'True') {
            setApiURL(process.env.NEXT_PUBLIC_DEVELOPMENT_URL);
        } else {
            setApiURL(process.env.NEXT_PUBLIC_API_URL);
        }
    }, []);

    return apiURL;

};
