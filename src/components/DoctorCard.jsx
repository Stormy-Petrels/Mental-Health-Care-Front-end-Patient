import * as React from 'react';
import Button from '@mui/material/Button';
import ReactPaginate from 'react-paginate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctors, nameMajor }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [newDataDoctors, setNewDataDoctors] = useState([]);
  const [currentDataDoctors, setCurrentDataDoctors] = useState(doctors);

  useEffect(() => {
    const filteredDoctors = doctors.filter(
      (doctor) => nameMajor === doctor.major
    );
    setNewDataDoctors(filteredDoctors);
    setCurrentPage(0);
  }, [doctors, nameMajor]);

  useEffect(() => {
    const indexLast = (currentPage + 1) * 6;
    const indexFirst = indexLast - 6;
    setCurrentDataDoctors(newDataDoctors.slice(indexFirst, indexLast));
  }, [newDataDoctors, currentPage]);

  const baseURL = "http://127.0.0.1:8000/images/";

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="listDoctors">
      {currentDataDoctors.map((doctor) => (
        <Link
          to="#"
          className="group relative block overflow-hidden"
          key={doctor.id}
          id='card'
        >
          <button className="absolute end-4 top-4 z-0 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
            <span className="sr-only">Wishlist</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>

          <img
            src={`${baseURL}${doctor.image}`}
            alt={doctor.image}
            className="w-[320px] h-[310px] cover-object"
          />

          <div className="relative border border-gray-100 bg-white p-6">
            <span className="whitespace-nowrap bg-gray-400 px-3 py-1.5 text-xs font-medium">
              {" "}
              {doctor.major}{" "}
            </span>

            <h3 className="mt-4 text-lg font-medium">
              <p style={{color:"#166CD0", fontWeight: "bold", fontFamily:"Audiowide, Sans-serif"}}>{doctor.fullName}</p>
            </h3>

            <Link to={"/doctor/" + doctor.id}>
              <form className="mt-4">
                <Button variant="contained" size="large" fullWidth="true" style={{backgroundColor: "#E3F2FF"}}>
                  <p style={{color:"#1b3250", fontWeight: "bold"}}>Book</p>
                </Button>
              </form>
            </Link>
          </div>
        </Link>
      ))}
      <div className="paginate">
        <ReactPaginate
          activeClassName={"item active "}
          breakClassName={"item break-me "}
          breakLabel={"..."}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          nextLabel={
            currentDataDoctors.length === 0 ? (
              ""
            ) : (
              <ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />
            )
          }
          onPageChange={handlePageClick}
          pageCount={Math.ceil(newDataDoctors.length / 6)}
          pageClassName={"item pagination-page "}
          pageRangeDisplayed={2}
          previousClassName={"item previous"}
          previousLabel={
            currentDataDoctors.length === 0 ? (
              ""
            ) : (
              <ArrowBackIosNewIcon style={{ fontSize: 18, width: 150 }} />
            )
          }
        />
      </div>
    </div>
  );
};

export default DoctorCard;
