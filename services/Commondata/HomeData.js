// useHomeData.js
"use client";

import useSWR from 'swr';
import { useGlobalState } from '../LocationDetector/GlobalState';
import { serverUrl } from '@/utils/Server';
import { useAuth } from '@/context/AuthContext';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';


const fetcher = async (url, csrftoken) => {
  try {
    // console.log("from home data fetch", locationState);
    const response = await fetch(url, {
      method: 'GET',
      cache:'force-cache',
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRFToken': csrftoken
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log("from home data fetch", data);
    return data.results;
  } catch (error) {
    // console.error('Error fetching data:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
};



export const useHomeData = () => {
  const { locationState } = useGlobalState();
  const { csrftoken } = useAuth()
  const [apiUrl, setApiURL] = useState('');

  //// Modify API URL According to the api Url
  useEffect(()=> {
    const is_development = process.env.NEXT_PUBLIC_IS_DEVELOPMENT

    if (is_development === 'True') {
      setApiURL('http://127.0.0.1:8000')
    } else {
      setApiURL('https://api.famousbusiness.in')
    }
  }, []);


   // Fetch data only when apiUrl is set
   const shouldFetch = !!apiUrl
  

  const { data: homedata, error } = useSWR(
    shouldFetch ?
      [`${apiUrl}/api/listings/?city=${locationState?.city}&state=${locationState?.state}`, csrftoken]
      : null,
    fetcher,
    {
      // revalidateOnMount: true,
      // revalidateOnFocus: true,
      compare: (a, b) => {
        // Check if the data has changed
        return JSON.stringify(a) === JSON.stringify(b);
      },
    }
  );

  return {
    homedata,
    isLoading: !homedata && !error,
    isError: error,
  };
};
