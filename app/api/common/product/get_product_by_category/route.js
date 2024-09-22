import { serverUrl } from "@/utils/Server"


    export async function GET(request) {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('cat')
        const res = await fetch(`${serverUrl}/api/listings/category-wise-business/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
            body: JSON.stringify({
                "category": id
            }),
        })
        const product = await res.json()

        return Response.json(product)
    }