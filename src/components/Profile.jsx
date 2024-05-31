import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import EditProfile from './EditProfile';
import { useParams } from 'react-router-dom';

const Profile = ({ id }) => { // Receive id as props
    const [profileData, setProfileData] = useState(null);
    const [editMode, setEditMode] = useState(false);








    console.log("Received ID:", id);








    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/profile/${id}`);
                setProfileData(response.data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            {profileData && (
                <div>
                    {!editMode ? (
                        <div className="p-grid">
                            <DataTable value={[profileData]} className="p-datatable-sm py-10" rowHover showGridlines>
                                <Column field="fullName" header="Full Name"></Column>
                                <Column field="address" header="Address"></Column>
                                <Column field="phone" header="Phone"></Column>
                                <Column field="healthCondition" header="Health Condition"></Column>
                                <Column field="note" header="Note"></Column>
                            </DataTable>

                            <Button variant="contained" color="info" onClick={() => setEditMode(true)}>
                                Edit Profile
                            </Button>
                        </div>
                    ) : (
                        <EditProfile profileData={profileData} setEditMode={setEditMode} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
