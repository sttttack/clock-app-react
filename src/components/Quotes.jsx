import React, { useState, useEffect } from "react";
import Refresh from "../assets/desktop/icon-refresh.svg";
import "../components/Quotes.css";

export default function Quotes() {
  const [data, setData] = useState([]);

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
        <div key={item._id} className="quotes">
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
