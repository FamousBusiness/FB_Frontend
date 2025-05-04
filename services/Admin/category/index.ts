

import Cookies from "js-cookie";


export const get_all_categories = async () => {
  try {

    const res = await fetch(`${process.env.SERVER_API_SECRET}/api/listings/category/`, {
      method: 'GET',
    });
    const data = await res.json();
    // console.log("all category",data);
    return data;
   
  } catch (error) {
    console.log('Error in getting all Categories (service) =>', error)
  }
}

export const add_new_category = async (formData: any) => {
  try {
      const res = await fetch(`${process.env.SERVER_API_SECRET}/api/listings/category/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Cookies.get('token')}`
          },
          body: JSON.stringify(formData),
      });
      const data = await res.json();
      return data;
  } catch (error) {
      console.log('Error in Add New Category (service) =>', error);
  }
}

interface Category {
  id: number;
  type: string;
  // Add other properties as needed
}


export const get_category_by_id = async (id: number): Promise<string | undefined> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_SECRET}/listings/category/`, {
      method: 'GET',
    });

    const categories: { data: Category[] } = await res.json();
    // console.log(categories);

    const all: Category[] = categories.data;
    // console.log("all", all);

    // Assuming the response is an array of categories
    const categoryMatch = all.find((category) => category.id === id);

    if (categoryMatch) {
      // Return the name if a match is found
      // console.log("category name",categoryMatch.type)
      return categoryMatch.type;
    } else {
      return undefined; // Return undefined if no match is found
    }
  } catch (error) {
    console.log('Error in getting Categories by ID (service) =>', error);
    return undefined;
  }
};




export const delete_a_category = async (id:string) => {
  try {
    const res = await fetch(`/api/Admin/category/delete-category?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    })

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in deleting Categories (service) =>', error)
  }
}


export const update_a_category = async (formData : any) => {
  try {
    const res = await fetch(`${process.env.SERVER_API_SECRET}/api/listings/category-upload-update/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in updating Categories (service) =>', error)
  }
}