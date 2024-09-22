
import Cookies from "js-cookie";

export const EnquiryIndivisual = async (formData) => {
  try {
    // console.log('indivisual ', formData);
    const res = await fetch(`${process.env.SERVER_API_SECRET}/lead-api/individual-business-page-leads/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Cookies.get("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res;
  } catch (error) {
    console.log("Error in updating Product (service) =>", error);
  }
};

export const CategoryWiseEnquiry = async (formData) => {
  try {
    // console.log('from categoriwiseenquiry ', formData);
    const res = await fetch(`${process.env.SERVER_API_SECRET}/lead-api/enquiry-form/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(formData),
    });
    return res;
  } catch (error) {
    console.log("Error in updating Product (service) =>", error);
  }
};

