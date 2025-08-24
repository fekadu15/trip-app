const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
 const tripRoutes = require("./routes/tripRoutes");
 const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const port = 5000;

const corsOption = { origin: ["http://localhost:5173"] };
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("App is running here!"));


app.use("/", authRoutes);
app.use("/", tripRoutes);
app.use("/", bookingRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
