import React from "react";
import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";

const WeatherCard = ({ weatherData }) => {
  return (
    <section className="weather__card">
      <p className="weather__temp">{weatherData.temp} °F</p>
      <img className="weather__logo" src={sunny} alt="sunny" />
    </section>
  );
};

export default WeatherCard;
