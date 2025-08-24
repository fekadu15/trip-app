const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

const signup = async (req, res) => {
  const { password, confirm, firstName, lastName, email } = req.body;

  if (!email || !email.includes("@") || !firstName?.trim() || !lastName?.trim() || password.length < 6) {
    return res.status(400).json({ message: "Invalid email, name, or password" });
  }

  if (password !== confirm) {
    return res.status(400).send("Passwords do not match!");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(firstName, lastName, email, hashedPassword);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user!");
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "you need to sign up first !" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "78h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = { signup, login };
