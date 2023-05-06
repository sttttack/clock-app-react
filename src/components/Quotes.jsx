import React, { useState, useEffect, useContext } from "react";
import { HiddenContext } from "../App";

import "../components/Quotes.css";
import Refresh from "../assets/desktop/icon-refresh.svg";

export default function Quotes() {
  const [data, setData] = useState([]);
  const [hidden, setHidden] = useContext(HiddenContext);
  console.log(hidden);

  const fetchData = () => {
    const url = "https://api.quotable.io/random";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData([data]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item._id} className={hidden ? "quotes" : "active"}>
          <div className="quote_fresh">
            <p className="content">“{item.content}”</p>
            <div>
              <img
                src={Refresh}
                onClick={() => {
                  fetchData();
                }}
              ></img>
            </div>
          </div>
          <p className="author">{item.author}</p>
        </div>
      ))}
    </div>
  );
}
