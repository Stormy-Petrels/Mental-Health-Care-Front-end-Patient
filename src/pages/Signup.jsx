import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, Container, Alert, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../assets/SigninSignup.jpg";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setEmailError("");
        setFullNameError("");
        setPasswordError("");
        setPhoneError("");
        setAddressError("");

        try {
            const response = await axios.post("http://localhost:8000/api/sign-up", {
                email,
                fullName,
                password,
                phone,
                address,
            });

            if (response.data.payload) {
                setMessage("Sign up successfully!");
                localStorage.setItem("authToken", response.data.payload.token);
                localStorage.setItem("user", JSON.stringify(response.data.payload.user));
                history.push("/signin");
            }
        } catch (error) {
            if (error.response) {
                const { errors, message } = error.response.data;
                setMessage(message || "Error, please check your input.");
                if (errors) {
                    setEmailError(errors.email ? errors.email.join(", ") : "");
                    setFullNameError(errors.fullName ? errors.fullName.join(", ") : "");
                    setPasswordError(errors.password ? errors.password.join(", ") : "");
                    setPhoneError(errors.phone ? errors.phone.join(", ") : "");
                    setAddressError(errors.address ? errors.address.join(", ") : "");
                } else if (message === "Email already exists") {
                    setEmailError("Email already exists.");
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
            <Box sx={{ py: 15}}>
                <Grid container>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundColor: (t) =>
                                t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                        }}
                    >
                        <img src={logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8, mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                {message && <Alert severity={message.includes("successfully") ? "success" : "error"}>{message}</Alert>}
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
                                    id="fullName"
                                    label="Full Name"
                                    name="fullName"
                                    autoComplete="name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    error={!!fullNameError}
                                    helperText={fullNameError}
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
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    error={!!phoneError}
                                    helperText={phoneError}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    error={!!addressError}
                                    helperText={addressError}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/signin" variant="body2">
                                            {"Already have an account? Sign In"}
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