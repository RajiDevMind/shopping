const orderSuccessEmail = (name, cartItems) => {
  const email = {
    body: {
      name,
      intro: "Your order has been placed successfully",
      table: {
        data: cartItems?.map((item) => {
          return {
            product: item.name,
            price: item.price,
            quantity: item.cartQuantity,
            total: item.price * item.cartQuantity,
          };
        }),
        columns: {
          customWidth: {
            product: "40%",
          },
        },
      },
      action: {
        // instructions: "Kindly check status order on your dashboard ",
        instructions: "Have any issue? ",
        button: {
          color: "#ff0000",
          // text: "Go to dashboard",
          text: "Check Developer Profile",
          link: "http://bit.ly/raji",
        },
      },
      outro: "Thanks for your patronage",
    },
  };
  return email;
};

module.exports = {
  orderSuccessEmail,
};
