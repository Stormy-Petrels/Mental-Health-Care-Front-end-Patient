import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SlidePanel = () => {
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
      const fetchTimeSlots = async () => {
        try {
          const response = await axios.post('/api/checkTime', {
            date: '2024-05-24',
            doctorId: 1
          });
          setTimeSlots(response.data.listTime);
        } catch (error) {
          console.error('Error fetching time slots:', error);
        }
      };
  
      fetchTimeSlots();
    }, []);
  return (
    <div className="bg-white shadow-md shadow-gray-500 p-3 lg:p-5 rounded-md">
        <div className="flex items-center justify-between">
            <p className="text__para mt-0 font-extrabold">Price: </p>
            <span className="text-base leading-7 lg:leading-8 text-headingColor font-extrabold">
                500 BDT
            </span>
        </div>

        <div className="mt-5">
            <p className="text_para mt-0 font-extrabold text-headingColor">
                Available Time Slots:
            </p>

            <ul className="py-3">
                {timeSlots.map((slot) => (
                    <li key={slot.id} className="flex items-center justify-between mb-2">
                    <p className="text-base leading-6 text-textColor">
                        {new Date(slot.timeStart).toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                    <p className="text-base leading-6 text-textColor">
                        {new Date(slot.timeStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.timeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    </li>
                ))}
            </ul>
        </div>
        <Button variant="contained" className=" w-full rounded-md">
            <Link to="/">Book Appoinment</Link>
        </Button>
    </div>
  );
};

export default SlidePanel;