import React from "react";
import { Container, Grid, Typography, Box, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111",
        color: "white",
        py: 4,
        mt: 0,
      }}
    >
      <Container>
        <Grid container spacing={4} justifyContent="space-around">
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Your Travel App
            </Typography>
            <Typography variant="body2" color="gray">
              Safe & Reliable Travel Booking Platform
            </Typography>
          </Grid>

       
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map(
              (text, idx) => (
                <Typography key={idx} variant="body2" sx={{ my: 0.5 }}>
                  <Link
                    href="/aboutus"
                    underline="hover"
                    color="inherit"
                    sx={{
                      transition: "0.3s",
                      "&:hover": {
                        color: "#00bcd4",
                      },
                    }}
                  >
                    {text}
                  </Link>
                </Typography>
              )
            )}
          </Grid>

 
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Follow Us
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
              {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, idx) => (
                <Grid item key={idx}>
                  <Link
                    href="#"
                    sx={{
                      color: "white",
                      fontSize: 30,
                      transition: "0.3s",
                      "&:hover": {
                        color: "#00bcd4",
                      },
                    }}
                  >
                    <Icon fontSize="inherit" />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

     
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Typography variant="body2" color="gray">
            &copy; {new Date().getFullYear()} Your Travel App. All Rights Reserved.
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
