import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { LocationOn, Add, Remove } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import dayjs from "dayjs";

import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(duration);
dayjs.extend(customParseFormat);

const SearchTrips = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [from, setFrom] = useState("Addis Ababa");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const cities = [
    "Addis Ababa",
    "Gondar",
    "Bahir Dar",
    "Hawassa",
    "Dire Dawa",
    "Arba Minch",
    "Jimma",
  ];

  const isSearchDisabled = !from || !to || !date;

  const handleSubmit = async () => {
    try {
      const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";

      const res = await axios.get("http://localhost:5000/search", {
        params: {
          from,
          to,
          date: formattedDate,
        },
      });

      setSearchResults(res.data);
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchResults([]);
        setErrorMessage("No trips found.");
      }
    }
  };

  const getDuration = (start, end) => {
    const format = "HH:mm";
    const startTime = dayjs(start, format);
    const endTime = dayjs(end, format);
    const diff = endTime.diff(startTime);

    const d = dayjs.duration(diff);
    return `${d.hours()} hr ${d.minutes()} min`;
  };

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Search Box */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              width: "100%",
              p: 4,
              borderRadius: 5,
              boxShadow: 10,
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography variant="h5" align="center" mb={3}>
              Search
            </Typography>

            <Box display="flex" gap={2} mb={3}>
              <FormControl fullWidth>
                <InputLabel id="from-label">Leaving from</InputLabel>
                <Select
                  labelId="from-label"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  label="Leaving from"
                  startAdornment={<LocationOn color="error" />}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="to-label">Destination</InputLabel>
                <Select
                  labelId="to-label"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  label="Destination"
                  startAdornment={<LocationOn color="error" />}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Departure date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => (
                  <TextField fullWidth {...params} sx={{ mb: 3 }} />
                )}
              />
            </LocalizationProvider>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
              mb={3}
            >
              <IconButton
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
              >
                <Remove />
              </IconButton>
              <Typography>
                {passengers} Passenger{passengers > 1 ? "s" : ""}
              </Typography>
              <IconButton onClick={() => setPassengers(passengers + 1)}>
                <Add />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ borderRadius: 10, textTransform: "none", fontWeight: "bold" }}
              disabled={isSearchDisabled}
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Card>
        </Grid>

        {/* Search Results */}
        <Grid item xs={12} md={8}>
          {searchResults.length > 0 ? (
            <Box>
              {searchResults.map((trip, index) => (
                <Card key={index} sx={{ mb: 4, p: 3, borderRadius: 4, boxShadow: 3 }}>
                  <Grid container alignItems="center" justifyContent="space-between">
                    {/* Departure */}
                    <Grid item xs={4}>
                      <Typography fontWeight="bold">
                        {dayjs(trip.departure_date)
                          .format("DD MMM")
                          .toUpperCase()}
                      </Typography>
                      <Typography variant="h6">{trip.departure_time}</Typography>
                      <Typography color="text.secondary">{trip.departure_city}</Typography>
                    </Grid>

                    {/* Duration */}
                    <Grid item xs={4} textAlign="center">
                      <Box sx={{ width: "100%", borderTop: "2px solid #ccc", mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        One-stop, {getDuration(trip.departure_time, trip.end_time)}
                      </Typography>
                    </Grid>

                    {/* Arrival */}
                    <Grid item xs={4} textAlign="right">
                      <Typography fontWeight="bold">
                        {dayjs(trip.departure_date)
                          .format("DD MMM")
                          .toUpperCase()}
                      </Typography>
                      <Typography variant="h6">{trip.end_time}</Typography>
                      <Typography color="text.secondary">{trip.destination}</Typography>
                    </Grid>
                  </Grid>

                  {/* Price */}
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Box
                      sx={{
                        backgroundColor: "#e8f5e9",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        border: "1px solid #c8e6c9",
                        minWidth: "100px",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        From
                      </Typography>
                      <Typography color="green" fontWeight="bold">
                        ETB {trip.price.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          ) : errorMessage ? (
            <Box textAlign="center">
              <img
                src="/notrip.jpg"
                alt="No trips"
                style={{ maxWidth: "300px", marginBottom: "1rem" }}
              />
              <Typography variant="h6" color="textSecondary">
                {errorMessage}
              </Typography>
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchTrips;
