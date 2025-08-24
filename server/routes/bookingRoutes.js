const express = require("express");
const { bookTrip } = require("../controllers/bookingController");

const router = express.Router();

router.post("/book", bookTrip);

module.exports = router;
