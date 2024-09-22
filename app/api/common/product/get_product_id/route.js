import { serverUrl } from "@/utils/Server"

    export async function GET(request) {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const res = await fetch(`${serverUrl}/api/listings/individual-business-page/${id}/`, {
            method: 'POST',
           
        })
        const product = await res.json()

        return Response.json(product)
    }


