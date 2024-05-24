import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const SlidePanel = () => {
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
                <li className="flex items-center justify-between mb-2">
                    <p className="text-base leading-6 text-textColor">
                        Sunday
                    </p>
                    <p className="text-base leading-6 text-textColor">
                        4:00 PM - 9:30 PM
                    </p>
                </li>
                <li className="flex items-center justify-between mb-2">
                    <p className="text-base leading-6 text-textColor">
                        Sunday
                    </p>
                    <p className="text-base leading-6 text-textColor">
                        4:00 PM - 9:30 PM
                    </p>
                </li>
            </ul>
        </div>
        <Button variant="contained" className=" w-full rounded-md">
            <Link to="/">Book Appoinment</Link>
        </Button>
    </div>
  );
};

export default SlidePanel;