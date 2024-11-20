"use client";

import ProductDetails from "./ProductDetails";
// import Specifications from "./Specifications";
import ImageGallery from "./ProductImage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Paper } from "@mui/material";



export default function Page() {

  return (
    <>
      <Paper elevation={3}>
        <div className="container" style={{ padding: 2 }}>
          <div className="row">
            <div className="col-sm-12 col-md-6" style={{ marginTop: 7 }}>
              <ImageGallery />
            </div>

            <div className="col-sm-12 col-md-6" style={{ marginTop: 7 }}>
              <ProductDetails />
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}
