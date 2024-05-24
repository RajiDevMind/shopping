const calculateTotalAmount = (products, cartItems) => {
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {
    const product = products.find((product) => {
      return product._id?.toString() === cartItem._id;
    });

    if (product) {
      const quantity = cartItem.cartQuantity;
      const price = parseFloat(product.price);
      totalPrice += quantity * price;
    }
  });

  return totalPrice * 100;
};

module.exports = { calculateTotalAmount };
