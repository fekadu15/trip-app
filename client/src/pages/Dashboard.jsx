import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const trips = [
  {
    id: 1,
    destination: "Lalibela",
    departure_city: "Addis Ababa",
    start_date: "2025-08-10",
    end_date: "2025-08-15",
    image:
      "https://images.unsplash.com/photo-1591084728795-114f8b1ebfa2?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    destination: "Bahir Dar",
    departure_city: "Gondar",
    start_date: "2025-09-01",
    end_date: "2025-09-05",
    image:
      "https://images.unsplash.com/photo-1607703701019-3d99c2d3bd15?auto=format&fit=crop&w=800&q=60",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 0, minHeight: "100vh", bgcolor: "#f0f4ff" }}>
      {/* Top banner */}
      <Box
        sx={{
          height: "250px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          px: 4,
          color: "white",
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Welcome Back, Explorer! 🌍
          </Typography>
          <Typography variant="h6">Ready for your next adventure?</Typography>
        </Box>
      </Box>

      {/* Action Button */}
      <Box sx={{ px: 4, py: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/searchtrips")}
          sx={{
            background: "linear-gradient(to right, #3f51b5, #2196f3)",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
            borderRadius: "20px",
            boxShadow: 3,
            "&:hover": {
              background: "linear-gradient(to right, #1e3c72, #2a5298)",
            },
          }}
        >
          ✈️ Book New Trip
        </Button>
      </Box>

      {/* Trips */}
      <Box sx={{ px: 4, mt: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Your Booked Trips
        </Typography>

        {trips.length === 0 ? (
          <Typography>No trips booked yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {trips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: trip.id * 0.2 }}
                >
                  <Card
                    sx={{
                      borderRadius: "20px",
                      boxShadow: 6,
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Box
                      sx={{
                        height: "180px",
                        backgroundImage: `url(${trip.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {trip.destination}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnIcon color="primary" />
                        <Typography variant="body2">
                          From {trip.departure_city}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonthIcon color="action" />
                        <Typography variant="body2">
                          {trip.start_date} → {trip.end_date}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
