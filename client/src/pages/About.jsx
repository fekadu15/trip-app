import React from "react";
import { Box, Typography, Container, Paper ,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";


const About = () => {

    const navigate = useNavigate();
    
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          🧭 About Us
        </Typography>

        <Typography variant="body1" paragraph>
          At <strong>WanderWay</strong>, we believe that travel is more than just moving from one place to another — 
          it's about experiences, memories, and discovering the beauty of every destination.
        </Typography>

        <Typography variant="body1" paragraph>
          We're a team of passionate developers, designers, and dreamers who came together with one mission: <br />
          <strong>Make trip planning simple, inspiring, and accessible for everyone.</strong>
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          🚀 What makes us different?
        </Typography>

        <ul>
          <li>
            <Typography variant="body1">Fast and user-friendly search tools</Typography>
          </li>
          <li>
            <Typography variant="body1">Carefully curated trip options</Typography>
          </li>
          <li>
            <Typography variant="body1">Seamless booking with secure authentication</Typography>
          </li>
          <li>
            <Typography variant="body1">Admin-powered trip management</Typography>
          </li>
          <li>
            <Typography variant="body1">A commitment to making travel planning enjoyable</Typography>
          </li>
        </ul>

        <Typography variant="body1" paragraph sx={{ mt: 3, fontStyle: "italic" }}>
          "Not all those who wander are lost — some just use better apps."
        </Typography>
        <Button variant="contained" onClick={() => navigate("/SearchTrips")}>
        book now
      </Button>
      </Paper>
    </Container>
  );
};

export default About;
