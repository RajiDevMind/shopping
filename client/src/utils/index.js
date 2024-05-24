export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

// Validate Email

export const validateEmail = (email) => {
  return email.match(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/);
};

export const futureDate = (addDate) => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + addDate);
  return currentDate;
};

export const calculateAverageRatings = (ratings) => {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0;
  }
  let totalStars = 0;
  for (let i = 0; i < ratings.length; i++) {
    let rating = ratings[i];
    if (rating.hasOwnProperty("star")) {
      totalStars += rating.star;
    }
  }
  return totalStars / ratings.length;
};

export const getCartQuantityById = (products, id) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === id) {
      return products[i].cartQuantity;
    }
  }
  return 0; // if _id not found return default value. 0
};

// Extract id and cart quantity from cartItems
export const extractIdAndCartQuantity = (cartItem) => {
  return cartItem.map((item, index) => {
    return {
      _id: item._id,
      cartQuantity: item.cartQuantity,
    };
  });
};
