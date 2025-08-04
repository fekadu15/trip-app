import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const PostTrip = () => {
  const [formData, setFormData] = useState({
    departure_city: "",
    destination: "",
    departure_time: "",
    departure_date: "",
    end_time: "",
    price: "",
    image: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success' | 'error'
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const res = await axios.post("http://localhost:5000/trips", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSnackbar({
        open: true,
        message: "Trip posted successfully!",
        severity: "success",
      });

      // Reset form after successful submission
      setFormData({
        departure_city: "",
        destination: "",
        departure_time: "",
        departure_date: "",
        end_time: "",
        price: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Failed to post trip. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 18,
        mb:18,
        p: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#4a148c" }}
      >
        Post New Trip
      </Typography>

     <Box
  component="form"
  onSubmit={handleSubmit}
  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
>
  {/* Row 1: Departure City & Destination */}
  <Box sx={{ display: "flex", gap: 2 }}>
    <TextField
      label="Departure City"
      name="departure_city"
      value={formData.departure_city}
      onChange={handleChange}
      required
      fullWidth
      sx={{ backgroundColor: "white", borderRadius: 1 }}
    />
    <TextField
      label="Destination"
      name="destination"
      value={formData.destination}
      onChange={handleChange}
      required
      fullWidth
      sx={{ backgroundColor: "white", borderRadius: 1 }}
    />
  </Box>

  {/* Row 2: Departure Time & End Time */}
  <Box sx={{ display: "flex", gap: 2 }}>
    <TextField
      type="time"
      label="Departure Time"
      name="departure_time"
      value={formData.departure_time}
      onChange={handleChange}
      required
      fullWidth
    InputLabelProps={{ shrink: true }}
      sx={{ backgroundColor: "white", borderRadius: 1 }}
    />
    <TextField
      type="time"
      label="End Time"
      name="end_time"
      value={formData.end_time}
      onChange={handleChange}
      required
      fullWidth
      InputLabelProps={{ shrink: true }}
      sx={{ backgroundColor: "white", borderRadius: 1 }}
    />
  </Box>

  {/* Row 3: Departure Date & Price */}
  <Box sx={{ display: "flex", gap: 2 }}>
    <TextField
      type="date"
      label="Departure Date"
      name="departure_date"
      value={formData.departure_date}
      onChange={handleChange}
      required
      fullWidth
      InputLabelProps={{ shrink: true }}
      sx={{ backgroundColor: "white", borderRadius: 1 }}
    />
    <TextField
      type="number"
      label="Price (ETB)"
      name="price"
      value={formData.price}
      onChange={handleChange}
      required
      fullWidth
      inputProps={{ min: 0 }}
      sx={{ backgroundColor: "white", borderRadius: 1 }}
    />
  </Box>

  {/* Upload Image */}
  <Box sx={{ mt: 2 }}>
    <InputLabel
      htmlFor="image-upload"
      sx={{ mb: 1, color: "#4a148c", fontWeight: "600" }}
    >
      Upload Image
    </InputLabel>
    <input
      id="image-upload"
      type="file"
      name="image"
      accept="image/*"
      onChange={handleChange}
      style={{
        display: "block",
        width: "100%",
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        cursor: "pointer",
        backgroundColor: "white",
      }}
    />
  </Box>

  {/* Submit Button */}
  <Button
    type="submit"
    variant="contained"
    sx={{
      mt: 3,
      backgroundColor: "#4a148c",
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#6a1b9a",
      },
      py: 1.5,
    }}
    fullWidth
  >
    Post Trip
  </Button>
</Box>


     
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PostTrip;
