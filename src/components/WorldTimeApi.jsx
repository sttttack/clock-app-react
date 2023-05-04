import React, { useState, useEffect } from "react";
import "../components/WorldTimeApi.css";

import Sun from "../assets/desktop/icon-sun.svg";

export default function WorldTimeApi() {
  const [data, setData] = useState();
  const [ip, setIp] = useState("");
  const [date, setDate] = useState("");
  const [dst, setDst] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        const response = await fetch("http://worldtimeapi.org/api/ip");
        const json = await response.json();
        setData(json);
        setIp(json.client_ip);
        setDate(json.datetime);
        setDst(json.abbreviation);
      };

      fetchData();
    }, 1000);
  }, []);

  const time = date.split("T");
  const hours = time[1]?.substring(0, 5);

  return (
    <>
      <div className="timeZone">
        <div className="greetings">
          <img src={Sun}></img>
          <p className="morning">Good Morning</p>
        </div>
        <div className="format">
          <p className="hours">{hours}</p>
          <p className="zone">{dst}</p>
        </div>
        <p className="city">Newport Beach, CA</p>
      </div>
      <div>
        <div className="more">
          <p>MORE</p>
          <div className="oval"></div>
        </div>
      </div>
    </>
  );
}
