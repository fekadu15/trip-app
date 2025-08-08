import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  IconButton,
  Button,
  CircularProgress,
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
import { useNavigate } from "react-router-dom";

const SearchTrips = () => {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef(null);

  const isSearchDisabled = !from || !to || !date;

  const escapeRegExp = (s) =>
    s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // for regex-safe

  const highlightMatch = (text, query) => {
    if (!query || !text) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={i} style={{ background: "rgba(255,230,150,0.6)" }}>
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const getDuration = (start, end) => {
    const format = "HH:mm";
    const startTime = dayjs(start, format);
    const endTime = dayjs(end, format);
    const diff = endTime.diff(startTime);
    const d = dayjs.duration(diff);
    return `${d.hours()} hr ${d.minutes()} min`;
  };

  const handleCardClick = (tripId) => {
    navigate(`/passenger-detail/${tripId}`);
  };

  const performSearch = useCallback(async () => {
    if (isSearchDisabled) return;
    setLoading(true);
    setErrorMessage("");
    try {
      const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
      const res = await axios.get("http://localhost:5000/search", {
        params: {
          from,
          to,
          date: formattedDate,
        },
        
      });

      setSearchResults(res.data || []);
      if (!res.data || res.data.length === 0) {
        setErrorMessage("No trips found.");
      } else {
        setErrorMessage("");
      }
      setFrom("");
      setDate("")
      setTo("")
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchResults([]);
        setErrorMessage("No trips found.");
      } else {
        console.error("Search error:", error);
        setSearchResults([]);
        setErrorMessage("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [from, to, date, isSearchDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload on form submit
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    await performSearch();
  };

  const hasSearched = searchResults.length > 0 || errorMessage;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={hasSearched ? "flex-start" : "center"}
      gap={6}
      minHeight="100vh"
      bgcolor="lightGray"
      p={4}
      mt={hasSearched ? 10 : 0}
    >
      <Card
        sx={{
          width: 500,
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

        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} mb={3}>
            <TextField
              label="Leaving from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              fullWidth
              autoComplete="off"
            />

            <TextField
              label="Destination"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              fullWidth
              autoComplete="off"
            />
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
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ borderRadius: 10, textTransform: "none", fontWeight: "bold" }}
            disabled={isSearchDisabled}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
          </Button>
        </form>
      </Card>

      {hasSearched && (
        <Box width="80%" position="relative">
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CircularProgress size={20} />
              <Typography variant="body2">Searching...</Typography>
            </Box>
          )}

          {searchResults.length > 0 ? (
            searchResults.map((trip, index) => (
              <Card
                key={index}
                onClick={() => handleCardClick(trip.id)}
                sx={{
                  mb: 3,
                  p: 3,
                  borderRadius: 4,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.01)",
                  },
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={4}>
                    <Typography fontWeight="bold">
                      {dayjs(trip.departure_date)
                        .format("DD MMM")
                        .toUpperCase()}
                    </Typography>
                    <Typography variant="h6">{trip.departure_time}</Typography>
                    <Typography color="text.secondary">
                      {highlightMatch(trip.departure_city, from)}
                    </Typography>
                  </Grid>

                  <Grid item xs={4} textAlign="center">
                    <Box
                      sx={{ width: "100%", borderTop: "2px solid #ccc", mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      One-stop, {getDuration(trip.departure_time, trip.end_time)}
                    </Typography>
                  </Grid>

                  <Grid item xs={4} textAlign="right">
                    <Typography fontWeight="bold">
                      {dayjs(trip.departure_date)
                        .format("DD MMM")
                        .toUpperCase()}
                    </Typography>
                    <Typography variant="h6">{trip.end_time}</Typography>
                    <Typography color="text.secondary">
                      {highlightMatch(trip.destination, to)}
                    </Typography>
                  </Grid>
                </Grid>

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
                      ETB {trip.price?.toLocaleString?.() ?? trip.price}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))
          ) : (
            errorMessage && (
              <Card
                sx={{
                  textAlign: "center",
                  borderRadius: 4,
                  p: 4,
                  boxShadow: 3,
                  backgroundColor: "white",
                }}
              >
                <img
                  src="/notrip.jpg"
                  alt="No trips found"
                  style={{
                    width: "100%",
                    maxWidth: 400,
                    margin: "0 auto",
                    borderRadius: 10,
                  }}
                />
                <Typography variant="h4" color="text.secondary" mt={3}>
                  Oops! No trips found
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Try a different date, destination, or broaden your search.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setTo("");
                      setSearchResults([]);
                      setErrorMessage("");
                    }}
                  >
                    Try again
                  </Button>
                </Box>
              </Card>
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchTrips;
