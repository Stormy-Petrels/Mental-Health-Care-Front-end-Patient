import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Stack, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

const EditProfile = ({ profileData, setEditMode }) => {
  const [updatedData, setUpdatedData] = useState(profileData);
  const { id } = useParams();

  useEffect(() => {
    setUpdatedData(profileData);
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/profile/${id}`, updatedData);
      alert('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="Full Name" name="fullName" value={updatedData.fullName} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Address" name="address" value={updatedData.address} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Phone" name="phone" value={updatedData.phone} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Health Condition" name="healthCondition" value={updatedData.healthCondition} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Note" name="note" value={updatedData.note} onChange={handleInputChange} fullWidth margin="normal" />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="info" type="submit">Save</Button>
          <Button variant="contained" color="error" onClick={() => setEditMode(false)}>Cancel</Button>
        </Stack>
      </form>
    </div>
  );
};

export default EditProfile;
