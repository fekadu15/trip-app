const { createBooking } = require("../models/bookingModel");
const sendConfirmationEmail = require("../services/emailService"); // your existing emailService

const bookTrip = async (req, res) => {
  try {
    const { trip_id, email, first_name, last_name } = req.body;

    if (!trip_id || !email || !first_name || !last_name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await createBooking({ trip_id, email, first_name, last_name });

    
    await sendConfirmationEmail(email, first_name, { trip_id });

    res.status(201).json({ message: "Trip booked successfully", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Failed to book trip" });
  }
};

module.exports = { bookTrip };
