const successfulRegistration = (name) => {
  const email = {
    body: {
      name,
      intro: "Welcome to Sellout! We're very excited to have you on board.",
      action: {
        instructions: "Any complaint with your shopping experience?",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Contact Us",
          link: "https://bit.ly/raji",
        },
      },
      outro:
        "We`re with you every step of the way. Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  return email;
};

module.exports = {
  successfulRegistration,
};
