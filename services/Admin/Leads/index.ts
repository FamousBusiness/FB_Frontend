import Cookies from "js-cookie";





export const get_all_leads = async (
      url: string,
    ): Promise<any> => {
      try {
        const accessToken = Cookies.get("accessToken");
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        const res = await fetch(
          url,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!res.ok) {
          // If the response status is not within the range 200-299
          throw new Error(`Failed to fetch product (status ${res.status})`);
        }
        const data = await res.json();
        // console.log("similar", data)
        return data;
        
      } catch (error) {
        console.log("Error in getting product by category ID (service) =>", error);
        throw error; // Re-throw the error to handle it in the calling code
      }
};


type LeadRequestData = {
  individual_lead_id?: number;
  lead?: number;
};


export const AuthLeads = async (requestdata: LeadRequestData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lead-api/business-page-lead-view/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify(requestdata),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${data} and response ${res.json()}`);
    }
    
    // console.log("indivisual leads after click", data);
    return data;
  } catch (error) {
    // console.log("Error in getting brands by ID (service) =>", error);
    throw error;
  }
};
