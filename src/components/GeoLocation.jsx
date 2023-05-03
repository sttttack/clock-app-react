import React, { useState, useEffect } from "react";

export default function GeoLocation() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    const geoApi =
      "https://api.ipbase.com/v2/info?apikey=qF4RzIVZi6J9FmK3snoW5iwxvPF0yfmho55vRD9T&ip=1.1.1.1";

    const fetchData = async () => {
      try {
        const response = await fetch(geoApi);
        const json = await response.json();
        console.log(json);
        setLocation(json.data.ip);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  });

  return (
    <div>
      <p>{location}</p>
    </div>
  );
}
