"use client";

import ProductDetails from "./ProductDetails";
// import Specifications from "./Specifications";
import ImageGallery from "./ProductImage";
import "bootstrap/dist/css/bootstrap.min.css";



export default function Page() {

  return (
    <>
    <style>{`
        body {
          background-color: #ffff; /* Replace with your desired color */
        }
      `}</style>


      <div className="container" style={{ padding: 2 }}>
        <div className="row">
          <div className="col-sm-12 col-md-6" style={{ marginTop: 7 }}>
            <ImageGallery />
          </div>

          <div className="col-sm-12 col-md-6" style={{ marginTop: 7 }}>
            <ProductDetails />
          </div>

          {/* <div className="col-sm-12">
            <Specifications />
          </div> */}
        </div>
      </div>
    </>
  );
}
