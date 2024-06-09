import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import axios from "axios";
import Filter from '../components/Filter';
import Skeleton from '../components/SkeletonListDoctor.jsx';


function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [nameMajor, setNameMajor] = useState([]);
  const [skeleton, setSkeleton] = useState(true);

  const handleChooseFilter = (nameMajor) => {
    setNameMajor(() => nameMajor);
  }

  useEffect(()=> {
    const fetchData = async () => 
      {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/patient/viewListDoctors`);
          setDoctors(() => (response.data.payload));

          const timer = setTimeout(() => {
            setSkeleton(false);
          }, 500);
      
          return () => clearTimeout(timer);
        }
        catch (error) {
          console.log(error);
        }
      }

      fetchData();
      
  }, [])

  return (
    <div className='childrenContainer'>
      {skeleton === true ? <Skeleton />  : <><Filter handleChooseFilter={handleChooseFilter}/>
      <DoctorCard doctors={doctors} nameMajor={nameMajor}/></>}
      
      
      {/* {
        doctors.map((doctor) => (
          <div key={doctor.id}>
            <p>
              <span className="font-bold text-black">{doctor.fullName}</span>
              <span className="font-bold text-black"> {doctor.major}</span>
            </p>
          </div>
        ))
       
      } */}

      

    </div>
  )
}

export default Doctors;
