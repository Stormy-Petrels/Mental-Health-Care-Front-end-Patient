import React, { useState } from "react";
import userImg from "../assets/doctor-img01.png";
import {
    Container,
    Grid,
    Box,
    Button,
    Typography,
    Avatar,
    useTheme
} from '@mui/material';
import MyBooking from "./MyBooking";
import Profile from "./Profile";


const MyAccount = () => {
    const [tab, setTab] = useState('bookings');
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ py: 15, px: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            pb: 6,
                            px: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Box display="flex" justifyContent="center" mb={3}>
                            <Avatar
                                src={userImg}
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
                            Muhibur Rahman
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            example@gmail.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            0987654321
                        </Typography>
                        <Box mt={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mb: 2 }}
                            >
                                Logout
                            </Button>
                            <Button fullWidth variant="contained" color="error">
                                Delete account
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box sx={{ px: 10 }}>
                        <Button
                            onClick={() => setTab('bookings')}
                            variant={tab === 'bookings' ? 'contained' : 'outlined'}
                            color={tab === 'bookings' ? 'primary' : 'inherit'}
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
                            onClick={() => setTab('settings')}
                            variant={tab === 'settings' ? 'contained' : 'outlined'}
                            color={tab === 'settings' ? 'primary' : 'inherit'}
                            sx={{
                                p: 1,
                                px: 3,
                                borderRadius: 1,
                                fontWeight: tab === 'settings' ? 'normal' : 'bold'
                            }}
                        >
                            Profile Setting
                        </Button>
                    </Box>
                    {
                        tab === 'bookings' && <MyBooking />
                    }
                     {
                        tab === 'settings' && <Profile />
                    }
                </Grid>
            </Grid>
        </Container>
    );
};

export default MyAccount
