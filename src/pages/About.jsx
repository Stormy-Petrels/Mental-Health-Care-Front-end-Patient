// src/AboutUs.js

import React from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { Bolt, CheckCircle, AssignmentInd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import about from "../assets/pexels-thirdman-5327653.jpg";
const About = () => {
  return (
    <div>
      <Container className="pt-28 pb-20">
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About <span style={{ color: "#00AEEF" }}>Us</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            "With profound knowledge and meticulousness, doctors ensure all
            decisions are made accurately and carefully."
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#06B6D4",
              color: "white",
              fontSize: "1.125rem",
              textDecoration: "none",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Link   to="/contact">Get contact</Link>
          </Button>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={about}
              alt="Doctor with patient"
              style={{ width: "100%"}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our <span style={{ color: "#00AEEF" }}>Mission</span>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Bolt  style={{
              color: "#06B6D4"
            }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">Honesty</Typography>
                <Typography variant="body2">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CheckCircle style={{
              color: "#06B6D4"
            }}  />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">Highest Quality</Typography>
                <Typography variant="body2">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <AssignmentInd style={{
              color: "#06B6D4"
            }}  />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">Responsibility</Typography>
                <Typography variant="body2">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </Typography>
              </Box>
            </Box>
          </Grid>
         
        </Grid>
      </Container>
    </div>
  );
};

export default About;
