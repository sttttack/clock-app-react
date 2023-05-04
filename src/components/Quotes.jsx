import React, { useState, useEffect } from "react";
import Refresh from "../assets/desktop/icon-refresh.svg";
import "../components/Quotes.css";

export default function Quotes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "https://api.quotable.io/random";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setData([data]));
  }, []);

  console.log(data);

  return (
    <div>
      {data.map((item) => (
        <div key={item._id} className="quotes">
          <p className="content">“{item.content}”</p>
          <p className="author">{item.author}</p>
          <img src={Refresh}></img>
        </div>
      ))}
    </div>
  );
}
