import React, { useEffect, useState } from "react";
import ImageDefaultDoctor from '../assets/ImageDefaultDoctor.jpg';
import {
    Container,
    Grid,
    Box,
    Button,
    Typography,
    Avatar,
    useTheme
} from '@mui/material';
import MyBooking from "../components/MyBooking";
import Profile from "../components/Profile";

const MyAccount = () => {
    const [tab, setTab] = useState('bookings');
    const theme = useTheme();
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        const selectedFile = URL.createObjectURL(event.target.files[0]);
        setFile(selectedFile);
    };

   useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userString = localStorage.getItem("user");
        if (token && userString) {
            try {
                const user = JSON.parse(userString);
                setUser(user);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 10, px: 2 }}>
            <Grid container spacing={4}>
                <Grid item xs={6} md={3}>
                    <Box sx={{ pb: 6, px: 3, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
                        <Box display="flex" justifyContent="center" mb={3}>
                            <Avatar
                                src={user?.image ? `http://127.0.0.1:8000/images/${user.image}` : ImageDefaultDoctor}
                                alt="User Image"
                                sx={{
                                    mt: 4,
                                    width: 100,
                                    height: 100,
                                    border: `2px solid ${theme.palette.primary.main}`
                                }}
                            />
                        </Box>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                            {user?.fullName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user?.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user?.phone}
                        </Typography>

                        <Box mt={3}>
                            <div className="App">
                                <input type="file" onChange={handleChange} />
                                {file && <img src={file} alt="Selected file" />}
                            </div>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box sx={{ px: 30 }}>
                        <Button
                            onClick={() => setTab('bookings')}
                            variant={tab === 'bookings' ? 'contained' : 'outlined'}
                            color={tab === 'bookings' ? 'error' : 'inherit'}
                            sx={{
                                p: 1,
                                mr: 2,
                                px: 3,
                                borderRadius: 1,
                                fontWeight: tab === 'bookings' ? 'normal' : 'bold'
                            }}
                        >
                            My Bookings
                        </Button>
                        <Button
                            onClick={() => setTab('profile')}
                            variant={tab === 'profile' ? 'contained' : 'outlined'}
                            color={tab === 'profile' ? 'error' : 'inherit'}
                            sx={{
                                p: 1,
                                px: 3,
                                borderRadius: 1,
                                fontWeight: tab === 'profile' ? 'normal' : 'bold'
                            }}
                        >
                            Profile
                        </Button>
                    </Box>
                    {tab === 'bookings' && <MyBooking />}
                    {tab === 'profile' && <Profile id={user?.roleId} />} 
                </Grid>
            </Grid>
        </Container>
    );
};

export default MyAccount;
