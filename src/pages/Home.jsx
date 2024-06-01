import React from "react";
import Hero from "../layouts/Hero";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  const staffCardsData = [
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/fd6ef271b50605c15e4aee91a02fd82db3b62ef5560fb61370d07876a8c5a6c5?apiKey=cceb8282e0e64aaeb0533b2dfea39e76&",
      name: "Dr. Leslie Taylor",
      role: "PEDIATRICIAN",
      description: "Eos nam veniam unde quia nihil asperiores officiis volupt",
    },
    {
      imgSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/67f95871429276a1bcd504de54f6dffafaa0673bbb4daeeeb0d3654dba0b3313?apiKey=cceb8282e0e64aaeb0533b2dfea39e76&",
      name: "Prof. Zachary Brown",
      role: "CARDIOLOGIST",
      description:
        "Et illum incidunt recusandae minus nihil non. Sed repellat et officiis aut in in at. Eos dolor qui est. Reprehenderit ab ullam il",
    },
  ];


  const InfoCard = ({ data, text }) => (
    <div className="h-32 rounded-lg flex items-center justify-center">
      <div className="w-3/4 h-3/4 rounded-lg  flex flex-col items-center justify-center">
        <p className="text-5xl text-cyan-500">{data}</p>
        <p className="text-xl font-medium text-neutral-500">{text}</p>
      </div>
    </div>
  );

  const infoCardsData = [
    { data: "+ 51", text: "Happy Patients" },
    { data: "+ 26", text: "Total Branches" },
    { data: "+ 50", text: "Senior Doctors" },
    { data: "+ 20", text: "Years Experience" },
  ];

  return (
    <div>
      <Hero />
    

      <div className="grid grid-cols-1 gap-1 lg:grid-cols-4 lg:gap-0 mt-6">
        {infoCardsData.map((data, index) => (
          <InfoCard key={index} data={data.data} text={data.text} />
        ))}
      </div>

      <section className="mx-auto max-w-screen-2xl px-6 sm:px-6 lg:px-20">
        <h1 className="self-start mt-32 text-6xl font-extrabold text-black md:mt-10 md:text-4xl">
          Our Team
        </h1>
        <div className="mt-14 md:mt-10 md:max-w-full">
          <div className="flex flex-col gap-10 md:flex-row md:gap-5">
            {staffCardsData.map((data, index) => (
              <div
                key={index}
                className="flex items-start gap-5 w-full md:w-[50%] md:max-md:ml-0 md:max-md:w-full"
              >
                <img
                  loading="lazy"
                  src={data.imgSrc}
                  alt={`${data.name}`}
                  className="shrink-0 max-w-full aspect-[0.92] w-[207px] md:mt-7"
                />
                <div className="flex flex-col py-10">
                  <h3 className="text-2xl font-extrabold text-neutral-500">
                    <span className="font-bold text-black">{data.name}</span>
                  </h3>
                  <p className="text-base text-cyan-500">{data.role}</p>
                  <p className="text-base text-neutral-500">
                    {data.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-20 py-20 mt-20 w-full bg-cyan-500">
        <form className="flex flex-col max-w-full">
          <h1 className="text-4xl font-extrabold text-black">Our Newsletter</h1>
          <div className="mt-14 md:mt-6 md:flex md:justify-between">
            <div className="w-6/12 max-md:ml-0 max-md:w-full">
              <div className="text-3xl text-white">
                Subscribe Us To Get More Updates
              </div>
            </div>
            <div className="w-6/12">
              <label htmlFor="emailInput" className="sr-only">
                Your Email Address
              </label>
              <div className="flex items-center pl-8 text-base font-bold bg-cyan-500 border border-white border-solid rounded w-2/3 mx-auto">
                <input
                  type="email"
                  id="emailInput"
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  className="flex-auto my-auto text-white placeholder-white bg-transparent focus:outline-none"
                />
                <Button variant="contained">
                  <Link to="">SUBSCRIBE</Link>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Home;
