import React from "react";
import Logo from "../components/Logo";

function Footer() {
  return (
    <div className="">
      <div className="bg-[#EFEFEF] mt-24 p-8  grid grid-cols-1 gap-1 lg:grid-cols-4 lg:gap-2">
        <div className="h-32 rounded-lg flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-lg  flex flex-col  justify-center">
            <div className="md:flex md:items-center">
              <Logo />
              <p className="text-cyan-500 ml-2 text-xl">Mental Health Care</p>
            </div>
            <p className="max-w-xs text-gray-700">
              Exceptional care, delivered with unwavering compassion - our
              promise to you, our beloved community
            </p>
          </div>
        </div>

        <div className="h-32 rounded-lg flex items-center">
          <div className="w-3/4 h-3/4 rounded-lg flex flex-col  justify-center">
            <div className="md:flex md:items-center text-left">
              <p className="text-xl font-bold leading-6 text-cyan-500">
                Services
              </p>
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-gray-700 transition hover:opacity-75">
                  Department
                </p>
              </li>
              <li>
                <p className="text-gray-700 transition hover:opacity-75">
                  Doctors
                </p>
              </li>
              <li>
                <p className="text-gray-700 transition hover:opacity-75">
                  Major
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-32 rounded-lg flex items-center">
          <div className="w-3/4 h-3/4 rounded-lg flex flex-col  justify-center">
            <div className="md:flex md:items-center text-left">
              <p className="text-xl font-bold leading-6 text-cyan-500">
                Helpful Links
              </p>
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-gray-700 transition hover:opacity-75">FAQ</p>
              </li>
              <li>
                <p className="text-gray-700 transition hover:opacity-75">
                  Contact via email
                </p>
              </li>
              <li>
                <p className="text-gray-700 transition hover:opacity-75">
                  Contact via phone
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-32 rounded-lg flex items-center">
          <div className="w-3/4 h-3/4 rounded-lg flex flex-col  justify-center">
            <div className="md:flex md:items-center text-left">
              <p className="text-xl font-bold leading-6 text-cyan-500">
                Hospital
              </p>
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-gray-700 transition hover:opacity-75">
                  Son Tra, Da Nang Viet Nam
                </p>
              </li>
              <li>
                <p className="text-gray-700 transition hover:opacity-75">
                  hospital@mentalhealthcare.com
                </p>
              </li>
              <li>
                <p className="text-gray-700 transition hover:opacity-75">
                  (+487) 384 9452
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#64B9E5] text-[#fff] p-4 flex items-center justify-center">
        © 2024 Mental health care.
      </div>
    </div>
  );
}

export default Footer;
