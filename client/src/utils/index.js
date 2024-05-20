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
