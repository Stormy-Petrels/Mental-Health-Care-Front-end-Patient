import React from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi biểu mẫu ở đây
  };

  return (
    <Container className="pt-28 pb-20">
      <Grid container spacing={4} className="justify-center items-center">
        <Grid item xs={12} md={6}>
          <div className="p-4 border border-gray-200 rounded-lg">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <TextField
                name="name"
                label="Your Name"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                name="phone"
                label="Phone Numbers"
                variant="outlined"
                fullWidth
                required
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Type Message"
                className="w-full p-4 border border-gray-200 rounded-md"
                required
              />
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item xs={1} md={6}>
          <img
            src="https://via.placeholder.com/600x400"
            alt="Contact Us"
            className="w-full h-auto rounded-lg"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
