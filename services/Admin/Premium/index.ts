'use client';

import Cookies from "js-cookie";
import { useState } from "react";



const ServerMmode = process.env.NEXT_IS_DEVELOPMENT;
let apiURL = '';

if (ServerMmode === 'True') {
  apiURL = 'http://127.0.0.1:8000'
} else {
  apiURL = 'https://api.famousbusiness.in'
};
// NEXT_PUBLIC_IS_DEVELOPMENT
// process.env.NEXT_PUBLIC_API_URL
export const GetAllPlans = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' 
    ? "http://127.0.0.1:8000" 
    : 'https://api.famousbusiness.in';

  try {
    const res = await fetch(
      `${apiUrl}/premium-plan-api/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    // console.log("data", data);
    return data.data;

  } catch (error) {
    console.log("Error in getting brands by ID (service) =>", error);
  }
};

// Premium Plan Dashboard of a particular user.

export const PremiumPlan = async (baseurl: string) => {
  try {
    const res = await fetch(`${baseurl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log("Error in getting brands by ID (service) =>", error);
  }
};

export const CancelPlan = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/premium-plan-api/cancel-plan/${id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    // const data = res
    return res;
  } catch (error) {
    console.log("Error in getting brands by ID (service) =>", error);
  }
};
