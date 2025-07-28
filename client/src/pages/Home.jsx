import React from "react";
import { useState } from "react";
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
  Container,
  Card,

} from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import axios from "axios"

export default function Home() {

    const [ formData , setFormData] = useState ({
        firstName : "",
        lastName : "",
        password : "",
        confirm : "",
        email :""
    })

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
      
        setFormData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      }
      
async function handleSubmit (e) {
     e.preventDefault();
     try {

   
     const response = await axios.post ("http://localhost:5000/signup",{
       method:"post",
       headers:{
        "Content-type": "application/json"
       } ,
       body:JSON.stringify(formData)
    
     })
     const data = await response.json();
      console.log("Server Response:", data);

     
    }
    catch (err) {
        console.log(err);
    }
}
  return (
    <>
     <Typography  variant="h2" color="navy" gutterBottom  align="center">
          Welcome to Trip Booking Hub ✈️
        </Typography>

    <Box
    
        sx={{
          backgroundImage: "url('/login.jpg')",
          backgroundSize: "50%",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          backgroundColor:"white",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 4,
          pr: 20,
        }}
        
        
      >
        
       
        <CssBaseline />
        <Box
        
        sx={{
            backgroundColor : "white",
            
        }}
        
        >
        
  <Container component="main" maxWidth="xs">
  <CssBaseline />
  <Box
    sx={{
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>

    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
    
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          name="firstName"
          label="First Name"
          required
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          name="lastName"
          label="Last Name"
          required
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
        />
      </Box>

      {/* Email */}
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

      {/* Password */}
      <TextField
        name="password"
        label="Password"
        required
        fullWidth
        type="password"
        margin="normal"
        value={formData.password}
        onChange={handleChange}
      />

      {/* Confirm Password */}
      <TextField
        name="confirm"
        label="Confirm Password"
        required
        fullWidth
        type="password"
        margin="normal"
        value={formData.confirm}
        onChange={handleChange}
      />

      {/* Checkbox */}
      <FormControlLabel
        sx={{ mt: 1 }}
        control={
          <Checkbox
            name="agreeToEmails"
            color="primary"
            checked={formData.agreeToEmails}
            onChange={handleChange}
          />
        }
        label="I want to receive inspiration, marketing promotions and updates via email."
      />

      {/* Submit Button */}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>

      {/* Login Link */}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/Login" variant="body2">
            Already have an account? Log in
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Container>

        
      </Box>
      </Box>
      <Container style={{ marginTop: 50 }}>
                <Typography variant="h4" align="center" gutterBottom marginBottom={8}>
                    How To?
                </Typography>
                <Grid container spacing={4} justifyContent="start" marginBottom={8} >
                    <Grid item xs={12} sm={4}>
                        <Card
                            style={{
                                padding: "20px",
                                textAlign: "center",
                                transition: "transform 0.3s ease",
                                width:"300px"
                            }}
                            sx={{
                                "&:hover": {
                                    transform: "scale(1.1)",
                                    cursor:"pointer"
                                },
                            }} 
                        >
                            <ZoomInIcon style={{ fontSize: 50, color: "green" }} />
                            <Typography variant="h6">Search</Typography>
                            <Typography>
                                You can look for the trip you want using our advanced search.
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card
                            style={{
                                width:"300px",
                                padding: "20px",
                                textAlign: "center",
                                transition: "transform 0.3s ease",
                            }}
                            sx={{
                                "&:hover": {
                                    transform: "scale(1.1)",
                                    cursor:"pointer"
                                },
                            }} 
                        >
                            <EventAvailableIcon style={{ fontSize: 50, color: "blue" }} />
                            <Typography variant="h6">Book</Typography>
                            <Typography>Booking tickets  easier than ever.</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card
                            style={{
                                width:"300px",
                                padding: "20px",
                                textAlign: "center",
                                transition: "transform 0.3s ease",
                            }}
                            sx={{
                                "&:hover": {
                                    transform: "scale(1.1)",
                                    cursor:"pointer"
                                },
                            }} 
                        >
                            <CreditCardIcon style={{ fontSize: 50, color: "purple" }} />
                            <Typography variant="h6">Pay</Typography>
                            <Typography>
                                You can make payments from any bank you want.
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <Container style={{  marginTop: 50, textAlign: "center"}}>
    <Typography variant="h4" gutterBottom  marginBottom={5}>
        Download Our App Now
    </Typography>

    <Grid container spacing={3} justifyContent="space-around" alignItems="center">
      
        <Grid item xs={12} md={6}>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    paddingBottom: "20px", 
                }}
            >
          
                <img
                    src="/im2.png" 
                    alt="App Screens 4"
                    style={{
                        height: "auto",
                        flexShrink: 0,
                        maxWidth: "200px",
                        transform: "rotate(-15deg)",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        borderRadius: "10px",
                    }}
                />
                  <img
                    src="/im2.png" 
                    alt="App Screens 4"
                    style={{
                        height: "auto",
                        flexShrink: 0,
                        marginLeft:"-80px",
                        maxWidth: "200px",
                        transform: "rotate(-15deg)",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        borderRadius: "10px",
                    }}
                />
                 <img
                    src="/im2.png" 
                    alt="App Screens 4"
                    style={{
                        height: "auto",
                        marginLeft:"-80px",
                        zIndex :1,
                        flexShrink: 0,
                        maxWidth: "200px",
                        transform: "rotate(-15deg)",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        borderRadius: "10px",
                    }}
                />
            </div>
        </Grid>
        
        <Grid item xs={12} md={5} container spacing={3} justifyContent="center" alignItems="center" >
            <Grid >
                <Grid item >
                    <Card
                        style={{
                            width:300,
                            padding: 20,
                            borderRadius: 10,
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease",
                        }}
                        sx={{
                            "&:hover": {
                                transform: "scale(1.1)",
                                cursor:"pointer"
                            },
                        }} 
                    >
                        <Typography variant="h5" gutterBottom>
                            Lighting Fast
                        </Typography>
                        <Typography variant="body2" color="#3D3D3D">
                            Book in 30 seconds even in low network.
                        </Typography>
                    </Card>
                </Grid >
                <Grid item>
                    <Card
                        style={{
                          
                            width:300,
                            padding: 20,
                            borderRadius: 10,
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease",
                        }}
                        sx={{
                            "&:hover": {
                                transform: "scale(1.1)",
                                cursor:"pointer"
                            },
                        }} 
                    >
                        <Typography variant="h5" gutterBottom>
                            Time Saving
                        </Typography>
                        <Typography variant="body2" color="#3D3D3D">
                            You get to save the time and cost to go to the bus terminal or bus station just to buy the tickets.
                        </Typography>
                    </Card>
                </Grid >
                <Grid item>
                    <Card
                        style={{
                            width:300,
                            padding: 20,
                            borderRadius: 10,
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease",
                        }}
                        sx={{
                            "&:hover": {
                                transform: "scale(1.1)",
                                cursor:"pointer"
                            },
                        }} 
                    >
                        <Typography variant="h5" gutterBottom>
                            Easy to Manage
                        </Typography>
                        <Typography variant="body2" color="#3D3D3D">
                            You can book, change, and cancel your bus bookings easily via our app.
                        </Typography>
                    </Card>
                    <Card
                        style={{
                            width:300,
                            padding: 20,
                            borderRadius: 10,
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease",
                        }}
                        sx={{
                            "&:hover": {
                                transform: "scale(1.1)",
                                cursor:"pointer"
                            },
                        }} 
                    >
                        <Typography variant="h5" gutterBottom>
                            Portable
                        </Typography>
                        <Typography variant="body2" color="#3D3D3D">
                        book your ticket from anywhere you want
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    <Button variant="contained" color="primary" startIcon={<AppleIcon />} style={{ margin: 10 }}>
           App Store
        </Button>
        <Button variant="contained" color="secondary" startIcon={<AndroidIcon />} style={{ margin: 10 }}>
           Google Play
        </Button>
</Container>

                 

    </>
  );
}
