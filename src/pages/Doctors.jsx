import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import axios from "axios";


function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(()=>{
    const fetchData = async () => 
      {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/Patient/viewListDoctors`);

          // console.log(response.data.payload);
          setDoctors(response.data.payload);
        }
        catch (error) {
          console.log(error);
        }
      }
      fetchData();
  }, [])
  
  return (
    <>
      <DoctorCard doctors={doctors}/>
    </>
  )
}

export default Doctors
