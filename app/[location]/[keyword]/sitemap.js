

export default async function sitemap() {
    const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' 
      ? "http://127.0.0.1:8000" 
      : 'https://api.famousbusiness.in';
  
    try {
      const res = await fetch(`${apiUrl}/api/listings/location/city/sitemap/`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch sitemap data: ${res.statusText}`);
      }
  
      const { locations } = await res.json();
  
      let sitemapEntries = [];
  
      Object.entries(locations).forEach(([city, cityKeywords]) => {
        const formattedCity = city.replace(/\s+/g, '-'); // Replace spaces with hyphens
  
        cityKeywords.forEach(keyword => {
          const formattedKeyword = keyword.replace(/\s+/g, '-'); // Replace spaces with hyphens
  
          sitemapEntries.push({
            url: `https://famousbusiness.in/${formattedCity}/${formattedKeyword}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
          });
        });
      });
  
      return sitemapEntries;
  
    } catch (error) {
      console.error("Error fetching sitemap data:", error);
      return [];
    }
  }
  