const successfulTransfer = (sender, recipient, amount) => {
  const details = {
    sender,
    body: {
      intro: `The sum of ${amount}.00 has been made from ${sender} to ${recipient}`,
      action: {
        instructions: "Issue any complaint using our Digital wallet?",
        button: {
          color: "#5b69ff", // Optional action button color
          text: "Contact Us",
          link: "https://bit.ly/raji",
        },
      },
      outro:
        "We`re with you every step of the way. Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  return details;
};

module.exports = {
  successfulTransfer,
};
