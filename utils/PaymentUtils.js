import Axios from 'axios';
import Cookies from 'js-cookie';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const createRazorpayOrder = async (amout) => {
  try {
    const requestData = {
      amount: amout,
      // premium_plan_id: id,
    };
    const { data } = await Axios.post(
      `${apiBaseUrl}/soft-api/payment-initiate/`,
      requestData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const handleRazorpaySuccess = async (response) => {
  try {
    const requestData = {
      provider_order_id: response.razorpay_order_id,
      payment_id: response.razorpay_payment_id,
      signature_id: response.razorpay_signature,
      // combo_lead_id: id,
      // category: values.category,
      // city: values.city,
    };

    await Axios.post(
      `${apiBaseUrl}/soft-api/payment-complete/`,
      requestData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      }
    );

    console.log('Payment completed successfully!');
    // You may want to add more logic or return a value here
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    document.body.appendChild(script);
  });
};


const showRazorpay = async (amout) => {
  await loadRazorpayScript();

  try {
    const orderData = await createRazorpayOrder(amout);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.data.data.amount,
      currency: 'INR',
      name: 'Famous Business',
      description: 'Test transaction',
      image: '', // Add image URL
      order_id: orderData.data.data.id,

      handler: function (response) {
        handleRazorpaySuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },

      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { showRazorpay };
