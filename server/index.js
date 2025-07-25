const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = 5000;
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");


const corsOption = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

// Root Test Route
app.get("/", (req, res) => {
  res.send("App is running here!");
});

// ======= SIGNUP =======
app.post("/signup", async (req, res) => {
  const { password, confirm, first_name, last_name, email } = req.body;

  if (!email || !email.includes("@") || !first_name?.trim() || password.length < 6) {
    return res.status(400).json({ message: "Invalid email, name, or password" });
  }

  if (password !== confirm) {
    return res.status(400).send("Passwords do not match!");
  }

  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (f_name, l_name, email, password) 
       VALUES ($1, $2, $3, $4)
       RETURNING id, f_name, l_name, email, role`,
      [first_name, last_name, email, hashed_password]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user!");
  }
});

// ======= LOGIN =======
app.post("/login", async (req, res) => {
  const { password, email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Unknown email" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
  { id: user.id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);


    res.json({
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// ======= TRIP SEARCH =======
app.get("/search", async (req, res) => {
  const { start_date, end_date, destination, departure_city } = req.query;

  if (!departure_city || !destination || !start_date || !end_date) {
    return res.status(400).json({ message: "Missing trip details" });
  }

  try {
    const result = await pool.query(
      `SELECT title, start_date, end_date, price 
       FROM trips 
       WHERE departure_city = $1 AND destination = $2`,
      [departure_city, destination]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No trips found" });
    }

    res.status(200).json({ trip: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Can't search for the trip" });
  }
});

// ======= BOOK TRIP =======
const verifyToken = require("./middleware/verifyToken");

app.post("/book_trips", verifyToken, async (req, res) => {
  const { trip_id } = req.body;

  if (!trip_id) {
    return res.status(400).json({ message: "Trip ID is required" });
  }
console.log("USER ID:", req.userId);
console.log("TRIP ID:", trip_id);

  try {
    const result = await pool.query(
      `INSERT INTO user_trip (user_id, trip_id)
       VALUES ($1, $2)
       RETURNING *`,
      [req.userId, trip_id]
    );

    res.status(201).json({
      message: "Trip booked successfully",
      booking: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to book trip" });
  }
});
const upload = require("./middleware/upload"); 

app.post("/trips", verifyToken, upload.single("image"), async (req, res) => {
  const { start_date, end_date, destination, departure_city, title , price} = req.body;

  // Check for required fields
  if (!start_date || !end_date || !destination || !departure_city || !title || !price|| !req.file) {
    return res.status(400).json({ message: "All fields including image must be provided" });
  }

  // Check if user is admin
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const image_path = req.file.filename; // or use req.file.path if you prefer full path

  try {
    const result = await pool.query(
      `INSERT INTO trips (start_date, end_date, destination, departure_city, title, image_path,price)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [start_date, end_date, destination, departure_city, title, image_path, price]
    );

    res.status(201).json({
      message: "Trip posted successfully",
      trip: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.put("/trips/:id", verifyToken, upload.single("image"), async (req, res) => {
  const tripId = req.params.id;
  const { start_date, end_date, destination, departure_city, title , price} = req.body;

  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  try {
    // Build updated fields dynamically
    const fields = [];
    const values = [];
    let idx = 1;

    if (start_date) {
      fields.push(`start_date = $${idx++}`);
      values.push(start_date);
    }
    if (end_date) {
      fields.push(`end_date = $${idx++}`);
      values.push(end_date);
    }
    if (destination) {
      fields.push(`destination = $${idx++}`);
      values.push(destination);
    }
    if (departure_city) {
      fields.push(`departure_city = $${idx++}`);
      values.push(departure_city);
    }
    if (title) {
      fields.push(`title = $${idx++}`);
      values.push(title);
    }
    if (price) {
      fields.push(`price = $${idx++}`);
      values.push(price);
    }
    if (req.file) {
      fields.push(`image_path = $${idx++}`);
      values.push(req.file.filename);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    values.push(tripId); // for WHERE clause

    const query = `
      UPDATE trips
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING *;
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json({ message: "Trip updated", trip: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.delete("/trips/:id", verifyToken, async (req, res) => {
  const tripId = req.params.id;

  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  try {
    const result = await pool.query(
      "DELETE FROM trips WHERE id = $1 RETURNING *",
      [tripId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json({ message: "Trip deleted", trip: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ======= LISTEN =======
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
