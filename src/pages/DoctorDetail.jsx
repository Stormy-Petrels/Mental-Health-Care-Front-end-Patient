import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonTime from "../components/ButtonTime";
import { Link, useHistory, useParams } from "react-router-dom";
import SkeletonListDoctor from "../components/SkeletonListDoctor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ConfirmDialog from "../components/ConfirmDialog"; // Adjust the path if necessary

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [tab, setTab] = useState("about");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeList, setTimeList] = useState([]);
  const patient = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const currentDate = new Date().toISOString().split("T")[0];

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});

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
          const response = await axios.post("http://127.0.0.1:8000/api/time", {
            date: selectedDate,
            doctorId: doctorId,
          });
          setTimeList(response.data.listTime);
        } catch (error) {
          console.error("Error fetching time slots:", error);
        }
      };
      fetchData();
    }
  }, [selectedDate, doctorId]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/detail/${doctorId}`
        );
        setDoctor(response.data.payload);
      } catch (error) {
        console.error("There was an error fetching the doctor!", error);
      }
    };
    fetchDoctorDetails();
  }, [doctorId]);

  const handleConfirmClose = () => {
    setOpenConfirm(false);
  };

  const handleConfirm = () => {
    const { timeStart, timeEnd, calendarId, price } = selectedTime;
    if (patient != null) {
      const data = {
        date: selectedDate,
        doctorId: doctorId,
        patientId: patient.roleId,
        calendarId: calendarId,
        timeStart: timeStart,
        timeEnd: timeEnd,
        price: price,
        doctorName: doctor.fullName,
        doctorImage: doctor.image,
      };
      localStorage.setItem("informationOfBooking", JSON.stringify(data));
      history.push(`/patient/${patient.roleId}/payment`);
    } else {
      alert("You must be logged in!!!");
    }
    setOpenConfirm(false);
  };

  const payMent = (timeStart, timeEnd, calendarId, price) => {
    setSelectedTime({ timeStart, timeEnd, calendarId, price });
    setOpenConfirm(true);
  };

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SkeletonListDoctor />
      </div>
    );
  }

  const baseURL = "http://127.0.0.1:8000/images/";

  return (
    <section className="py-8 ">
      <div className="container mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <button className="py-2">
            <Link to="/doctors">
              <FontAwesomeIcon icon={faArrowLeft} /> BACK
            </Link>
          </button>
          <div className="flex flex-col lg:flex-row gap-8">
            <figure>
              <img
                src={baseURL + doctor.image}
                alt={doctor.image}
                className="w-[280px] h-[300px] object-cover rounded-xl "
              />
            </figure>
            <div className="lg:w-1/2">
              <h2
                style={{
                  color: "black",
                  fontWeight: "600",
                  fontSize: "24px",
                  fontFamily: "Audiowide, Sans-serif",
                }}
              >
                {doctor.fullName}
              </h2>
              <p className="mb-2">{doctor.major}</p>
              <p className="mb-4">{doctor.address}</p>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-lg font-bold mb-2">Select Date</h3>
              <input
                type="date"
                className="border rounded p-2 mb-4 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                onChange={handleGetTime}
                value={selectedDate}
                min={currentDate}
              />
              <div className="grid sm:grid-cols-3 gap-4">
                {timeList.length > 0 ? (
                  timeList.map((time) => (
                    <ButtonTime times={time} handle={payMent} key={time.id} />
                  ))
                ) : (
                  <p className="text-red">Unavailable time</p>
                )}
              </div>
            </div>
          </div>
          <div className="border-b-2 border-gray-200 my-6"></div>
          <div className="flex space-x-4">
            <button
              onClick={() => setTab("about")}
              className={`py-2 text-xl font-bold ${
                tab === "about" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              About
            </button>
            <button
              onClick={() => setTab("note")}
              className={`py-2 text-xl font-bold ${
                tab === "note" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Note
            </button>
          </div>
          {tab === "about" && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">About</h3>
              <p>{doctor.description}</p>
            </div>
          )}
          {tab === "note" && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Note</h3>
              <p>
                * Doctor's working schedule may change weekly. After scheduling,
                if there is any change in your working time, the customer care
                team will contact and advise on another suitable time for the
                patient.
              </p>
            </div>
          )}
        </div>
      </div>
      <ConfirmDialog
        open={openConfirm}
        handleClose={handleConfirmClose}
        handleConfirm={handleConfirm}
        timeStart={selectedTime.timeStart}
        timeEnd={selectedTime.timeEnd}
        selectedDate={selectedDate}
      />
    </section>
  );
};

export default DoctorDetail;
