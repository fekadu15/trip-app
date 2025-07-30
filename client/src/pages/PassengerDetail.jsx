import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const PassengerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/trips/${id}`);
        setTrip(res.data);
      } catch (error) {
        console.error("Failed to fetch trip:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/book", {
        trip_id: id,
        first_name: firstName,
        last_name: lastName,
        email,
      });

      alert("Booking confirmed!");
      navigate("/"); // or to a 'booking success' page
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!trip) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="error">
          Trip not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={4}
      bgcolor="#f5f5f5"
    >
      <Card sx={{ p: 4, width: 600, borderRadius: 4 }}>
        <Typography variant="h5" mb={2}>
          Booking Details
        </Typography>

        <Typography fontWeight="bold" gutterBottom>
          {trip.departure_city} → {trip.destination}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {dayjs(trip.departure_date).format("DD MMM YYYY")} at{" "}
          {trip.departure_time}
        </Typography>
        <Typography color="green" fontWeight="bold" mb={2}>
          Price: ETB {trip.price.toLocaleString()}
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: 2, fontWeight: "bold" }}
          onClick={handleSubmit}
        >
          Confirm Booking
        </Button>
      </Card>
    </Box>
  );
};

export default PassengerDetail;
