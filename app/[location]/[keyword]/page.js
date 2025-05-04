import KeywordPage from "./content";
// import Script from 'next/script';


const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True'
  ? "http://127.0.0.1:8000"
  : 'https://api.famousbusiness.in';



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
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false
            }
        }
    
    }
}



const generateSchemas = async (location, keyword) => { 

    const formattedLocation = location.replace(/-/g, ' ');
    const formattedKeyword = keyword.replace(/-/g, ' ');
    
    const params = new URLSearchParams({
        city: formattedLocation,
        keyword: formattedKeyword
    });
 

  try {
    const res = await fetch(`${apiUrl}/api/listings/search/keyword/business/?${params.toString()}`, {
      cache: 'no-store' // or 'force-cache' for ISR
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return {
      breadCrumbSchema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": { "@id": "https://www.famousbusiness.in", "name": "Home" }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": { "@id": '', "name": '' }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": { "@id": '', "name": '' }
              }
            ]
          }
        ]
      },
      
      itemListSchema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ItemList",
            "name": data.results.item_list_schema_name,
            "itemListElement": data.results.business_data.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "LocalBusiness",
                "name": item?.business_page?.business_name,
                "url": `https://www.famousbusiness.in/userprofile/${item?.business_page?.business_name}/?z_id=${item?.business_page?.id}&Cate=${item?.business_page?.category?.type}`,
                "telephone": item?.business_page?.mobile_number,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": item?.business_page?.address,
                  "addressLocality": item?.business_page?.locality,
                  "addressRegion": item?.business_page?.state,
                  "postalCode": item?.business_page?.pincode,
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": item?.business_page?.latitude,
                  "longitude": item?.business_page?.longitude
                },
                "serviceArea": {
                  "@type": "Place",
                  "name": item?.business_page?.city
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": item?.business_page?.rating,
                  "ratingCount": item?.business_page?.reviews
                }
              }
            }))
          }
        ]
      },
      faqSchema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "FAQPage",
            "mainEntity": data.results.faq_schema.map(item => ({
              "@type": "Question",
              "name": item?.question_name,
              "acceptedAnswer": {
                "@type": item?.acceptedAnswer_type,
                "text": item?.acceptedAnswer_text
              }
            }))
          }
        ]
      },
      articleSchema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": data.results.article_schema?.headline,
            "articleBody": data.results.article_schema?.articleBody,
            "author": {
              "@type": "Person",
              "name": "Admin Famous-Business"
            },
            "publisher": {
              "@type": "Organization",
              "name": data.results.article_schema?.publisher_name,
              "logo": {
                "@type": "ImageObject",
                "url": data.results.article_schema?.publisher_logo
              }
            },
            "datePublished": data.results.article_schema?.datePublished,
            "image": data.results.article_schema?.image,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": data.results.article_schema?.mainEntityOfPage_id
            }
          }
        ]
      }
    };
  } catch (error) {
    console.error("Server fetch error:", error);
    return null;
  }
};


async function SearchKeywordPage({ params }) {
    const { location, keyword } = params;
    if (!location || !keyword) return null;

    const schemas = await generateSchemas(location, keyword);

    if (!schemas) return null;

return(
    <>
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadCrumbSchema) }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.itemListSchema) }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqSchema) }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.articleSchema) }}
            />
        </section>

        <KeywordPage params={params} />
    </>
)
    
};



export default SearchKeywordPage;




