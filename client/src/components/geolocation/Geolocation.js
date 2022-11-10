import classes from "./Geolocation.module.css";
import { useState } from "react";

const Geolocation = () => {
  const [message, setMessage] = useState("");

  const [link, setLink] = useState("");

  const geoFindMe = () => {
    function success(position) {
      const latitude = position.coords.latitude;

      const longitude = position.coords.longitude;

      setMessage(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
      setLink(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
    }

    const error = () => {
      setMessage("Unable to retrieve your location");
    };

    if (!navigator.geolocation) {
      alert("Geolocation is not available");
      setMessage("Geolocation is not supported by your browser");
    } else {
      alert("Please wait..");
      setMessage("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return (
    <div className={classes.location}>
      <button className={classes.button} onClick={geoFindMe}>
        Show Location
      </button>

      <p id="status">{message}</p>
      {link !== "" && (
        <a href={link} target="_blank" rel="noreferrer">
          Open in Map
        </a>
      )}
    </div>
  );
};

export default Geolocation;
