const Product = require("../models/productModel");

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

// Stock mgt: Update carts quantity from the DB, when user purchased
// To knw products that are out of stock
const updateProductQuantity = async (cartItems) => {
  let bulkOption = cartItems.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: {
          $inc: {
            quantity: -product.cartQuantity,
            sold: +product.cartQuantity,
          },
        },
      },
    };
  });
  await Product.bulkWrite(bulkOption, {});
};

module.exports = { calculateTotalAmount, updateProductQuantity };