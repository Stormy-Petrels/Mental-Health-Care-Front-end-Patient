import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Filter(props) {
  const [majors, setMajor] = useState([]);

  useEffect(() => {
    const fetchData = async () => 
      {
        try {
          const majors = await axios.get(`http://127.0.0.1:8000/api/major`);
          setMajor(() => majors.data.data);
        }
        catch (error) {
          console.log(error);
        }
      }
      fetchData();
  }, [])

  const handleClick = (e) => {
    props.handleChooseFilter(e.target.value);
  }

  return (
    <div className='filter'>
      {majors.map((major) => (
        <div className='filter-item' key={major.id}>
          <button className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
            border-blue-600
            border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px] p-5" onClick={handleClick} value={major.name}>
              {major.name}
          </button>
        </div>
      ))}
    </div>
  );
}