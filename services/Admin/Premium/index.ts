import Cookies from "js-cookie";



const ServerMmode = process.env.NEXT_IS_DEVELOPMENT;
let apiURL = '';

if (ServerMmode === 'True') {
    apiURL = 'https://api.famousbusiness.in'
} else {
    apiURL = 'http://127.0.0.1:8000'
};


export const GetAllPlans = async () => {
  try {
    const res = await fetch(
      `${apiURL}/premium-plan-api/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${Cookies.get("accessToken")}`,
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
