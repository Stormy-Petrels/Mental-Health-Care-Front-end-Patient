import React, { useEffect, useState } from "react";
import axios from "axios";
import { formateDate } from "../utils/formateDate";
import ButtonTime from "../components/ButtonTime";
import { useHistory, useParams } from "react-router-dom";

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [tab, setTab] = useState("about");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeList, setTimeList] = useState([]);
  const patient = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const currentDate = new Date().toISOString().split('T')[0];

  const handleGetTime = (e) => {
    console.log(e.target.value);
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  useEffect(() => {
    if (selectedDate) {
      const fetchData = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/time', {
            "date": selectedDate,
            "doctorId": doctorId,
          });
          setTimeList(response.data.listTime);
        } catch (error) {
          console.error('Error fetching time slots:', error);
        }
      };
      fetchData();
    }
  }, [selectedDate, doctorId]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/detail/${doctorId}`);
        setDoctor(response.data.payload);
      } catch (error) {
        console.error("There was an error fetching the doctor!", error);
      }
    };
    fetchDoctorDetails();
  }, [doctorId]);

  /* eslint-disable no-restricted-globals */
  const payMent = async (timeStart, timeEnd, calendarId, price) => {
    const userConfirmed = confirm(`Are you sure you want to book this time? from ${timeStart} and ${timeEnd}`);
  
    if (userConfirmed) {
      const data = {
        "date": selectedDate,
        "doctorId": doctorId,
        "patientId": patient.roleId,
        "calendarId": calendarId,
        "timeStart": timeStart, 
        "timeEnd": timeEnd,
        "price": price,
        "doctorName": doctor.fullName,
        "doctorImage": doctor.image,
      }
      localStorage.setItem('informationOfBooking', JSON.stringify(data));
      
      history.push(`/patient/${patient.roleId}/payment`);
    } else {
      console.log("Booking cancelled");
    }
  };
  /* eslint-enable no-restricted-globals */

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        No doctor found
      </div>
    );
  }

  const baseURL = "http://127.0.0.1:8000/images/";
  console.log(timeList);
  return (
    <section>
      <div className="max-w-[1170px] pt-28 pb-20 px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex gap-8">
              <figure>
                <img src={`${baseURL}${doctor.image}`} alt={doctor.image} className="w-[250px] h-[250px] object-cover" />
              </figure>
              <div className="py-3">
                <span className="bg-[#59e5f2] px-6 p-3 text-lg font-extrabold rounded">
                  {doctor.major}
                </span>
                <h3 className="text-2xl mt-4 py-3 font-extrabold">
                  {doctor.fullName}
                </h3>
                <p className="text-base lg:max-w-[390px]">
                  {doctor.phone}
                  <br />
                  {doctor.address}
                </p>
              </div>
              <div style={{position: "absolute", left: "55%"}}>
                  <h3 className="text-lg font-extrabold pb-5 text-center pt-4">
                    Schema <br />
                    <input type="date" onChange={handleGetTime} value={selectedDate} min={currentDate}/>
                  </h3>
                  
                  <ul className="grid sm:grid-cols-2 gap-[10px] pt-4 md:p-5">
                    {timeList.length > 0 ? timeList.map((time) => (
                      <ButtonTime times={time} handle={payMent} key={time.id}/>
                    )) : <p>Unavailable time</p>}
                  </ul>
                </div>
            </div>
            <div className="mt-20 border-b-4 border-solid border-[#01010134]">
              <button onClick={() => setTab("about")} className={`py-2 mr-5 text-2xl leading-7 text-headingColor font-extrabold`}>
                About
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg mt-2 font-extrabold">
                Experience
              </h3>
              <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                <li className="p-4 rounded bg-[#59e5f2]">
                  <span className="text-sm font-extrabold">
                    {formateDate("07-04-2010")} - {formateDate("08-13-2014")}
                  </span>
                  <p className="text-base">
                    {doctor.major}
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg mt-2 font-extrabold">
                Description
              </h3>
              <p className="text-base mt-2">
                {doctor.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetail;
