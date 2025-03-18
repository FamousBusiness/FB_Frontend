import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://famousbusiness.in"; // Replace with your domain

  // Fetch dynamic paths from Django backend
  const res = await fetch("https://api.yourdomain.com/get-sitemap-urls");
  const { businesses, locations, keywords } = await res.json();


  // Static paths
  const staticPaths = [
    `${baseUrl}/`,
    `${baseUrl}/category`,
  ];


  // Dynamic paths
  const dynamicPaths = [
    ...businesses.map((slug) => `${baseUrl}/userprofile/${slug}`),
    ...locations.map((slug) => `${baseUrl}/${slug}`),
    ...keywords.map(({ location, keyword }) => `${baseUrl}/${location}/${keyword}`),
  ];


  // Generate XML format
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...staticPaths, ...dynamicPaths]
      .map((url) => `<url><loc>${url}</loc></url>`)
      .join("")}
  </urlset>`;


  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
