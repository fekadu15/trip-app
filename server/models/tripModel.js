const pool = require("../db");

const searchTrips = async (from, to) => {
  const result = await pool.query(
    `SELECT id, departure_city, destination, departure_date, price, departure_time, end_time
     FROM trips 
     WHERE departure_city = $1 AND destination = $2`,
    [from, to]
  );
  return result.rows;
};

const getTripById = async (id) => {
  const result = await pool.query("SELECT * FROM trips WHERE id = $1", [id]);
  return result.rows[0];
};

const createTrip = async (tripData, imagePath) => {
  const { departure_date, end_time, destination, departure_city, departure_time, price } = tripData;

  const result = await pool.query(
    `INSERT INTO trips (departure_date, end_time, destination, departure_city, departure_time, image_path, price)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [departure_date, end_time, destination, departure_city, departure_time, imagePath, price]
  );

  return result.rows[0];
};

const updateTrip = async (id, fields) => {
  const updates = [];
  const values = [];
  let idx = 1;

  for (const key in fields) {
    updates.push(`${key} = $${idx++}`);
    values.push(fields[key]);
  }

  if (updates.length === 0) return null;

  values.push(id);

  const query = `
    UPDATE trips
    SET ${updates.join(", ")}
    WHERE id = $${idx}
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteTrip = async (id) => {
  const result = await pool.query("DELETE FROM trips WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = { searchTrips, getTripById, createTrip, updateTrip, deleteTrip };
