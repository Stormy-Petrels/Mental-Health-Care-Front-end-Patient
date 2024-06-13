import React, { useRef, useState } from "react";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_w7z16qo";
    const templateId = "template_ohauk6a";
    const publicKey = "mrWB6QHqAHN_FXQt1";

    const templateParams = {
      from_name: name,
      from_email: email,
      from_phone: phone,
      from_message: message,
      to_name: "Mental Health Care",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("send successfully", response);
        toast.success("Send message successfully!", { autoClose: 1500 });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      })
      .catch((error) => {
        console.error("send error", error);
        toast.error("Failed to send message, please try again.", { autoClose: 1500 });
      });
  };

  return (
    <Container className="pt-28 pb-20">
      <ToastContainer />
      <Grid container spacing={4} className="justify-center items-center">
        <Grid item xs={12} md={6}>
          <div className="p-4">
            <Typography
              style={{ color: "#06B6D4" }}
              variant="h4"
              component="h1"
              gutterBottom
            >
              Contact Us
            </Typography>
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4"
            >
              <TextField
                name="name"
                label="Your Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                name="phone"
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Type Message"
                className="w-full p-4 border border-gray-200 rounded-md"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                style={{
                  backgroundColor: "#06B6D4",
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
        <Grid item xs={12} md={6}>
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
