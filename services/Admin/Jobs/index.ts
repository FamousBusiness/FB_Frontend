import { message } from "antd";
import Cookies from "js-cookie";

export const GetAllJobs = async (baseUrl: string) => {
  try {
    const res = await fetch(`${baseUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${Cookies.get("accessToken")}`,
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

export const ApplyJob = async (values: Object) => {
  try {
    console.log("Applying", values);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job-api/apply-job/`,
      {
        method: "POST",
        headers: {
          //   "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log("Error in getting brands by ID (service) =>", error);
  }
};
export const PostJob = async (values: Object) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job-api/post-job/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log("Error in getting brands by ID (service) =>", error);
  }
};

export const Job_Profile = async (baseurl: string) => {
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

export const CandidateAppliedJob = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job-api/candidate-applied-jobs/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log("Error in getting brands by ID (service) =>", error);
  }
};
export const CategoryWiseJob = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job-api/category-wise-job/${id}/`,
      {
        method: "GET",
        headers: {
          //   "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.log("Error in getting brands by ID (service) =>", error);
  }
};
