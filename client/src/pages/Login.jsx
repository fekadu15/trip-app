import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
const [errorMessage, setErrorMessage] = useState("");
const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",  
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
    
      const response = await axios.post("http://localhost:5000/login", formData);
    

      const token = response.data.token;
    
      const message = response.data.message;
      if (token) {
        localStorage.setItem("token", token);  
        console.log (message,"token saved");
    setFormData({
      email:"",
      password:""
     });
        navigate("/Dashboard");  
      } else {
        console.error("No token received from server");
      }
     
    } catch (err) {
     if (
    err.response &&
    err.response.data &&
    err.response.data.message === "you need to sign up first !"
  ) {
    setErrorMessage("You haven't signed up yet.");
    setShowError(true);
  } 
  else if (
    err.response &&
    err.response.data.message === "Invalid password"
  ) {
    setErrorMessage("Incorrect password.");
    setShowError(true);
  } 
  else {
    setErrorMessage("Login failed. Try again.");
    setShowError(true);
  }
    }
  }

  return (
    <>
      <Box
        sx={{
          backgroundImage: "url('/signup.jpg')",
          backgroundSize: "left",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 4,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            width: { xs: "100%", sm: "400px", md: "500px" },
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: 2,
            boxShadow: 5,
            padding: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <TextField
                name="email"
                label="Email Address"
                required
                fullWidth
                type="email"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
              />
             <TextField
  name="password"
  label="Password"
  required
  fullWidth
  type="password"
  margin="normal"
  value={formData.password}
  onChange={handleChange}
  error={showError}
  helperText={showError ? errorMessage : ""}
/>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/ForgotPassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
