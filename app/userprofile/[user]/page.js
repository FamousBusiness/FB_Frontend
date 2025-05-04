
import BusinessProfileContent from '../content';
import { notFound } from 'next/navigation';


async function getProductById(id) {
    const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? "http://127.0.0.1:8000" : 'https://api.famousbusiness.in'

    try {
      const res = await fetch(`${apiUrl}/api/listings/individual-business-page/${id}/`, {
        method: 'POST',
        cache: 'no-store',
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch product (status ${res.status})`);
      }
  
      const data = await res.json();
    //   console.log('data', data)
      return data.data.Business_data;

    } catch (error) {
      console.error("Server error fetching product:", error);
      return null;
    }
}




export default async function Page({ searchParams }) {
    const id = searchParams?.z_id;
    
    if (!id) return notFound();

    const business = await getProductById(id);
    // console.log('business', business)
    
    if (!business) {
        return (
        <div className="w-full p-6">
            <p className="text-red-500">Error fetching business data. Please try again.</p>
        </div>
        );
    }

    return (
        <BusinessProfileContent business={business} searchParams={searchParams} />
    )
}






