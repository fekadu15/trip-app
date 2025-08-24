const pool = require("../db");

const createUser = async (firstName, lastName, email, hashedPassword) => {
  const result = await pool.query(
    `INSERT INTO users (f_name, l_name, email, password) 
     VALUES ($1, $2, $3, $4)
     RETURNING id, f_name, l_name, email, role`,
    [firstName, lastName, email, hashedPassword]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
