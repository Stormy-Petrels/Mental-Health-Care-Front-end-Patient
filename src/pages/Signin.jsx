import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import signin from "../assets/Signin.jpg";
import UserIcon from "../assets/Animation.gif";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setEmailError("");
    setPasswordError("");

    try {
      const response = await axios.post("http://localhost:8000/api/sign-in", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.payload));
      const userString = localStorage.getItem("user");

      const user = JSON.parse(userString);
        const role = user.role;
        console.log(role);
        
        if (role === "Patient") {
          setMessage("Sign in successfully!");
          
          window.location.href = "/"; 
        } else {
          setMessage("You are not authorized to access this page.");
        }
    } catch (error) {
      if (error.response) {
        const { errors, message } = error.response.data;
        setMessage(message || "Error, please re-enter email or password.");
        if (errors) {
          setEmailError(errors.email ? errors.email.join(", ") : "");
          setPasswordError(errors.password ? errors.password.join(", ") : "");
        }
        if (message === "account has been locked") {
          setMessage("Your account has been locked. Please contact support.");
        } else if (message === "Invalid email or password") {
          setMessage("Invalid email or password.");
        }
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ py: 15 }}>
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
            }}
          >
            <img
              src={signin}
              alt="Logo"
              style={{ width: "80%", height: "80%", objectFit: "cover" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={UserIcon} width={50} alt="login" />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                {message && (
                  <Alert
                    severity={
                      message.includes("successfully") ? "success" : "error"
                    }
                  >
                    {message}
                  </Alert>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#2C74DF",
                    textTransform: "none",
                    color: "white",
                    fontSize: "1.125rem",
                    textDecoration: "none",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  Sign in
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
