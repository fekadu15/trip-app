const { searchTrips, getTripById, createTrip, updateTrip, deleteTrip } = require("../models/tripModel");

const search = async (req, res) => {
  const { to, from } = req.query;
  if (!from || !to) return res.status(400).json({ message: "Missing trip details" });

  try {
    const trips = await searchTrips(from, to);
    if (trips.length === 0) return res.status(404).json({ message: "No trips found" });
    res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Can't search for the trip" });
  }
};

const getTrip = async (req, res) => {
  try {
    const trip = await getTripById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const addTrip = async (req, res) => {
  const { departure_date, end_time, destination, departure_city, departure_time, price } = req.body;
  if (!departure_date || !end_time || !destination || !departure_city || !departure_time || !price || !req.file) {
    return res.status(400).json({ message: "All fields including image must be provided" });
  }

  if (req.userRole !== "admin") return res.status(403).json({ message: "Access denied. Admins only." });

  try {
    const trip = await createTrip(req.body, req.file.filename);
    res.status(201).json({ message: "Trip posted successfully", trip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editTrip = async (req, res) => {
  if (req.userRole !== "admin") return res.status(403).json({ message: "Access denied. Admins only." });

  try {
    const fields = { ...req.body };
    if (req.file) fields.image_path = req.file.filename;

    const updated = await updateTrip(req.params.id, fields);
    if (!updated) return res.status(404).json({ message: "Trip not found or no fields to update" });

    res.json({ message: "Trip updated", trip: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeTrip = async (req, res) => {
  if (req.userRole !== "admin") return res.status(403).json({ message: "Access denied. Admins only." });

  try {
    const deleted = await deleteTrip(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted", trip: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { search, getTrip, addTrip, editTrip, removeTrip };
