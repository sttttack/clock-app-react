import React, { useState, useEffect } from "react";
import "../components/WorldTimeApi.css";

import Sun from "../assets/desktop/icon-sun.svg";
import Moon from "../assets/desktop/icon-moon.svg";

export default function WorldTimeApi() {
  const [data, setData] = useState();
  const [ip, setIp] = useState("");
  const [date, setDate] = useState("");
  const [dst, setDst] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        const response = await fetch("https://worldtimeapi.org/api/ip", {
          method: "GET",
        });
        const json = await response.json();
        setData(json);
        setIp(json.client_ip);
        setDate(json.datetime);
        setDst(json.abbreviation);
        setLocation(json.timezone);
      };

      fetchData();
    }, 1000);
  }, []);

  const time = date.split("T");
  const hours = time[1]?.substring(0, 5);
  const splitTime = hours?.split(":");

  const jsonTime = JSON.stringify(splitTime);

  const timeHours = jsonTime?.slice(2, 4);
  const timeMinutes = jsonTime?.slice(7, 9);

  const unit = timeHours >= 12 ? "PM" : "AM";
  const unitHours = timeHours % 12 || 12;
  const finalTime = unitHours + ":" + timeMinutes;

  const loc = location.split("/");
  const locationCity = loc[1];

  console.log(unitHours);

  // if (unit === "PM") {
  //   document.body.style.backgroundImage = `url("./src/assets/mobile/bg-image-daytime.jpg")`;
  // } else if (unit === "AM") {
  //   document.body.style.backgroundImage = `url("./src/assets/mobile/bg-image-nighttime.jpg")`;
  // }

  // - "Good morning" between 5am and 12pm
  // - "Good afternoon" between 12pm and 6pm
  // - "Good evening" between 6pm and 5am

  return (
    <div className="heroku">
      <div className="timeZone">
        <div className="greetings">
          <img src={unit === "AM" && unitHours > 5 ? Sun : Moon}></img>
          <p className="morning">
            {unit === "AM" && unitHours > 5 ? "GOOD MORNING" : "GOOD EVENING"}
          </p>
        </div>
        <div className="format">
          <p className="hours">{finalTime}</p>
          <p className="zone">{unit}</p>
          <p className="zone">{dst}</p>
        </div>
        <p className="city">IN {locationCity}</p>
      </div>
      <div>
        <div className="more">
          <p>MORE</p>
          <div className="oval"></div>
        </div>
      </div>
    </div>
  );
}
