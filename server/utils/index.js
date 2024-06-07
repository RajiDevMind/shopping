const Product = require("../models/productModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

const calculateTotalAmountStripe = (products, cartItems) => {
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

const calculateTotalAmountWallet = (products, cartItems) => {
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

  return totalPrice;
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

// Deposit fund function | to Stripe | to Flutterwave
const depositFund = async (customer, data, description, source) => {
  await Transaction.create({
    amount:
      source === "stripe" ? data.amount_subtotal / 100 : data.amount_subtotal,
    sender: "self",
    recipient: customer.email,
    description: description,
    status: "success",
  });

  // Increase reciever account balance
  await User.findOneAndUpdate(
    { email: customer.email },
    {
      $inc: {
        balance:
          source === "stripe"
            ? data.amount_subtotal / 100
            : data.amount_subtotal,
      },
    }
  );
};

module.exports = {
  calculateTotalAmountStripe,
  calculateTotalAmountWallet,
  updateProductQuantity,
  depositFund,
};
