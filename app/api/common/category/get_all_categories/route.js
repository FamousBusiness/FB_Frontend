import { serverUrl } from "@/utils/Server"
export async function GET() {
  const res = await fetch(`${serverUrl}/api/listings/category/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(),
    // next:{revalidate: 5000}
    cache: 'no-store'

  })

  const data = await res.json()

  return Response.json(data)
}