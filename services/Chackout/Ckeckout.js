const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();
      bodyData.append("response", JSON.stringify(response));

      await Axios.post(`${server}/api/listings/callback/`, bodyData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          setName("");
          setAmount("");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

export const showRazorpay = async () => {
    await loadScript();

    let bodyData = new FormData();
    bodyData.append("amount", amount.toString());
    bodyData.append("name", name);

    try {
      const { data } = await Axios.post(`${server}/api/listings/payment/`, bodyData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: data.razorpay_order.amount,
        currency: "INR",
        name: "Org. Name",
        description: "Test transaction",
        image: "", // Add image URL
        order_id: data.razorpay_order.id,
        handler: function (response) {
          handlePaymentSuccess(response);
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
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };