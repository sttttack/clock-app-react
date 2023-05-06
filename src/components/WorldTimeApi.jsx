import React, { useState, useEffect, useContext } from "react";
import "../components/WorldTimeApi.css";
import "../App.css";
import "../components/Quotes";
import { HiddenContext } from "../App";
import Sun from "../assets/desktop/icon-sun.svg";
import Moon from "../assets/desktop/icon-moon.svg";
import backgroundDay from "../assets/mobile/bg-image-daytime.jpg";
import backgroundNight from "../assets/mobile/bg-image-Nighttime.jpg";

export default function WorldTimeApi() {
  const [data, setData] = useState();
  const [date, setDate] = useState("");
  const [dst, setDst] = useState("");
  const [location, setLocation] = useState("");
  const [week, setWeek] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [hidden, setHidden] = useContext(HiddenContext);
  const hiddenBox = document.querySelector(".box");
  const timeBox = document.querySelector(".heroku");
  const moreBtn = document.querySelector(".more");

  // Converting 24 hour unit to AM/PM

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

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        const response = await fetch("https://worldtimeapi.org/api/ip", {
          method: "GET",
        });
        const json = await response.json();
        setData(json);
        setDate(json.datetime);
        setDst(json.abbreviation);
        setLocation(json.timezone);
        setWeek(json.day_of_week);
        setYear(json.day_of_year);
        setNumber(json.week_number);
      };

      if (unit === "PM") {
        document.body.style.backgroundImage = `url(${backgroundDay})`;
        document.body.style.backdropFilter = "brightness(60%)";
      } else if (unit === "AM") {
        document.body.style.backgroundImage = `url(${backgroundNight})`;
      }
      fetchData();
    }, 1000);
  }, []);

  const clickMore = () => {
    hiddenBox.style.display = "flex";
    timeBox.style.marginTop = "60px";
    hiddenBox.style.marginTop = "320px";
    moreBtn.style.marginTop = "9px";
    setHidden(false);
  };

  const hiddenMore = () => {
    hiddenBox.style.display = "none";
    timeBox.style.marginTop = "188px";
    moreBtn.style.marginTop = "36px";
    setHidden(true);
  };

  return (
    <div className="heroku">
      <div className="timeZone">
        <div className="greetings">
          <img src={unit === "PM" && unitHours < 5 ? Sun : Moon}></img>
          <p className="morning">
            {unit === "AM" && unitHours > 5 ? "GOOD MORNING" : "GOOD EVENING"}
          </p>
        </div>
        <div className="format">
          <p className="hours">
            {timeMinutes === undefined ? null : finalTime}
          </p>
          <p className="zone">{unit}</p>
          <p className="zone">{dst}</p>
        </div>
        <p className="city">IN {locationCity}</p>
      </div>
      <div>
        <div
          className="more"
          onClick={() => {
            hidden ? clickMore() : hiddenMore();
          }}
        >
          <p>MORE</p>
          <div className={hidden ? "oval" : "upSideDown"}></div>
        </div>
      </div>
      <div className="box">
        <span>
          <p className="title">CURRENT TIMEZONE</p>
          <p className="info">{location}</p>
        </span>
        <span>
          <p className="title">DAY OF THE YEAR</p>
          <p className="info">{year}</p>
        </span>
        <span>
          <p className="title">DAY OF THE WEEK</p>
          <p className="info">{week}</p>
        </span>
        <span>
          <p className="title">WEEK NUMBER</p>
          <p className="info">{number}</p>
        </span>
      </div>
    </div>
  );
}
