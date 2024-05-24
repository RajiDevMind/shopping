const calculateTotalAmount = (products, cartItems) => {
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {
    const product = products.find((product) => {
      return product._id?.toString() === cartItem._id;
    });

    if (product) {
      const quantity = cartItems.quantity;
      const price = parseFloat(product.price);
      totalPrice += quantity * price;
    }
  });

  return totalPrice;
};

module.exports = { calculateTotalAmount };
