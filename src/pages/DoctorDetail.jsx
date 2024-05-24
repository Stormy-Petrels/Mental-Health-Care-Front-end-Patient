import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DoctorAbout from "./DoctorAbout";
import { formateDate } from "../utils/formateDate";
import SlidePanel from "./SlidePanel";

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("about");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/detail/${doctorId}`)
      .then((response) => {
        setDoctor(response.data.payload);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the doctor!", error);
        setLoading(false);
      });
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        No doctor found
      </div>
    );
  }

  return (
    <section>
      <div className="max-w-[1170px] py-20 px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctor.image} alt="Doctor profile" className="w-full" />
              </figure>

              <div>
                <span className="bg-[#59e5f2] px-6 py-2 text-lg font-extrabold rounded">
                  {doctor.major}
                </span>
                <h3 className="text-2xl mt-4 py-3 font-extrabold">
                  {doctor.fullName}
                </h3>
                <p className="text-base lg:max-w-[390px]">
                  {doctor.description}
                  <br />
                  {doctor.phone}
                  <br />
                  {doctor.address}
                </p>
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

            <DoctorAbout />
          </div>
          <div className="md:col-span-1">
            <SlidePanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetail;
