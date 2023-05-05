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
        const response = await fetch("http://worldtimeapi.org/api/ip", {
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

  console.log(unit);

  if (unit === "PM") {
    document.body.style.backgroundImage =
      "url('src/assets/mobile/bg-image-daytime.jpg";
  } else if (unit === "AM") {
    document.body.style.backgroundImage =
      "url('src/assets/mobile/bg-image-nighttime.jpg";
  }

  return (
    <div className="heroku">
      <div className="timeZone">
        <div className="greetings">
          <img src={Sun}></img>
          <p className="morning">
            {unitHours && timeHours <= 12 ? "Good Morning" : "Good Afternoon"}
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
