const pool = require("../db");

const createBooking = async ({ trip_id, email, first_name, last_name }) => {
  const result = await pool.query(
    `INSERT INTO user_trip (trip_id, email, f_name, l_name)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [trip_id, email, first_name, last_name]
  );
  return result.rows[0];
};

module.exports = { createBooking };
