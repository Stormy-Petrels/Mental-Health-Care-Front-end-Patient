import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import axios from "axios";
import Filter from '../components/Filter';


function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [nameMajor, setFilters] = useState("");

  const handleChooseFilter = (nameMajor) => {
    setFilters(() => nameMajor);
  }

  useEffect(()=> {
    const fetchData = async () => 
      {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/Patient/viewListDoctors`);
          setDoctors(() => (response.data.payload));
        }
        catch (error) {
          console.log(error);
        }
      }
      fetchData();
  }, [])
  console.log(nameMajor);
  return (
    <div className='childrenContainer'>
      <Filter handleChooseFilter={handleChooseFilter}/> 
      <DoctorCard doctors={doctors} nameMajor={nameMajor}/>
    </div>
  )
}

export default Doctors
