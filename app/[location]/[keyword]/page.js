import KeywordPage from "./content";



export async function generateMetadata({ params }) {
    const { location, keyword } = params;
    const formattedLocation = location.replace(/-/g, ' ');
    const formattedKeyword = keyword.replace(/-/g, ' ');


    const queryParams = new URLSearchParams({
        city: formattedLocation,
        keyword: formattedKeyword
    });

    const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? "http://127.0.0.1:8000" : 'https://api.famousbusiness.in'
    const response = await fetch(`${apiUrl}/api/listings/search/keyword/business/?${queryParams.toString()}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();

    // console.log('meta data', data.results)

    const metaTags   = (data?.results?.meta_tag || []).flat();

    const descriptionTags = metaTags
        .filter(tag => tag.name === "description")
        .map(tag => tag.content) 
        .join(" ");
    
    const descriptions = [
        descriptionTags || "Default meta description", 
        "Find the best businesses for your needs.",
        `Explore top services in ${formattedLocation}.`
    ].join(" ");


    return {
        title: data.results?.title_tag || "",
        description: descriptions,

        alternates: {
            canonical: data?.results?.canonical_url
        },
        appLinks: {
            ios: {
              url: data?.results?.meta_ios_url
            },
            // android: {
            //   package: 'com.example.android/package'
            // },
            web: {
              url: data?.results?.meta_web_url
            },
        },
        openGraph: {
            title: data?.results?.open_graph?.og_title || "Default Title",
            description: data?.results?.open_graph?.og_description || "Default og Description",
            url: data?.results?.open_graph?.og_url || "https://famousbusiness.in",
            siteName: 'famousbusiness.in',
            images: [{
                url: data?.results?.open_graph?.og_image,
                width: 800,
                height: 600
            }] || [],
            type: data?.results?.open_graph?.og_type || "website",
          },
        twitter: {
            card: data?.results?.twitter_card?.twitter_card,
            title: data?.results?.twitter_card?.twitter_title,
            description: data?.results?.twitter_card?.twitter_description,
            siteId: data?.results?.twitter_card?.twitter_site,
            // creator: '@nextjs',
            // creatorId: '1467726470533754880',
            images: [data?.results?.twitter_card?.twitter_image]
        },
    
    }
}




function SearchKeywordPage({ params }) {

    // console.log('params', params)
    return( 
        <KeywordPage params={params} />
)
    
};



export default SearchKeywordPage;




