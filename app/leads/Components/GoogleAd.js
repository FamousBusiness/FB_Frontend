import { useEffect } from "react";



const GoogleAD =()=>  {

    useEffect(() => {
        if (window) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error('Ad initialization error:', e);
          }
        }
      }, []);

    return (
        <>
        <ins 
        class="adsbygoogle"
        style={{display:'block'}}
        data-ad-format="fluid"
        data-ad-layout-key="-f1+5r+5a-db+57"
        data-ad-client="ca-pub-3619066091276324"
        data-ad-slot="8599753783"
     ></ins>
    </>

    )
};



export default GoogleAD;