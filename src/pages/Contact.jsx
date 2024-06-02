import React from "react";
import { Container, Grid, TextField, Button } from "@mui/material";
import { Typography } from "@mui/material";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi biểu mẫu ở đây
  };

  return (
    <Container className="pt-28 pb-20">
      <Grid container spacing={4} className="justify-center items-center">
        <Grid item xs={12} md={6}>
          <div className="p-4 ">
            <Typography
              style={{ color: "#4D8DFF" }}
              variant="h4"
              component="h1"
              gutterBottom
            >
              Contact Us
            </Typography>
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
              <Button
                type="submit"
                style={{
                  backgroundColor: "#2C74DF",
                  textTransform: "none",
                  color: "white",
                  fontSize: "1.125rem",
                  textDecoration: "none",
                }}
                variant="contained"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item xs={1} md={6}>
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?t=st=1716999256~exp=1717002856~hmac=00c60cd007155e1b6e3e0f78c48b27b62dc38cfd2beae00e69cfff785f309dda&w=740"
            alt="Contact Us"
            className="w-full h-auto rounded-lg"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
