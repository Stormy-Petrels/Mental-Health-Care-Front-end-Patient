import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import axios from "axios";
import Filter from '../components/Filter';


function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [nameMajor, setNameMajor] = useState("Bác sĩ");

  const handleChooseFilter = (nameMajor) => {
    setNameMajor(() => nameMajor);
    // console.log(nameMajor);
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

  return (
    <div className='childrenContainer'>
      <Filter handleChooseFilter={handleChooseFilter}/> 
      <DoctorCard doctors={doctors} nameMajor={nameMajor}/>
    </div>
  )
}

export default Doctors
