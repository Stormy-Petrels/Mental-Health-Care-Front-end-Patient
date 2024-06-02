// src/AboutUs.js

import React from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { Bolt, CheckCircle, AssignmentInd } from '@mui/icons-material';

const About = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About <span style={{ color: '#00AEEF' }}>Us</span>
        </Typography>
        <Typography variant="body1" gutterBottom>
          "With profound knowledge and meticulousness, doctors ensure all decisions are made accurately and carefully."
        </Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
          GET CONTACT
        </Button>
      </Box>

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img src="/path/to/your/image1.jpg" alt="Doctor with patient" style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our <span style={{ color: '#00AEEF' }}>Mission</span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Bolt color="secondary" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6">Honesty</Typography>
              <Typography variant="body2">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircle color="secondary" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6">Highest Quality</Typography>
              <Typography variant="body2">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AssignmentInd color="secondary" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6">Responsibility</Typography>
              <Typography variant="body2">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <img src="/path/to/your/image2.jpg" alt="Doctor writing" style={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
