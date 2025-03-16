import Axios  from "axios";




const handlePaymentSuccess = async (response, successURL, products, selectedAddress) => {
  let token = '';
  const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 'https://api.famousbusiness.in'

  if (typeof window !== 'undefined') {
      token = localStorage.getItem('accessToken');

  } else {
    alert('Please Login');
  }

  const requestData = {
        provider_order_id: response.razorpay_order_id,
        payment_id: response.razorpay_payment_id,
        signature_id: response.razorpay_signature,
        products: products,
        address_id: selectedAddress
  };


  try {
    // we will send the response we've got from razorpay to the backend to validate the payment
    await Axios({
      url: `${apiUrl}/${successURL}`,
      method: "PUT",
      data: requestData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

    }).then((res) => {
        // console.log("Everything is OK!");
        // console.log('Success Response', res);
      })
      .catch((err) => {
        console.log(err);
        
      });

  } catch (error) {
    console.log(console.error());

  }
};


// this will load a script tag which will open up Razorpay payment card to make //transactions
const loadScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    document.body.appendChild(script);
});
};



const CheckOutshowRazorpay = async (amount, name, createURL, successURL, products, selectedAddress) => {
  await loadScript();

  let token = '';
  const apiUrl = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'True' ? 'http://127.0.0.1:8000' : 'https://api.famousbusiness.in'

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');

  } else {
    alert('Please Login')
  }

  try {
      let bodyData = new FormData();

      // we will pass the amount and product name to the backend using form data
      bodyData.append("amount", amount.toString());
      bodyData.append("name", name);


      const data = await Axios({
        url: `${apiUrl}/${createURL}`,
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: bodyData,

      }).then((res) => {
          return res;
      });


      // in data we will receive an object from the backend with the information about the payment
      // that has been made by the user
      var options = {
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // in react your environment variable must start with NEXT_PUBLIC_
        key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
        amount: data.data.data.amount,
        currency: "INR",
        name: "Famous Business",
        description: "Test teansaction",
        image: "",
        order_id: data.data.data.id,
        handler: function (response) {
          // we will handle success by calling handlePaymentSuccess method and
          // will pass the response that we've got from razorpay
          handlePaymentSuccess(response, successURL, products, selectedAddress);
        },
        prefill: {
          name: "User's name",
          email: "User's email",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        }
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
      
  } catch (error) {
    console.log(error)
    alert("Razorpay Payment Error");

  }
};


export { CheckOutshowRazorpay };

