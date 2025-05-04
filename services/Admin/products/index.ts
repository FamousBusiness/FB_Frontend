import Cookies from "js-cookie";



export const update_a_product = async (formData: any, id: number) => {
  const serverUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True'
        ? 'http://127.0.0.1:8000/api' 
        : 'https://api.famousbusiness.in/api';

  try {
    const res = await fetch(
      `${serverUrl}/listings/businesspage-update/${id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!res.ok) {
      // If the response status is not within the range 200-299
      throw new Error(`Failed to fetch product (status ${res.status})`);
    }
    const data = await res.json();
    return data;

  } catch (error) {
    console.log("Error in updating Product (service) =>", error);
  }
};



export const get_product_by_id = async (id: number) => {
  
  try {
    const res = await fetch(`/api/common/product/get_product_id?id=${id}`, {
      method: "GET",
    });
    
    
    if (!res.ok) {
      // If the response status is not within the range 200-299
      throw new Error(`Failed to fetch product (status ${res.status})`);
    }
    const data = await res.json();
    console.log('data', data)
    const business = data.data;
    return business.Business_data;

  } catch (error) {
    // console.error("Error in getting product by ID (service) =>", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

// Get all products by category id




export const get_product_by_category_id = async (
  category: string,
  city: string,
  // state: string,
  // pincode: string,
  page: number
): Promise<any> => {
  const apiURL = process.env.NEXT_PUBLIC_IS_DEVELOPMENT == 'True' ? 'http://127.0.0.1:8000/api' : 'https://api.famousbusiness.in/api'
  
  try {
    console.log("Getting", page);
    const accessToken = Cookies.get("accessToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const res = await fetch(
      `${apiURL}/listings/category-wise-business/${city}/${category}/?page=${page}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!res.ok) {
      // If the response status is not within the range 200-299
      throw new Error(`Failed to fetch product (status ${res.status})`);
    }
    // console.log("from categories", city, state, category);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in getting product by category ID (service) =>", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};



export const get_all_brands = async (url: string) => {
  try {
    const res = await fetch(`${url}`, {
      method: "GET",
    });

    if (!res.ok) {
      // If the response status is not within the range 200-299
      throw new Error(`Failed to fetch product (status ${res.status})`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log("Error in getting product by category ID (service) =>", error);
  }
};

export const add_new_category = async (formData: any) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_API_SECRET}/api/listings/category/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in Add New Category (service) =>", error);
  }
};

export const get_brand_by_category = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/brand-api/category-wise-brand/${id}/`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    const brand = data.data;
    // console.log("Brands", brand);
    return brand;
  } catch (error) {
    console.log("Error in getting brands by ID (service) =>", error);
  }
};
