import { serverUrl } from "@/utils/Server"



export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const CityName = searchParams.get('city');
  const Category = searchParams.get('category');

  const res = await fetch(`${serverUrl}/api/listings/all-business-page-api/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
    cache:'force-cache'
  })

  const data = await res.json()
  
  return Response.json(data)
}