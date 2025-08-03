import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputLabel,
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

      const res = await  axios.post("http://localhost:5000/trips", {
        body: form,
      });

      const result = await res.json();
      console.log(result);
      // Optionally reset form or show toast here
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
        background:
          "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
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
        <TextField
          label="Departure City"
          name="departure_city"
          value={formData.departure_city}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <TextField
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          fullWidth
          required
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
        type="time"
          label="departure_time"
          name="departure_time"
          value={formData.departure_time}
          onChange={handleChange}
          fullWidth
          required
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          type="date"
          name="departure_date"
          value={formData.departure_date}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
         label="end_time"
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <TextField
          type="number"
          label="Price (ETB)"
          name="price"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ min: 0 }}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />

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
    </Paper>
  );
};

export default PostTrip;
