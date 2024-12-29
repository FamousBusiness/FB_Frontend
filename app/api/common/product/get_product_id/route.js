// import { serverUrl } from "@/utils/Server"



export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const serverUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True'
        ? 'http://127.0.0.1:8000' 
        : 'https://api.famousbusiness.in';

    const res = await fetch(`${serverUrl}/api/listings/individual-business-page/${id}/`, {
        method: 'POST',
    })
    const product = await res.json()

    return Response.json(product);

};


