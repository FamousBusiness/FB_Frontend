"use client"

import { Paper } from '@mui/material';
import ProductDetails from './ProductDetails';
import ImageGallery from './ProductImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';



export default function Page() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState('');
    const [Images, setImages]           = useState([]);
    const [productID, setProductID]     = useState('');

    
    ///// Get the data from query params
    useEffect(() => {
      if (typeof window !== 'undefined') {  
          const params = new URLSearchParams(window.location.search);
          setProductID(params.get('product_id'));
      }
    }, []);


    ///// Fetch the product details when page loads
    useEffect(()=> {
      if (productID) {

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/ecom/v1/product/?product_id=${productID}`).then((res)=> {

            if (res.status === 200) {
              setLoading(false)
              setProductData(res.data.results)
              setImages(res.data.results[0].multiple_img);
            }

        }).catch((error)=> {
            setLoading(false);
            setError('Something went wrong');

        });

      }
    }, [productID]);



  return (
    <>
      <Paper elevation={3}>
        <div className="container" style={{ padding: 2 }}>
          <div className="row">
            <div className="col-sm-12 col-md-6" style={{ marginTop: 7 }}>
              <ImageGallery 
                 Images={Images}
              />
            </div>

            <div className="col-sm-12 col-md-6" style={{ marginTop: 7 }}>
              <ProductDetails 
                 productData={productData}
              />
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
}
