const nodemailer = require("nodemailer");
require("dotenv").config(); // Make sure this is called at the top

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = (to, name, trip) => {
    console.log(trip);
    
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Trip Booking Confirmation",
    text: `Hi ${name},\n\nYour trip from ${trip.departure_city} to ${trip.destination} on ${trip.departure_date} is confirmed!\n\nThanks for booking with us!`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendConfirmationEmail;
