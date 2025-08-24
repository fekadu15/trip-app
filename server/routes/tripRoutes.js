const express = require("express");
const { search, getTrip, addTrip, editTrip, removeTrip } = require("../controllers/tripController");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/search", search);
router.get("/trips/:id", getTrip);
router.post("/trips", verifyToken, upload.single("image"), addTrip);
router.put("/trips/:id", verifyToken, upload.single("image"), editTrip);
router.delete("/trips/:id", verifyToken, removeTrip);

module.exports = router;
