import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Box,
    Card,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Avatar,
    TextField,
    Button,
} from '@mui/material';
import ImageDefaultDoctor from '../assets/ImageDefaultDoctor.jpg';
import axios from 'axios';
import History from './History';

const Profile = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(0);
    const [patient, setPatientData] = useState(null);
    const [editInfo, setEditInfo] = useState({
        fullName: '',
        phone: '',
        address: '',
        password: '',
        urlImage: null
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        setEditInfo(prevState => ({
            ...prevState,
            urlImage: event.target.files[0]
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditInfo({
            fullName: patient?.fullName || '',
            phone: patient?.phone || '',
            address: patient?.address || '',
            password: patient?.password || '',
            image: null
        });
    };

    const handleSaveChanges = async () => {
        try {
            const formData = new FormData();
            formData.append('fullName', editInfo.fullName);
            formData.append('email', editInfo.email);
            formData.append('password', editInfo.password);
            formData.append('phone', editInfo.phone);
            formData.append('address', editInfo.address);
            formData.append('urlImage', editInfo.urlImage);

            const response = await axios.post(`http://127.0.0.1:8000/api/profile/${id}/edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setPatientData(response.data.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/profile/${id}`);
                setPatientData(response.data.data);
                setEditInfo({
                    fullName: response.data.data.fullName,
                    email: response.data.data.email,
                    password: response.data.data.password,
                    phone: response.data.data.phone,
                    address: response.data.data.address,
                    healthCondition: response.data.data.healthCondition,
                    note: response.data.data.note,
                    urlImage: null
                });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <Container className="container light-style flex-grow-1 container-p-y py-20">
            <Card>
                <Grid container>
                    <Grid item md={2.5}>
                        <List component="nav">
                            <ListItemButton selected={activeTab === 0} onClick={(event) => handleTabChange(event, 0)}>
                                <ListItemText primary="My Profile" />
                            </ListItemButton>
                            <ListItemButton selected={activeTab === 1} onClick={(event) => handleTabChange(event, 1)}>
                                <ListItemText primary="History Appointment" />
                            </ListItemButton>
                        </List>
                    </Grid>
                    <Grid item md={9.5}>
                        <Box>
                            {activeTab === 0 && (
                                <Box sx={{ p: 3 }}>
                                    <Box display="flex" alignItems="center" mb={3}>
                                        <Avatar
                                            src={patient?.image ? `http://127.0.0.1:8000/images/${patient.image}` : ImageDefaultDoctor}
                                            alt="User Avatar"
                                            style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                                        />
                                        <Box sx={{ p: 3 }}>
                                            <p>{patient?.fullName}</p>
                                            <p>{patient?.email}</p>
                                        </Box>
                                    </Box>
                                    <Box component="hr" sx={{ borderColor: 'lightgray', m: 0 }} />
                                    <Box sx={{ p: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <TextField fullWidth label="Full Name" variant="outlined" margin="normal" name="fullName" value={editInfo.fullName} onChange={handleInputChange} disabled={!isEditing} InputLabelProps={{ shrink: true, }} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField fullWidth label="Email" variant="outlined" margin="normal" name="email" value={editInfo.email} onChange={handleInputChange} disabled={!isEditing} InputLabelProps={{ shrink: true, }} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField fullWidth label="Password" variant="outlined" margin="normal" name="password" value={editInfo.password} onChange={handleInputChange} disabled={!isEditing} InputLabelProps={{ shrink: true, }}/>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField fullWidth label="Phone" variant="outlined" margin="normal" name="phone" value={editInfo.phone} onChange={handleInputChange} disabled={!isEditing} InputLabelProps={{ shrink: true, }} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField fullWidth label="Address" variant="outlined" margin="normal" name="address" value={editInfo.address} onChange={handleInputChange} disabled={!isEditing} InputLabelProps={{ shrink: true, }} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Button variant="outlined" component="label" sx={{ mt: 2 }} disabled={!isEditing} >
                                                    <input name="urlImage" accept="image/*" type="file" onChange={handleImageChange} />
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="Health Condition" variant="outlined" margin="normal" value={editInfo.healthCondition} disabled InputLabelProps={{ shrink: true, }} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="Note" variant="outlined" margin="normal" value={editInfo.note} disabled InputLabelProps={{ shrink: true, }} />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Box textAlign="right" mt={3}>
                                                    {isEditing ? (
                                                        <>
                                                            <Button variant="contained" color="info" sx={{ mr: 1 }} onClick={handleSaveChanges}>Save</Button>
                                                            <Button variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
                                                        </>
                                                    ) : (
                                                        <Button variant="contained" color="info" onClick={handleEdit}>Edit</Button>
                                                    )}
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            )}
                            {activeTab === 1 && (
                                <Box sx={{ p: 3 }}>
                                    <History id={patient?.id}/>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}

export default Profile;